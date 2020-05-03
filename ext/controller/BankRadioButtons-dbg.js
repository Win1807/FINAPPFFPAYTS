/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/lib/Formatters",
	"sap/ui/Global",
	"jquery.sap.global"
], function(
	Parent,
	Formatters,
	UI,
	$
) {
	"use strict";

	var BankRadioButtons = Parent.extend("fin.ap.process.payments.ext.controller.BankRadioButtons", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 *
		 * @return {void}
		 */
		constructor: function(view) {
			var fragment;

			this.formatter = Formatters;

			this.view = function() {
				return view;
			};

			fragment = UI.xmlfragment(this.view().getId(), "fin.ap.process.payments.ext.fragment.BankRadioButtons", this);

			this.fragment = function() {
				return fragment;
			};
		}
	});

	/**
	 * Inserts fragment with IBAN radio buttons into the view
	 *
	 * @returns {void}
	 */
	BankRadioButtons.prototype.initBankRadioButtons = function() {
		var payeeBankGroup = this.view().byId("PayeeBankFAC::Form").getGroups()[0];
		var formElements = payeeBankGroup.getFormElements();

		// add radio button form element to the beginning
		formElements.unshift(this.fragment());

		payeeBankGroup.removeAllFormElements();

		formElements.forEach(function(formElement) {
			payeeBankGroup.addFormElement(formElement);
		});
	};

	/**
	 * Handles 'select' event of Bank radio buttons group
	 *
	 * @param {sap.ui.base.Event} event - event object with selected index
	 *
	 * @return {void}
	 */
	BankRadioButtons.prototype.onBankRadioButtonsSelect = function(event) {
		var data;
		var selectedIndex = event.getParameter("selectedIndex");

		data = $.extend({}, this.view().getModel("detailPage").getData(), {
			bankEntryType: selectedIndex
		});

		this.view().getModel("detailPage").setData(data);
	};

	return BankRadioButtons;
});