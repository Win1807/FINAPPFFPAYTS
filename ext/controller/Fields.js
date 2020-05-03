/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object", "fin/ap/process/payments/lib/Constants", "fin/ap/process/payments/lib/Formatters",
	"fin/ap/process/payments/ext/controller/FieldMapper", "sap/ui/comp/smartfield/SmartField", "sap/ui/comp/navpopover/SmartLink",
	"sap/m/Input", "sap/ui/model/Binding", "sap/uxap/ObjectPageSubSectionMode"
], function (P, C, F, a, S, b, I, B, c) {
	"use strict";
	var d = P.extend("fin.ap.process.payments.ext.controller.Fields", {
		constructor: function (v, t) {
			var f = this.new(a);
			this.formatter = F;
			this.view = function () {
				return v;
			};
			this.templates = function () {
				return t;
			};
			this.fieldMapper = function () {
				return f;
			};
		}
	});
	d.prototype.initFields = function () {
		this.initAllFields();
		this.initAmountFields();
		this.initAccDocField();
		this.initClearingAccDocField();
		this.initPayReqTypeField();
		this.initDateFields();
		this.initIBANField();
		this.initBankFields();
		this.initBankDetailsFields();
		this.initTemplateField();
		this.initRepCodeField();
		this.initBankAccountField();
	};
	d.prototype.initSections = function () {
		var f;
		var g;
		var e;
		this.getSections().forEach(function (s) {
			if (s.getId().indexOf("Section") > -1) {
				f = this.getSectionForm(s);
				g = f.getGroups()[0].getId();
				e = this.getGroupFromId(g);
				this.bindControlVisible(s, {
					name: e,
					formatter: this.fieldMapper().isGroupAvailable.bind(this.fieldMapper(), e)
				});
			}
		}.bind(this));
	};
	d.prototype.expandSubSections = function (e) {
		var m = e ? c.Expanded : c.Collapsed;
		this.getSubSections().forEach(function (s) {
			if (s.getMoreBlocks().length > 0) {
				s.setMode(m);
			}
		});
	};
	d.prototype.getSubSections = function () {
		var s = this.byId("objectPage").getSections().reduce(function (e, f) {
			if (f.getId().indexOf("Section") > -1) {
				return e.concat(f.getSubSections());
			}
			return e;
		}, []);
		return s;
	};
	d.prototype.getSections = function () {
		var s = this.byId("objectPage").getSections().filter(function (e) {
			return e.getId().indexOf("Section") > -1;
		});
		s.shift();
		return s;
	};
	d.prototype.getSectionForm = function (s) {
		var e = s.getSubSections()[0];
		var f = e.getBlocks()[0];
		return f.getContent()[0];
	};
	d.prototype.getGroupFromId = function (i) {
		var e = i.substring(i.indexOf("--") + 2);
		var g = e.substr(0, e.indexOf("::"));
		return g;
	};
	d.prototype.initAllFields = function () {
		var s;
		this.fieldMapper().getFields().forEach(function (f) {
			s = this.getField(f.field, f.group);
			if (s instanceof S) {
				this.bindControlMandatory(s, {
					name: f.field
				});
				this.bindControlVisible(s, {
					name: f.field
				});
				s.attachEvent("initialise", f.field, this.onFieldInitialise, this);
			}
		}.bind(this));
	};
	d.prototype.onFieldInitialise = function (e, f) {
		var g = e.getSource();
		this.setFieldEditable(g, f);
		this.setFieldVisible(g);
	};
	d.prototype.setFieldVisible = function (f) {
		var v = (f.getEditable() || f.getValue()) ? f.getVisible() : false;
		f.setVisible(v);
	};
	d.prototype.setFieldEditable = function (f, e) {
		var g;
		var h;
		var i = this.view().getBindingContext();
		if (i) {
			g = this.getModel().getData(i.getPath());
			if (g) {
				h = this.fieldMapper().isFieldEditable(e, this.getModel("btnModel").getProperty("/appMode"), this.getModel("detailPage").getProperty(
					"/"));
				f.setEditable(h);
				this.bindControlEditable(f, {
					name: e
				});
			}
		}
	};
	d.prototype.initAmountFields = function () {
		var s;
		this.fieldMapper().getAmountFields().forEach(function (f) {
			s = this.getField(f.field, f.group);
			if (s instanceof S) {
				s.attachEvent("innerControlsCreated", f.currency, this.onAmountFieldControlsCreated, this);
			}
		}.bind(this));
	};
	d.prototype.onAmountFieldControlsCreated = function (e, f) {
		var g = e.getParameters();
		var h = g[1].getParent();
		var i = this.fieldMapper().getField(f);
		this.bindControlEditable(h, {
			name: i.field
		});
		this.bindControlVisible(h, {
			name: i.field
		});
	};
	d.prototype.initAccDocField = function () {
		var f = this.fieldMapper().getAccDocField();
		var s = this.getField(f.field, f.group);
		if (s instanceof S) {
			s.attachEvent("innerControlsCreated", this.onAccDocFieldControlsCreated, this);
		}
	};
	d.prototype.initClearingAccDocField = function () {
		var f = this.fieldMapper().getClearingAccDocField();
		var s = this.getField(f.field, f.group);
		if (s instanceof S) {
			s.attachEvent("innerControlsCreated", this.onClAccDocFieldControlsCreated, this);
		}
	};
	d.prototype.onAccDocFieldControlsCreated = function (e) {
		var s = e.getParameters()[0];
		if (s instanceof b) {
			s.attachEvent("beforePopoverOpens", this.onBeforePopoverOpens, this);
		}
	};
	d.prototype.onClAccDocFieldControlsCreated = function (e) {
		var s = e.getParameters()[0];
		var f = this.view().getBindingContext();
		var g;
		if ((s instanceof b) && f) {
			g = this.getModel().getData(f.getPath());
			s.setSemanticObject(g.IsReversed ? "" : "ClearingAccountingDocument");
			if (!g.IsReversed) {
				s.attachEvent("beforePopoverOpens", this.onBeforePopoverOpens, this);
			}
		}
	};
	d.prototype.onBeforePopoverOpens = function (e) {
		var s = e.getParameter("semanticAttributesOfSemanticObjects");
		var p = e.getParameters();
		delete s.AccountingDocument.CreatedByUser;
		p.open();
	};
	d.prototype.initPayReqTypeField = function () {
		var f = this.fieldMapper().getPayReqTypeField();
		var s = this.getField(f.field, f.group);
		if (s instanceof S) {
			s.bindProperty("mandatory", {
				path: "ui>/createMode"
			}).attachEvent("initialise", this.onPayReqFieldInitialise, this).attachEvent("change", this.onPayReqTypeFieldChange, this);
		}
	};
	d.prototype.onPayReqFieldInitialise = function (e) {
		var f = e.getSource();
		var g = this.getModel("ui").getProperty("/createMode");
		f.setEditable(g);
		f.bindProperty("editable", {
			path: "ui>/createMode"
		});
	};
	d.prototype.onPayReqTypeFieldChange = function () {
		this.resetAllFields();
		this.expandSubSections(false);
		this.resetBankDetailsRBGroup();
	};
	d.prototype.resetBankDetailsRBGroup = function () {
		var m = this.getModel("detailPage");
		var e = $.extend({}, m.getData(), {
			bankEntryType: 0
		});
		m.setData(e);
	};
	d.prototype.resetAllFields = function () {
		this.resetFields(this.fieldMapper().getAllFields());
	};
	d.prototype.resetBankDetailsFields = function () {
		this.resetFields(this.fieldMapper().getBankDetailsFields());
	};
	d.prototype.resetIBANField = function () {
		this.resetFields([this.fieldMapper().getIBANField()]);
	};
	d.prototype.initDateFields = function () {
		var s;
		var e = new Date();
		this.fieldMapper().getDateFields().forEach(function (f) {
			s = this.getField(f.field, f.group);
			if (s instanceof S) {
				s.attachEvent("innerControlsCreated", e, this.onDateFieldControlsCreated, this);
			}
		}.bind(this));
	};
	d.prototype.onDateFieldControlsCreated = function (e, f) {
		var g = e.getParameters()[0];
		if (g instanceof sap.m.DatePicker && !g.getDateValue()) {
			g.setDateValue(f);
		}
	};
	d.prototype.initIBANField = function () {
		var f;
		var e = this.fieldMapper().getIBANField();
		var g = this.getField(e.field, e.group);
		if (g instanceof S) {
			f = this.formatter.IBANFieldEnabled.bind(this.formatter);
			g.bindProperty("enabled", {
				path: "detailPage>/bankEntryType",
				formatter: f
			});
			f = this.formatter.IBANFieldVisible.bind(this.formatter, e.field, this.fieldMapper().isFieldVisible.bind(this.fieldMapper()));
			this.bindControlVisible(g, {
				name: e.field,
				formatter: f
			});
			g.attachEvent("change", this.onIBANFieldChange, this);
		}
	};
	d.prototype.onIBANFieldChange = function (e) {
		var f = e.getParameter("newValue");
		var i = this.getModel("detailPage").getProperty("/action") === C.PAY_REQUEST_ACTIONS.DISPLAY;
		if (f && !i) {
			this.applyBusy(this.loadBankDetails, f);
		} else {
			this.resetBankDetailsFields();
		}
	};
	d.prototype.loadBankDetails = function (e) {
		return this.templates().convert2BankAcct(e).then(function (f) {
			this.setFields(this.fieldMapper().getBankDetailsFields(), f);
		}.bind(this)).catch(function () {
			this.resetBankDetailsFields();
		}.bind(this));
	};
	d.prototype.setFields = function (f, e) {
		var p = this.view().getBindingContext().getPath();
		f.forEach(function (g) {
			if (e.hasOwnProperty(g.field)) {
				this.getModel().setProperty(p + "/" + g.field, e[g.field]);
			}
		}.bind(this));
	};
	d.prototype.resetFields = function (f) {
		var p = this.view().getBindingContext().getPath();
		var e;
		f.forEach(function (g) {
			e = this.getEmptyValue(g.field);
			if (e !== null) {
				this.getModel().setProperty(p + "/" + g.field, e);
			}
		}.bind(this));
	};
	d.prototype.getEmptyValue = function (f) {
		var i;
		var e;
		var g;
		var h;
		var j = new Date();
		i = this.fieldMapper().getAmountFields().some(function (k) {
			return k.field === f;
		});
		e = this.fieldMapper().getDateFields().some(function (k) {
			return k.field === f;
		});
		g = this.fieldMapper().getBoolFields().some(function (k) {
			return k.field === f;
		});
		h = this.fieldMapper().getPayReqTypeField().field === f;
		if (e) {
			return j;
		} else if (i) {
			return "0.0";
		} else if (g) {
			return false;
		} else if (h) {
			return null;
		} else {
			return "";
		}
	};
	d.prototype.initBankFields = function () {
		var f;
		var e;
		var g = this.fieldMapper().getBankDetailsFields();
		g.forEach(function (h) {
			e = this.getField(h.field, h.group);
			if (e instanceof S) {
				f = this.formatter.bankFieldEnabled.bind(this.formatter);
				e.bindProperty("enabled", {
					path: "detailPage>/bankEntryType",
					formatter: f
				});
				f = this.formatter.bankFieldVisible.bind(this.formatter, h.field, this.fieldMapper().isFieldVisible.bind(this.fieldMapper()));
				this.bindControlVisible(e, {
					name: h.field,
					formatter: f
				});
			}
		}.bind(this));
	};
	d.prototype.initBankDetailsFields = function () {
		this.bindingBankDetails = this.getModel("detailPage").bindProperty("/bankDetails");
		this.bindingBankDetails.attachChange(this.onBankDetailsBindingChange, this);
	};
	d.prototype.onBankDetailsBindingChange = function () {
		var e;
		var m = this.getModel("detailPage");
		var i = m.getProperty("/bankEntryType") === 0;
		var f = m.getProperty("/action") === C.PAY_REQUEST_ACTIONS.DISPLAY;
		if (i && !f) {
			e = this.checkBankDetailsFields();
			if (e) {
				this.applyBusy(this.loadIBAN, e);
			} else {
				this.resetIBANField();
			}
		}
	};
	d.prototype.checkBankDetailsFields = function () {
		var p = this.getModel("detailPage").getProperty("/bankDetails");
		var f = this.fieldMapper().getBankDetailsMandatoryFields().every(function (e) {
			return p.hasOwnProperty(e.field) && p[e.field];
		});
		return f ? p : null;
	};
	d.prototype.loadIBAN = function (e) {
		return this.templates().convert2IBAN(e).then(function (f) {
			this.setFields([this.fieldMapper().getIBANField()], f);
		}.bind(this));
	};
	d.prototype.applyBusy = function (m) {
		var p;
		if (m instanceof Function) {
			p = Array.prototype.slice.call(arguments, 1);
			this.view().setBusy(true);
			return m.apply(this, p).then(function () {}).catch(function () {}).then(function () {
				this.view().setBusy(false);
			}.bind(this));
		}
		return Promise.reject();
	};
	d.prototype.initTemplateField = function () {
		var f = this.fieldMapper().getPayReqVariantField();
		var s = this.getField(f.field, f.group);
		if (s instanceof S) {
			s.bindProperty("visible", {
				path: "ui>/createMode"
			}).bindProperty("editable", {
				path: "ui>/createMode"
			}).attachEvent("initialise", this.onPayReqFieldInitialise, this).attachChange(this.onTemplateFieldChange, this);
		}
	};
	d.prototype.onTemplateFieldChange = function (e) {
		var p;
		var f;
		var t = e.getParameter("newValue");
		this.resetAllFields();
		if (t) {
			p = "C_PaymentRequestVariantVH('" + encodeURIComponent(t) + "')";
			f = this.setTemplatePreloadedData(p);
			if (!f) {
				this.applyBusy(this.loadTemplate, t);
			}
		}
	};
	d.prototype.setTemplatePreloadedData = function (p) {
		var t;
		var e = this.getModel().getProperty("/");
		Object.keys(e).forEach(function (k) {
			if (k === p) {
				t = e[k];
				this.templates().modifyProperties(t);
				this.setFields(this.fieldMapper().getAllFields(), t);
			}
		}, this);
		return !!t;
	};
	d.prototype.loadTemplate = function (t) {
		return this.templates().loadTemplate(t).then(function (e) {
			this.setFields(this.fieldMapper().getAllFields(), e);
		}.bind(this));
	};
	d.prototype.initRepCodeField = function () {
		var f = this.fieldMapper().getRepCodeField();
		var s = this.getField(f.field, f.group);
		if (s instanceof S) {
			s.attachInnerControlsCreated(this.onRepCodeFieldControlsCreated, this).attachChange(this.onRepCodeChange, this);
		}
	};
	d.prototype.onRepCodeFieldControlsCreated = function (e) {
		var i = e.getParameters()[0];
		if (i instanceof I) {
			i.setValueHelpOnly(true);
		}
	};
	d.prototype.onRepCodeChange = function (e) {
		var n = e.getParameter("newValue");
		this.loadRepCodeData(n);
	};
	d.prototype.loadRepCodeData = function (r) {
		var e;
		var f = new RegExp("C_RepetitiveCodeVH.*RepetitiveCode='" + encodeURIComponent(r) + "'");
		var g = this.getModel().getProperty("/");
		Object.keys(g).forEach(function (k) {
			if (k.match(f)) {
				e = g[k];
			}
		});
		if (e) {
			this.resetAllFields();
			this.templates().modifyProperties(e);
			this.setFields(this.fieldMapper().getAllFields(), e);
		}
	};
	d.prototype.initBankAccountField = function () {
		var f = this.fieldMapper().getBankAccountField();
		var s = this.getField(f.field, f.group);
		if (s instanceof S) {
			this.bindControlVisible(s, {
				name: f.field,
				formatter: this.formatter.bankAccFieldVisible.bind(this.formatter, f.field, this.fieldMapper().isFieldVisible.bind(this.fieldMapper()))
			});
		}
	};
	d.prototype.bindControlProperty = function (e, p, f, g) {
		var h = [{
			path: "btnModel>/appMode"
		}, {
			path: "detailPage>/"
		}];
		if (Array.isArray(g)) {
			h = h.concat(g.map(function (i) {
				return {
					path: i
				};
			}));
		}
		e.bindProperty(p, {
			parts: h,
			formatter: f
		});
	};
	d.prototype.bindControlVisible = function (e, p) {
		this.bindControlProperty(e, "visible", p.formatter || this.fieldMapper().isFieldVisible.bind(this.fieldMapper(), p.name), [p.name]);
	};
	d.prototype.bindControlMandatory = function (e, p) {
		this.bindControlProperty(e, "mandatory", p.formatter || this.fieldMapper().isFieldMandatory.bind(this.fieldMapper(), p.name));
	};
	d.prototype.bindControlEditable = function (e, p) {
		this.bindControlProperty(e, "editable", p.formatter || this.fieldMapper().isFieldEditable.bind(this.fieldMapper(), p.name));
	};
	d.prototype.getModel = function (i) {
		return this.view().getModel(i);
	};
	d.prototype.byId = function (i) {
		return this.view().byId(i);
	};
	d.prototype.getField = function (f, g, s) {
		return this.byId(g + "::" + f + "::Field" + (s || ""));
	};
	d.prototype.new = function (T) {
		return new(Function.prototype.bind.apply(T, arguments))();
	};
	return d;
});