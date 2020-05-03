/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"fin/ap/process/payments/model/additionalModels",
	"fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters"
], function(
	Parent,
	additionalModels,
	Constants,
	Formatters
) {
	"use strict";

	var CopyPaymentRequest = Parent.extend("fin.ap.process.payments.ext.controller.CopyPaymentRequest", {

		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.Controller} controller - current controller (ListReport|ObjectPage)
		 *
		 * @return {void}
		 */
		constructor: function(controller) {
			this.controller = function() {
				return controller;
			};

			this.formatter = Formatters;

			this.initialize();
		}
	});

	/**
	 * Initializes CopyPaymentRequest functionality
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.initialize = function() {
		this.initModel();
		this.registerItems();
		this.initCopyBtnVisibility();
		this.attachObjectPageListener();

		this.bindCopyButton();
	};

	/**
	 * Handle press on duplicate check button
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.onCopyBtnPress = function() {
		var copyModel = this.controller().getOwnerComponent().getEventingParent().getModel("copyModel");
		var addEntryBtn = copyModel.getProperty("/addEntryBtn");

		// set copy flag to true (create page was triggered by copy button, not "+" button)
		copyModel.setProperty("/copyBtnPressed", true);

		// open screen for creating new entity (trigger press on "+" button)
		addEntryBtn.firePress();
	};

	/**
	 * Initializes model to the parent (because listReport and objectPage does not share ownerComponent)
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.initModel = function() {
		var parent = this.controller().getOwnerComponent().getEventingParent();
		var parentModel = parent.getModel("copyModel");
		var model = additionalModels.copyModel();

		if (!parentModel) {
			parent.setModel(model, "copyModel");
			parentModel = model;
		}

		// share copymodel for both views
		this.controller().getView().setModel(parentModel, "copyModel");
	};

	/**
	 * Stores addEntry button and listReport to shared space to be accessible for both instances
	 * of this class. (from listReportPage, as well as objectPage)
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.registerItems = function() {
		var copyModel = this.controller().getOwnerComponent().getEventingParent().getModel("copyModel");
		var items = {
			addEntryBtn: this.controller().byId("addEntry"),
			listReport: this.controller().byId("listReport"),
			copyBtnPressed: false,
			copyBtnEnabled: true
		};

		Object.keys(items).forEach(function(key) {
			if (items[key] !== undefined) {
				copyModel.setProperty("/" + key, items[key]);
			}
		});

	};

	/**
	 * Copy selected row from listReport page to the newly created object page
	 *
	 * @param {sap.ui.model.Context} objectPageContext - context on the new object page that is about to be filled with copied data
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.copySelectedRow = function(objectPageContext) {
		var path = objectPageContext.getPath();
		var model = objectPageContext.getModel();
		var newRow = this.createNewRow();

		Object.keys(newRow).forEach(function(rowData) {
			model.setProperty(path + "/" + rowData, newRow[rowData]);
		});

		model.submitChanges();
	};

	/**
	 * Copy the selected row data, make changes for copy
	 *
	 * @return {Object} - data of the new row
	 */
	CopyPaymentRequest.prototype.createNewRow = function() {
		var selectedRowData = this.getSelectedRowData();

		this.removeUnavailableProperties(selectedRowData);

		selectedRowData.StatusCode = ""; // Will be automatically set to "Created" on backend
		selectedRowData.CreatedByUser = ""; // will be filled automatically on backend
		selectedRowData.LastChangedByUser = "";
		selectedRowData.AccountingDocument = ""; // journal entry
		selectedRowData.ClearingAccountingDocument = "";

		return selectedRowData;
	};

	/**
	 * Attach listener on opening of ObjectPage in DetailPageController
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.attachObjectPageListener = function() {
		if (this.controller().extensionAPI.hasOwnProperty("attachPageDataLoaded")) {
			this.controller().extensionAPI.attachPageDataLoaded(this.onPageDataLoaded.bind(this));
		}
	};

	/**
	 * Handles opening of ObjectPage using copy as well as "+" button
	 *
	 * @param {Object} rowContext - context of the row
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.onPageDataLoaded = function(rowContext) {
		var model = rowContext.context.getModel();
		var copyModel = this.controller().getOwnerComponent().getEventingParent().getModel("copyModel");

		// resolve if copy action was triggered by copy button
		var copyPressed = copyModel.getProperty("/copyBtnPressed");

		// resolve if opened page is create page
		var isCreatePage = this.isCreatePage();

		// enable/disable copy button if Payment Request Type does not match our types
		if (!isCreatePage) {
			this.controller().getView().getModel("copyModel").setProperty("/copyBtnEnabled", Constants.PAYMENT_REQUEST_TYPES.some(function(item) {
				return item.code === model.getProperty("PaymentRequestType", rowContext.context);
			}));
		}

		if (!isCreatePage && !copyPressed) {
			// store the current row context
			copyModel.setProperty("/rowContext", rowContext ? rowContext.context : undefined);
		}

		// copy items from selected row and fill object page
		if (copyPressed && isCreatePage) {
			this.copySelectedRow(rowContext.context);
		}

		// Reset copy flag
		copyModel.setProperty("/copyBtnPressed", false);
	};

	/**
	 * Resolves mode of ObjectPage
	 *
	 * @return {Boolean} - true if object page is opened in create mode
	 */
	CopyPaymentRequest.prototype.isCreatePage = function() {
		var btnModel = this.controller().getOwnerComponent().getEventingParent().getModel("btnModel");
		var uiDetailModel = this.controller().getOwnerComponent().getEventingParent().getModel("uiDetail");

		return btnModel.getProperty("/isDetailPage") && uiDetailModel.getProperty("/createMode") && uiDetailModel.getProperty("/editable");
	};

	/**
	 * Removes properties, which are not a part of Object page fields, from data object
	 *
	 * @param {Object} data - received row data
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.removeUnavailableProperties = function(data) {
		Constants.COPY_EXCLUDED_FLDS.forEach(function(property) {
			delete data[property];
		});
	};

	/**
	 * Initializes visibility of copy buttons
	 *
	 * @return {void}
	 */
	CopyPaymentRequest.prototype.initCopyBtnVisibility = function() {
		var isDetailPage = this.isDetailPage();
		var copyButtons = this.getCopyButtons();

		// binding is not ready yet -> set visibility manually
		if (this.isCopyBtnInitialized !== true) {
			Object.keys(copyButtons).forEach(function(key) {
				if (copyButtons[key] !== undefined) {
					copyButtons[key].setVisible(isDetailPage);
				}
			});
			this.isCopyBtnInitialized = true;
		}
	};

	/**
	 * Bind visible/editable properties on copy buttons
	 *
	 * @rerurn {void}
	 */
	CopyPaymentRequest.prototype.bindCopyButton = function() {
		var copyButtons = this.getCopyButtons();
		var uiModelName = this.getCurrentUiModelName();

		Object.keys(copyButtons).forEach(function(key) {
			if (copyButtons[key] !== undefined) {
				copyButtons[key].bindProperty("visible", {
					parts: [{
						path: uiModelName + ">/createMode"
					}, {
						path: uiModelName + ">/editable"
					}, {
						path: "btnModel>/isDetailPage"
					}],
					formatter: this.formatter.isCopyBtnVisible
				});

				copyButtons[key].bindProperty("enabled", {
					path: "copyModel>/copyBtnEnabled"
				});
			}
		}.bind(this));

		this.isCopyBtnInitialized = true;

	};

	/**
	 * Returns controls of copy buttons from ListReport as well as ObjectPage
	 *
	 * @return {Object} - copy buttons
	 */
	CopyPaymentRequest.prototype.getCopyButtons = function() {
		return {
			listReportCopyBtn: this.controller().byId("CopyActionListReport"),
			objectPageCopyBtn: this.controller().byId("action::CopyActionObjectPage")
		};
	};

	/**
	 * Rerurns "uiDetail" or "ui" model name for the binding of copy button
	 *
	 * @return {String} - name of the view's ui model
	 */
	CopyPaymentRequest.prototype.getCurrentUiModelName = function() {
		var copyButtons = this.getCopyButtons();
		// which copy button should be bound to which model
		return copyButtons.listReportCopyBtn ? "uiDetail" : "ui";
	};

	/**
	 * Resolves if detail page is opened
	 *
	 * @return {Boolean} - true if detail page is opened
	 */
	CopyPaymentRequest.prototype.isDetailPage = function() {
		var btnModel = this.controller().getOwnerComponent().getEventingParent().getModel("btnModel");

		return btnModel.getProperty("/isDetailPage");
	};

	/**
	 * Returns data of selected row
	 *
	 * @return {Object} - selected row
	 */
	CopyPaymentRequest.prototype.getSelectedRowData = function() {
		var copyModel = this.controller().getOwnerComponent().getEventingParent().getModel("copyModel");
		var listReport = copyModel.getProperty("/listReport");
		var selectedRow = listReport.getTable().data("selectedRow");

		// in case of refresh detail page (by F5) selected row is not sometimes filled with data
		if (!selectedRow) {
			selectedRow = copyModel.getProperty("/rowContext");
		}

		return selectedRow ? selectedRow.getObject() : {};
	};

	return CopyPaymentRequest;
});