/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
		"fin/ap/process/payments/lib/AppMode",
		"fin/ap/process/payments/lib/Constants",
		"fin/ap/process/payments/lib/Formatters",
		"fin/ap/process/payments/model/additionalModels",
		"fin/ap/process/payments/ext/controller/DuplicateCheckDialog",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"jquery.sap.global",
		"sap/ui/generic/app/navigation/service/NavigationHandler",
		"fin/ap/process/payments/lib/AppState",
		"sap/ui/generic/app/navigation/service/SelectionVariant",
		"fin/ap/process/payments/ext/controller/CopyPaymentRequest"
		/* eslint-disable max-params */
	],
	function(AppMode, Constants, Formatters, additionalModels, DuplicateCheckDialog, Filter, FilterOperator, $, NavigationHandler, AppState,
		SelectionVariant, CopyPaymentRequest) {
		/* eslint-enable "max-params" */
		"use strict";

		/**
		 * Class which implements List Report Page Extensions
		 *
		 * @extends sap.ui.controller
		 */
		function ListReportController() {
			this.formatter = Formatters;
		}

		/**
		 * Handle 'init' event of the controller
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onInit = function() {
			var btnModel = additionalModels.btnModel();
			var parent = this.getOwnerComponent().getEventingParent();
			parent.setModel(btnModel, "btnModel");

			var copyAction = new CopyPaymentRequest(this);
			var router = this.getOwnerComponent().getRouter();
			var smartTable = this.byId("listReport");

			this.copyAction = function() {
				return copyAction;
			};

			this.appMode = new AppMode(btnModel, this.getOwnerComponent());
			this.duplicateCheckDialog = new DuplicateCheckDialog(this.getView(), this.appMode);

			parent.attachEvent("DETAIL_MODEL_SHARED", this.bindDuplicateCheckBtn, this);

			this.getView().setModel(btnModel, "btnModel");
			this.appMode.initAppMode();
			this.initAppState();

			this.setSmartFilterDateType(true);
			this.adjustTableToolbar();

			// include these fields because of PaymentBatch column (and its navigation to Monitor Payments)
			smartTable.setRequestAtLeastFields("PaymentBatch,BatchUUID,PaymentBatchItem,IsReversed,ClearingAccountingDocument");
			smartTable.setIgnoredFields("PaymentRequestVariant");
			smartTable.attachBeforeRebindTable(this.onBeforeRebindTable, this);
			smartTable.getTable().attachItemPress(this.onItemPress, this);

			// fires everytime user switches between list report and detail page (also for flex layout)
			router.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
			router.attachRoutePatternMatched(this.onRoutePatternMatched, this);
		};

		/**
		 * Adjusts List page table toolbar
		 *
		 * @returns {void}
		 */
		ListReportController.prototype.adjustTableToolbar = function() {
			var deleteBtn = this.byId("deleteEntry");

			if (deleteBtn) {
				deleteBtn.setVisible(false);
			}
		};

		/**
		 * Handles 'before rebind table' event of smart table
		 *
		 * @param {sap.ui.base.Event} event - before rebind table event object
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onBeforeRebindTable = function(event) {
			var bindingParams = event.getParameter("bindingParams");
			var editStatusFilter = this.byId("editStateFilter"); // Editing Status filter
			var correctedFilters;

			if (this.appMode.getAppMode() === "request") {
				// check filters if they contain "CreatedByUser" filter
				// needed only in default 'All' option (key "0") in Editing Status filter
				if (editStatusFilter.getSelectedKey() === "0") {
					correctedFilters = this.correctFilters(bindingParams.filters);
				}
			}

			// modify filters to show also unsaved drafts of new Payment Request
			// with the exception of 'Unchanged' option (key "1") in Editing Status filter
			if (editStatusFilter.getSelectedKey() !== "1") {
				bindingParams.filters = this.modifyFilters(correctedFilters || bindingParams.filters);
			}
		};

		/**
		 * Checks, whether the filters contain "CreatedByUser" filter
		 * and if not, then it's added
		 *
		 * @param {Array} filters - filters containing nested filters arrays or filter values
		 *
		 * @return {Array} Returns corrected filter, if the default filter needed to be corrected.
		 */
		ListReportController.prototype.correctFilters = function(filters) {
			if (!this.checkArray(this.findFilter(filters))) {
				return [
					new Filter([new Filter("CreatedByUser", FilterOperator.EQ, this.appMode.getUser()), filters[0]], true)
				];
			} else {
				return filters;
			}
		};

		/**
		 * Recursively checks array for true value
		 *
		 * @param {Array} array - array containing nested array or values
		 *
		 * @return {Boolean} Returns whether array contains true value.
		 */
		ListReportController.prototype.checkArray = function(array) {
			return array.some(function(element) {
				if (element instanceof Array) {
					return this.checkArray(element);
				} else {
					return element;
				}
			}.bind(this));
		};

		/**
		 * Recursively searches filters for "CreatedByUser" filter
		 *
		 * @param {Array} filters - filters containing nested filters arrays or filter values
		 *
		 * @return {Array} If found, array contains 'true'.
		 */
		ListReportController.prototype.findFilter = function(filters) {
			return filters.map(function(filter) {
				// filter contains nested filters
				if (filter.hasOwnProperty("aFilters")) {
					return this.findFilter(filter.aFilters);
				}
				// filter contains filter values
				else {
					// modify "CreatedByUser" filter
					if (filter.hasOwnProperty("sPath") && (filter.sPath === "CreatedByUser")) {
						return true;
					}
					// don't modify other filters
					return false;
				}
			}.bind(this));
		};

		/**
		 * Recursively searches filters for "CreatedByUser" filter, which is afterwards modified to not to filter out
		 * unsaved drafts of new Payment Requests
		 *
		 * @param {Array} filters - filters containing nested filters arrays or filter values
		 *
		 * @return {Array} Returns modified filters.
		 */
		ListReportController.prototype.modifyFilters = function(filters) {
			return filters.map(function(filter) {
				// filter contains nested filters
				if (filter.hasOwnProperty("aFilters")) {
					return new Filter(this.modifyFilters(filter.aFilters), filter.bAnd);
				}
				// filter contains filter values
				else {
					// modify "CreatedByUser" filter
					if (filter.hasOwnProperty("sPath") && (filter.sPath === "CreatedByUser")) {
						return this.createModifiedFilter(filter);
					}
					// don't modify other filters
					return filter;
				}
			}.bind(this));
		};

		/**
		 * Creates a filter, which will also show user's unsaved drafts of new Payment Reqests
		 *
		 * @param {Object} filter - object with event binding parameters
		 *
		 * @return {sap.ui.model.Filter} Returns new modified filter.
		 */
		ListReportController.prototype.createModifiedFilter = function(filter) {
			var myDraftFilters = new Filter([
					new Filter("IsActiveEntity", FilterOperator.EQ, false), // drafts
					new Filter("DraftAdministrativeData/DraftIsCreatedByMe", FilterOperator.EQ, true), // only my drafts
					new Filter("CreatedByUser", FilterOperator.EQ, "") // only my requests
				],
				true
			);
			return new Filter([filter, myDraftFilters], false);
		};

		/**
		 * Set whether Smart Filter Bar should use DateTimeRange
		 *
		 * @param {Boolean} useDateRangeType - whether filter bar should use DateTimeRange
		 *
		 * @return {void}
		 */
		ListReportController.prototype.setSmartFilterDateType = function(useDateRangeType) {
			var smartFilter = this.byId("listReportFilter");

			smartFilter.setUseDateRangeType(useDateRangeType);
		};

		/**
		 * Event handler before route is matched
		 *
		 * @param {sap.ui.base.Event} event - event object with routing information
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onBeforeRouteMatched = function(event) {
			var isDetailPage = false;
			var args = event.getParameter("arguments");
			if (args.hasOwnProperty("keys1")) { // user is on detail screen
				isDetailPage = true;
			}

			this.getView().getModel("btnModel").setProperty("/isDetailPage", isDetailPage);
		};

		/**
		 * Called after rendering the view
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onAfterRendering = function() {
			var smartFilterBar = this.byId("listReportFilter");

			this.initAppTitle();

			// init smart filter bar
			if (smartFilterBar.isInitialised()) {
				this.initSmartFilterBar();
			} else {
				smartFilterBar.attachInitialized(this.initSmartFilterBar, this);
			}

			this.getView().getModel("btnModel").setProperty("/appMode", this.appMode.getAppMode());

			this.initDuplicateCheckBtn();
		};

		/**
		 * Handles deletion of app state from URL that could cause clear of smart filter bar that must have default data.
		 *
		 * @param {sap.ui.base.Event} event - object with information with url params
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onRoutePatternMatched = function(event) {
			if (this.appMode.getAppMode() !== "request") {
				return;
			}

			var args = event.getParameter("arguments");
			if (!args.hasOwnProperty("?query") || !args["?query"].hasOwnProperty("sap-iapp-state")) {
				setTimeout(function() {
					this.initSmartFilterBar();
				}.bind(this), 0);
			} else { // if sap-app-state is present, check if it is with respect to possible app-mode=request
				this.state.parseNavigation();
			}
		};

		/**
		 * Receive application state data
		 *
		 * @param {Object} ev - event object from which contains data from fin.ap.monitor.payments.lib.AppState.stateReceived event
		 *
		 * @return {void}
		 */
		ListReportController.prototype.handlerReceivedAppState = function(ev) {
			if (this.appMode.getAppMode() !== "request") {
				return;
			}

			var appData = ev.getParameter("applicationData");
			var selectionVariant = new SelectionVariant(appData && appData.selectionVariant ? appData.selectionVariant : undefined);
			var smartFilterBar = this.byId("listReportFilter");
			var createdByUserFilter = selectionVariant.getParameterNames()
				.concat(selectionVariant.getSelectOptionsPropertyNames())
				.filter(function(property) {
					return property === "CreatedByUser";
				})
				.map(function(property) {
					return selectionVariant.getSelectOption(property)[0].Low;
				});

			if (createdByUserFilter.length !== 1 || (createdByUserFilter.length > 0 && createdByUserFilter[0] !== this.appMode.getUser())) {
				selectionVariant.removeSelectOption("CreatedByUser");
				selectionVariant.addSelectOption("CreatedByUser", "I", FilterOperator.EQ, this.appMode.getUser(), null);
				smartFilterBar.setDataSuiteFormat(selectionVariant.toJSONString(), true);
			}
		};

		/**
		 * Initializes application title according to app mode
		 *
		 * @return {void}
		 */
		ListReportController.prototype.initAppTitle = function() {
			var appMode = Constants.APP_MODES.filter(function(item) {
				return item.appMode === this.appMode.getAppMode();
			}.bind(this))[0];
			var title = this.getResourceBundle().getText(appMode.title);

			this.shellAppTitle = sap.ui.getCore().byId("shellAppTitle");

			// set app title for the first time after init
			this.setAppTitle(title);

			// workaround for preventing from changing to default app title
			this.shellAppTitle.attachEvent("textChanged", title, this.onTextChanged, this);
		};

		/**
		 * Called after closing the app
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onExit = function() {
			if (this.shellAppTitle) {
				this.shellAppTitle.detachEvent("textChanged", this.onTextChanged, this);
			}
		};

		/**
		 * Handle press on duplicate check button
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onDuplicateCheckBtnPress = function() {
			this.duplicateCheckDialog.duplicateCheckBtnPress();
		};

		/**
		 * Handles 'press' event of Copy button
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onCopyBtnPress = function() {
			this.copyAction().onCopyBtnPress();
		};

		/**
		 * Handles 'text changed' event of shell app title
		 *
		 * @param {sap.ui.base.Event} event - text changed event object
		 * @param {String} title - new title
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onTextChanged = function(event, title) {
			event.preventDefault();
			this.setAppTitle(title);
		};

		/**
		 * Set shell app and document title 
		 *
		 * @param {String} title - new title
		 *
		 * @return {void}
		 */
		ListReportController.prototype.setAppTitle = function(title) {
			document.title = title;
			this.shellAppTitle.setText(title);
		};

		/**
		 * Initializes Smart filter bar according to the appMode
		 *
		 * @return {void}
		 */
		ListReportController.prototype.initSmartFilterBar = function() {
			var smartFilterBar = this.byId("listReportFilter");
			var createdByField = smartFilterBar.getControlByKey("CreatedByUser");
			var filter = smartFilterBar.getFilterData();

			// prevents deleting filter field "CreatedByUser" by pressing reset in settings modal of smart filter bar
			smartFilterBar.attachEventOnce("afterVariantLoad", null, this.initSmartFilterBar.bind(this));

			if (this.appMode.getAppMode() === "request") { // allow only entries created by currently logged user
				filter.CreatedByUser = this.appMode.getUser();
				createdByField.setEditable(false);

				if (!this.isSetUserCreatedByFilter()) {
					smartFilterBar.clear();
					smartFilterBar.setFilterData(filter, true);
					// trigger search after filter modification
					smartFilterBar.search();
				}
			}
		};

		/**
		 * Determines if smart filter bar field "CreatedByUser" contains only currently logged user in case of app-mode=request
		 *
		 * @return {Boolean} - false if user is different or not present
		 */
		ListReportController.prototype.isSetUserCreatedByFilter = function() {
			var smartFilterBar = this.byId("listReportFilter");
			var filter = smartFilterBar.getFilterData();

			return filter.hasOwnProperty("CreatedByUser") && this.isCreatedByCurrentUser(filter.CreatedByUser);
		};

		/**
		 * Checks whether is the createdByUser same as the current user
		 *
		 * @param {Object} createdByUser - object with information about createdByUser
		 *
		 * @return {Boolean} - false if createdByUser is not the current user
		 */
		ListReportController.prototype.isCreatedByCurrentUser = function(createdByUser) {
			var currentUser = this.appMode.getUser();

			return (createdByUser.value === currentUser || (createdByUser.ranges[0] && createdByUser.ranges[0].value1 === currentUser));
		};

		/**
		 * Initializes duplicate check btn before it is bound
		 *
		 * @return {void}
		 */
		ListReportController.prototype.initDuplicateCheckBtn = function() {
			if (this.isDuplicateCheckBtnInitialized !== true) {
				this.getView().byId("duplicateCheckBtn").setVisible(false);
				this.isDuplicateCheckBtnInitialized = true;
			}
		};

		/**
		 * Binds visibility on duplicate check button. Function is triggered after detail screen
		 * is opened on first time.
		 *
		 * @param {sap.ui.base.Event} event - event object with references to eventing parent
		 *
		 * @return {void}
		 */
		ListReportController.prototype.bindDuplicateCheckBtn = function(event) {
			// obtain ui model from detail page
			var parent = event.getParameter("eventingParent");
			this.getView().setModel(parent.getModel("uiDetail"), "uiDetail");

			// bind button to the ui model on detail
			this.byId("duplicateCheckBtn").bindProperty("visible", {
				parts: [{
					path: "uiDetail>/createMode"
				}, {
					path: "uiDetail>/editable"
				}, {
					path: "btnModel>/isDetailPage"
				}],
				formatter: this.formatter.isDuplicateCheckBtnVisible
			});
			this.isDuplicateCheckBtnInitialized = true;
		};

		/**
		 * Initializes app state
		 *
		 * @return {void}
		 */
		ListReportController.prototype.initAppState = function() {
			var navigationHandler = this.newObject(NavigationHandler, this);

			this.state = this.newObject(AppState, navigationHandler);
			this.state.attachStateReceived(this.handlerReceivedAppState, this);
		};

		/**
		 * Handles 'item press' event of table
		 *
		 * @param {sap.ui.base.Event} event - item press event object
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onItemPress = function(event) {
			var row = event.getParameter("listItem");

			// save selected row for copy event
			row.getTable().data("selectedRow", row.getBindingContext());

			// fire 'press' event manually, because it's not fired when the table is in 'SingleSelectMaster' mode
			row.firePress();
		};

		/**
		 * Handler 'before popover opens' on smartlink
		 *
		 * @param {sap.ui.base.Event} event - event with navigation parameters
		 *
		 * @return {void}
		 */
		ListReportController.prototype.onPaymentBatchBeforePopoverOpens = function(event) {
			var parameters = event.getParameters();
			var semanticAttributes = parameters.semanticAttributesOfSemanticObjects.PaymentItem;
			var paymentItemSemanticAttributes = {};

			// navigate to Monitor Payments app Detail page
			paymentItemSemanticAttributes.PaymentBatch = semanticAttributes.PaymentItem;
			paymentItemSemanticAttributes.BatchUUID = semanticAttributes.BatchUUID;
			paymentItemSemanticAttributes.PaymentBatchItem = semanticAttributes.PaymentBatchItem;

			parameters.setSemanticAttributes(paymentItemSemanticAttributes, "PaymentItem");
			parameters.open();
		};

		/**
		 * Factory for creating a new SAPUI object (extended from sap.ui.base.Object)
		 *
		 * @param {Any} TypeConstructor - class constructor
		 *
		 * @return {Any} a new object or null
		 */
		ListReportController.prototype.newObject = function(TypeConstructor) {
			return TypeConstructor.prototype instanceof sap.ui.base.Object ? this.new.apply(this, arguments) : null;
		};

		/**
		 * Creates a new instance of the given class
		 *
		 * @param {Object} TypeConstructor - class constructor
		 *
		 * @return {Object} an instance of the TypeConstructor
		 */
		ListReportController.prototype.new = function(TypeConstructor) {
			return new(Function.prototype.bind.apply(TypeConstructor, arguments))();
		};

		/**
		 * Getter for the resource bundle
		 *
		 * @return {sap.ui.model.resource.ResourceModel} The resourceModel of the component
		 */
		ListReportController.prototype.getResourceBundle = function() {
			return this.getView().getModel("i18n").getResourceBundle();
		};

		return sap.ui.controller("fin.ap.process.payments.ext.controller.ListReportExt", new ListReportController());
	}, /* bExport= */ true);