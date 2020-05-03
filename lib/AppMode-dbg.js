/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
		"sap/ui/base/Object",
		"fin/ap/process/payments/lib/Constants",
		"sap/ushell/services/UserInfo",
		"sap/ui/core/routing/HashChanger",
		"sap/ushell/services/URLParsing",
		"jquery.sap.global",
		"jquery.sap.promise"
	],
	function(Parent, Constants, UserInfo, HashChanger, URLParsing, $) {
		"use strict";

		var AppMode = Parent.extend("fin.ap.process.payments.lib.AppMode", {

			/**
			 * Constructor for AppMode
			 *
			 * @param {sap.ui.model.Model} btnModel - model that holds buttons visibility
			 * @param {sap.ui.core.Component} component - current owner component
			 *
			 * @return {void}
			 */
			constructor: function(btnModel, component) {
				var user = new UserInfo();

				this.btnModel = btnModel;
				this.component = component;
				this.appMode = "";
				this.user = user.getId();
			}
		});

		/**
		 * Initializes buttons according to the requested app-mode in the URL param
		 *
		 * @return {void}
		 */
		AppMode.prototype.initAppMode = function() {
			var buttonList = [];
			var appModeActivities = []; // activities that are requested by app_mode

			this.appMode = this.getAppModeFromShell();

			// reinit buttons
			// disable all buttons
			buttonList = this.getAllButtons();
			this.toggleButtons(buttonList, false);

			appModeActivities = this.getActivitiesByAppMode(this.getAppMode());
			// init buttons according to the appMode
			this.initActivities(appModeActivities);
		};

		/**
		 * Initializes buttons according to the activities in the parameter
		 *
		 * @param {Array} activityList - array containing activities
		 *
		 * @return {void}
		 */
		AppMode.prototype.initActivities = function(activityList) {
			var buttons = [];

			activityList.forEach(function(item) {
				buttons = buttons.concat(this.getButtonsByActivity(item));
			}.bind(this));

			this.toggleButtons(buttons, true);
		};

		/**
		 * Enables or disables buttons on the page
		 *
		 * @param {Array} buttons - list of buttons to be toggled
		 * @param {Boolean} enable - true if buttons should be enabled
		 *
		 * @return {void}
		 */
		AppMode.prototype.toggleButtons = function(buttons, enable) {
			var btnModel = this.getBtnModel();
			buttons.forEach(function(item) {
				btnModel.setProperty("/" + item, enable);
			});
		};

		/**
		 * Returns list of buttons for the requested activity
		 *
		 * @param {String} activity - id of activity
		 *
		 * @return {Array} - list of buttons
		 */
		AppMode.prototype.getButtonsByActivity = function(activity) {
			var selectedActivity = Constants.ACTIVITIES.filter(function(item) {
				return item.activity === activity;
			});

			return selectedActivity[0].buttons;
		};

		/**
		 * Sets app mode from shell parameters
		 *
		 * @return {String} - app mode
		 */
		AppMode.prototype.getAppModeFromShell = function() {
			var hashChanger = new HashChanger();
			var urlParser = new URLParsing();
			var parsedHash = urlParser.parseShellHash(hashChanger.getHash());

			return (parsedHash.action === "process") ? "process" : "request";
		};

		/**
		 * Returns activities for requested app-mode
		 *
		 * @param {String} appMode - requested app mode of the application (from URL)
		 *
		 * @return {Array} - activities for the appMode
		 */
		AppMode.prototype.getActivitiesByAppMode = function(appMode) {
			var selectedAppMode = Constants.APP_MODES.filter(function(item) {
				return appMode === item.appMode;
			});

			return selectedAppMode && selectedAppMode[0] ? selectedAppMode[0].activity : [];
		};

		/**
		 * Returns all buttons on the page that could be toggled
		 *
		 * @return {Array} - list of buttons
		 */
		AppMode.prototype.getAllButtons = function() {
			var buttons = [];
			var uniqueButtons = [];

			Constants.ACTIVITIES.forEach(function(item) {
				buttons = buttons.concat(this.getButtonsByActivity(item.activity));
			}.bind(this));

			// filter duplicates
			uniqueButtons = buttons.filter(function(item, pos) {
				return buttons.indexOf(item) === pos;
			});

			return uniqueButtons;
		};

		/**
		 * Getter for currently logged user
		 *
		 * @return {String} - login of currently logged user
		 */
		AppMode.prototype.getUser = function() {
			return this.user;
		};

		/**
		 * Getter for the app-mode
		 *
		 * @return {String} - app mode
		 */
		AppMode.prototype.getAppMode = function() {
			return this.appMode;
		};

		/**
		 * Returns button model
		 *
		 * @return {sap.ui.model.Model} - button model
		 */
		AppMode.prototype.getBtnModel = function() {
			return this.btnModel;
		};

		/**
		 * Returns current owner component
		 *
		 * @return {component} - owner component
		 */
		AppMode.prototype.getOwnerComponent = function() {
			return this.component;
		};

		return AppMode;
	});