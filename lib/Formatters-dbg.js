/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"fin/ap/process/payments/lib/Constants"
], function(Constants) {
	"use strict";

	return {
		/**
		 * Checks whether the value is truthy
		 *
		 * @param {Any} value - 
		 *
		 * @return {Boolean} - Returns whether input value is truthy
		 */
		hasValue: function(value) {
			return !!value;
		},

		/**
		 * Returns string without "0" on beginning
		 *
		 * @param {String} str - string that could have leading zeros
		 *
		 * @return {String} - string without leading zeros
		 */
		removeLeadingZeros: function(str) {
			if (typeof str === "string") {
				return str.replace(/^0+/, "");
			} else {
				return str;
			}
		},

		/**
		 * Checks whether the input value starts with "<IBAN>" substring
		 *
		 * @param {String} value - string that could have IBAN prefix
		 *
		 * @return {Boolean} - true if string starts with IBAN prefix
		 */
		hasIBANPrefix: function(value) {
			return value && value.indexOf("<IBAN>") === 0;
		},

		/**
		 * Checks whether the Payee Bank Account field should be hidden
		 * (in case of Customer/Supplier Payment Request Type and if
		 * contains <IBAN> prefix)
		 *
		 * @param {String} value - string that could have IBAN prefix
		 * @param {String} payReqType - Payment Request Type
		 *
		 * @return {Boolean} - true if not FFP Payment Request Type and starts with IBAN prefix
		 */
		hideBankAccField: function(value, payReqType) {
			var isFFP = payReqType === Constants.PAYMENT_REQUEST_TYPES[0].name;

			return !isFFP && this.hasIBANPrefix(value);
		},

		/**
		 * Gets count of error messages
		 *
		 * @param {Array} messages - error messages
		 *
		 * @return {Boolean} Returns messages count
		 */
		getMessagesCount: function(messages) {
			return messages.length;
		},

		/**
		 * Checks whether there are any error messages
		 *
		 * @param {Array} messages - error messages
		 *
		 * @return {Boolean} Returns whether there are any messages
		 */
		hasMessages: function(messages) {
			return messages.length > 0;
		},

		/**
		 * Checks whether footer should be visible
		 *
		 * @param {String} status - status of payment
		 * @param {Array} messages - error messages
		 * @param {Boolean} isEditable - is edit mode
		 *
		 * @return {Boolean} Returns whether footer should be visible
		 */
		footerVisible: function(status, messages, isEditable) {
			return this.hasMessages(messages) || this.isActionEnabled(this.getAnyActionStatuses(), status) || isEditable;
		},

		/**
		 * Checks whether Save Template button should be enabled
		 *
		 * @param {String} paymentRequestType - value of Payment Request Type
		 *
		 * @return {Boolean} Returns whether the button should be enabled
		 */
		saveTemplateBtnEnabled: function(paymentRequestType) {
			return !!paymentRequestType;
		},

		/**
		 * Checks whether IBAN field should be currently visible
		 *
		 * @param {String} fieldName - fieldName of the control
		 * @param {Function} isVisible - method to check control's availability
		 * @param {String} appMode - app mode
		 * @param {Object} settings - detail page settings
		 * @param {String} value - field value
		 *
		 * @return {Boolean} Returns whether the IBAN field should be editable
		 */
		IBANFieldVisible: function(fieldName, isVisible, appMode, settings, value) {
			return this.bankEntryTypeFieldVisible(fieldName, isVisible, appMode, settings, value, this.IBANFieldEnabled);
		},

		/**
		 * Checks whether bank field should be currently visible
		 *
		 * @param {String} fieldName - fieldName of the control
		 * @param {Function} isVisible - method to check control's visibility
		 * @param {String} appMode - app mode
		 * @param {Object} settings - detail page settings
		 * @param {String} value - field value
		 *
		 * @return {Boolean} Returns whether the bank field should be visible
		 */
		bankFieldVisible: function(fieldName, isVisible, appMode, settings, value) {
			return this.bankEntryTypeFieldVisible(fieldName, isVisible, appMode, settings, value, this.bankFieldEnabled);
		},

		/**
		 * Checks whether Payee Bank Account field should be currently visible
		 *
		 * @param {String} fieldName - fieldName of the control
		 * @param {Function} isVisible - method to check control's visibility
		 * @param {String} appMode - app mode
		 * @param {Object} settings - detail page settings
		 * @param {String} value - field value
		 *
		 * @return {Boolean} Returns whether Payee Bank Account field should be visible
		 */
		bankAccFieldVisible: function(fieldName, isVisible, appMode, settings, value) {
			return this.bankFieldVisible(fieldName, isVisible, appMode, settings, value, this.bankFieldEnabled) && !this.hideBankAccField(
				value, settings.payReqType);
		},

		/**
		 * Checks whether the field dependant on bank entry type should be currently visible
		 *
		 * @param {String} fieldName - fieldName of the control
		 * @param {Function} isVisible - method to check control's visibility
		 * @param {String} appMode - app mode
		 * @param {Object} settings - detail page settings
		 * @param {String} value - field value
		 * @param {Function} isEnabled - method to check control's inability
		 *
		 * @return {Boolean} Returns whether the bank field should be visible
		 */
		bankEntryTypeFieldVisible: function(fieldName, isVisible, appMode, settings, value, isEnabled) {
			var isBankEntryTypeSelection = this.isBankRadioButtonsVisible(appMode, settings);
			var isEmpty;

			// in case of bank entry type selection
			if (isBankEntryTypeSelection) {
				isEmpty = !value || value === "0.0";
				// if the field is enabled, it must be visible
				// otherwise it depends on whether it has a value
				return isEnabled(settings.bankEntryType) ? true : !isEmpty;
			}

			// in case of bank entry type not being selected, behave according to the FieldMapper and FieldMatrix
			return isVisible(fieldName, appMode, settings, value);
		},

		/**
		 * Checks whether IBAN field should be currently enabled
		 *
		 * @param {Number} bankEntryType - type of bank entry (bank details/IBAN)
		 *
		 * @return {Boolean} Returns whether IBAN field should be enabled
		 */
		IBANFieldEnabled: function(bankEntryType) {
			return bankEntryType === 1;
		},

		/**
		 * Checks whether payee bank details field should be currently enabled
		 *
		 * @param {Number} bankEntryType - type of bank entry (bank details/IBAN)
		 *
		 * @return {Boolean} Returns whether payee bank detailsfield should be enabled
		 */
		bankFieldEnabled: function(bankEntryType) {
			return bankEntryType === 0;
		},

		/**
		 * Checks whether payment operation is available
		 *
		 * @param {Array} statuses - set of possible actions
		 * @param {String} statusCode - status code of payment
		 * @param {Boolean} isEditable - is edit mode
		 *
		 * @return {Boolean} Returns whether payment action is available
		 */
		isPaymentActionEnabled: function(statuses, statusCode, isEditable) {
			return !isEditable && this.isActionEnabled(statuses, statusCode);
		},

		/**
		 * Checks whether action is available
		 *
		 * @param {Array} statuses - set of possible actions
		 * @param {String} statusCode - status code of payment
		 *
		 * @return {Boolean} Returns whether payment action is available
		 */
		isActionEnabled: function(statuses, statusCode) {
			return statuses.some(function(status) {
				return this.getStatusCode(status) === statusCode;
			}.bind(this));
		},

		/**
		 * Gets statuses in which is any action possible
		 *
		 * @returns {Array} Returns an array of all statuses in which any action is possible
		 */
		getAnyActionStatuses: function() {
			return Constants.RELEASE_STATUSES.concat(Constants.REVERSE_STATUSES, Constants.EDIT_STATUSES).filter(function(item, index, self) {
				return index === self.indexOf(item);
			});
		},

		/**
		 * Formats Reversal Reason string
		 *
		 * @param {String} reason - Reversal Reason ID
		 * @param {String} reasonName - Reversal Reason name
		 *
		 * @return {String} Returns formatted Reversal Reason string
		 */
		formatReason: function(reason, reasonName) {
			return reason + " (" + reasonName + ")";
		},

		/**
		 * Formats Reversal Reason date to ISO string
		 *
		 * @param {Date} date - Reversal Reason date
		 *
		 * @return {String} Returns formatted Reversal Reason string
		 */
		formatDate: function(date) {
			var dateUTC;

			if (date instanceof Date === false) {
				return null;
			}

			// firstly get exact number of ms since universal time
			dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

			// finally convert to ISO string
			return dateUTC.toISOString();
		},

		/**
		 * Gets status code according to status name
		 *
		 * @param {String} name - status name
		 *
		 * @return {String} Returns status code
		 */
		getStatusCode: function(name) {
			var statusObject = Constants.STATUSES.filter(function(status) {
				return status.name === name;
			})[0];

			return statusObject.hasOwnProperty("name") ? statusObject.code : null;
		},

		/**
		 * Returns true if duplicate check button should be visible according to the params
		 *
		 * @param {Boolean} createMode - is create mode active
		 * @param {Boolean} editMode - is edit mode active
		 * @param {Boolean} isDetailPage - is detail page opened
		 *
		 * @return {Boolean} - true if button should be visible
		 */
		isDuplicateCheckBtnVisible: function(createMode, editMode, isDetailPage) {
			return !createMode && !editMode && isDetailPage;
		},

		/**
		 * Returns true if copy button should be visible according to the params
		 *
		 * @param {Boolean} createMode - is create mode active
		 * @param {Boolean} editMode - is edit mode active
		 * @param {Boolean} isDetailPage - is detail page opened
		 *
		 * @return {Boolean} - true if button should be visible
		 */
		isCopyBtnVisible: function(createMode, editMode, isDetailPage) {
			return !createMode && !editMode && isDetailPage;
		},

		/**
		 * Returns true if payee bank radio buttons should be visible according to the params
		 *
		 * @param {String} appMode - app mode
		 * @param {Object} settings - detail page settings
		 *
		 * @return {Boolean} - true if radio buttons should be visible
		 */
		isBankRadioButtonsVisible: function(appMode, settings) {
			var isFFP = settings.mode === Constants.PAYMENT_REQUEST_TYPES[0].name;
			var createMode = settings.action === Constants.PAY_REQUEST_ACTIONS.CREATE;
			var myEditMode = settings.action === Constants.PAY_REQUEST_ACTIONS.EDIT && appMode === Constants.APP_MODES[1].appMode;

			return isFFP && (createMode || myEditMode);
		}
	};
});