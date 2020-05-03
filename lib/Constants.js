/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([],function(){"use strict";var A=[{appMode:"process",activity:["02","03","43","85"],title:"TITLE_PROCESS"},{appMode:"request",activity:["01","03","85"],title:"TITLE_MY"}];var a=[{activity:"01",buttons:["createBtn"]},{activity:"02",buttons:["postBtn","postAndReleaseBtn"]},{activity:"03",buttons:[]},{activity:"43",buttons:["releaseBtn","postAndReleaseBtn"]},{activity:"85",buttons:["reverseBtn"]}];var S=[{code:"I0559",name:"Reversed"},{code:"I0002",name:"Released"},{code:"I0001",name:"Created"},{code:"ICL08",name:"Posted"},{code:"IBC26",name:"Cleared"}];var R=["Posted"];var b=["Posted","Created","Released"];var P=["Created"];var c=["Created"];var E=["Created"];var B=[{id:"postAndReleaseBtn",settings:{text:"POST_AND_RELEASE",type:"Accept"},statuses:c},{id:"releaseBtn",settings:{text:"RELEASE",type:"Accept"},statuses:R},{id:"postBtn",settings:{text:"POST",type:"Accept"},statuses:P},{id:"reverseBtn",settings:{text:"REVERSE",type:"Reject"},statuses:b}];var d=[{code:"FI-BL",name:"ffp"},{code:"FI-AR-PR",name:"customer"},{code:"FI-AP-PR",name:"supplier"}];var e="repcode";var f={CREATE:"create",EDIT:"edit",DISPLAY:"display"};var g={POST_AND_RELEASE:{name:"postAndRelease",title:"POST_AND_RELEASE",message:"POST_AND_RELEASE_ID",success:"PAYMENT_POSTED_AND_RELEASED"},RELEASE:{name:"release",title:"RELEASE",message:"RELEASE_ID",path:"/releasePayment",success:"PAYMENT_RELEASED"},POST:{name:"post",title:"POST",message:"POST_ID",path:"/postPayment",success:"PAYMENT_POSTED"},REVERSE:{name:"reverse",title:"REVERSE",message:"REVERSE_ID",path:"/reversePayment",success:"PAYMENT_REVERSED"}};var C=["__metadata","PaymentRequest","Delete_mc","DraftUUID","HasActiveEntity","HasDraftEntity","IsActiveEntity","DraftAdministrativeData","Activation_ac","Edit_ac","Preparation_ac","Validation_ac","DraftEntityCreationDateTime","DraftEntityLastChangeDateTime","to_ChangeUserContactCard","to_UserContactCard","SiblingEntity"];var h=["templateName","templateDescription"];var i={bankDetailsEntry:0,ibanEntry:1};return{APP_MODES:A,ACTIVITIES:a,STATUSES:S,RELEASE_STATUSES:R,REVERSE_STATUSES:b,POST_STATUSES:P,POST_AND_RELEASE_STATUSES:c,EDIT_STATUSES:E,BUTTON_CONFIGS:B,PAYMENT_REQUEST_TYPES:d,PAY_REQUEST_ACTIONS:f,ACTIONS:g,COPY_EXCLUDED_FLDS:C,SAVETEMPLATE_INPUT_IDS:h,REP_CODE_TYPE:e,BANK_ENTRY_TYPES:i};});