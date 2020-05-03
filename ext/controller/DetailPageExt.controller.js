/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/Global", "sap/ui/model/Binding", "fin/ap/process/payments/model/additionalModels",
	"fin/ap/process/payments/lib/Messages", "fin/ap/process/payments/lib/Constants", "fin/ap/process/payments/lib/Formatters",
	"fin/ap/process/payments/ext/controller/Footer", "fin/ap/process/payments/ext/controller/Templates",
	"fin/ap/process/payments/ext/controller/Fields", "fin/ap/process/payments/ext/controller/CopyPaymentRequest",
	"fin/ap/process/payments/ext/controller/Bindings", "fin/ap/process/payments/ext/controller/BankRadioButtons",
	"sap/ui/comp/navpopover/SmartLink", "sap/ui/comp/smartfield/SmartField"
], function (U, B, a, M, C, F, b, T, c, d, e, f, S, g) {
	"use strict";
	var D = function Controller() {
		this.messages = M;
		this.formatter = F;
	};
	D.prototype.onInit = function () {
		var h = new b(this.getView(), this.getResourceBundle());
		var t = new T(this.getView(), this.getResourceBundle());
		var i = new c(this.getView(), t);
		this.initButtonModel();
		var j = new d(this);
		var k = new e(this.getView());
		var l = new f(this.getView());
		this.footer = function () {
			return h;
		};
		this.templates = function () {
			return t;
		};
		this.fields = function () {
			return i;
		};
		this.copyAction = function () {
			return j;
		};
		this.bindings = function () {
			return k;
		};
		this.bankRadioButtons = function () {
			return l;
		};
		this.getView().setModel(a.dialogModel(), "dialog");
		this.getView().setModel(this.messages.getMessageModel(), "message");
		this.getView().setModel(a.saveTemplateModel(), "saveTemplate");
		this.getView().setModel(a.detailPageModel(), "detailPage");
		this.adjustHeader();
		this.extensionAPI.attachPageDataLoaded(this.onPageDataLoaded.bind(this));
	};
	D.prototype.adjustHeader = function () {
		this.removeDelete();
		this.adjustHeaderFields();
	};
	D.prototype.removeDelete = function () {
		var h = this.byId("delete");
		if (h) {
			h.destroy();
		}
	};
	D.prototype.adjustHeaderFields = function () {
		var h;
		var i = [{
			fieldGroup: "HEADER1",
			dataField: "PaymentBatch",
			beforePopoverOpens: this.onPaymentBatchBeforePopoverOpens
		}, {
			fieldGroup: "HEADER2",
			dataField: "PaymentBatchStatusText"
		}];
		i.forEach(function (j) {
			h = this.getHeaderDataField(j.fieldGroup, j.dataField);
			if (h) {
				h.bindProperty("visible", {
					path: j.dataField,
					formatter: this.formatter.hasValue
				});
				if (j.hasOwnProperty("beforePopoverOpens")) {
					this.attachDataFieldBeforePopoverOpens(h, j.beforePopoverOpens);
				}
			}
		}, this);
	};
	D.prototype.attachDataFieldBeforePopoverOpens = function (h, i) {
		var s = this.getSmartFieldItem(h);
		s.getSemanticObjectController().attachBeforePopoverOpens(i, this);
	};
	D.prototype.getSmartFieldItem = function (h) {
		var i = [];
		var s = [];
		if (h.getItems) {
			i = h.getItems();
		}
		s = i.filter(function (j) {
			return j instanceof g;
		});
		return s.length > 0 ? s[0] : null;
	};
	D.prototype.getHeaderDataField = function (h, i) {
		var j;
		var k;
		var l = this.getHeaderFieldGroup(h).getItems().filter(function (m) {
			k = m.getItems();
			if (k.length > 0) {
				j = k[0].getId();
				return j.match("::" + i + "::");
			} else {
				return false;
			}
		});
		return l.length > 0 ? l[0] : null;
	};
	D.prototype.getHeaderFieldGroup = function (q) {
		var h = [];
		var i;
		var j = this.byId("objectPage").getHeaderContent();
		if (j.length > 0) {
			i = j[0].getItems();
			h = i.filter(function (v) {
				return v.getId().indexOf(q) > -1;
			});
		}
		return h.length > 0 ? h[0] : null;
	};
	D.prototype.onPaymentBatchBeforePopoverOpens = function (h) {
		var p = h.getParameters();
		var s = p.semanticAttributesOfSemanticObjects.PaymentItem;
		var i = {};
		i.PaymentBatch = s.PaymentItem;
		i.BatchUUID = s.BatchUUID;
		i.PaymentBatchItem = s.PaymentBatchItem;
		p.setSemanticAttributes(i, "PaymentItem");
		p.open();
	};
	D.prototype.onAfterRendering = function () {
		this.templates().initTemplateButtons();
		this.bankRadioButtons().initBankRadioButtons();
		this.adjustEditButton();
		this.fields().initSections();
		this.fields().initFields();
		this.shareUIModel();
		this.initMessages();
		this.addHeaderSpacer();
		this.attachSmartLinksPress();
	};
	D.prototype.attachSmartLinksPress = function () {
		var h = [this.fields().getField("PayeeBankInternalID", "PayeeBankGroup"), this.fields().getField("PayeeBankAccount", "PayeeBankGroup")];
		var s;
		h.forEach(function (i) {
			i.attachInnerControlsCreated(null, function (j) {
				s = j.getSource().getContent();
				if (s instanceof S) {
					s.attachBeforePopoverOpens(s.getProperty("fieldName"), this.onBeforeSmartlinkPopoverOpens);
					s.attachNavigationTargetsObtained(null, this.onNavigationTargetObtained.bind(this));
				}
			}.bind(this));
		}.bind(this));
	};
	D.prototype.onNavigationTargetObtained = function (h) {
		if (h.getParameter("semanticObject") === "BankAccount") {
			this.copySemanticAttribute(h, "BankAccount-manageMasterData", "PayeeBankName", "BankName");
			this.copySemanticAttribute(h, "BankAccount-manageMasterData", "PayeeBankInternalID", "Bank");
			this.copySemanticAttribute(h, "BankAccount-manageMasterData", "PayeeBankCountry", "BankCountry");
			this.copySemanticAttribute(h, "BankAccount-manageMasterData", "", "CreatedByUser");
			this.copySemanticAttribute(h, "BankAccount-manageMasterData", "", "CompanyCodeName");
		}
	};
	D.prototype.copySemanticAttribute = function (h, s, i, j) {
		var k = h.getParameter("semanticAttributes");
		var l = h.getParameter("actions").filter(function (n) {
			return n.getKey() === s;
		})[0];
		var m = l.getHref();
		m = this.replaceUrlParam(m, j, k[i] ? k[i] : "");
		l.setHref(m);
		k[j] = k[i] ? k[i] : "";
	};
	D.prototype.replaceUrlParam = function (u, p, h) {
		var i = new RegExp("\\b(" + p + "=).*?(&|$)");
		if (u.search(i) >= 0) {
			return u.replace(i, "$1" + h + "$2");
		}
		u = u.replace(/\?$/, "");
		return u + (u.indexOf("?") > 0 ? "&" : "?") + p + "=" + h;
	};
	D.prototype.onBeforeSmartlinkPopoverOpens = function (h, i) {
		var p = h.getParameters();
		var s = p.semanticAttributes;
		if (s.PayeeBankName) {
			s.BankName = s.PayeeBankName;
		}
		if (i === "PayeeBankAccount") {
			s.Bank = "";
			s.HouseBank = "";
			s.HouseBankAccount = "";
			s.BankCountry = s.PayeeBankCountry;
			s.CreatedByUser = "";
			s.CompanyCodeName = "";
			s.BankName = s.PayeeBankName;
		}
		p.setSemanticAttributes(s);
	};
	D.prototype.adjustEditButton = function () {
		var h = this.byId("edit");
		h.bindProperty("enabled", {
			path: "StatusCode",
			formatter: this.formatter.isActionEnabled.bind(this.formatter, C.EDIT_STATUSES)
		});
	};
	D.prototype.initButtonModel = function () {
		var p = this.getOwnerComponent().getEventingParent();
		var h = p.getModel("btnModel");
		this.getView().setModel(h, "btnModel");
	};
	D.prototype.onPageDataLoaded = function () {
		if (this.messages.getMessages().length > 0) {
			this.messages.closePopover();
			this.messages.clearMessages();
		}
		this.initBindings();
		this.fields().expandSubSections(false);
		this.adjustBatchNumber();
		this.getOwnerComponent().getEventingParent().getModel("btnModel").setProperty("/isDetailPage", true);
	};
	D.prototype.initBindings = function () {
		this.bindings().initBindings();
		this.initBindingAppMode();
	};
	D.prototype.initBindingAppMode = function () {
		this.bindings().createBindings(this.onBindingAppModeChange, [{
			model: "btnModel",
			path: "/appMode"
		}], this);
	};
	D.prototype.onBindingAppModeChange = function (h) {
		var v = h.getSource().getValue();
		if (v) {
			this.footer().initFooter();
		}
	};
	D.prototype.adjustBatchNumber = function () {
		var p = this.getView().getBindingContext().getPath() + "/PaymentBatch";
		var h = this.getModel().getProperty(p);
		if (h) {
			this.getModel().setProperty(p, this.formatter.removeLeadingZeros(h));
		}
	};
	D.prototype.getMessageButton = function () {
		return this.footer().getMessageButton();
	};
	D.prototype.shareUIModel = function () {
		var u = this.getView().getModel("ui");
		var p = this.getOwnerComponent().getEventingParent();
		p.setModel(u, "uiDetail");
		setTimeout(function () {
			p.fireEvent("DETAIL_MODEL_SHARED", {
				eventingParent: p
			});
		}, 0);
	};
	D.prototype.addHeaderSpacer = function () {
		var i;
		var o = this.byId("objectPage");
		var h = o.getHeaderContent()[0];
		if (h) {
			i = h.getItems()[0];
			if (i) {
				i.addStyleClass("sapUiSmallMarginEnd");
			}
		}
	};
	D.prototype.initMessages = function () {
		var m = this.byId("showMessages");
		m.bindProperty("text", {
			path: "message>/",
			formatter: this.formatter.getMessagesCount
		}).bindProperty("visible", {
			path: "message>/",
			formatter: this.formatter.hasMessages
		});
		this.messages.setMessageIndicator(m);
		this.overrideMessageHandling();
	};
	D.prototype.overrideMessageHandling = function () {
		var m;
		var h = this.getModel()["mEventRegistry"];
		if (h && h.messageChange) {
			m = h.messageChange[0];
			this.getModel().detachMessageChange(m.fFunction, m.oListener);
			this.getModel().attachMessageChange(m, this.onMessageChange, this);
		}
	};
	D.prototype.onMessageChange = function (h, m) {
		var o = h.getParameter("oldMessages");
		var n = h.getParameter("newMessages");
		if (o && o.length > 0) {
			h["mParameters"].oldMessages = [];
		}
		if (n && n.length > 0) {
			h["mParameters"].newMessages = this.removeDuplicateMessages(n);
			m.fFunction.call(m.oListener, h);
		}
	};
	D.prototype.removeDuplicateMessages = function (m) {
		var h = this.messages.getMessageModel().getData();
		var i = h.map(function (k) {
			return k.message;
		});
		var j = m.map(function (k) {
			return k.message;
		});
		return m.filter(function (k, l) {
			return j.indexOf(k.message) === l && (i.indexOf(k.message) === -1);
		});
	};
	D.prototype.onManageTemplatesActionBtnPress = function () {
		this.templates().openManageTemplatesDialog();
	};
	D.prototype.onSaveTemplateBtnPress = function () {
		return this.templates().openSaveTemplateDialog();
	};
	D.prototype.onCopyBtnPress = function () {
		this.copyAction().onCopyBtnPress();
	};
	D.prototype.refresh = function () {
		this.extensionAPI.refresh();
	};
	D.prototype.getModel = function (i) {
		return this.getView().getModel(i);
	};
	D.prototype.byId = function (i) {
		return this.getView().byId(i);
	};
	D.prototype.getResourceBundle = function () {
		return this.getOwnerComponent().getModel("i18n").getResourceBundle();
	};
	return sap.ui.controller("fin.ap.process.payments.ext.controller.DetailPageExt", new D());
});