/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["fin/ap/process/payments/lib/AppMode","fin/ap/process/payments/lib/Constants","fin/ap/process/payments/lib/Formatters","fin/ap/process/payments/model/additionalModels","fin/ap/process/payments/ext/controller/DuplicateCheckDialog","sap/ui/model/Filter","sap/ui/model/FilterOperator","jquery.sap.global","sap/ui/generic/app/navigation/service/NavigationHandler","fin/ap/process/payments/lib/AppState","sap/ui/generic/app/navigation/service/SelectionVariant","fin/ap/process/payments/ext/controller/CopyPaymentRequest"],function(A,C,F,a,D,b,c,$,N,d,S,e){"use strict";function L(){this.formatter=F;}L.prototype.onInit=function(){var f=a.btnModel();var p=this.getOwnerComponent().getEventingParent();p.setModel(f,"btnModel");var g=new e(this);var r=this.getOwnerComponent().getRouter();var s=this.byId("listReport");this.copyAction=function(){return g;};this.appMode=new A(f,this.getOwnerComponent());this.duplicateCheckDialog=new D(this.getView(),this.appMode);p.attachEvent("DETAIL_MODEL_SHARED",this.bindDuplicateCheckBtn,this);this.getView().setModel(f,"btnModel");this.appMode.initAppMode();this.initAppState();this.setSmartFilterDateType(true);this.adjustTableToolbar();s.setRequestAtLeastFields("PaymentBatch,BatchUUID,PaymentBatchItem,IsReversed,ClearingAccountingDocument");s.setIgnoredFields("PaymentRequestVariant");s.attachBeforeRebindTable(this.onBeforeRebindTable,this);s.getTable().attachItemPress(this.onItemPress,this);r.attachBeforeRouteMatched(this.onBeforeRouteMatched,this);r.attachRoutePatternMatched(this.onRoutePatternMatched,this);};L.prototype.adjustTableToolbar=function(){var f=this.byId("deleteEntry");if(f){f.setVisible(false);}};L.prototype.onBeforeRebindTable=function(f){var g=f.getParameter("bindingParams");var h=this.byId("editStateFilter");var i;if(this.appMode.getAppMode()==="request"){if(h.getSelectedKey()==="0"){i=this.correctFilters(g.filters);}}if(h.getSelectedKey()!=="1"){g.filters=this.modifyFilters(i||g.filters);}};L.prototype.correctFilters=function(f){if(!this.checkArray(this.findFilter(f))){return[new b([new b("CreatedByUser",c.EQ,this.appMode.getUser()),f[0]],true)];}else{return f;}};L.prototype.checkArray=function(f){return f.some(function(g){if(g instanceof Array){return this.checkArray(g);}else{return g;}}.bind(this));};L.prototype.findFilter=function(f){return f.map(function(g){if(g.hasOwnProperty("aFilters")){return this.findFilter(g.aFilters);}else{if(g.hasOwnProperty("sPath")&&(g.sPath==="CreatedByUser")){return true;}return false;}}.bind(this));};L.prototype.modifyFilters=function(f){return f.map(function(g){if(g.hasOwnProperty("aFilters")){return new b(this.modifyFilters(g.aFilters),g.bAnd);}else{if(g.hasOwnProperty("sPath")&&(g.sPath==="CreatedByUser")){return this.createModifiedFilter(g);}return g;}}.bind(this));};L.prototype.createModifiedFilter=function(f){var m=new b([new b("IsActiveEntity",c.EQ,false),new b("DraftAdministrativeData/DraftIsCreatedByMe",c.EQ,true),new b("CreatedByUser",c.EQ,"")],true);return new b([f,m],false);};L.prototype.setSmartFilterDateType=function(u){var s=this.byId("listReportFilter");s.setUseDateRangeType(u);};L.prototype.onBeforeRouteMatched=function(f){var i=false;var g=f.getParameter("arguments");if(g.hasOwnProperty("keys1")){i=true;}this.getView().getModel("btnModel").setProperty("/isDetailPage",i);};L.prototype.onAfterRendering=function(){var s=this.byId("listReportFilter");this.initAppTitle();if(s.isInitialised()){this.initSmartFilterBar();}else{s.attachInitialized(this.initSmartFilterBar,this);}this.getView().getModel("btnModel").setProperty("/appMode",this.appMode.getAppMode());this.initDuplicateCheckBtn();};L.prototype.onRoutePatternMatched=function(f){if(this.appMode.getAppMode()!=="request"){return;}var g=f.getParameter("arguments");if(!g.hasOwnProperty("?query")||!g["?query"].hasOwnProperty("sap-iapp-state")){setTimeout(function(){this.initSmartFilterBar();}.bind(this),0);}else{this.state.parseNavigation();}};L.prototype.handlerReceivedAppState=function(f){if(this.appMode.getAppMode()!=="request"){return;}var g=f.getParameter("applicationData");var s=new S(g&&g.selectionVariant?g.selectionVariant:undefined);var h=this.byId("listReportFilter");var i=s.getParameterNames().concat(s.getSelectOptionsPropertyNames()).filter(function(p){return p==="CreatedByUser";}).map(function(p){return s.getSelectOption(p)[0].Low;});if(i.length!==1||(i.length>0&&i[0]!==this.appMode.getUser())){s.removeSelectOption("CreatedByUser");s.addSelectOption("CreatedByUser","I",c.EQ,this.appMode.getUser(),null);h.setDataSuiteFormat(s.toJSONString(),true);}};L.prototype.initAppTitle=function(){var f=C.APP_MODES.filter(function(i){return i.appMode===this.appMode.getAppMode();}.bind(this))[0];var t=this.getResourceBundle().getText(f.title);this.shellAppTitle=sap.ui.getCore().byId("shellAppTitle");this.setAppTitle(t);this.shellAppTitle.attachEvent("textChanged",t,this.onTextChanged,this);};L.prototype.onExit=function(){if(this.shellAppTitle){this.shellAppTitle.detachEvent("textChanged",this.onTextChanged,this);}};L.prototype.onDuplicateCheckBtnPress=function(){this.duplicateCheckDialog.duplicateCheckBtnPress();};L.prototype.onCopyBtnPress=function(){this.copyAction().onCopyBtnPress();};L.prototype.onTextChanged=function(f,t){f.preventDefault();this.setAppTitle(t);};L.prototype.setAppTitle=function(t){document.title=t;this.shellAppTitle.setText(t);};L.prototype.initSmartFilterBar=function(){var s=this.byId("listReportFilter");var f=s.getControlByKey("CreatedByUser");var g=s.getFilterData();s.attachEventOnce("afterVariantLoad",null,this.initSmartFilterBar.bind(this));if(this.appMode.getAppMode()==="request"){g.CreatedByUser=this.appMode.getUser();f.setEditable(false);if(!this.isSetUserCreatedByFilter()){s.clear();s.setFilterData(g,true);s.search();}}};L.prototype.isSetUserCreatedByFilter=function(){var s=this.byId("listReportFilter");var f=s.getFilterData();return f.hasOwnProperty("CreatedByUser")&&this.isCreatedByCurrentUser(f.CreatedByUser);};L.prototype.isCreatedByCurrentUser=function(f){var g=this.appMode.getUser();return(f.value===g||(f.ranges[0]&&f.ranges[0].value1===g));};L.prototype.initDuplicateCheckBtn=function(){if(this.isDuplicateCheckBtnInitialized!==true){this.getView().byId("duplicateCheckBtn").setVisible(false);this.isDuplicateCheckBtnInitialized=true;}};L.prototype.bindDuplicateCheckBtn=function(f){var p=f.getParameter("eventingParent");this.getView().setModel(p.getModel("uiDetail"),"uiDetail");this.byId("duplicateCheckBtn").bindProperty("visible",{parts:[{path:"uiDetail>/createMode"},{path:"uiDetail>/editable"},{path:"btnModel>/isDetailPage"}],formatter:this.formatter.isDuplicateCheckBtnVisible});this.isDuplicateCheckBtnInitialized=true;};L.prototype.initAppState=function(){var n=this.newObject(N,this);this.state=this.newObject(d,n);this.state.attachStateReceived(this.handlerReceivedAppState,this);};L.prototype.onItemPress=function(f){var r=f.getParameter("listItem");r.getTable().data("selectedRow",r.getBindingContext());r.firePress();};L.prototype.onPaymentBatchBeforePopoverOpens=function(f){var p=f.getParameters();var s=p.semanticAttributesOfSemanticObjects.PaymentItem;var g={};g.PaymentBatch=s.PaymentItem;g.BatchUUID=s.BatchUUID;g.PaymentBatchItem=s.PaymentBatchItem;p.setSemanticAttributes(g,"PaymentItem");p.open();};L.prototype.newObject=function(T){return T.prototype instanceof sap.ui.base.Object?this.new.apply(this,arguments):null;};L.prototype.new=function(T){return new(Function.prototype.bind.apply(T,arguments))();};L.prototype.getResourceBundle=function(){return this.getView().getModel("i18n").getResourceBundle();};return sap.ui.controller("fin.ap.process.payments.ext.controller.ListReportExt",new L());},true);