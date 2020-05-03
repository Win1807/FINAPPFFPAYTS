/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/lib/Constants",
	"jquery.sap.global"
], function(
	Parent,
	Constants,
	$
) {
	"use strict";

	var Bindings = Parent.extend("fin.ap.process.payments.ext.controller.Bindings", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 *
		 * @return {void}
		 */
		constructor: function(view) {
			this.view = function() {
				return view;
			};
		}
	});

	/**
	 * Initilizes bindings for handling fields
	 *
	 * @returns {void}
	 */
	Bindings.prototype.initBindings = function() {
		var path = this.view().getBindingContext().getPath();

		this.bindingsAction = this.setBindings(
			this.bindingsAction,
			this.onBindingActionChange, [{
				model: "ui",
				path: "/editable"
			}, {
				model: "ui",
				path: "/createMode"
			}]
		);

		this.bindingPayReqType = this.setBindings(
			this.bindingPayReqType,
			this.onBindingPayReqTypeChange, [{
				model: undefined,
				path: path + "/PaymentRequestType"
			}]
		);

		this.bindingsMode = this.setBindings(
			this.bindingsMode,
			this.onBindingModeChange, [{
				model: undefined,
				path: path + "/RepetitiveCode"
			}, {
				model: "detailPage",
				path: "/payReqType"
			}]
		);

		this.bindingsBankDetails = this.setBindings(
			this.bindingsBankDetails,
			this.onBindingBankDetailsChange,
			this.getBankDetailsSettings(path)
		);
	};

	/**
	 * Creates settings for bindings of bank details fields
	 * 
	 * @param {String} path - path to the detail page data
	 *
	 * @returns {Array} Returns array of bindings settings
	 */
	Bindings.prototype.getBankDetailsSettings = function(path) {
		var fields = [
			"PayeeBankCountry",
			"PayeeBank",
			"PayeeBankInternalID",
			"PayeeBankAccount",
			"PayeeBankControlKey",
			"BankDetailReference"
		];

		return fields.map(function(property) {
			return {
				model: undefined,
				path: path + "/" + property
			};
		}, this);
	};

	/**
	 * Sets bindings either by creating a new one or by updating the path 
	 *
	 * @param {Array} oldBindings - previously created bindings
	 * @param {Function} handler - handler function for event attaching
	 * @param {Object} settings - object with binding information
	 *
	 * @return {sap.ui.model.Binding} Returns created and initialized binding.
	 */
	Bindings.prototype.setBindings = function(oldBindings, handler, settings) {
		var bindings = oldBindings;

		// if bindings already exist only update their path
		if (Array.isArray(bindings) && bindings.length > 0) {
			bindings.forEach(function(binding, index) {
				binding.sPath = settings[index].path;
			});
		}
		// otherwise create new bindings
		else {
			bindings = this.createBindings(
				handler, settings
			);
		}

		return bindings;
	};

	/**
	 * Creates bindings by binding some models' properties
	 *
	 * @param {Function} handler - handler function for event attaching
	 * @param {Object} settings - object with binding information
	 * @param {Object} [thisArg] - value to use as "this" (the reference object) for handler
	 *
	 * @return {sap.ui.model.Binding} Returns created and initialized binding.
	 */
	Bindings.prototype.createBindings = function(handler, settings, thisArg) {
		var bindings = settings.map(function(info) {
			return this.getModel(info.model).bindProperty(info.path);
		}.bind(this));

		this.attachBindingsChange(bindings, handler, thisArg);

		return bindings;
	};

	/**
	 * Initializes bindings by attaching their 'change' event
	 *
	 * @param {Array} bindings - bindings
	 * @param {Function} handler - handler function for event attaching
	 * @param {Object} [thisArg] - value to use as "this" (the reference object) for handler
	 *
	 * @return {void}
	 */
	Bindings.prototype.attachBindingsChange = function(bindings, handler, thisArg) {
		bindings.forEach(function(binding) {
			// detach previously attached 'change' handler, just for sure
			binding.detachChange(handler);
			binding.attachChange(handler, thisArg || this);
			// refresh binding, so that our changes made before attaching take effect
			binding.refresh(true);
		}.bind(this));
	};

	/**
	 * Handles 'change' event of binding for action
	 *
	 * @return {void}
	 */
	Bindings.prototype.onBindingActionChange = function() {
		var isEdit = this.getModel("ui").getProperty("/editable");
		var isCreate = this.getModel("ui").getProperty("/createMode");
		var action = Constants.PAY_REQUEST_ACTIONS.DISPLAY;

		if (isEdit) {
			action = (isCreate) ? Constants.PAY_REQUEST_ACTIONS.CREATE : Constants.PAY_REQUEST_ACTIONS.EDIT;
		}

		this.setData({
			action: action
		});
	};

	/**
	 * Handles 'change' event of binding for Payment Request Type
	 *
	 * @return {void}
	 */
	Bindings.prototype.onBindingPayReqTypeChange = function() {
		var paymentRequestCode;
		var path = this.getBindingPath();

		if (path) {
			paymentRequestCode = this.getModel().getProperty(path + "/PaymentRequestType");

			this.setData({
				payReqType: this.getPaymentRequestType(paymentRequestCode)
			});
		}
	};

	/**
	 * Handles 'change' event of binding for mode
	 *
	 * @return {void}
	 */
	Bindings.prototype.onBindingModeChange = function() {
		var isRepetitiveCode;
		var payReqType;
		var path = this.getBindingPath();

		if (path) {
			isRepetitiveCode = !!this.getModel().getProperty(path + "/RepetitiveCode");
			payReqType = this.getModel("detailPage").getProperty("/payReqType");

			this.setData({
				mode: this.getMode(payReqType, isRepetitiveCode)
			});
		}
	};

	/**
	 * Handles 'change' event of binding for bank details properties
	 *
	 * @param {sap.ui.base.Event} event - event object
	 *
	 * @return {void}
	 */
	Bindings.prototype.onBindingBankDetailsChange = function(event) {
		var source = event.getSource();
		var path = source.getPath();
		var property = path.slice(path.lastIndexOf("/") + 1);
		var value = source.getValue();
		var data = {
			bankDetails: {}
		};

		data.bankDetails[property] = value;

		this.setData(data);
	};

	/**
	 * Sets data to detailPage model
	 *
	 * @param {Object} newData - object with new data
	 *
	 * @return {void}
	 */
	Bindings.prototype.setData = function(newData) {
		var model = this.getModel("detailPage");
		// extend model by new data recursively
		var data = $.extend(true, {}, model.getData(), newData);

		model.setData(data);
	};

	/**
	 * Gets Payment Request Type name according to it's code
	 *
	 * @param {String} paymentRequestCode - Payment Request Type code
	 *
	 * @return {Object} Returns Payment Request Type object
	 */
	Bindings.prototype.getPaymentRequestType = function(paymentRequestCode) {
		return paymentRequestCode ? this.findPaymentRequestType(paymentRequestCode).name : null;
	};

	/**
	 * Finds Payment Request Type name according to it's code
	 *  (in case of unknown code it returns default Type - ffp)
	 *
	 * @param {String} paymentRequestCode - Payment Request Type code
	 *
	 * @return {Object} Returns Payment Request Type object
	 */
	Bindings.prototype.findPaymentRequestType = function(paymentRequestCode) {
		var paymentRequestTypes = Constants.PAYMENT_REQUEST_TYPES.filter(function(type) {
			return paymentRequestCode === type.code;
		});

		return (paymentRequestTypes.length > 0) ? paymentRequestTypes[0] : Constants.PAYMENT_REQUEST_TYPES[0];
	};

	/**
	 * Gets the path of the current binding context of the view
	 *
	 * @return {String|null} Returns the current binding path
	 */
	Bindings.prototype.getBindingPath = function() {
		var bindingContext = this.view().getBindingContext();

		return bindingContext ? bindingContext.getPath() : null;
	};

	/**
	 * Gets Payment Request Type name according to it's code
	 *
	 * @param {String} payReqType - Payment Request Type
	 * @param {Boolean} isRepetitiveCode - is set any Repetitive Code
	 *
	 * @return {Object} Returns Payment Request Type object
	 */
	Bindings.prototype.getMode = function(payReqType, isRepetitiveCode) {
		return isRepetitiveCode ? Constants.REP_CODE_TYPE : payReqType;
	};

	/**
	 * Wrapper for retrieving model by id
	 *
	 * @param {String} id - id of model
	 *
	 * @return {Object} View's model
	 */
	Bindings.prototype.getModel = function(id) {
		return this.view().getModel(id);
	};

	return Bindings;
});