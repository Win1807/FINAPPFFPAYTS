/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/lib/Messages",
	"fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters",
	"fin/ap/process/payments/ext/controller/Dialog",
	"fin/ap/process/payments/ext/controller/Actions",
	"sap/ui/generic/app/transaction/TransactionController",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
	"jquery.sap.promise"
], function(
	Parent,
	Messages,
	Constants,
	Formatters,
	Dialog,
	Actions,
	TransactionController,
	MDialog,
	Button,
	Text
) {
	"use strict";

	var Footer = Parent.extend("fin.ap.process.payments.ext.controller.Footer", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 * @param {jQuery.sap.util.ResourceBundle} resourceBundle - translations from the current application
		 *
		 * @return {void}
		 */
		constructor: function(view, resourceBundle) {
			var actions;

			this.messages = Messages;
			this.formatter = Formatters;

			this.view = function() {
				return view;
			};

			this.resourceBundle = function() {
				return resourceBundle;
			};

			actions = new Actions(this.view(), this.resourceBundle());

			this.actions = function() {
				return actions;
			};
		}
	});

	/**
	 * Initializes the footer - binds its visibility and inserts action buttons
	 *
	 * @returns {void}
	 */
	Footer.prototype.initFooter = function() {
		var content = this.view().getContent();
		var footer = content[0].getFooter();
		var footerButtons = this.createActionButtons();

		footer.bindProperty("visible", {
			parts: [{
				path: "StatusCode"
			}, {
				path: "message>/"
			}, {
				path: "ui>/editable"
			}],
			formatter: this.formatter.footerVisible.bind(this.formatter)
		});

		footerButtons.forEach(function(button) {
			footer.addContent(button);
		});
	};

	/**
	 * Creates buttons which should be in the footer
	 *
	 * @return {Array} Returns footer buttons
	 */
	Footer.prototype.createActionButtons = function() {
		var handlers = [
			this.handlePostAndReleasePress.bind(this),
			this.handleReleasePress.bind(this),
			this.handlePostPress.bind(this),
			this.handleReversePress.bind(this)
		];

		// create a button for each button configuration and return them in an array
		return Constants.BUTTON_CONFIGS.map(function(buttonConfig, i) {
			buttonConfig.settings.type = sap.m.ButtonType[buttonConfig.settings.type];
			buttonConfig.settings.text = this.resourceBundle().getText(buttonConfig.settings.text);
			buttonConfig.settings.press = this.handleActionButtonPress.bind(this, handlers[i], buttonConfig.settings.text);
			return this.createActionButton(buttonConfig);
		}.bind(this));
	};

	/**
	 * Creates button for Payment Request actions
	 *
	 * @param {Object} buttonConfig - button configuration with id, settings and statuses
	 *
	 * @return {sap.m.Button} Returns footer button
	 */
	Footer.prototype.createActionButton = function(buttonConfig) {
		var button;
		var isAvailable = this.getModel("btnModel").getProperty("/" + buttonConfig.id);

		if (!isAvailable) {
			return null;
		}

		button = this.createButton(buttonConfig.id, buttonConfig.settings);

		button.bindProperty("visible", {
			parts: [{
				path: "StatusCode"
			}, {
				path: "ui>/editable"
			}],
			formatter: this.formatter.isPaymentActionEnabled.bind(this.formatter, buttonConfig.statuses)
		});

		return button;
	};

	/**
	 * Creates new button
	 *
	 * @param {String} name - button name
	 * @param {Object} settings - button settings
	 *
	 * @return {sap.m.Button} Returns created button
	 */
	Footer.prototype.createButton = function(name, settings) {
		var id = this.view().getId() + "--" + name;
		var button = this.byId(id);

		return button ? button : new sap.m.Button(id, settings);
	};

	/**
	 * Check prerequisities and executes handler of requested function
	 *
	 * @param {function} handler - action handler
	 * @param {String} actionName - translated name of requested action
	 *
	 * @return {void}
	 */
	Footer.prototype.handleActionButtonPress = function(handler, actionName) {
		var error;
		var user;

		// refresh detail page before the dialog is opened
		this.rebindEntity().then(function(entity) {
			if (this.isDraftLockedByAnotherUser(entity)) {
				user = this.getDraftProcessUser(entity);
				error = this.resourceBundle().getText("DRAFT_LOCKED_ERROR", [actionName.toLowerCase(), user]);
				this.showErrorDialog(error);
			} else if (this.isDraftExpiredByAnotherUser(entity)) {
				// let the user decide if expired draft should be discarded
				user = this.getDraftLastProcessUser(entity);
				error = this.resourceBundle().getText("DRAFT_DISCARD_WARNING", user);
				this.showErrorDialog(error, {
					text: this.resourceBundle().getText("DISCARD"),
					handler: this.discardDraft.bind(this)
				});
			} else { // no draft exists
				handler();
			}
		}.bind(this));
	};

	/**
	 * Discard expired draft
	 *
	 * @param {function} handler - action handler
	 *
	 * @return {Promise} - resolved after draft deleted
	 */
	Footer.prototype.discardDraft = function() {
		var context = this.view().getBindingContext();
		return this.getTransactionController().deleteEntity(context).then(function() {
			return this.rebindEntity();
		}.bind(this));
	};

	/**
	 * Get name of the user who owns the active draft
	 *
	 * @param {object} entity - object page entity
	 *
	 * @return {String} - name of locking user
	 */
	Footer.prototype.getDraftProcessUser = function(entity) {
		var draft = entity.data.DraftAdministrativeData;
		return draft !== undefined && draft.InProcessByUserDescription;
	};

	/**
	 * Get name of the user who was the last changer
	 *
	 * @param {object} entity - object page entity
	 *
	 * @return {String} - name of locking user
	 */
	Footer.prototype.getDraftLastProcessUser = function(entity) {
		var draft = entity.data.DraftAdministrativeData;
		return draft !== undefined && draft.LastChangedByUserDescription;
	};

	/**
	 * Check if draft is locked by another user
	 *
	 * @param {object} entity - object page entity
	 *
	 * @return {Boolean} - true if draft is locked
	 */
	Footer.prototype.isDraftLockedByAnotherUser = function(entity) {
		var draft = entity.data.DraftAdministrativeData;
		return draft !== undefined && draft.InProcessByUser !== "" && !draft.DraftIsProcessedByMe;
	};

	/**
	 * Check if draft is expired and owned by another user
	 *
	 * @param {object} entity - object page entity
	 *
	 * @return {Boolean} - true if draft is expired
	 */
	Footer.prototype.isDraftExpiredByAnotherUser = function(entity) {
		var draft = entity.data.DraftAdministrativeData;
		return draft !== undefined && draft.InProcessByUser === "" && !draft.DraftIsLastChangedByMe;
	};

	/**
	 * Refresh binding and data on object page
	 *
	 * @return {Promise} - resolved after refresh is done
	 */
	Footer.prototype.rebindEntity = function() {
		var bindingPromise = this.createBindingPromise();
		var binding = this.getEntityBinding();

		// refresh bindings
		binding.refresh(true);

		return bindingPromise;
	};

	/**
	 * Rebinds detail page to get most up-to-date data
	 *
	 * @param {sap.ui.model.Binding} binding - table binding
	 *
	 * @return {Promise} - binding promise
	 */
	Footer.prototype.createBindingPromise = function() {
		var bindingParams;
		var binding = this.getEntityBinding();

		// expand Draft administrative data in the request
		binding.attachEventOnce("dataRequested", null, function(event) {
			bindingParams = event.getSource()["mParameters"];
			if (bindingParams.expand === "") {
				bindingParams.expand = "DraftAdministrativeData";
			} else {
				bindingParams.expand += ",DraftAdministrativeData";
			}
		});

		return new Promise(function(resolve) {
			binding.attachEventOnce("dataReceived", null, function(data) {
				resolve(data.getParameters());
			});
		});
	};

	/**
	 * Returns binding of current entity
	 *
	 * @return {sap.ui.model.odata.v2.ODataContextBinding} - context binding
	 */
	Footer.prototype.getEntityBinding = function() {
		var path = this.view().getBindingContext().getPath();
		return this.view().getModel().aBindings.filter(function(item) {
			return item.getPath() === path;
		})[0];
	};

	/**
	 * Handles press event for release request button -
	 * creates dialog for confirmation of payment release
	 *
	 * @return {void}
	 */
	Footer.prototype.handleReleasePress = function() {
		this.openDialog(Constants.ACTIONS.RELEASE.title, Constants.ACTIONS.RELEASE.message, false, this.onReleasePress.bind(this));
	};

	/**
	 * Handles press event for reverse request button
	 *
	 * @return {void}
	 */
	Footer.prototype.handleReversePress = function() {
		var dialog = this.openDialog(Constants.ACTIONS.REVERSE.title, Constants.ACTIONS.REVERSE.message, true, this.onReversePress.bind(this));

		this.fillSelect(dialog);
	};

	/**
	 * Handles press event for post request button -
	 * creates dialog for confirmation of payment post
	 *
	 * @return {void}
	 */
	Footer.prototype.handlePostPress = function() {
		this.openDialog(Constants.ACTIONS.POST.title, Constants.ACTIONS.POST.message, false, this.onPostPress.bind(this));
	};

	/**
	 * Handles press event for post-and-release request button -
	 * creates dialog for confirmation
	 *
	 * @return {void}
	 */
	Footer.prototype.handlePostAndReleasePress = function() {
		this.openDialog(Constants.ACTIONS.POST_AND_RELEASE.title, Constants.ACTIONS.POST_AND_RELEASE.message, false, this.onPostAndReleasePress
			.bind(this));
	};

	/**
	 * Creates and shows an action dialog
	 *
	 * @param {String} titleKey - i18n key for dialog title
	 * @param {String} messageKey - i18n key for dialog message
	 * @param {Boolean} isReverse - whether the action is reverse
	 * @param {Function} action - Payment Request action
	 *
	 * @return {fin.ap.process.payments.ext.controller.Dialog} Returns the dialog.
	 */
	Footer.prototype.openDialog = function(titleKey, messageKey, isReverse, action) {
		var dialog;
		var paymentID = this.getBindingContext().getProperty("PaymentRequest");
		var title = this.resourceBundle().getText(titleKey);
		var message = this.resourceBundle().getText(messageKey, paymentID);

		this.getModel("dialog").setProperty("/title", title);
		this.getModel("dialog").setProperty("/message", message);
		this.getModel("dialog").setProperty("/isReverse", isReverse);

		dialog = this.createDialog(action);

		dialog.showDialog();

		return dialog;
	};

	/**
	 * Handles press event for release request button
	 *
	 * @return {void}
	 */
	Footer.prototype.onReleasePress = function() {
		this.actions().performAction(Constants.ACTIONS.RELEASE.name);
	};

	/**
	 * Handles press event for reverse request button
	 *
	 * @return {void}
	 */
	Footer.prototype.onReversePress = function() {
		this.actions().performAction(Constants.ACTIONS.REVERSE.name);
	};

	/**
	 * Handles press event for post request button
	 *
	 * @return {void}
	 */
	Footer.prototype.onPostPress = function() {
		this.actions().performAction(Constants.ACTIONS.POST.name);
	};

	/**
	 * Handles press event for post request button
	 *
	 * @return {void}
	 */
	Footer.prototype.onPostAndReleasePress = function() {
		this.actions().performAction(Constants.ACTIONS.POST_AND_RELEASE.name);
	};

	/**
	 * Fills the list with Reversal Reasons
	 *
	 * @param {Object} dialog - dialog controller
	 *
	 * @return {Promise} Returns promise of acquiring Reversal Reason items
	 */
	Footer.prototype.fillSelect = function(dialog) {
		dialog.fragment().setBusy(true);

		return this.actions().getReversalReasons().then(function(data) {
			this.bindSelectItems(data.results);
		}.bind(this)).catch().then(function() {
			dialog.fragment().setBusy(false);
		});
	};

	/**
	 * Fills Select control with Reversal Reason items
	 *
	 * @param {Array} items - Reversal Reason items
	 *
	 * @return {void}
	 */
	Footer.prototype.bindSelectItems = function(items) {
		var select = this.byId("reasonSelect");
		var model = new sap.ui.model.json.JSONModel({
			"items": items
		});
		var template = new sap.ui.core.Item({
			key: "{ReversalReason}",
			text: {
				parts: [{
					path: "ReversalReason"
				}, {
					path: "ReversalReasonName"
				}],
				formatter: this.formatter.formatReason
			}
		});
		var sorter = new sap.ui.model.Sorter("ReversalReason");

		select.setModel(model);
		select.bindItems({
			path: "/items",
			template: template,
			sorter: sorter
		});
	};

	/**
	 * Show popup dialog with actions
	 *
	 * @param {String} text - error message
	 * @param {Object} action - possible action
	 *
	 * @return {void}
	 */
	Footer.prototype.showErrorDialog = function(text, action) {
		var dialog = new MDialog({
			title: "Warning",
			type: "Message",
			state: "Warning",
			content: new Text({
				text: text
			}),
			endButton: new Button({
				text: this.resourceBundle().getText("CLOSE"),
				press: function() {
					dialog.close();
				}
			})
		});

		if (action) {
			dialog.setBeginButton(new Button({
				text: action.text,
				press: function() {
					action.handler();
					dialog.close();
				}
			}));
		}

		dialog.open();
	};

	/**
	 * Returns transaction controller for draft operations
	 *
	 * @param {Function} action - function for button action
	 *
	 * @return {sap.ui.generic.app.transaction.TransactionController} - transaction controller
	 */
	Footer.prototype.getTransactionController = function() {
		if (!this.transactionController) {
			this.transactionController = new TransactionController(this.getModel());
		}

		return this.transactionController;
	};

	/**
	 * Creates dialog
	 *
	 * @param {Function} action - function for button action
	 *
	 * @return {Object} Returns new instance of Dialog
	 */
	Footer.prototype.createDialog = function(action) {
		return new Dialog(this.view(), action);
	};

	/**
	 * Wrapper for retrieving binding context of view
	 *
	 * @return {sap.ui.model.Context} View's binding context
	 */
	Footer.prototype.getBindingContext = function() {
		return this.view().getBindingContext();
	};

	/**
	 * Wrapper for retrieving model by id
	 *
	 * @param {String} id - id of model
	 *
	 * @return {Object} View's model
	 */
	Footer.prototype.getModel = function(id) {
		return this.view().getModel(id);
	};

	/**
	 * Wrapper for retrieving reference object by id from view
	 *
	 * @param {String} id - id of requested element
	 *
	 * @return {Object} Null or reference to the element with requested id
	 */
	Footer.prototype.byId = function(id) {
		return this.view().byId(id);
	};

	return Footer;
});