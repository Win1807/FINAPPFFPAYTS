/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/EventProvider",
	"sap/ui/generic/app/library",
	"jquery.sap.global"
], function(
	Parent,
	generic,
	$
) {
	"use strict";

	//Private variable which keeps application data per instance
	var allAppStateData = [];
	//Private variable which saves
	var counterId = -1;

	var EXCEPTIONS = {
		STORE_SECONDPARAM: "Second parameter is optional but it has to be a function if set"
	};

	//Shorthand for navigation types
	var NAVIGATION_TYPES = generic.navigation.service.NavType;
	/**
	 * The 'stateReceived' event is fired, when apllication state data are received from backedna and parsed
	 *
	 * @name fin.ap.monitor.payments.lib.AppState.stateReceived
	 * @event
	 * @param {sap.ui.base.Event} oEvent
	 * @param {Object} oEvent.getParameters
	 * @param {Object} oEvent.getParameters.applicationState The instance of application state which
	 *  fired the event
	 * @param {Object} oEvent.getParameters.applicationData An key-value pair object which contains the
	 *  application state data received from the backend and parsed
	 */
	var EVENT_STATE_RECEIVED_NAME = "stateReceived";
	/**
	 * The 'parametersReceived' event is fired, when the application has received parameters by URL
	 *
	 * @name fin.ap.monitor.payments.lib.AppState.parametersReceived
	 * @event
	 * @param {sap.ui.base.Event} oEvent
	 * @param {Object} oEvent.getParameters
	 * @param {Object} oEvent.getParameters.applicationState The instance of application state which
	 *  fired the event
	 * @param {Object} oEvent.getParameters.applicationData An key-value pair object which contains the
	 *  application state data received from the backend and parsed
	 * @param {Object} oEvent.getParameters.startupParameters An key-value pair object which contains the
	 *  parameters from URL
	 */
	var EVENT_PARAMETERS_RECEIVED_NAME = "parametersReceived";

	/**
	 * Initialize application data state mangager
	 *
	 * @param {sap.ui.generic.app.navigation.service.NavigationHandler} navigation -
	 *        is instance of NavigationHandler which parse and generate current
	 *        application URL
	 */
	var AppState = Parent.extend("fin.ap.process.payments.lib.AppState", {
		constructor: function(navigation) {
			var appStateData = allAppStateData[++counterId] = {
				selectionVariant: {},
				tableVariantId: null,
				customData: {},
				instanceId: counterId
			};
			this.appStateData = function() {
				return appStateData;
			};

			Parent.call(this);
			this.navigationHandler = navigation;
			$.sap.delayedCall(0, this, function() {
				this.parseNavigation();
			});
		}
	});

	/** Triggers the parse navigation on navigation handler
	 *
	 * @return {void}
	 */
	AppState.prototype.parseNavigation = function() {
		this.navigationHandler.parseNavigation().done(
			this.handlerNavigationParsed.bind(this)
		);
	};

	/**
	 * Register callback which is called when application state data are received
	 *
	 * @param {Function} callback - function which is called when data are received
	 * @param {Object} context - passed to Function.bind as thisArg
	 */
	AppState.prototype.attachStateReceived = function(callback, context) {
		this.attachEvent(EVENT_STATE_RECEIVED_NAME, callback, context);
	};

	/**
	 * Register callback which is called when URL parameters are parsed
	 *
	 * @param {Function} callback - function which is called when URL parameters are received
	 * @param {Object} context - passed to Function.bind as thisArg
	 */
	AppState.prototype.attachParametersReceived = function(callback, context) {
		this.attachEvent(EVENT_PARAMETERS_RECEIVED_NAME, callback, context);
	};

	/**
	 * Called when application data are received. The handler fire callback passed by attachStateReceived
	 *
	 * @param {Object} appData - object with data from app state
	 * @param {Object} startupParameters - parameters passed from URL
	 * @param {sap.ui.generic.app.navigation.service.NavType} navigationType - type of navigation
	 *
	 * @see sap.ui.generic.app.navigation.service.NavigationHandler
	 */
	AppState.prototype.handlerNavigationParsed = function(appData, startupParameters, navigationType) {

		appData = this.normalizeAppData(appData, navigationType);

		if (navigationType === NAVIGATION_TYPES.iAppState) {
			this.fireEvent(EVENT_STATE_RECEIVED_NAME, {
				applicationState: this,
				applicationData: appData
			});
		} else if (navigationType === NAVIGATION_TYPES.URLParams || NAVIGATION_TYPES.xAppState) {
			this.fireEvent(EVENT_PARAMETERS_RECEIVED_NAME, {
				applicationState: this,
				applicationData: appData,
				startupParameters: startupParameters
			});
		}
	};

	/**
	 * Normalize appData based on the current navigation type
	 *
	 * @param {Object} appData - object with data from app state
	 * @param {sap.ui.generic.app.navigation.service.NavType} navigationType - type of navigation
	 *
	 * @return {Object} normalized appData
	 */
	AppState.prototype.normalizeAppData = function(appData, navigationType) {
		if (
			navigationType !== NAVIGATION_TYPES.initial &&
			appData !== null &&
			typeof appData === "object"
		) {
			appData.customData = appData.customData || {};
			this.appStateData().customData = appData.customData;
		}

		return appData;
	};

	/**
	 * Changes the URL according to the current app state and stores the app state for later retrieval.
	 *
	 * @param {Object} appData - structure which is used by  sap.ui.generic.app.navigation.service.NavigationHandler
	 *                           to save application state
	 * @param {Function} [callback] - function which is called when data are saved
	 *
	 * @returns {jQuery.Deferred} - deferred object which is resolved where data are saved
	 */
	AppState.prototype.store = function(appData, callback) {
		var oAppStatePromise = this.navigationHandler.storeInnerAppState(JSON.parse(JSON.stringify(appData)));
		if (callback) {
			if (typeof callback !== "function") {
				throw EXCEPTIONS.STORE_SECONDPARAM;
			} else {
				oAppStatePromise.done(callback);
			}
		}
		return oAppStatePromise;
	};

	/**
	 * Getter for the instance of the NavigationHandler
	 *
	 * @return {sap.ui.generic.app.navigation.service.NavigationHandler} just return instance of the
	 *         NavigationHandler use to store/load the state application data
	 */
	AppState.prototype.getNavigationHandler = function() {
		return this.navigationHandler;
	};

	/**
	 * Setter for SmartFilterData saved to the application data state
	 *
	 * @param {SelectVariant} selectionVariant - variant selected in filter bar
	 * @param {Array} visibleFieldsWithDefaults - array with visible filter fields
	 * @param {Function} [callback] - function which is called when data are saved
	 *
	 * @return {jQuery.Deferred} - deferred object which is resolved where data are saved
	 */
	AppState.prototype.setSmartFilterBarSettings = function(selectionVariant, visibleFieldsWithDefaults, callback) {
		var i;

		visibleFieldsWithDefaults = visibleFieldsWithDefaults || [];
		for (i = 0; i < visibleFieldsWithDefaults.length; i++) {
			if (!selectionVariant.getValue(visibleFieldsWithDefaults[i])) {
				selectionVariant.addSelectOption(visibleFieldsWithDefaults[i], "I", "EQ", "");
			}
		}
		this.appStateData().selectionVariant = selectionVariant.toJSONString();
		return this.store(this.appStateData(), callback);
	};

	/**
	 * Getter for free custom data
	 *
	 * @param {String} key - from custom data structure
	 *
	 * @returns {String} custom data value
	 */
	AppState.prototype.getCustomData = function(key) {
		return this.appStateData().customData[key];
	};

	/**
	 * Setter for free custom data saved to the application data state
	 *
	 * @param {String} key - key which define custom data
	 * @param {String} value - data which are saved
	 * @param {Function} [callback] - function which is called when data are saved
	 *
	 * @returns {jQuery.Deferred} - deferred object which is resolved where data are saved
	 */
	AppState.prototype.setCustomData = function(key, value, callback) {
		this.appStateData().customData[key] = value;
		return this.store(this.appStateData(), callback);
	};

	return AppState;
});