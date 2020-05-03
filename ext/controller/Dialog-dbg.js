/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/Global"
], function(
	Parent,
	UI
) {
	"use strict";

	var Dialog = Parent.extend("fin.ap.process.payments.ext.controller.Dialog", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 * @param {Function} action - function for button action
		 * @param {Array} content - fragment content controls
		 *
		 * @return {void}
		 */
		constructor: function(view, action) {
			var fragment;

			this.view = function() {
				return view;
			};

			this.action = action;

			fragment = UI.xmlfragment(this.view().getId(), "fin.ap.process.payments.ext.fragment.Dialog", this);

			this.fragment = function() {
				return fragment;
			};

			this.view().addDependent(this.fragment()); // Bind context of the parent
		}
	});

	/**
	 * Event handler for 'change' of reversal date value
	 *
	 * @param {sap.ui.base.event} event - event object
	 *
	 * @return {void}
	 */
	Dialog.prototype.onReversalDateChange = function(event) {
		var isValid = event.getParameter("valid");
		var newDate = event.getSource().getDateValue();
		var isFilled = newDate !== null && newDate instanceof Date;

		this.view().getModel("dialog").setProperty("/reversalDateIsValid", isValid && isFilled);
	};

	/**
	 * Shows warning message fragment
	 *
	 * @return {void}
	 */
	Dialog.prototype.showDialog = function() {
		this.fragment().open();

		// reinit
		this.view().getModel("dialog").setProperty("/reversalDateValue", new Date());
		this.view().getModel("dialog").setProperty("/reversalDateIsValid", true);
	};

	/**
	 * Manages action button option in the fragment
	 * Closes the fragment
	 *
	 * @return {void}
	 */
	Dialog.prototype.onActionPress = function() {
		this.action();
		this.closeDialog();
	};

	/**
	 * Manages Cancel option in the fragment
	 * Closes the fragment
	 *
	 * @return {void}
	 */
	Dialog.prototype.onCancelPress = function() {
		this.closeDialog();
	};

	/**
	 * Closes and destroys the fragment
	 *
	 * @return {void}
	 */
	Dialog.prototype.closeDialog = function() {
		this.fragment().close();
		this.fragment().destroy();
	};

	return Dialog;
});