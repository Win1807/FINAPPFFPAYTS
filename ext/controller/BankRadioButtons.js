/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object","fin/ap/process/payments/lib/Formatters","sap/ui/Global","jquery.sap.global"],function(P,F,U,$){"use strict";var B=P.extend("fin.ap.process.payments.ext.controller.BankRadioButtons",{constructor:function(v){var f;this.formatter=F;this.view=function(){return v;};f=U.xmlfragment(this.view().getId(),"fin.ap.process.payments.ext.fragment.BankRadioButtons",this);this.fragment=function(){return f;};}});B.prototype.initBankRadioButtons=function(){var p=this.view().byId("PayeeBankFAC::Form").getGroups()[0];var f=p.getFormElements();f.unshift(this.fragment());p.removeAllFormElements();f.forEach(function(a){p.addFormElement(a);});};B.prototype.onBankRadioButtonsSelect=function(e){var d;var s=e.getParameter("selectedIndex");d=$.extend({},this.view().getModel("detailPage").getData(),{bankEntryType:s});this.view().getModel("detailPage").setData(d);};return B;});
