/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters",
	"fin/ap/process/payments/ext/controller/FieldMapper",
	"sap/ui/comp/smartfield/SmartField",
	"sap/ui/comp/navpopover/SmartLink",
	"sap/m/Input",
	"sap/ui/model/Binding",
	"sap/uxap/ObjectPageSubSectionMode"
	/* eslint-disable max-params */
], function(
	Parent,
	Constants,
	Formatters,
	FieldMapper,
	SmartField,
	SmartLink,
	Input,
	Binding,
	SubSectionMode
) {
	/* eslint-enable "max-params" */
	"use strict";

	var Fields = Parent.extend("fin.ap.process.payments.ext.controller.Fields", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 * @param {fin.ap.process.payments.ext.controller.Templates} templates - object for handling temples
		 *
		 * @return {void}
		 */
		constructor: function(view, templates) {
			var fieldMapper = this.new(FieldMapper);

			this.formatter = Formatters;

			this.view = function() {
				return view;
			};

			this.templates = function() {
				return templates;
			};

			this.fieldMapper = function() {
				return fieldMapper;
			};
		}
	});

	/**
	 * Initilizes fields in section groups - editability, visibility, mandatory
	 *
	 * @returns {void}
	 */
	Fields.prototype.initFields = function() {
		// common initialization
		this.initAllFields();
		// amount fields contain currency fields, which need to be handled
		this.initAmountFields();
		// Accounting Document fields contain SmartLink, which needs to be adjusted
		this.initAccDocField();
		this.initClearingAccDocField();
		// set fields values to default after changing Payment Request Type in Create mode
		this.initPayReqTypeField();
		// set default value (current date) for date fields
		this.initDateFields();
		// IBAN/Payee Bank Details can be entered only in special case
		this.initIBANField();
		this.initBankFields();
		this.initBankDetailsFields();
		this.initTemplateField();
		this.initRepCodeField();
		this.initBankAccountField();
	};

	/**
	 * Binds 'visible' property of facets' forms according to the Edit and app mode
	 *
	 * @returns {void}
	 */
	Fields.prototype.initSections = function() {
		var form;
		var groupId;
		var groupName;

		this.getSections().forEach(function(section) {
			if (section.getId().indexOf("Section") > -1) {
				form = this.getSectionForm(section);
				groupId = form.getGroups()[0].getId();
				groupName = this.getGroupFromId(groupId);

				this.bindControlVisible(section, {
					name: groupName,
					formatter: this.fieldMapper().isGroupAvailable.bind(this.fieldMapper(), groupName)
				});
			}
		}.bind(this));
	};

	/**
	 * Expands or collapses all collapsible subsections
	 *
	 * @param {Boolean} expand - expand/collapse subsections
	 *
	 * @returns {void}
	 */
	Fields.prototype.expandSubSections = function(expand) {
		var mode = expand ? SubSectionMode.Expanded : SubSectionMode.Collapsed;
		// var mode = expand ? "Expanded" : "Collapsed";

		this.getSubSections().forEach(function(subsection) {
			if (subsection.getMoreBlocks().length > 0) {
				subsection.setMode(mode);
			}
		});
	};

	/**
	 * Gets all Detail page subsections in one flat array
	 *
	 * @return {Array} Returns subsections
	 */
	Fields.prototype.getSubSections = function() {
		var subsections = this.byId("objectPage").getSections().reduce(function(subsectionAcc, section) {
			// get only usable sections
			if (section.getId().indexOf("Section") > -1) {
				return subsectionAcc.concat(section.getSubSections());
			}

			return subsectionAcc;
		}, []);

		return subsections;
	};

	/**
	 * Gets Detail page Facet sections
	 *
	 * @return {Array} Returns sections
	 */
	Fields.prototype.getSections = function() {
		// get only usable sections
		var sections = this.byId("objectPage").getSections().filter(function(section) {
			return section.getId().indexOf("Section") > -1;
		});

		// remove first section (Payment Request Type, which has a specific behaviour)
		sections.shift();

		return sections;
	};

	/**
	 * Gets SmartForm from SmartTemplate section 
	 * (assuming that this Section contains one subsection, one block and one SmartForm)
	 *
	 * @param {sap.uxap.ObjectPageSection} section - section to get form from
	 *
	 * @return {sap.ui.comp.smartform.SmartForm} Returns SmartForm corresponding to the Section
	 */
	Fields.prototype.getSectionForm = function(section) {
		var subsection = section.getSubSections()[0];
		var block = subsection.getBlocks()[0];

		return block.getContent()[0];
	};

	/**
	 * Gets group from ElementGroup's id
	 *
	 * @param {String} id - group id (with view prefix)
	 *
	 * @return {String} Returns name of the group.
	 */
	Fields.prototype.getGroupFromId = function(id) {
		// remove view prefix
		var idWithoutPrefix = id.substring(id.indexOf("--") + 2);
		// remove the rest after group name
		var group = idWithoutPrefix.substr(0, idWithoutPrefix.indexOf("::"));

		return group;
	};

	/**
	 * Performs initialization common to all fields
	 *
	 * @return {void}
	 */
	Fields.prototype.initAllFields = function() {
		var smartField;

		this.fieldMapper().getFields().forEach(function(field) {
			smartField = this.getField(field.field, field.group);

			if (smartField instanceof SmartField) {
				this.bindControlMandatory(smartField, {
					name: field.field
				});
				this.bindControlVisible(smartField, {
					name: field.field
				});

				// changing the selected Payment Request or entering/leaving Edit mode fires 'initialise' event of fields,
				// so properties 'editable' and 'visible' are handled in handler for this event
				smartField.attachEvent("initialise", field.field, this.onFieldInitialise, this);
			}
		}.bind(this));
	};

	/**
	 * Handles 'initialise' event of SmartFields
	 *
	 * @param {sap.ui.base.Event} event - event object with new value
	 * @param {Stringd} fieldName - field name
	 *
	 * @return {void}
	 */
	Fields.prototype.onFieldInitialise = function(event, fieldName) {
		var field = event.getSource();

		this.setFieldEditable(field, fieldName);
		this.setFieldVisible(field);
	};

	/**
	 * Sets field's property 'visible'
	 *
	 * @param {sap.ui.comp.smartfield.SmartField} field - field SmartField control
	 *
	 * @return {void}
	 */
	Fields.prototype.setFieldVisible = function(field) {
		var visible = (field.getEditable() || field.getValue()) ? field.getVisible() : false;

		// the field retains it's visibility given by the formatter only if it's in Edit mode or has a value
		// otherwise it shall be hidden
		field.setVisible(visible);
	};

	/**
	 * Sets field's property 'editable' according to app, Edit and Create mode and field's editability
	 *
	 * @param {sap.ui.comp.smartfield.SmartField} field - field SmartField control
	 * @param {String} fieldName - field name
	 *
	 * @return {void}
	 */
	Fields.prototype.setFieldEditable = function(field, fieldName) {
		var data;
		var editable;
		var bindingContext = this.view().getBindingContext();

		if (bindingContext) {
			data = this.getModel().getData(bindingContext.getPath());

			if (data) {
				editable = this.fieldMapper().isFieldEditable(
					fieldName,
					this.getModel("btnModel").getProperty("/appMode"),
					this.getModel("detailPage").getProperty("/"));

				// due to asynchronous events and binding, we cannot tell which will be done first
				// set field property 'editable' for case when the change of bound properties has been already dealt with
				field.setEditable(editable);

				// bind field property 'editable' for future changes of bound properties
				this.bindControlEditable(field, {
					name: fieldName
				});
			}
		}
	};

	/**
	 * Initializes amount SmartFields
	 *
	 * @return {void}
	 */
	Fields.prototype.initAmountFields = function() {
		var smartField;

		this.fieldMapper().getAmountFields().forEach(function(field) {
			smartField = this.getField(field.field, field.group);

			if (smartField instanceof SmartField) {
				smartField.attachEvent("innerControlsCreated", field.currency, this.onAmountFieldControlsCreated, this);
			}
		}.bind(this));
	};

	/**
	 * Handles 'innerControlsCreated' event for amount SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with created controls
	 * @param {String} fieldName - name of the field
	 *
	 * @return {void}
	 */
	Fields.prototype.onAmountFieldControlsCreated = function(event, fieldName) {
		var controls = event.getParameters();
		var currencyField = controls[1].getParent();
		var field = this.fieldMapper().getField(fieldName);

		this.bindControlEditable(currencyField, {
			name: field.field
		});
		this.bindControlVisible(currencyField, {
			name: field.field
		});
	};

	/**
	 * Initializes Account Document SmartField
	 *
	 * @return {void}
	 */
	Fields.prototype.initAccDocField = function() {
		var field = this.fieldMapper().getAccDocField();
		var smartField = this.getField(field.field, field.group);

		if (smartField instanceof SmartField) {
			smartField.attachEvent("innerControlsCreated", this.onAccDocFieldControlsCreated, this);
		}
	};

	/**
	 * Initializes Clearing Account Document SmartField
	 *
	 * @return {void}
	 */
	Fields.prototype.initClearingAccDocField = function() {
		var field = this.fieldMapper().getClearingAccDocField();
		var smartField = this.getField(field.field, field.group);

		if (smartField instanceof SmartField) {
			smartField.attachEvent("innerControlsCreated", this.onClAccDocFieldControlsCreated, this);
		}
	};

	/**
	 * Handles 'innerControlsCreated' event for Accounting Document SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with created controls
	 *
	 * @return {void}
	 */
	Fields.prototype.onAccDocFieldControlsCreated = function(event) {
		var smartLink = event.getParameters()[0];

		if (smartLink instanceof SmartLink) {
			smartLink.attachEvent("beforePopoverOpens", this.onBeforePopoverOpens, this);
		}
	};

	/**
	 * Handles 'innerControlsCreated' event for Clearing Accounting Document SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with created controls
	 *
	 * @return {void}
	 */
	Fields.prototype.onClAccDocFieldControlsCreated = function(event) {
		var smartLink = event.getParameters()[0];
		var bindingContext = this.view().getBindingContext();
		var data;

		if ((smartLink instanceof SmartLink) && bindingContext) {

			data = this.getModel().getData(bindingContext.getPath());

			smartLink.setSemanticObject(data.IsReversed ? "" : "ClearingAccountingDocument");

			if (!data.IsReversed) {
				smartLink.attachEvent("beforePopoverOpens", this.onBeforePopoverOpens, this);
			}
		}
	};

	/**
	 * Handles 'beforePopoverOpens' event of Accounting Documnt smartlink
	 *
	 * @param {sap.ui.base.Event} event - event object with routing information
	 *
	 * @return {void}
	 */
	Fields.prototype.onBeforePopoverOpens = function(event) {
		var semanticAttributes = event.getParameter("semanticAttributesOfSemanticObjects");
		var parameters = event.getParameters();

		// do not send CreatedByUser to Accounting Document apps
		delete semanticAttributes.AccountingDocument.CreatedByUser;
		parameters.open();
	};

	/**
	 * Initializes Payment Request Type SmartField
	 *
	 * @return {void}
	 */
	Fields.prototype.initPayReqTypeField = function() {
		var field = this.fieldMapper().getPayReqTypeField();
		var smartField = this.getField(field.field, field.group);

		if (smartField instanceof SmartField) {
			smartField
				.bindProperty("mandatory", {
					path: "ui>/createMode"
				})
				.attachEvent("initialise", this.onPayReqFieldInitialise, this)
				.attachEvent("change", this.onPayReqTypeFieldChange, this);
		}
	};

	/**
	 * Handles 'initialise' event of Payment Request (Type and Variant) SmartFields
	 *
	 * @param {sap.ui.base.Event} event - event object with new value
	 *
	 * @return {void}
	 */
	Fields.prototype.onPayReqFieldInitialise = function(event) {
		var field = event.getSource();
		var editable = this.getModel("ui").getProperty("/createMode");

		field.setEditable(editable);

		field.bindProperty("editable", {
			path: "ui>/createMode"
		});
	};

	/**
	 * Handles 'change' event for Payment Request Type SmartField
	 *
	 * @return {void}
	 */
	Fields.prototype.onPayReqTypeFieldChange = function() {
		this.resetAllFields();
		this.expandSubSections(false);
		this.resetBankDetailsRBGroup();
	};

	/**
	 * Resets all SmartField values on Object page
	 *
	 * @return {void}
	 */
	Fields.prototype.resetBankDetailsRBGroup = function() {
		var model = this.getModel("detailPage");
		var data = $.extend({}, model.getData(), {
			bankEntryType: 0
		});

		model.setData(data);
	};

	/**
	 * Resets all SmartField values on Object page
	 *
	 * @return {void}
	 */
	Fields.prototype.resetAllFields = function() {
		this.resetFields(this.fieldMapper().getAllFields());
	};

	/**
	 * Resets bank details SmartField values
	 *
	 * @return {void}
	 */
	Fields.prototype.resetBankDetailsFields = function() {
		this.resetFields(this.fieldMapper().getBankDetailsFields());
	};

	/**
	 * Resets bank detail and IBAN SmartField values
	 *
	 * @return {void}
	 */
	Fields.prototype.resetIBANField = function() {
		this.resetFields([this.fieldMapper().getIBANField()]);
	};

	/**
	 * Initializes date SmartFields
	 *
	 * @return {void}
	 */
	Fields.prototype.initDateFields = function() {
		var smartField;
		var currentDate = new Date();

		this.fieldMapper().getDateFields().forEach(function(field) {
			smartField = this.getField(field.field, field.group);

			if (smartField instanceof SmartField) {
				smartField.attachEvent("innerControlsCreated", currentDate, this.onDateFieldControlsCreated, this);
			}
		}.bind(this));
	};

	/**
	 * Handles 'innerControlsCreated' event for date SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with created controls
	 * @param {Date} currentDate - current date
	 *
	 * @return {void}
	 */
	Fields.prototype.onDateFieldControlsCreated = function(event, currentDate) {
		var datePicker = event.getParameters()[0];

		if (datePicker instanceof sap.m.DatePicker && !datePicker.getDateValue()) {
			datePicker.setDateValue(currentDate);
		}
	};

	/**
	 * Initializes IBAN SmartField
	 *
	 * @return {void}
	 */
	Fields.prototype.initIBANField = function() {
		var formatter;
		var IBANField = this.fieldMapper().getIBANField();
		var IBANSmartField = this.getField(IBANField.field, IBANField.group);

		if (IBANSmartField instanceof SmartField) {
			formatter = this.formatter.IBANFieldEnabled.bind(this.formatter);

			IBANSmartField.bindProperty("enabled", {
				path: "detailPage>/bankEntryType",
				formatter: formatter
			});

			formatter = this.formatter.IBANFieldVisible.bind(this.formatter, IBANField.field, this.fieldMapper().isFieldVisible.bind(this.fieldMapper()));
			this.bindControlVisible(IBANSmartField, {
				name: IBANField.field,
				formatter: formatter
			});

			IBANSmartField.attachEvent("change", this.onIBANFieldChange, this);
		}
	};

	/**
	 * Handles 'change' event of IBAN SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with new value
	 *
	 * @return {void}
	 */
	Fields.prototype.onIBANFieldChange = function(event) {
		var IBANValue = event.getParameter("newValue");
		var isDisplayMode = this.getModel("detailPage").getProperty("/action") === Constants.PAY_REQUEST_ACTIONS.DISPLAY;

		if (IBANValue && !isDisplayMode) {
			this.applyBusy(this.loadBankDetails, IBANValue);
		} else {
			this.resetBankDetailsFields();
		}
	};

	/**
	 * Converts and sets bank details from IBAN value
	 *
	 * @param {String} IBANValue - new IBAN value
	 *
	 * @return {Promise} Returns promise of converting IBAN to bank details
	 */
	Fields.prototype.loadBankDetails = function(IBANValue) {
		return this.templates().convert2BankAcct(IBANValue).then(function(data) {
			this.setFields(this.fieldMapper().getBankDetailsFields(), data);
		}.bind(this)).catch(function() {
			// reset bank fields in case of an error
			this.resetBankDetailsFields();
		}.bind(this));
	};

	/**
	 * Sets values of fields
	 * - sets values to their corresponding Object page model properties
	 *
	 * @param {Array} fields - fields to be set
	 * @param {Object} data - new values
	 *
	 * @return {void}
	 */
	Fields.prototype.setFields = function(fields, data) {
		var path = this.view().getBindingContext().getPath();

		fields.forEach(function(field) {
			if (data.hasOwnProperty(field.field)) {
				this.getModel().setProperty(path + "/" + field.field, data[field.field]);
			}
		}.bind(this));
	};

	/**
	 * Resets values of fields
	 * - sets their Object page model properties to default (empty) values
	 *
	 * @param {Array} fields - fields to be reset
	 *
	 * @return {void}
	 */
	Fields.prototype.resetFields = function(fields) {
		var path = this.view().getBindingContext().getPath();
		var emptyValue;

		fields.forEach(function(field) {
			emptyValue = this.getEmptyValue(field.field);

			if (emptyValue !== null) {
				this.getModel().setProperty(path + "/" + field.field, emptyValue);
			}
		}.bind(this));
	};

	/**
	 * Gets a default empty value corresponding to the field type
	 * - date - current date
	 * - amount - "0.0"
	 * - boolean - false
	 * - others - ""
	 * with the exception of Payment Request Type, it returns null
	 * 
	 * @param {Array} fields - fields to be reset
	 *
	 * @return {Any} Returns a default empty value
	 */
	Fields.prototype.getEmptyValue = function(field) {
		var isAmountProperty;
		var isDateProperty;
		var isBoolProperty;
		var isPayReqTypeProperty;
		var currentDate = new Date();

		isAmountProperty = this.fieldMapper().getAmountFields().some(function(amountProperty) {
			return amountProperty.field === field;
		});
		isDateProperty = this.fieldMapper().getDateFields().some(function(dateProperty) {
			return dateProperty.field === field;
		});
		isBoolProperty = this.fieldMapper().getBoolFields().some(function(boolProperty) {
			return boolProperty.field === field;
		});
		isPayReqTypeProperty = this.fieldMapper().getPayReqTypeField().field === field;

		if (isDateProperty) {
			return currentDate;
		} else if (isAmountProperty) {
			return "0.0";
		} else if (isBoolProperty) {
			return false;
		} else if (isPayReqTypeProperty) {
			// in case of Payment Request Type do not change -> return null
			return null;
		} else {
			return "";
		}
	};

	/**
	 * Initializes Payee bank SmartFields
	 *
	 * @return {void}
	 */
	Fields.prototype.initBankFields = function() {
		var formatter;
		var bankSmartField;
		var bankFields = this.fieldMapper().getBankDetailsFields();

		bankFields.forEach(function(bankField) {
			bankSmartField = this.getField(bankField.field, bankField.group);

			if (bankSmartField instanceof SmartField) {
				formatter = this.formatter.bankFieldEnabled.bind(this.formatter);

				bankSmartField.bindProperty("enabled", {
					path: "detailPage>/bankEntryType",
					formatter: formatter
				});

				formatter = this.formatter.bankFieldVisible.bind(this.formatter, bankField.field, this.fieldMapper().isFieldVisible.bind(this.fieldMapper()));
				this.bindControlVisible(bankSmartField, {
					name: bankField.field,
					formatter: formatter
				});
			}
		}.bind(this));
	};

	/**
	 * Initializes Payee bank details SmartFields
	 *
	 * @return {void}
	 */
	Fields.prototype.initBankDetailsFields = function() {
		this.bindingBankDetails = this.getModel("detailPage").bindProperty("/bankDetails");
		this.bindingBankDetails.attachChange(this.onBankDetailsBindingChange, this);
	};

	/**
	 * Handles 'change' event for binding of bank details properties
	 *
	 * @return {void}
	 */
	Fields.prototype.onBankDetailsBindingChange = function() {
		var checkedData;
		var model = this.getModel("detailPage");
		var isBankEntryType = model.getProperty("/bankEntryType") === 0;
		var isDisplayMode = model.getProperty("/action") === Constants.PAY_REQUEST_ACTIONS.DISPLAY;

		// IBAN should be loaded/reset only in bank entry type mode
		if (isBankEntryType && !isDisplayMode) {
			checkedData = this.checkBankDetailsFields();

			// IBAN should be loaded only if all mandatory fields are filled
			if (checkedData) {
				this.applyBusy(this.loadIBAN, checkedData);
			} else {
				this.resetIBANField();
			}
		}
	};

	/**
	 * Checks whether are all mandatory bank details fields filled
	 *
	 * @return {Object|null} Returns Object page properties in case all mandatory fields are filled
	 */
	Fields.prototype.checkBankDetailsFields = function() {
		var properties = this.getModel("detailPage").getProperty("/bankDetails");
		var fieldsAreFilled = this.fieldMapper().getBankDetailsMandatoryFields().every(function(bankField) {
			return properties.hasOwnProperty(bankField.field) && properties[bankField.field];
		});

		return fieldsAreFilled ? properties : null;
	};

	/**
	 * Converts and sets IBAN value from bank details
	 *
	 * @param {String} checkedData - model properties with filled mandatory bank details fields
	 *
	 * @return {Promise} Returns promise of converting bank details to IBAN
	 */
	Fields.prototype.loadIBAN = function(checkedData) {
		return this.templates().convert2IBAN(checkedData).then(function(data) {
			this.setFields([this.fieldMapper().getIBANField()], data);
		}.bind(this));
	};

	/**
	 * Busy indicator for a Promise methods
	 *
	 * @param {Function} method - method to be wrapped
	 * @param {...*} params - method parameters
	 *
	 * @return {Promise} Returns promise of applying passed method
	 */
	Fields.prototype.applyBusy = function(method) {
		var params;

		if (method instanceof Function) {
			params = Array.prototype.slice.call(arguments, 1);

			this.view().setBusy(true);

			return method.apply(this, params).then(function() {
				// do nothing if succeeds
			}).catch(function() {
				// do nothing if fails
			}).then(function() {
				// always turn off busy state
				this.view().setBusy(false);
			}.bind(this));
		}

		return Promise.reject();
	};

	/**
	 * Initializes template field
	 *
	 * @return {void}
	 */
	Fields.prototype.initTemplateField = function() {
		var field = this.fieldMapper().getPayReqVariantField();
		var smartField = this.getField(field.field, field.group);

		if (smartField instanceof SmartField) {
			smartField
				.bindProperty("visible", {
					path: "ui>/createMode"
				})
				.bindProperty("editable", {
					path: "ui>/createMode"
				})
				.attachEvent("initialise", this.onPayReqFieldInitialise, this)
				.attachChange(this.onTemplateFieldChange, this);
		}
	};

	/**
	 * Handles 'change' event of Payment Request Variant SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with new value
	 *
	 * @return {void}
	 */
	Fields.prototype.onTemplateFieldChange = function(event) {
		var path;
		var dataPreloaded;
		var templateName = event.getParameter("newValue");

		this.resetAllFields();

		if (templateName) {
			path = "C_PaymentRequestVariantVH('" + encodeURIComponent(templateName) + "')";

			dataPreloaded = this.setTemplatePreloadedData(path);

			if (!dataPreloaded) {
				this.applyBusy(this.loadTemplate, templateName);
			}
		}
	};

	/**
	 * Sets preloaded template data
	 *
	 * @param {String} path - path to template data
	 *
	 * @return {Boolean} Returns whether the preloaded data has been found
	 */
	Fields.prototype.setTemplatePreloadedData = function(path) {
		var templateData;
		var data = this.getModel().getProperty("/");

		Object.keys(data).forEach(function(key) {
			if (key === path) {
				templateData = data[key];

				this.templates().modifyProperties(templateData);
				this.setFields(this.fieldMapper().getAllFields(), templateData);
			}
		}, this);

		return !!templateData;
	};

	/**
	 * Loads template data
	 *
	 * @param {String} templateName - template name
	 *
	 * @return {Promise} Returns promise of reading template data
	 */
	Fields.prototype.loadTemplate = function(templateName) {
		return this.templates().loadTemplate(templateName).then(function(data) {
			this.setFields(this.fieldMapper().getAllFields(), data);
		}.bind(this));
	};

	/**
	 * Initializes Repetitive Code field
	 *
	 * @return {void}
	 */
	Fields.prototype.initRepCodeField = function() {
		var field = this.fieldMapper().getRepCodeField();
		var smartField = this.getField(field.field, field.group);

		if (smartField instanceof SmartField) {
			smartField.attachInnerControlsCreated(this.onRepCodeFieldControlsCreated, this)
				.attachChange(this.onRepCodeChange, this);
		}
	};

	/**
	 * Handles 'innerControlsCreated' event for Repetitive Code SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with created controls
	 *
	 * @return {void}
	 */
	Fields.prototype.onRepCodeFieldControlsCreated = function(event) {
		var input = event.getParameters()[0];

		if (input instanceof Input) {
			input.setValueHelpOnly(true);
		}
	};

	/**
	 * Handles 'change' event for Repetitive Code SmartField
	 *
	 * @param {sap.ui.base.Event} event - event object with created controls
	 *
	 * @return {void}
	 */
	Fields.prototype.onRepCodeChange = function(event) {
		var newValue = event.getParameter("newValue");

		this.loadRepCodeData(newValue);
	};

	/**
	 * Loads Repetitive Code's data
	 *
	 * @param {String} repCode - value of Repetitive Code
	 *
	 * @return {void}
	 */
	Fields.prototype.loadRepCodeData = function(repCode) {
		var repCodeData;
		var regExp = new RegExp("C_RepetitiveCodeVH.*RepetitiveCode='" + encodeURIComponent(repCode) + "'");
		var data = this.getModel().getProperty("/");

		Object.keys(data).forEach(function(key) {
			if (key.match(regExp)) {
				repCodeData = data[key];
			}
		});

		if (repCodeData) {
			this.resetAllFields();
			this.templates().modifyProperties(repCodeData);
			this.setFields(this.fieldMapper().getAllFields(), repCodeData);
		}
	};

	/**
	 * Initializes Payee Bank Account field
	 *
	 * @return {void}
	 */
	Fields.prototype.initBankAccountField = function() {
		var field = this.fieldMapper().getBankAccountField();
		var smartField = this.getField(field.field, field.group);

		if (smartField instanceof SmartField) {
			this.bindControlVisible(smartField, {
				name: field.field,
				formatter: this.formatter.bankAccFieldVisible.bind(this.formatter, field.field, this.fieldMapper().isFieldVisible.bind(this.fieldMapper()))
			});
		}
	};

	/**
	 * Binds given property of control according to the state of app mode, edit mode, create mode
	 * and Payment Request Type
	 *
	 * @param {sap.ui.core.Control} control - SmartField or GroupElement (wrapping of SmartLink) to have property bound
	 * @param {String} property - name of the property to be bound
	 * @param {Function} formatter - formatter method
	 * @param {Array} [additionalPaths] - additional paths
	 *
	 * @returns {void}
	 */
	Fields.prototype.bindControlProperty = function(control, property, formatter, additionalPaths) {
		var parts = [{
			path: "btnModel>/appMode"
		}, {
			path: "detailPage>/"
		}];

		if (Array.isArray(additionalPaths)) {
			parts = parts.concat(additionalPaths.map(function(path) {
				return {
					path: path
				};
			}));
		}

		control.bindProperty(property, {
			parts: parts,
			formatter: formatter
		});
	};

	/**
	 * Binds visibilit of the control
	 *
	 * @param {sap.ui.core.Control} control - SmartField or GroupElement (wrapping of SmartLink) to have property bound
	 * @param {Object} parameters - parameters for binding
	 * @param {String} parameters.formatter - formatter function specific for the property
	 * @param {String} parameters.name - name of the field/group
	 *
	 * @returns {void}
	 */
	Fields.prototype.bindControlVisible = function(control, parameters) {
		this.bindControlProperty(control, "visible", parameters.formatter || this.fieldMapper().isFieldVisible.bind(this.fieldMapper(),
			parameters.name), [parameters.name]);
	};

	/**
	 * Binds mandatory of the control
	 *
	 * @param {sap.ui.core.Control} control - SmartField or GroupElement (wrapping of SmartLink) to have property bound
	 * @param {Object} parameters - parameters for binding
	 * @param {String} parameters.formatter - formatter function specific for the property
	 * @param {String} parameters.name - name of the field/group
	 *
	 * @returns {void}
	 */
	Fields.prototype.bindControlMandatory = function(control, parameters) {
		this.bindControlProperty(control, "mandatory", parameters.formatter || this.fieldMapper().isFieldMandatory.bind(this.fieldMapper(),
			parameters.name));
	};

	/**
	 * Binds editability of the control
	 *
	 * @param {sap.ui.core.Control} control - SmartField or GroupElement (wrapping of SmartLink) to have property bound
	 * @param {Object} parameters - parameters for binding
	 * @param {String} parameters.formatter - formatter function specific for the property
	 * @param {String} parameters.name - name of the field/group
	 *
	 * @returns {void}
	 */
	Fields.prototype.bindControlEditable = function(control, parameters) {
		this.bindControlProperty(control, "editable", parameters.formatter || this.fieldMapper().isFieldEditable.bind(this.fieldMapper(),
			parameters.name));
	};

	/**
	 * Wrapper for retrieving model by id
	 *
	 * @param {String} id - id of model
	 *
	 * @return {Object} View's model
	 */
	Fields.prototype.getModel = function(id) {
		return this.view().getModel(id);
	};

	/**
	 * Wrapper for retrieving reference object by id from view
	 *
	 * @param {String} id - id of requested element
	 *
	 * @return {Object} Null or reference to the element with requested id
	 */
	Fields.prototype.byId = function(id) {
		return this.view().byId(id);
	};

	/**
	 * Wrapper for retrieving reference object by field name and group name
	 *
	 * @param {String} fieldName - field name
	 * @param {String} groupName - group name
	 * @param {String} [suffix] - id suffix
	 *
	 * @return {Object} Null or reference to the requested element
	 */
	Fields.prototype.getField = function(fieldName, groupName, suffix) {
		return this.byId(groupName + "::" + fieldName + "::Field" + (suffix || ""));
	};

	/**
	 * Creates a new instance of the given class
	 *
	 * @param {Object} TypeConstructor - class constructor
	 *
	 * @return {Object} an instance of the TypeConstructor
	 */
	Fields.prototype.new = function(TypeConstructor) {
		return new(Function.prototype.bind.apply(TypeConstructor, arguments))();
	};

	return Fields;
});