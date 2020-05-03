/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint "sap-browser-api-warning" : 0 */
sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/ValueState"
	],
	function(JSONModel, ValueState) {
		"use strict";

		return {

			/**
			 * Create button specific attributes model
			 *
			 * @return {JSONModel} created model
			 */
			btnModel: function() {
				// false => initially invisible buttons
				return new JSONModel({
					reverseBtn: false,
					postBtn: false,
					releaseBtn: false,
					postAndReleaseBtn: false,
					createBtn: false,
					isDetailPage: false,
					appMode: ""
				});
			},
			/**
			 * Create dialog model
			 *
			 * @return {JSONModel} created model
			 */
			dialogModel: function() {
				return new JSONModel({
					title: "",
					message: "",
					isReverse: false,
					reversalDateValue: new Date(),
					reversalDateIsValid: true
				});
			},
			/**
			 * Create dialog model
			 *
			 * @return {JSONModel} created model
			 */
			saveTemplateModel: function() {
				return new JSONModel({
					fields: {
						name: {
							valueState: ValueState.None,
							valueStateText: ""
						},
						description: {
							valueState: ValueState.None,
							valueStateText: ""
						}
					},
					buttons: {
						save: false,
						overwrite: false
					}
				});
			},
			/**
			 * Create model with some data
			 *
			 * @param {Object} data - data be set
			 *
			 * @return {JSONModel} created model
			 */
			model: function(data) {
				return new JSONModel(data);
			},
			/**
			 * Create duplicate check model
			 *
			 * @return {JSONModel} created model
			 */
			duplicateCheckModel: function() {
				return new JSONModel({
					items: []
				});
			},
			/**
			 * Create model for controls that are used by copy actions
			 *
			 * @return {JSONModel} created model
			 */
			copyModel: function() {
				return new JSONModel({
					addEntryBtn: undefined,
					listReport: undefined,
					copyBtnPressed: false,
					copyBtnEnabled: true,
					rowContext: undefined
				});
			},
			/**
			 * Create model for controls that are used by copy actions
			 *
			 * @return {JSONModel} created model
			 */
			detailPageModel: function() {
				return new JSONModel({
					action: "display",
					mode: "",
					payReqType: null,
					bankEntryType: 0,
					bankDetails: {}
				});
			}
		};
	});