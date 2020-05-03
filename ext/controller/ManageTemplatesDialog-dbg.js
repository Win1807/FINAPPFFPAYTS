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

	var MANAGE_TEMPLATES_FRAGMENT = "fin.ap.process.payments.ext.fragment.ManageTemplatesDialog";

	var ManageTemplatesDialog = Parent.extend("fin.ap.process.payments.ext.controller.ManageTemplatesDialog", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 * @param {Object} appMode - mode of application
		 *
		 * @return {void}
		 */
		constructor: function(view) {

			var fragment;

			this.view = function() {
				return view;
			};

			fragment = UI.xmlfragment(this.view().getId(), MANAGE_TEMPLATES_FRAGMENT, this);

			this.fragment = function() {
				return fragment;
			};

			this.itemsToDelete = [];
			this.view().addDependent(this.fragment()); // Bind context of the parent
		}
	});

	/**
	 * Manages OK option in the dialog
	 * Set checked items from dialog to smart filter bar
	 *
	 * @return {void}
	 */
	ManageTemplatesDialog.prototype.onManageTemplatesSavePress = function() {
		this.itemsToDelete.forEach(function(item) {
			this.view().getModel().callFunction("/deleteTemplate", {
				method: "POST",
				urlParameters: {
					"Origin": item.getModel().getProperty("PaymentRequestType", item.getBindingContext()),
					"TemplateID": item.getModel().getProperty("PaymentRequestVariant", item.getBindingContext())
				}
			});
		}.bind(this));

		this.itemsToDelete = [];
		this.closeDialog();
	};

	/**
	 * Hides item on user click on delete icon
	 *
	 * @param {sap.ui.base.event} ev - event that contains references clicked item
	 *
	 * @return {void}
	 */
	ManageTemplatesDialog.prototype.onDeleteItemPress = function(ev) {
		var item = ev.getParameter("listItem");

		item.setVisible(false);
		this.itemsToDelete.push(item);
	};

	/**
	 * Shows dialog
	 *
	 * @return {void}
	 */
	ManageTemplatesDialog.prototype.showDialog = function() {
		this.refreshItems();
		this.fragment().open();
	};

	/**
	 * Refresh variants in the list
	 *
	 * @return {void}
	 */
	ManageTemplatesDialog.prototype.refreshItems = function() {
		var list = this.view().byId("manageTemplatesList");
		if (list && list.getModel()) {
			list.getModel().refresh();
		}
	};

	/**
	 * Manages Close option in the fragment
	 * Closes the fragment
	 *
	 * @return {void}
	 */
	ManageTemplatesDialog.prototype.onManageTemplatesCancelPress = function() {
		this.itemsToDelete.forEach(function(item) {
			item.setVisible(true);
		});
		this.itemsToDelete = [];
		this.closeDialog();
	};

	/**
	 * Closes dialog
	 *
	 * @return {void}
	 */
	ManageTemplatesDialog.prototype.closeDialog = function() {
		this.fragment().close();
	};

	return ManageTemplatesDialog;
});