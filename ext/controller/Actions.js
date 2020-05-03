/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object", "fin/ap/process/payments/lib/Messages", "fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters", "jquery.sap.global", "jquery.sap.promise"
], function (P, M, C, F, $) {
	"use strict";
	var A = P.extend("fin.ap.process.payments.ext.controller.Actions", {
		constructor: function (v, r) {
			this.messages = M;
			this.formatter = F;
			this.view = function () {
				return v;
			};
			this.resourceBundle = function () {
				return r;
			};
		}
	});
	A.prototype.releasePayment = function () {
		return this.processPayment(C.ACTIONS.RELEASE, {});
	};
	A.prototype.reversePayment = function () {
		var r = this.byId("reasonSelect").getSelectedKey();
		var a = {
			ReversalReason: r
		};
		var d = this.byId("reverseDatePicker").getDateValue();
		if (d) {
			a.ReversalDate = this.formatter.formatDate(d);
		}
		return this.processPayment(C.ACTIONS.REVERSE, a);
	};
	A.prototype.postPayment = function () {
		return this.processPayment(C.ACTIONS.POST, {});
	};
	A.prototype.postAndReleasePayment = function () {
		return this.postPayment().then(function () {
			return this.releasePayment();
		}.bind(this));
	};
	A.prototype.processPayment = function (a, b) {
		var m;
		var p = this.getBindingContext().getProperty("PaymentRequest");
		var u = {
			RequestId: p
		};
		return new Promise(function (r, c) {
			this.view().getModel().callFunction(a.path, {
				urlParameters: $.extend({}, u, b),
				method: "POST",
				success: function (d) {
					m = this.resourceBundle().getText(a.success, p);
					this.addSuccessMessages(d.results || m);
					this.messages.showMessageToast(m);
					r();
				}.bind(this),
				error: function (e) {
					this.messages.addErrorMessage(e);
					c();
				}.bind(this)
			});
		}.bind(this));
	};
	A.prototype.getReversalReasons = function () {
		return new Promise(function (r, a) {
			this.view().getModel().read("/C_PaytReqReversalReasonVH", {
				success: function (d) {
					r(d);
				},
				error: function (e) {
					this.messages.addErrorMessage(e);
					a();
				}.bind(this)
			});
		}.bind(this));
	};
	A.prototype.performAction = function (a) {
		var b = this.getActionFunction(a);
		if (b) {
			this.view().setBusy(true);
			return b().then(function () {
				this.refresh();
			}.bind(this)).catch(function () {
				this.refresh();
			}.bind(this)).then(function () {
				this.view().setBusy(false);
			}.bind(this));
		}
	};
	A.prototype.getActionFunction = function (a) {
		var b = this[a + "Payment"];
		return b ? b.bind(this) : null;
	};
	A.prototype.addSuccessMessages = function (m) {
		if (m instanceof Array) {
			m.forEach(function (a) {
				this.messages.addSuccessMessage(a.Message);
			}.bind(this));
		} else {
			this.messages.addSuccessMessage(m);
		}
	};
	A.prototype.refresh = function () {
		this.view().getController().extensionAPI.refresh();
	};
	A.prototype.getBindingContext = function () {
		return this.view().getBindingContext();
	};
	A.prototype.byId = function (i) {
		return this.view().byId(i);
	};
	return A;
});