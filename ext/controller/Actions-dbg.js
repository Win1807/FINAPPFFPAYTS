/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/lib/Messages",
	"fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters",
	"jquery.sap.global",
	"jquery.sap.promise"
], function(
	Parent,
	Messages,
	Constants,
	Formatters,
	$
) {
	"use strict";

	var Actions = Parent.extend("fin.ap.process.payments.ext.controller.Actions", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 * @param {jQuery.sap.util.ResourceBundle} resourceBundle - translations from the current application
		 *
		 * @return {void}
		 */
		constructor: function(view, resourceBundle) {
			this.messages = Messages;
			this.formatter = Formatters;

			this.view = function() {
				return view;
			};

			this.resourceBundle = function() {
				return resourceBundle;
			};
		}
	});

	/**
	 * Releases currently selected payment
	 *
	 * @return {Promise} Returns promise of release function
	 */
	Actions.prototype.releasePayment = function() {
		return this.processPayment(Constants.ACTIONS.RELEASE, {});
	};

	/**
	 * Releases currently selected payment
	 *
	 * @return {Promise} Returns promise of release function
	 */
	Actions.prototype.reversePayment = function() {
		var reason = this.byId("reasonSelect").getSelectedKey();
		var additionalParameters = {
			ReversalReason: reason
		};
		var date = this.byId("reverseDatePicker").getDateValue();

		if (date) {
			additionalParameters.ReversalDate = this.formatter.formatDate(date);
		}

		return this.processPayment(Constants.ACTIONS.REVERSE, additionalParameters);
	};

	/**
	 * Posts currently selected payment
	 *
	 * @return {Promise} Returns promise of post function
	 */
	Actions.prototype.postPayment = function() {
		return this.processPayment(Constants.ACTIONS.POST, {});
	};

	/**
	 * Posts and releases currently selected payment
	 *
	 * @return {Promise} Returns promise of post&release function
	 */
	Actions.prototype.postAndReleasePayment = function() {
		return this.postPayment().then(function() {
			return this.releasePayment();
		}.bind(this));
	};

	/**
	 * Posts currently selected payment
	 *
	 * @param {Object} actionObject - object with information about the action
	 * @param {Object} additionalParameters - additional url parameters for the request
	 *
	 * @return {Promise} Returns promise of action function
	 */
	Actions.prototype.processPayment = function(actionObject, additionalParameters) {
		var message;
		var paymentID = this.getBindingContext().getProperty("PaymentRequest");
		var urlParameters = {
			RequestId: paymentID
		};

		return new Promise(function(resolve, reject) {
			this.view().getModel().callFunction(actionObject.path, {
				urlParameters: $.extend({}, urlParameters, additionalParameters),
				method: "POST",
				success: function(data) {
					message = this.resourceBundle().getText(actionObject.success, paymentID);
					this.addSuccessMessages(data.results || message);
					this.messages.showMessageToast(message);
					resolve();
				}.bind(this),
				error: function(error) {
					this.messages.addErrorMessage(error);
					reject();
				}.bind(this)
			});
		}.bind(this));
	};

	/**
	 * Gets Reversal Reason data from backend
	 *
	 * @return {Promise} Returns promise of reading the data
	 */
	Actions.prototype.getReversalReasons = function() {
		return new Promise(function(resolve, reject) {
			this.view().getModel().read("/C_PaytReqReversalReasonVH", {
				success: function(data) {
					resolve(data);
				},
				error: function(error) {
					this.messages.addErrorMessage(error);
					reject();
				}.bind(this)
			});
		}.bind(this));
	};

	/**
	 * Performs action on the payment
	 *
	 * @param {String} actionName - name of the action to be performed
	 *
	 * @return {Promise} Returns promise of release function
	 */
	Actions.prototype.performAction = function(actionName) {
		var actionFunction = this.getActionFunction(actionName);

		if (actionFunction) {
			this.view().setBusy(true);

			return actionFunction().then(function() {
				this.refresh();
			}.bind(this)).catch(function() {
				this.refresh();
			}.bind(this)).then(function() {
				this.view().setBusy(false);
			}.bind(this));
		}
	};

	/**
	 * Gets the action function according to the name
	 *
	 * @param {String} actionName - action name
	 *
	 * @return {Function} Returns the action function.
	 */
	Actions.prototype.getActionFunction = function(actionName) {
		var actionFunction = this[actionName + "Payment"];
		return actionFunction ? actionFunction.bind(this) : null;
	};

	/**
	 * Addes succes messages to Message Popover
	 *
	 * @param {Array} messages - message objects
	 *
	 * @return {void}
	 */
	Actions.prototype.addSuccessMessages = function(messages) {
		if (messages instanceof Array) {
			messages.forEach(function(message) {
				this.messages.addSuccessMessage(message.Message);
			}.bind(this));
		} else {
			this.messages.addSuccessMessage(messages);
		}
	};

	/**
	 * Refreshes view model
	 *
	 * @return {void}
	 */
	Actions.prototype.refresh = function() {
		this.view().getController().extensionAPI.refresh();
	};

	/**
	 * Wrapper for retrieving binding context of view
	 *
	 * @return {sap.ui.model.Context} View's binding context
	 */
	Actions.prototype.getBindingContext = function() {
		return this.view().getBindingContext();
	};

	/**
	 * Wrapper for retrieving reference object by id from view
	 *
	 * @param {String} id - id of requested element
	 *
	 * @return {Object} Null or reference to the element with requested id
	 */
	Actions.prototype.byId = function(id) {
		return this.view().byId(id);
	};

	return Actions;
});