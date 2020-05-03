/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/core/ValueState"], function (J, V) {
	"use strict";
	return {
		btnModel: function () {
			return new J({
				reverseBtn: false,
				postBtn: false,
				releaseBtn: false,
				postAndReleaseBtn: false,
				createBtn: false,
				isDetailPage: false,
				appMode: ""
			});
		},
		dialogModel: function () {
			return new J({
				title: "",
				message: "",
				isReverse: false,
				reversalDateValue: new Date(),
				reversalDateIsValid: true
			});
		},
		saveTemplateModel: function () {
			return new J({
				fields: {
					name: {
						valueState: V.None,
						valueStateText: ""
					},
					description: {
						valueState: V.None,
						valueStateText: ""
					}
				},
				buttons: {
					save: false,
					overwrite: false
				}
			});
		},
		model: function (d) {
			return new J(d);
		},
		duplicateCheckModel: function () {
			return new J({
				items: []
			});
		},
		copyModel: function () {
			return new J({
				addEntryBtn: undefined,
				listReport: undefined,
				copyBtnPressed: false,
				copyBtnEnabled: true,
				rowContext: undefined
			});
		},
		detailPageModel: function () {
			return new J({
				action: "display",
				mode: "",
				payReqType: null,
				bankEntryType: 0,
				bankDetails: {}
			});
		}
	};
});