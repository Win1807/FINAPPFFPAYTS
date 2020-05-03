/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object", "sap/ui/Global"], function (P, U) {
	"use strict";
	var M = "fin.ap.process.payments.ext.fragment.ManageTemplatesDialog";
	var a = P.extend("fin.ap.process.payments.ext.controller.ManageTemplatesDialog", {
		constructor: function (v) {
			var f;
			this.view = function () {
				return v;
			};
			f = U.xmlfragment(this.view().getId(), M, this);
			this.fragment = function () {
				return f;
			};
			this.itemsToDelete = [];
			this.view().addDependent(this.fragment());
		}
	});
	a.prototype.onManageTemplatesSavePress = function () {
		this.itemsToDelete.forEach(function (i) {
			this.view().getModel().callFunction("/deleteTemplate", {
				method: "POST",
				urlParameters: {
					"Origin": i.getModel().getProperty("PaymentRequestType", i.getBindingContext()),
					"TemplateID": i.getModel().getProperty("PaymentRequestVariant", i.getBindingContext())
				}
			});
		}.bind(this));
		this.itemsToDelete = [];
		this.closeDialog();
	};
	a.prototype.onDeleteItemPress = function (e) {
		var i = e.getParameter("listItem");
		i.setVisible(false);
		this.itemsToDelete.push(i);
	};
	a.prototype.showDialog = function () {
		this.refreshItems();
		this.fragment().open();
	};
	a.prototype.refreshItems = function () {
		var l = this.view().byId("manageTemplatesList");
		if (l && l.getModel()) {
			l.getModel().refresh();
		}
	};
	a.prototype.onManageTemplatesCancelPress = function () {
		this.itemsToDelete.forEach(function (i) {
			i.setVisible(true);
		});
		this.itemsToDelete = [];
		this.closeDialog();
	};
	a.prototype.closeDialog = function () {
		this.fragment().close();
	};
	return a;
});