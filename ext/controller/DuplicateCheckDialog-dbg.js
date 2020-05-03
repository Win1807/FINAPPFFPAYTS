/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/Global",
	"fin/ap/process/payments/model/additionalModels",
	"sap/ui/model/FilterOperator"
], function(
	Parent,
	UI,
	additionalModels,
	FilterOperator
) {
	"use strict";

	var DUPLICATE_CHECK_FRAGMENT = "fin.ap.process.payments.ext.fragment.DuplicateCheckDialog";

	var DuplicateCheckDialog = Parent.extend("fin.ap.process.payments.ext.controller.DuplicateCheckDialog", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 * @param {Object} appMode - mode of application
		 *
		 * @return {void}
		 */
		constructor: function(view, appMode) {

			var fragment;

			this.view = function() {
				return view;
			};

			this.appMode = function() {
				return appMode;
			};

			fragment = UI.xmlfragment(this.view().getId(), DUPLICATE_CHECK_FRAGMENT, this);

			this.fragment = function() {
				return fragment;
			};

			this.view().addDependent(this.fragment()); // Bind context of the parent
		}
	});

	/**
	 * Handle press on duplicate check button
	 *
	 * @return {void}
	 */
	DuplicateCheckDialog.prototype.duplicateCheckBtnPress = function() {
		this.prepareDuplicateList();
		this.showDialog();
	};

	/**
	 * Prepares the list of items for the dialog
	 *
	 * @return {void}
	 */
	DuplicateCheckDialog.prototype.prepareDuplicateList = function() {
		var duplicateCheckModel = additionalModels.duplicateCheckModel();
		var fields = this.getVisibleFieldsFromSmartFilterBar();
		var filter = this.createFilterFromFields(fields);

		duplicateCheckModel.setData({
			items: filter
		});
		this.view().setModel(duplicateCheckModel, "DuplicateCheck");
	};

	/**
	 * Returns currently visible fields (with respect to variant) of smart filter bar
	 *
	 * @return {Array} - fields from smart filter bar
	 */
	DuplicateCheckDialog.prototype.getVisibleFieldsFromSmartFilterBar = function() {
		var smartFilterBar = this.view().byId("listReportFilter");
		var variant = smartFilterBar.fetchVariant();
		var fields = variant.filterbar
			.filter(function(item) { // filter only visible fields
				return item.visibleInFilterBar && item.partOfCurrentVariant;
			})
			.filter(function(item) { // filter out defined fields
				return ["PaymentRequest", "EditState"].indexOf(item.name) === -1;
			})
			.filter(function(item) { // filter out createdby field on app-mode request
				if (this.appMode().getAppMode() === "request") {
					return item.name !== "CreatedByUser";
				} else {
					return true;
				}
			}.bind(this));

		return fields;
	};

	/**
	 * Returns currently visible fields (with respect to variant) of smart filter bar
	 *
	 * @param {Array} fields - list of fields from smart filter bar
	 *
	 * @return {Array} - list of filtering rules
	 */
	DuplicateCheckDialog.prototype.createFilterFromFields = function(fields) {
		var model = this.getSelectedItem().getModel();
		var context = this.getSelectedItem().getBindingContext();
		var filter = fields.map(function(item) {
			var value = model.getProperty(item.name, context);
			return {
				fieldName: item.name, // name of the field
				fieldLabel: this.getFieldLabel(item.name), // label of the field shown to user
				value: this.formatValue(item.name, value), // value shown to user
				rawValue: this.getRawValue(item.name, value) // does not call toString() on Date input, but stores raw Object
			};
		}.bind(this));

		return filter;
	};

	/**
	 * Manages OK option in the dialog
	 * Set checked items from dialog to smart filter bar
	 *
	 * @return {void}
	 */
	DuplicateCheckDialog.prototype.onDuplicateCheckOK = function() {
		var smartFilterBar = this.view().byId("listReportFilter");
		var list = this.view().byId("duplicateCheckList").getSelectedItems();
		var filter = {};
		list.forEach(function(item) {
			var fieldName = item.data("fieldName");
			filter[fieldName] = this.createFilterItem(item);
		}.bind(this));

		// manage app-mode=request
		filter = this.handleAppModeRequestFilter(filter);

		smartFilterBar.clear();
		smartFilterBar.setFilterData(filter, true);

		this.closeDialog();

		// trigger Search button
		smartFilterBar.search();
	};

	/**
	 * Returns filter with updated field "CreatedByUser" according to the app-mode=request
	 *
	 * @param {Array} filter - duplicate check filter fields
	 *
	 * @return {Array} - updated duplicate check filter
	 */
	DuplicateCheckDialog.prototype.handleAppModeRequestFilter = function(filter) {
		var smartFilterBar = this.view().byId("listReportFilter");
		var filterData = smartFilterBar.getFilterData();

		if (smartFilterBar.getControlByKey("CreatedByUser").getEditable() === false && filterData.CreatedByUser !== undefined) { //app-mode=request
			filter.CreatedByUser = filterData.CreatedByUser;
		}

		return filter;
	};

	/**
	 * Returns label of the requested field from Smart Filter Bar
	 * 
	 * @param {String} fieldName - Name of the field
	 *
	 * @return {String} - label of the requested field
	 */
	DuplicateCheckDialog.prototype.getFieldLabel = function(fieldName) {
		var smartFilterBar = this.view().byId("listReportFilter");
		var control = smartFilterBar.getControlByKey(fieldName);
		var label = control.getLabels()[0];

		return label.getText();
	};

	/**
	 * Retrieves available statuses from Status field of Smart Filter Bar
	 *
	 * @return {Array} - list of available statuses
	 */
	DuplicateCheckDialog.prototype.getAvailablePaymentStatuses = function() {
		var smartFilterBar = this.view().byId("listReportFilter");
		var statusFld = smartFilterBar.getControlByKey("StatusCode");
		var statuses = statusFld.getAggregation("items").map(function(item) {
			return {
				key: item.getProperty("key"),
				text: item.getProperty("text")
			};
		});

		return statuses;
	};

	/**
	 * Returns readable value for user
	 *
	 * @param {String} itemName - name of the field
	 * @param {Object} value - raw value
	 *
	 * @return {String} - formatted value
	 */
	DuplicateCheckDialog.prototype.formatValue = function(itemName, value) {
		var formattedValue;
		var statuses;

		if (value instanceof Date) {
			formattedValue = value.toLocaleDateString();
		} else if (itemName === "StatusCode") {
			statuses = this.getAvailablePaymentStatuses();
			formattedValue = statuses
				.filter(function(item) {
					return item.key === value;
				})
				.map(function(item) {
					return item.text;
				})[0];
		} else {
			formattedValue = value;
		}

		return formattedValue;
	};

	/**
	 * Returns raw value of the field and adds additional data to specific fields
	 *
	 * @param {String} itemName - name of the field
	 * @param {Object} value - raw value
	 *
	 * @return {String} - raw value
	 */
	DuplicateCheckDialog.prototype.getRawValue = function(itemName, value) {
		var rawValue;
		var statuses;

		if (itemName === "StatusCode") {
			statuses = this.getAvailablePaymentStatuses();
			rawValue = statuses.filter(function(item) {
				return item.key === value;
			});
		} else {
			rawValue = value;
		}

		return rawValue;
	};

	/**
	 * Returns filter item for smart filter bar
	 *
	 * @param {sap.m.StandardListItem} item - item of the duplicate check list
	 *
	 * @return {Object} - item for smart filter bar
	 */
	DuplicateCheckDialog.prototype.createFilterItem = function(item) {
		var filterItem;
		var rawValue = item.data("rawValue");
		var fieldName = item.data("fieldName");
		if (fieldName === "StatusCode") {
			filterItem = {
				items: [rawValue[0]]
			};
		} else if (rawValue instanceof Date === true) {
			filterItem = {
				ranges: [{
					operation: FilterOperator.BT,
					value1: rawValue,
					value2: rawValue
				}]
			};
		} else {
			filterItem = item.getInfo();
		}

		return filterItem;
	};

	/**
	 * Getter of pressed item
	 *
	 * @return {Object} pressedItem - control object that is selected in the table
	 */
	DuplicateCheckDialog.prototype.getSelectedItem = function() {
		var table = this.view().byId("listReport").getTable();

		return table.getSelectedItem();
	};

	/**
	 * Shows dialog
	 *
	 * @return {void}
	 */
	DuplicateCheckDialog.prototype.showDialog = function() {
		this.fragment().open();
	};

	/**
	 * Manages Close option in the fragment
	 * Closes the fragment
	 *
	 * @return {void}
	 */
	DuplicateCheckDialog.prototype.onDuplicateCheckCancel = function() {
		this.closeDialog();
	};

	/**
	 * Closes dialog
	 *
	 * @return {void}
	 */
	DuplicateCheckDialog.prototype.closeDialog = function() {
		this.fragment().close();
	};

	return DuplicateCheckDialog;
});