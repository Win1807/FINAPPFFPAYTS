/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/Global",
	"sap/ui/model/Binding",
	"fin/ap/process/payments/model/additionalModels",
	"fin/ap/process/payments/lib/Messages",
	"fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters",
	"fin/ap/process/payments/ext/controller/Footer",
	"fin/ap/process/payments/ext/controller/Templates",
	"fin/ap/process/payments/ext/controller/Fields",
	"fin/ap/process/payments/ext/controller/CopyPaymentRequest",
	"fin/ap/process/payments/ext/controller/Bindings",
	"fin/ap/process/payments/ext/controller/BankRadioButtons",
	"sap/ui/comp/navpopover/SmartLink",
	"sap/ui/comp/smartfield/SmartField"
	/* eslint-disable max-params */
], function(UI, Binding, additionalModels, Messages, Constants, Formatters, Footer, Templates, Fields, CopyPaymentRequest, Bindings,
	BankRadioButtons, SmartLink, SmartField) {
	/* eslint-enable "max-params" */
	"use strict";

	/**
	 * Class which implements Object Page Extension
	 *
	 * @extends sap.ui.controller1
	 */
	var DetailPageExt = function Controller() {
		this.messages = Messages;
		this.formatter = Formatters;
	};

	/**
	 * Handles 'init' event of the controller
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onInit = function() {
		var footer = new Footer(this.getView(), this.getResourceBundle());
		var templates = new Templates(this.getView(), this.getResourceBundle());
		var fields = new Fields(this.getView(), templates);
		this.initButtonModel();
		var copyAction = new CopyPaymentRequest(this);
		var bindings = new Bindings(this.getView());
		var bankRadioButtons = new BankRadioButtons(this.getView());

		this.footer = function() {
			return footer;
		};

		this.templates = function() {
			return templates;
		};

		this.fields = function() {
			return fields;
		};

		this.copyAction = function() {
			return copyAction;
		};

		this.bindings = function() {
			return bindings;
		};

		this.bankRadioButtons = function() {
			return bankRadioButtons;
		};

		this.getView().setModel(additionalModels.dialogModel(), "dialog");
		this.getView().setModel(this.messages.getMessageModel(), "message");
		this.getView().setModel(additionalModels.saveTemplateModel(), "saveTemplate");
		this.getView().setModel(additionalModels.detailPageModel(), "detailPage");

		this.adjustHeader();

		this.extensionAPI.attachPageDataLoaded(this.onPageDataLoaded.bind(this));
	};

	/**
	 * Adjusts Object page header
	 *
	 * @returns {void}
	 */
	DetailPageExt.prototype.adjustHeader = function() {
		this.removeDelete();
		this.adjustHeaderFields();
	};

	/**
	 * Remove Delete button from header toolbar
	 *
	 * @returns {void}
	 */
	DetailPageExt.prototype.removeDelete = function() {
		var deleteBtn = this.byId("delete");

		if (deleteBtn) {
			deleteBtn.destroy();
		}
	};

	/**
	 * Adjusts Object page header fields
	 *
	 * @returns {void}
	 */
	DetailPageExt.prototype.adjustHeaderFields = function() {
		var dataField;
		var fields = [{
			fieldGroup: "HEADER1",
			dataField: "PaymentBatch",
			beforePopoverOpens: this.onPaymentBatchBeforePopoverOpens
		}, {
			fieldGroup: "HEADER2",
			dataField: "PaymentBatchStatusText"
		}];

		fields.forEach(function(field) {
			dataField = this.getHeaderDataField(field.fieldGroup, field.dataField);

			if (dataField) {
				dataField.bindProperty("visible", {
					path: field.dataField,
					formatter: this.formatter.hasValue
				});

				if (field.hasOwnProperty("beforePopoverOpens")) {
					this.attachDataFieldBeforePopoverOpens(dataField, field.beforePopoverOpens);
				}
			}
		}, this);
	};

	/**
	 * Attaches 'beforePopoverOpens' handler for SmartField of given DataField
	 *
	 * @param {sap.m.HBox} dataField - DataField (HBox) containing SmartField
	 * @param {Function} beforePopoverOpens - handler for 'beforePopoverOpens' event
	 *
	 * @returns {void}
	 */
	DetailPageExt.prototype.attachDataFieldBeforePopoverOpens = function(dataField, beforePopoverOpens) {
		// get Payment Batch SmartField from the header content (because of complex id, it can't be done by byId)
		// structure: header content -> Field Groups (vboxes) -> Data Fields (hboxes) -> controls (SmartLabels, SmartFields, ...)
		var smartField = this.getSmartFieldItem(dataField);

		smartField.getSemanticObjectController().attachBeforePopoverOpens(beforePopoverOpens, this);
	};

	/**
	 * Returns first SmartField from items of given control
	 *
	 * @param {Object} control - control with child controls as items
	 *
	 * @returns {sap.ui.comp.smartfield.SmartField} Returns a SmartField control. 
	 */
	DetailPageExt.prototype.getSmartFieldItem = function(control) {
		var items = [];
		var smartFields = [];

		if (control.getItems) {
			items = control.getItems();
		}

		smartFields = items.filter(function(item) {
			return item instanceof SmartField;
		});

		return smartFields.length > 0 ? smartFields[0] : null;
	};

	/**
	 * Gets DataField (HBox wrapper for label, field, ...) from the header content
	 *
	 * @param {String} fieldGroup - qualifier of header FieldGroup
	 * @param {String} field - field name
	 *
	 * @returns {sap.m.HBox} Returns found DataField.
	 */
	DetailPageExt.prototype.getHeaderDataField = function(fieldGroup, field) {
		var id;
		var items;
		var dataFields = this.getHeaderFieldGroup(fieldGroup).getItems().filter(function(dataField) {
			items = dataField.getItems();

			if (items.length > 0) {
				// items (controls) in the same DataField (HBox) have the same substrings in their id
				id = items[0].getId();

				return id.match("::" + field + "::");
			} else {
				return false;
			}
		});

		return dataFields.length > 0 ? dataFields[0] : null;
	};

	/**
	 * Gets header FieldGroup by qualifier
	 *
	 * @param {String} qualifier - FieldGroup's qualifier
	 *
	 * @returns {sap.m.VBox} Returns FieldGroup (VBox) with given qualifier. 
	 */
	DetailPageExt.prototype.getHeaderFieldGroup = function(qualifier) {
		var fieldGroups = [];
		var headerFieldGroups;
		var headerContent = this.byId("objectPage").getHeaderContent();

		if (headerContent.length > 0) {
			headerFieldGroups = headerContent[0].getItems();

			fieldGroups = headerFieldGroups.filter(function(vbox) {
				return vbox.getId().indexOf(qualifier) > -1;
			});
		}

		return fieldGroups.length > 0 ? fieldGroups[0] : null;
	};

	/**
	 * Handler 'before popover opens' on smartlink
	 *
	 * @param {sap.ui.base.Event} event - event with navigation parameters
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onPaymentBatchBeforePopoverOpens = function(event) {
		var parameters = event.getParameters();
		var semanticAttributes = parameters.semanticAttributesOfSemanticObjects.PaymentItem;
		var paymentItemSemanticAttributes = {};

		// navigate to Monitor Payments app Detail page
		paymentItemSemanticAttributes.PaymentBatch = semanticAttributes.PaymentItem;
		paymentItemSemanticAttributes.BatchUUID = semanticAttributes.BatchUUID;
		paymentItemSemanticAttributes.PaymentBatchItem = semanticAttributes.PaymentBatchItem;

		parameters.setSemanticAttributes(paymentItemSemanticAttributes, "PaymentItem");
		parameters.open();
	};

	/**
	 * Called after rendering
	 *
	 * @returns {void}
	 */
	DetailPageExt.prototype.onAfterRendering = function() {
		this.templates().initTemplateButtons();
		this.bankRadioButtons().initBankRadioButtons();
		this.adjustEditButton();
		this.fields().initSections();
		this.fields().initFields();
		this.shareUIModel();
		this.initMessages();
		this.addHeaderSpacer();
		this.attachSmartLinksPress();
	};

	/**
	 * Attach handler on smartlinks
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.attachSmartLinksPress = function() {
		var fields = [
			this.fields().getField("PayeeBankInternalID", "PayeeBankGroup"),
			this.fields().getField("PayeeBankAccount", "PayeeBankGroup")
		];
		var smartlink;

		fields.forEach(function(field) {
			field.attachInnerControlsCreated(null, function(event) {
				smartlink = event.getSource().getContent();
				if (smartlink instanceof SmartLink) {
					smartlink.attachBeforePopoverOpens(smartlink.getProperty("fieldName"), this.onBeforeSmartlinkPopoverOpens);
					smartlink.attachNavigationTargetsObtained(null, this.onNavigationTargetObtained.bind(this));
				}
			}.bind(this));
		}.bind(this));

	};

	/**
	 * Handler 'navigation targets obtained' on smartlink
	 *
	 * @param {sap.ui.base.Event} event - event with entity parameters
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onNavigationTargetObtained = function(event) {
		if (event.getParameter("semanticObject") === "BankAccount") {
			// fix some parameters
			this.copySemanticAttribute(event, "BankAccount-manageMasterData", "PayeeBankName", "BankName");
			this.copySemanticAttribute(event, "BankAccount-manageMasterData", "PayeeBankInternalID", "Bank");
			this.copySemanticAttribute(event, "BankAccount-manageMasterData", "PayeeBankCountry", "BankCountry");
			this.copySemanticAttribute(event, "BankAccount-manageMasterData", "", "CreatedByUser");
			this.copySemanticAttribute(event, "BankAccount-manageMasterData", "", "CompanyCodeName");
		}
	};

	/**
	 * Copy parameter in smart link semantic attrs
	 *
	 * @private
	 * @param {sap.ui.base.Event} event - Event created by Smart Link
	 * @param {String} semanticObjectAction - semanticObject-semanticAction
	 * @param {String} source - source parameter
	 * @param {String} destination - destination parameter
	 *
	 * @returns {void}
	 */
	DetailPageExt.prototype.copySemanticAttribute = function(event, semanticObjectAction, source, destination) {
		var semanticAttrs = event.getParameter("semanticAttributes");
		var action = event.getParameter("actions").filter(function(act) {
			return act.getKey() === semanticObjectAction;
		})[0];
		var href = action.getHref();

		href = this.replaceUrlParam(href, destination, semanticAttrs[source] ? semanticAttrs[source] : "");
		action.setHref(href);

		semanticAttrs[destination] = semanticAttrs[source] ? semanticAttrs[source] : "";
	};

	/**
	 * Updates parameter in URL address
	 *
	 * @private
	 * @param {String} url - url address
	 * @param {String} paramName - name of parameter
	 * @param {String} paramValue - requested value
	 *
	 * @returns {String} - url with updated parameter
	 */
	DetailPageExt.prototype.replaceUrlParam = function(url, paramName, paramValue) {
		var pattern = new RegExp("\\b(" + paramName + "=).*?(&|$)");
		if (url.search(pattern) >= 0) {
			return url.replace(pattern, "$1" + paramValue + "$2");
		}
		url = url.replace(/\?$/, "");
		return url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue;
	};

	/**
	 * Handler 'beforePopoverOpens' on smartlink
	 *
	 * @param {sap.ui.base.Event} event - event with entity parameters
	 * @param {String} fieldName - name of smartlink field
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onBeforeSmartlinkPopoverOpens = function(event, fieldName) {
		var parameters = event.getParameters();
		var semanticAttrs = parameters.semanticAttributes;

		// change this param for both smart links
		if (semanticAttrs.PayeeBankName) {
			semanticAttrs.BankName = semanticAttrs.PayeeBankName;
		}

		if (fieldName === "PayeeBankAccount") {
			semanticAttrs.Bank = "";
			semanticAttrs.HouseBank = "";
			semanticAttrs.HouseBankAccount = "";
			semanticAttrs.BankCountry = semanticAttrs.PayeeBankCountry;
			semanticAttrs.CreatedByUser = "";
			semanticAttrs.CompanyCodeName = "";
			semanticAttrs.BankName = semanticAttrs.PayeeBankName;
		}

		parameters.setSemanticAttributes(semanticAttrs);
	};

	/**
	 * Adjusts SmartTemplate edit button's behaviour
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.adjustEditButton = function() {
		var editBtn = this.byId("edit");

		editBtn.bindProperty("enabled", {
			path: "StatusCode",
			formatter: this.formatter.isActionEnabled.bind(this.formatter, Constants.EDIT_STATUSES)
		});
	};

	/**
	 * Initializes button visibility model
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.initButtonModel = function() {
		var parent = this.getOwnerComponent().getEventingParent();
		var btnModel = parent.getModel("btnModel");

		this.getView().setModel(btnModel, "btnModel");
	};

	/**
	 * Handles 'PageDataLoaded' event (after object page is navigated to)
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onPageDataLoaded = function() {
		if (this.messages.getMessages().length > 0) {
			this.messages.closePopover();
			this.messages.clearMessages();
		}

		this.initBindings();
		this.fields().expandSubSections(false);
		this.adjustBatchNumber();

		// indicate detail page has been opened
		this.getOwnerComponent().getEventingParent().getModel("btnModel").setProperty("/isDetailPage", true);
	};

	/**
	 * Initializes bindings
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.initBindings = function() {
		this.bindings().initBindings();
		this.initBindingAppMode();
	};

	/**
	 * Initializes binding for app mode property
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.initBindingAppMode = function() {
		this.bindings().createBindings(this.onBindingAppModeChange, [{
			model: "btnModel",
			path: "/appMode"
		}], this);
	};

	/**
	 * Handles 'change' event of binding for app mode
	 *
	 * @param {sap.ui.base.Event} event - event object
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onBindingAppModeChange = function(event) {
		var value = event.getSource().getValue();

		// initialize footer after app mode has been initialized
		if (value) {
			this.footer().initFooter();
		}
	};

	/**
	 * Adjustes PaymentBatch value (removes leading zeros)
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.adjustBatchNumber = function() {
		var path = this.getView().getBindingContext().getPath() + "/PaymentBatch";
		var paymentBatch = this.getModel().getProperty(path);

		if (paymentBatch) {
			this.getModel().setProperty(path, this.formatter.removeLeadingZeros(paymentBatch));
		}
	};

	/**
	 * Gets message popover button
	 *
	 * @return {sap.m.Button} Returns message button
	 */
	DetailPageExt.prototype.getMessageButton = function() {
		return this.footer().getMessageButton();
	};

	/**
	 * Shares the ui model of detail screen with list report screen to access createMode/editable fields
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.shareUIModel = function() {
		var uiModel = this.getView().getModel("ui");
		var parent = this.getOwnerComponent().getEventingParent();

		parent.setModel(uiModel, "uiDetail");
		setTimeout(function() {
			parent.fireEvent("DETAIL_MODEL_SHARED", {
				eventingParent: parent
			});
		}, 0);
	};

	/**
	 * Add spacer between header columns
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.addHeaderSpacer = function() {
		var item;
		var objectPage = this.byId("objectPage");
		var header = objectPage.getHeaderContent()[0];
		if (header) {
			item = header.getItems()[0];
			if (item) {
				item.addStyleClass("sapUiSmallMarginEnd");
			}
		}
	};

	/**
	 * Initializes message processing
	 *
	 * @returns {void}
	 */
	DetailPageExt.prototype.initMessages = function() {
		var messageButton = this.byId("showMessages");

		messageButton.bindProperty("text", {
			path: "message>/",
			formatter: this.formatter.getMessagesCount
		}).bindProperty("visible", {
			path: "message>/",
			formatter: this.formatter.hasMessages
		});

		this.messages.setMessageIndicator(messageButton);

		this.overrideMessageHandling();
	};

	/**
	 * Overrides handling of backend error messages -
	 * the default handler function is called after performing our custom actions
	 *
	 * @return {void} 
	 */
	DetailPageExt.prototype.overrideMessageHandling = function() {
		var messageChangeHandler;
		var eventRegistry = this.getModel()["mEventRegistry"];

		if (eventRegistry && eventRegistry.messageChange) {
			// get handler reference (hack)
			messageChangeHandler = eventRegistry.messageChange[0];

			// detach handler attached by default and attach wrapper function
			this.getModel().detachMessageChange(messageChangeHandler.fFunction, messageChangeHandler.oListener);
			this.getModel().attachMessageChange(messageChangeHandler, this.onMessageChange, this);
		}
	};

	/**
	 * Handles 'message change' event of view model
	 *
	 * @param {sap.ui.base.Event} event - event object with old and new messages
	 * @param {Object} messageChangeHandler - 'message change' handler object
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onMessageChange = function(event, messageChangeHandler) {
		var oldMessages = event.getParameter("oldMessages");
		var newMessages = event.getParameter("newMessages");

		// override default handling of backend error messages
		if (oldMessages && oldMessages.length > 0) {
			// prevent removing old messages, because we already filter the new ones
			event["mParameters"].oldMessages = [];
		}

		if (newMessages && newMessages.length > 0) {
			// remove new messages with duplicate text
			event["mParameters"].newMessages = this.removeDuplicateMessages(newMessages);

			// prevent removing messages after refresh, automatically add only new messages
			// we handle message removing manually
			messageChangeHandler.fFunction.call(messageChangeHandler.oListener, event);
		}
	};

	/**
	 * Removes message objects with duplicate message texts and those,
	 * which messages are already present in the message model
	 *
	 * @param {Array} messages - objects with message info
	 *
	 * @return {Array} Returns message objects with unique message texts
	 */
	DetailPageExt.prototype.removeDuplicateMessages = function(messages) {
		var messageData = this.messages.getMessageModel().getData();
		var mappedMessageData = messageData.map(function(data) {
			return data.message;
		});
		var mappedMessages = messages.map(function(message) {
			return message.message;
		});

		return messages.filter(function(message, index) {
			// remove duplicate backend messages and backend messages which are already in message model
			return mappedMessages.indexOf(message.message) === index && (mappedMessageData.indexOf(message.message) === -1);
		});
	};

	/**
	 * Event handler for click on 'manage templates' button
	 *
	 * @return {void} 
	 */
	DetailPageExt.prototype.onManageTemplatesActionBtnPress = function() {
		this.templates().openManageTemplatesDialog();
	};

	/**
	 * Handles 'press' event of Save Template button
	 *
	 * @return {Promise} Returns promise of reading Template names
	 */
	DetailPageExt.prototype.onSaveTemplateBtnPress = function() {
		return this.templates().openSaveTemplateDialog();
	};

	/**
	 * Handles 'press' event of Copy button
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.onCopyBtnPress = function() {
		this.copyAction().onCopyBtnPress();
	};

	/**
	 * Refreshes view model
	 *
	 * @return {void}
	 */
	DetailPageExt.prototype.refresh = function() {
		this.extensionAPI.refresh();
	};

	/**
	 * Wrapper for retrieving model by id
	 *
	 * @param {String} id - id of model
	 *
	 * @return {Object} View's model
	 */
	DetailPageExt.prototype.getModel = function(id) {
		return this.getView().getModel(id);
	};

	/**
	 * Wrapper for retrieving reference object by id from view
	 *
	 * @param {String} id - id of requested element
	 *
	 * @return {Object} Null or reference to the element with requested id
	 */
	DetailPageExt.prototype.byId = function(id) {
		return this.getView().byId(id);
	};

	/**
	 * Getter for the resource bundle
	 *
	 * @return {sap.ui.model.resource.ResourceModel} The resourceModel of the component
	 */
	DetailPageExt.prototype.getResourceBundle = function() {
		return this.getOwnerComponent().getModel("i18n").getResourceBundle();
	};

	return sap.ui.controller("fin.ap.process.payments.ext.controller.DetailPageExt", new DetailPageExt());
});