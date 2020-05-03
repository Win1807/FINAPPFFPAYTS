/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/lib/FieldMatrix"
], function(
	Parent,
	FieldMatrix
) {
	"use strict";

	var FieldMapper = Parent.extend("fin.ap.process.payments.ext.controller.FieldMapper", {
		/**
		 * Constructor
		 *
		 * @return {void}
		 */
		constructor: function() {

			this.fields = function() {
				return FieldMatrix.FIELDS;
			};
		}
	});

	/**
	 * Simple getter of mapped fields
	 *
	 * @return {Object} - fields structure
	 */
	FieldMapper.prototype.getAllFields = function() {
		return this.fields();
	};

	/**
	 * Getter of mapped fields without Payment Request Type field
	 *
	 * @return {Object} - fields structure
	 */
	FieldMapper.prototype.getFields = function() {
		// copy fields array by value
		var fields = this.fields().slice();

		// remove first two fields (Payment Request Type and Variant)
		fields.splice(0, 2);

		return fields;
	};

	/**
	 * Getter of mapped date fields
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getDateFields = function() {
		var fields = this.fields().filter(function(item) {
			return item.date;
		});

		return fields.length > 0 ? fields : null;
	};

	/**
	 * Getter of mapped amount fields
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getAmountFields = function() {
		var fields = this.fields().filter(function(item) {
			return item.currency;
		});

		return fields.length > 0 ? fields : null;
	};

	/**
	 * Getter of mapped mandatory Payee Bank Details fields
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getBankDetailsMandatoryFields = function() {
		var fields = [
			this.getField("PayeeBankCountry"),
			this.getField("PayeeBankInternalID"),
			this.getField("PayeeBankAccount")
		];

		return fields.length > 0 ? fields : null;
	};

	/**
	 * Getter of mapped optional Payee Bank Details fields
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getBankDetailsOptionalFields = function() {
		var fields = [
			this.getField("PayeeBankControlKey"),
			this.getField("PayeeBank"),
			this.getField("BankDetailReference")
		];

		return fields.length > 0 ? fields : null;
	};

	/**
	 * Getter of mapped Payee Bank Details fields
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getBankDetailsFields = function() {
		var mandatory = this.getBankDetailsMandatoryFields();
		var optional = this.getBankDetailsOptionalFields();

		return (mandatory && optional) ? mandatory.concat(optional) : null;
	};

	/**
	 * Getter of mapped Payee Bank fields
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getBoolFields = function() {
		var fields = [
			this.getField("IsSinglePayment"),
			this.getField("IsUrgentPayment")
		];

		return fields.length > 0 ? fields : null;
	};

	/**
	 * Getter of Payment Request Type field
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getPayReqTypeField = function() {
		return this.getField("PaymentRequestType");
	};

	/**
	 * Getter of Payment Request Variant field
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getPayReqVariantField = function() {
		return this.getField("PaymentRequestVariant");
	};

	/**
	 * Getter of RepetitiveCode field
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getRepCodeField = function() {
		return this.getField("RepetitiveCode");
	};

	/**
	 * Getter of IBAN field
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getIBANField = function() {
		return this.getField("PayeeIBAN");
	};

	/**
	 * Getter of Accounting Document field
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getAccDocField = function() {
		return this.getField("AccountingDocument");
	};

	/**
	 * Getter of Clearing Accounting Document field
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getClearingAccDocField = function() {
		return this.getField("ClearingAccountingDocument");
	};

	/**
	 * Getter of Payee Bank Account field
	 *
	 * @return {Object} - date fields structure
	 */
	FieldMapper.prototype.getBankAccountField = function() {
		return this.getField("PayeeBankAccount");
	};

	/**
	 * Returns details of field by name
	 *
	 * @param {String} fieldName - name of the field
	 *
	 * @return {Object|null} - fields structure
	 */
	FieldMapper.prototype.getField = function(fieldName) {
		return this.getFieldDetails(fieldName, this.fields());
	};

	/**
	 * Returns details of single field from input fields by its name
	 *
	 * @param {String} fieldName - name of the field
	 * @param {Array} fields - input fields
	 *
	 * @return {Object|null} - fields structure
	 */
	FieldMapper.prototype.getFieldDetails = function(fieldName, fields) {
		var field = fields.filter(function(item) {
			return item.field === fieldName;
		});

		return field.length > 0 ? field[0] : null;
	};

	/**
	 * Returns details of fields belonging to the given group
	 *
	 * @param {String} groupName - name of the group
	 *
	 * @return {Array|null} - group of fields structures
	 */
	FieldMapper.prototype.getFieldsByGroup = function(groupName) {
		var fields = this.fields().filter(function(item) {
			return item.group === groupName;
		});

		return fields.length > 0 ? fields : null;
	};

	/**
	 * Returns properties of field
	 *
	 * @param {String} fieldName - name of the field
	 * @param {String} appMode - mode of application [request|process]
	 * @param {Object} settings - detail page settings
	 *
	 * @return {Object} - properties of filed
	 */
	FieldMapper.prototype.getProperties = function(fieldName, appMode, settings) {
		var parsedSettings = this.parseSettings({
			fieldName: fieldName,
			appMode: appMode,
			action: settings.action,
			mode: settings.mode
		});
		var valid = Object.keys(parsedSettings).length > 0;

		return valid ? this.returnProperties(parsedSettings) : false;
	};

	/**
	 * Returns parsed settings
	 *
	 * @param {Object} settings - detail page settings
	 *
	 * @return {Object} - if valid object with parsed settings, otherwise an empty object 
	 */
	FieldMapper.prototype.parseSettings = function(settings) {
		var valid = Object.keys(settings).every(function(key) {
			return settings[key];
		});

		return valid ? {
			field: this.getField(settings.fieldName),
			parsedAppMode: "appMode" + settings.appMode.charAt(0).toUpperCase() + settings.appMode.slice(1),
			parsedAction: "action" + settings.action.charAt(0).toUpperCase() + settings.action.slice(1),
			mode: settings.mode
		} : {};
	};

	/**
	 * Returns properties of field
	 *
	 * @param {Object} settings - detail page parsed settings
	 *
	 * @return {Object} - properties of filed
	 */
	FieldMapper.prototype.returnProperties = function(settings) {
		return settings.field[settings.parsedAppMode][settings.parsedAction][settings.mode].properties;
	};

	/**
	 * Returns true if field is editable on detail page
	 *
	 * @param {String} fieldName - name of the field
	 * @param {String} appMode - mode of application [request|process]
	 * @param {Object} settings - detail page settings
	 *
	 * @return {Boolean} - true if editable
	 */
	FieldMapper.prototype.isFieldEditable = function(fieldName, appMode, settings) {
		var properties = this.getProperties(fieldName, appMode, settings);

		return properties ? properties.editable : false;
	};

	/**
	 * Returns true if field is available on detail page
	 *
	 * @param {String} fieldName - name of the field
	 * @param {String} appMode - mode of application [request|process]
	 * @param {Object} settings - detail page settings
	 *
	 * @return {Boolean} - true if available
	 */
	FieldMapper.prototype.isFieldAvailable = function(fieldName, appMode, settings) {
		var properties = this.getProperties(fieldName, appMode, settings);

		return properties ? properties.available : false;
	};

	/**
	 * Returns true if field is visible on detail page
	 *
	 * @param {String} fieldName - name of the field
	 * @param {String} appMode - mode of application [request|process]
	 * @param {Object} settings - detail page settings
	 * @param {String} value - field value
	 *
	 * @return {Boolean} - true if visible
	 */
	FieldMapper.prototype.isFieldVisible = function(fieldName, appMode, settings, value) {
		var isEmpty = !value || value === "0.0";
		var properties = this.getProperties(fieldName, appMode, settings);

		return properties ? (properties.editable || (properties.available && !isEmpty)) : false;
	};

	/**
	 * Returns true if field is mandatory on detail page
	 *
	 * @param {String} fieldName - name of the field
	 * @param {String} appMode - mode of application [request|process]
	 * @param {Object} settings - detail page settings
	 *
	 * @return {Boolean} - true if mandatory
	 */
	FieldMapper.prototype.isFieldMandatory = function(fieldName, appMode, settings) {
		var properties = this.getProperties(fieldName, appMode, settings);

		return properties ? properties.mandatory : false;
	};

	/**
	 * Returns true if field is available on detail page
	 *
	 * @param {String} groupName - name of the group
	 * @param {String} appMode - mode of application [request|process]
	 * @param {Object} settings - detail page settings
	 *
	 * @return {Boolean} - true if available
	 */
	FieldMapper.prototype.isGroupAvailable = function(groupName, appMode, settings) {
		return this.getFieldsByGroup(groupName).some(function(item) {
			return this.isFieldAvailable(item.field, appMode, settings);
		}.bind(this));
	};

	return FieldMapper;
});