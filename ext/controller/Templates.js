/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object", "fin/ap/process/payments/lib/Messages", "fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/lib/Formatters", "fin/ap/process/payments/ext/controller/ManageTemplatesDialog",
	"fin/ap/process/payments/ext/controller/SaveTemplateDialog", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (P, M, C, F, a, S, b, c) {
	"use strict";
	var T = P.extend("fin.ap.process.payments.ext.controller.Templates", {
		constructor: function (v, r) {
			var m;
			var s;
			this.messages = M;
			this.formatter = F;
			this.view = function () {
				return v;
			};
			this.resourceBundle = function () {
				return r;
			};
			m = this.new(a, this.view());
			this.manageTemplatesDialog = function () {
				return m;
			};
			s = this.new(S, this.view());
			this.saveTemplateDialog = function () {
				return s;
			};
		}
	});
	T.prototype.initTemplateButtons = function () {
		var m = this.byId("action::ManageTemplatesActionBtn");
		var s = this.byId("action::saveTemplateBtn");
		if (m) {
			m.bindProperty("visible", {
				path: "ui>/createMode"
			});
		}
		if (s) {
			s.bindProperty("visible", {
				path: "ui>/createMode"
			}).bindProperty("enabled", {
				path: "detailPage>/payReqType",
				formatter: this.formatter.saveTemplateBtnEnabled.bind(this.formatter)
			});
		}
	};
	T.prototype.openSaveTemplateDialog = function () {
		return new Promise(function (r) {
			this.getTemplateNames().then(function (t) {
				this.saveTemplateDialog().showDialog(t);
				r();
			}.bind(this));
		}.bind(this));
	};
	T.prototype.getTemplateNames = function () {
		var t;
		return new Promise(function (r) {
			this.getModel().read("/C_PaymentRequestVariantVH", {
				success: function (d) {
					t = d.results.map(function (e) {
						return e.PaymentRequestVariant;
					});
					r(t);
				}
			});
		}.bind(this));
	};
	T.prototype.openManageTemplatesDialog = function () {
		this.manageTemplatesDialog().showDialog();
	};
	T.prototype.loadTemplate = function (t) {
		var e = {
			text: "ERROR_VARIANT",
			args: [t]
		};
		return new Promise(function (r, d) {
			this.getTemplate(t).then(function (f) {
				r(f);
			}).catch(function () {
				this.messages.addErrorMessage(this.resourceBundle().getText(e.text, e.args));
				d();
			}.bind(this));
		}.bind(this));
	};
	T.prototype.getTemplate = function (t) {
		return new Promise(function (r, d) {
			this.getModel().read("/C_PaymentRequestVariantVH", {
				filters: [new b("PaymentRequestVariant", c.EQ, t)],
				success: function (e) {
					if (e.results.length === 0) {
						d();
					} else {
						e = e.results[0];
						this.modifyProperties(e);
						r(e);
					}
				}.bind(this),
				error: function (e) {
					d();
				}
			});
		}.bind(this));
	};
	T.prototype.modifyProperties = function (d) {
		this.removeUnavailableProperties(d);
		this.renameProperties(d);
	};
	T.prototype.removeUnavailableProperties = function (d) {
		var u = ["__metadata", "PaymentRequestVariantText", "RcvgPaytBusPartnerCategory", "GLAccount", "PaymentRequestAmountInCCCrcy",
			"CompanyCodeCurrency"
		];
		u.forEach(function (p) {
			delete d[p];
		});
	};
	T.prototype.renameProperties = function (d) {
		var p = [{
			original: "BankCountryKey",
			expected: "PayeeBankCountry"
		}, {
			original: "BankCountry",
			expected: "PayeeBankCountry"
		}, {
			original: "BankKey",
			expected: "PayeeBankInternalID"
		}, {
			original: "BankNumber",
			expected: "PayeeBank"
		}, {
			original: "BankAccount",
			expected: "PayeeBankAccount"
		}, {
			original: "BankControlKey",
			expected: "PayeeBankControlKey"
		}, {
			original: "RcvgPaytBusPartnerReference",
			expected: "Supplier"
		}, {
			original: "PartnerBankDetailKey",
			expected: "SupplierBankType"
		}, {
			original: "Currency",
			expected: "PaymentRequestCurrency"
		}, {
			original: "IBAN",
			expected: "PayeeIBAN"
		}];
		p.forEach(function (e) {
			if (d.hasOwnProperty(e.original)) {
				d[e.expected] = d[e.original];
				delete d[e.original];
			}
		});
	};
	T.prototype.convert2BankAcct = function (I) {
		return new Promise(function (r, d) {
			this.getModel().callFunction("/convert2BankAcct", {
				urlParameters: {
					"IBAN": I
				},
				success: function (e) {
					this.modifyProperties(e);
					r(e);
				}.bind(this),
				error: function (e) {
					this.messages.addErrorMessage(e);
					d();
				}.bind(this)
			});
		}.bind(this));
	};
	T.prototype.convert2IBAN = function (p) {
		return new Promise(function (r, d) {
			this.getModel().callFunction("/convert2IBAN", {
				urlParameters: {
					"BankCountryKey": p.PayeeBankCountry,
					"BankKey": p.PayeeBankInternalID,
					"BankAccountNumber": p.PayeeBankAccount,
					"BankControlKey": p.PayeeBankControlKey || ""
				},
				success: function (e) {
					this.modifyProperties(e);
					r(e);
				}.bind(this),
				error: function (e) {
					this.messages.addErrorMessage(e);
					d();
				}.bind(this)
			});
		}.bind(this));
	};
	T.prototype.getMessageButton = function () {
		if (!this.messageButton) {
			this.messageButton = this.byId("messagePopoverButton");
		}
		return this.messageButton;
	};
	T.prototype.getModel = function (i) {
		return this.view().getModel(i);
	};
	T.prototype.byId = function (i) {
		return this.view().byId(i);
	};
	T.prototype.new = function (d) {
		return new(Function.prototype.bind.apply(d, arguments))();
	};
	return T;
});