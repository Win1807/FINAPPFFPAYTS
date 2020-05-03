/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/lib/Messages",
	"fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters",
	"fin/ap/process/payments/ext/controller/ManageTemplatesDialog",
	"fin/ap/process/payments/ext/controller/SaveTemplateDialog",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(
	Parent,
	Messages,
	Constants,
	Formatters,
	ManageTemplatesDialog,
	SaveTemplateDialog,
	Filter,
	FilterOperator
) {
	"use strict";

	var Templates = Parent.extend("fin.ap.process.payments.ext.controller.Templates", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 * @param {jQuery.sap.util.ResourceBundle} resourceBundle - translations from the current application
		 *
		 * @return {void}
		 */
		constructor: function(view, resourceBundle) {
			var manageTemplatesDialog;
			var saveTemplateDialog;

			this.messages = Messages;
			this.formatter = Formatters;

			this.view = function() {
				return view;
			};

			this.resourceBundle = function() {
				return resourceBundle;
			};

			manageTemplatesDialog = this.new(ManageTemplatesDialog, this.view());

			this.manageTemplatesDialog = function() {
				return manageTemplatesDialog;
			};

			saveTemplateDialog = this.new(SaveTemplateDialog, this.view());

			this.saveTemplateDialog = function() {
				return saveTemplateDialog;
			};
		}
	});

	/**
	 * Initializes buttons for template saving and management
	 *
	 * @return {void}
	 */
	Templates.prototype.initTemplateButtons = function() {
		var manageTemplatesBtn = this.byId("action::ManageTemplatesActionBtn");
		var saveTemplateBtn = this.byId("action::saveTemplateBtn");

		if (manageTemplatesBtn) {
			manageTemplatesBtn.bindProperty("visible", {
				path: "ui>/createMode"
			});
		}

		if (saveTemplateBtn) {
			saveTemplateBtn.bindProperty("visible", {
				path: "ui>/createMode"
			}).bindProperty("enabled", {
				path: "detailPage>/payReqType",
				formatter: this.formatter.saveTemplateBtnEnabled.bind(this.formatter)
			});
		}
	};

	/**
	 * Gets already existing Payment Request template names, which are read from the backend
	 *
	 * @return {Promise} Returns promise of reading template names
	 */
	Templates.prototype.openSaveTemplateDialog = function() {
		return new Promise(function(resolve) {
			this.getTemplateNames().then(function(templateNames) {
				this.saveTemplateDialog().showDialog(templateNames);
				resolve();
			}.bind(this));
		}.bind(this));
	};

	/**
	 * Gets already existing Payment Request template names, which are read from the backend
	 *
	 * @return {Promise} Returns promise of reading template names
	 */
	Templates.prototype.getTemplateNames = function() {
		var templateNames;

		return new Promise(function(resolve) {
			this.getModel().read("/C_PaymentRequestVariantVH", {
				success: function(data) {
					templateNames = data.results.map(function(result) {
						return result.PaymentRequestVariant;
					});
					resolve(templateNames);
				}
			});
		}.bind(this));
	};

	/**
	 * Shows Manage Templates Dialog
	 *
	 * @return {void}
	 */
	Templates.prototype.openManageTemplatesDialog = function() {
		this.manageTemplatesDialog().showDialog();
	};

	/**
	 * Loads template data
	 *
	 * @param {String} templateName - template name
	 *
	 * @return {Promise} Returns promise of reading template data
	 */
	Templates.prototype.loadTemplate = function(templateName) {
		var errorMessage = {
			text: "ERROR_VARIANT",
			args: [templateName]
		};

		return new Promise(function(resolve, reject) {
			this.getTemplate(templateName).then(function(data) {
				resolve(data);
			}).catch(function() {
				this.messages.addErrorMessage(this.resourceBundle().getText(errorMessage.text, errorMessage.args));
				reject();
			}.bind(this));
		}.bind(this));
	};

	/**
	 * Gets template from backend
	 *
	 * @param {String} templateName - template name
	 *
	 * @return {Promise} Returns promise of reading template data
	 */
	Templates.prototype.getTemplate = function(templateName) {
		return new Promise(function(resolve, reject) {
			this.getModel().read("/C_PaymentRequestVariantVH", {
				filters: [new Filter("PaymentRequestVariant", FilterOperator.EQ, templateName)],
				success: function(data) {
					if (data.results.length === 0) {
						reject();
					} else {
						data = data.results[0];
						this.modifyProperties(data);
						resolve(data);
					}
				}.bind(this),
				error: function(error) {
					reject();
				}
			});
		}.bind(this));
	};

	/**
	 * Modifies received properties, which differ from detail page properties
	 *
	 * @param {Object} data - received data
	 *
	 * @return {void}
	 */
	Templates.prototype.modifyProperties = function(data) {
		this.removeUnavailableProperties(data);
		this.renameProperties(data);
	};

	/**
	 * Removes properties, which are not a part of Object page fields, from data object
	 *
	 * @param {Object} data - received data
	 *
	 * @return {void}
	 */
	Templates.prototype.removeUnavailableProperties = function(data) {
		var unavailableProperties = [
			"__metadata",
			"PaymentRequestVariantText",
			"RcvgPaytBusPartnerCategory",
			"GLAccount",
			"PaymentRequestAmountInCCCrcy",
			"CompanyCodeCurrency"
		];

		unavailableProperties.forEach(function(property) {
			delete data[property];
		});
	};

	/**
	 * Renames properties, which keys are not same as the corresponding keys of 
	 * detail page properties
	 *
	 * @param {Object} data - received data
	 *
	 * @return {void}
	 */
	Templates.prototype.renameProperties = function(data) {
		var properties = [{
			original: "BankCountryKey",
			expected: "PayeeBankCountry"
		}, {
			original: "BankCountry",
			expected: "PayeeBankCountry"
		}, {
			original: "BankKey",
			expected: "PayeeBankInternalID"
		}, {
			original: "BankNumber",
			expected: "PayeeBank"
		}, {
			original: "BankAccount",
			expected: "PayeeBankAccount"
		}, {
			original: "BankControlKey",
			expected: "PayeeBankControlKey"
		}, {
			original: "RcvgPaytBusPartnerReference",
			expected: "Supplier"
		}, {
			original: "PartnerBankDetailKey",
			expected: "SupplierBankType"
		}, {
			original: "Currency",
			expected: "PaymentRequestCurrency"
		}, {
			original: "IBAN",
			expected: "PayeeIBAN"
		}];

		properties.forEach(function(property) {
			if (data.hasOwnProperty(property.original)) {
				data[property.expected] = data[property.original];
				delete data[property.original];
			}
		});
	};

	/**
	 * Converts IBAN to bank details data
	 *
	 * @param {String} IBANValue - IBAN field value
	 * 
	 * @return {Promise} Returns promise of reading bank details data
	 */
	Templates.prototype.convert2BankAcct = function(IBANValue) {
		return new Promise(function(resolve, reject) {
			this.getModel().callFunction("/convert2BankAcct", {
				urlParameters: {
					"IBAN": IBANValue
				},
				success: function(data) {
					this.modifyProperties(data);
					resolve(data);
				}.bind(this),
				error: function(error) {
					this.messages.addErrorMessage(error);
					reject();
				}.bind(this)
			});
		}.bind(this));
	};

	/**
	 * Converts bank details to IBAN data 
	 *
	 * @param {Object} properties - detail page data
	 * 
	 * @return {Promise} Returns promise of reading IBAN data
	 */
	Templates.prototype.convert2IBAN = function(properties) {
		return new Promise(function(resolve, reject) {
			this.getModel().callFunction("/convert2IBAN", {
				urlParameters: {
					"BankCountryKey": properties.PayeeBankCountry,
					"BankKey": properties.PayeeBankInternalID,
					"BankAccountNumber": properties.PayeeBankAccount,
					"BankControlKey": properties.PayeeBankControlKey || ""
				},
				success: function(data) {
					this.modifyProperties(data);
					resolve(data);
				}.bind(this),
				error: function(error) {
					this.messages.addErrorMessage(error);
					reject();
				}.bind(this)
			});
		}.bind(this));
	};

	/**
	 * Gets message popover button
	 *
	 * @return {sap.m.Button} Returns message button
	 */
	Templates.prototype.getMessageButton = function() {
		if (!this.messageButton) {
			this.messageButton = this.byId("messagePopoverButton");
		}

		return this.messageButton;
	};

	/**
	 * Wrapper for retrieving model by id
	 *
	 * @param {String} id - id of model
	 *
	 * @return {Object} View's model
	 */
	Templates.prototype.getModel = function(id) {
		return this.view().getModel(id);
	};

	/**
	 * Wrapper for retrieving reference object by id from view
	 *
	 * @param {String} id - id of requested element
	 *
	 * @return {Object} Null or reference to the element with requested id
	 */
	Templates.prototype.byId = function(id) {
		return this.view().byId(id);
	};

	/**
	 * Creates a new instance of the given class
	 *
	 * @param {Object} TypeConstructor - class constructor
	 *
	 * @return {Object} an instance of the TypeConstructor
	 */
	Templates.prototype.new = function(TypeConstructor) {
		return new(Function.prototype.bind.apply(TypeConstructor, arguments))();
	};

	return Templates;
});