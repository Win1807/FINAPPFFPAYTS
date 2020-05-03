/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object", "fin/ap/process/payments/lib/Constants", "jquery.sap.global"], function (P, C, $) {
	"use strict";
	var B = P.extend("fin.ap.process.payments.ext.controller.Bindings", {
		constructor: function (v) {
			this.view = function () {
				return v;
			};
		}
	});
	B.prototype.initBindings = function () {
		var p = this.view().getBindingContext().getPath();
		this.bindingsAction = this.setBindings(this.bindingsAction, this.onBindingActionChange, [{
			model: "ui",
			path: "/editable"
		}, {
			model: "ui",
			path: "/createMode"
		}]);
		this.bindingPayReqType = this.setBindings(this.bindingPayReqType, this.onBindingPayReqTypeChange, [{
			model: undefined,
			path: p + "/PaymentRequestType"
		}]);
		this.bindingsMode = this.setBindings(this.bindingsMode, this.onBindingModeChange, [{
			model: undefined,
			path: p + "/RepetitiveCode"
		}, {
			model: "detailPage",
			path: "/payReqType"
		}]);
		this.bindingsBankDetails = this.setBindings(this.bindingsBankDetails, this.onBindingBankDetailsChange, this.getBankDetailsSettings(p));
	};
	B.prototype.getBankDetailsSettings = function (p) {
		var f = ["PayeeBankCountry", "PayeeBank", "PayeeBankInternalID", "PayeeBankAccount", "PayeeBankControlKey", "BankDetailReference"];
		return f.map(function (a) {
			return {
				model: undefined,
				path: p + "/" + a
			};
		}, this);
	};
	B.prototype.setBindings = function (o, h, s) {
		var b = o;
		if (Array.isArray(b) && b.length > 0) {
			b.forEach(function (a, i) {
				a.sPath = s[i].path;
			});
		} else {
			b = this.createBindings(h, s);
		}
		return b;
	};
	B.prototype.createBindings = function (h, s, t) {
		var b = s.map(function (i) {
			return this.getModel(i.model).bindProperty(i.path);
		}.bind(this));
		this.attachBindingsChange(b, h, t);
		return b;
	};
	B.prototype.attachBindingsChange = function (b, h, t) {
		b.forEach(function (a) {
			a.detachChange(h);
			a.attachChange(h, t || this);
			a.refresh(true);
		}.bind(this));
	};
	B.prototype.onBindingActionChange = function () {
		var i = this.getModel("ui").getProperty("/editable");
		var a = this.getModel("ui").getProperty("/createMode");
		var b = C.PAY_REQUEST_ACTIONS.DISPLAY;
		if (i) {
			b = (a) ? C.PAY_REQUEST_ACTIONS.CREATE : C.PAY_REQUEST_ACTIONS.EDIT;
		}
		this.setData({
			action: b
		});
	};
	B.prototype.onBindingPayReqTypeChange = function () {
		var p;
		var a = this.getBindingPath();
		if (a) {
			p = this.getModel().getProperty(a + "/PaymentRequestType");
			this.setData({
				payReqType: this.getPaymentRequestType(p)
			});
		}
	};
	B.prototype.onBindingModeChange = function () {
		var i;
		var p;
		var a = this.getBindingPath();
		if (a) {
			i = !!this.getModel().getProperty(a + "/RepetitiveCode");
			p = this.getModel("detailPage").getProperty("/payReqType");
			this.setData({
				mode: this.getMode(p, i)
			});
		}
	};
	B.prototype.onBindingBankDetailsChange = function (e) {
		var s = e.getSource();
		var p = s.getPath();
		var a = p.slice(p.lastIndexOf("/") + 1);
		var v = s.getValue();
		var d = {
			bankDetails: {}
		};
		d.bankDetails[a] = v;
		this.setData(d);
	};
	B.prototype.setData = function (n) {
		var m = this.getModel("detailPage");
		var d = $.extend(true, {}, m.getData(), n);
		m.setData(d);
	};
	B.prototype.getPaymentRequestType = function (p) {
		return p ? this.findPaymentRequestType(p).name : null;
	};
	B.prototype.findPaymentRequestType = function (p) {
		var a = C.PAYMENT_REQUEST_TYPES.filter(function (t) {
			return p === t.code;
		});
		return (a.length > 0) ? a[0] : C.PAYMENT_REQUEST_TYPES[0];
	};
	B.prototype.getBindingPath = function () {
		var b = this.view().getBindingContext();
		return b ? b.getPath() : null;
	};
	B.prototype.getMode = function (p, i) {
		return i ? C.REP_CODE_TYPE : p;
	};
	B.prototype.getModel = function (i) {
		return this.view().getModel(i);
	};
	return B;
});