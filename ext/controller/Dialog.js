/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/Global"],function(P,U){"use strict";var D=P.extend("fin.ap.process.payments.ext.controller.Dialog",{constructor:function(v,a){var f;this.view=function(){return v;};this.action=a;f=U.xmlfragment(this.view().getId(),"fin.ap.process.payments.ext.fragment.Dialog",this);this.fragment=function(){return f;};this.view().addDependent(this.fragment());}});D.prototype.onReversalDateChange=function(e){var i=e.getParameter("valid");var n=e.getSource().getDateValue();var a=n!==null&&n instanceof Date;this.view().getModel("dialog").setProperty("/reversalDateIsValid",i&&a);};D.prototype.showDialog=function(){this.fragment().open();this.view().getModel("dialog").setProperty("/reversalDateValue",new Date());this.view().getModel("dialog").setProperty("/reversalDateIsValid",true);};D.prototype.onActionPress=function(){this.action();this.closeDialog();};D.prototype.onCancelPress=function(){this.closeDialog();};D.prototype.closeDialog=function(){this.fragment().close();this.fragment().destroy();};return D;});
