/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([], function() {
	"use strict";

	/**
	 * View mode for current user (reduces activities)
	 */
	var APP_MODES = [{
		appMode: "process",
		activity: ["02", "03", "43", "85"],
		title: "TITLE_PROCESS"
	}, {
		appMode: "request",
		activity: ["01", "03", "85"],
		title: "TITLE_MY"
	}];

	/**
	 * Determines real user rights
	 */
	var ACTIVITIES = [{
		activity: "01",
		buttons: ["createBtn"]
	}, {
		activity: "02",
		buttons: ["postBtn", "postAndReleaseBtn"]
	}, {
		activity: "03",
		buttons: [] // display
	}, {
		activity: "43",
		buttons: ["releaseBtn", "postAndReleaseBtn"]
	}, {
		activity: "85",
		buttons: ["reverseBtn"]
	}];

	/**
	 * Payment statuses
	 */
	var STATUSES = [{
		code: "I0559",
		name: "Reversed"
	}, {
		code: "I0002",
		name: "Released"
	}, {
		code: "I0001",
		name: "Created"
	}, {
		code: "ICL08",
		name: "Posted"
	}, {
		code: "IBC26",
		name: "Cleared"
	}];

	/**
	 * Statuses in which is payment release action possible
	 */
	var RELEASE_STATUSES = [
		"Posted"
	];

	/**
	 * Statuses in which is payment reverse action possible
	 */
	var REVERSE_STATUSES = [
		"Posted",
		"Created",
		"Released"
	];

	/**
	 * Statuses in which is payment post action possible
	 */
	var POST_STATUSES = [
		"Created"
	];

	/**
	 * Statuses in which is payment post-and-release action possible
	 */
	var POST_AND_RELEASE_STATUSES = [
		"Created"
	];

	/**
	 * Statuses in which is payment reverse action possible
	 */
	var EDIT_STATUSES = [
		"Created"
	];

	var BUTTON_CONFIGS = [{
		id: "postAndReleaseBtn",
		settings: {
			text: "POST_AND_RELEASE",
			type: "Accept"
		},
		statuses: POST_AND_RELEASE_STATUSES
	}, {
		id: "releaseBtn",
		settings: {
			text: "RELEASE",
			type: "Accept"
		},
		statuses: RELEASE_STATUSES
	}, {
		id: "postBtn",
		settings: {
			text: "POST",
			type: "Accept"
		},
		statuses: POST_STATUSES
	}, {
		id: "reverseBtn",
		settings: {
			text: "REVERSE",
			type: "Reject"
		},
		statuses: REVERSE_STATUSES
	}];

	var PAYMENT_REQUEST_TYPES = [{
		code: "FI-BL",
		name: "ffp"
	}, {
		code: "FI-AR-PR",
		name: "customer"
	}, {
		code: "FI-AP-PR",
		name: "supplier"
	}];

	var REP_CODE_TYPE = "repcode";

	var PAY_REQUEST_ACTIONS = {
		CREATE: "create",
		EDIT: "edit",
		DISPLAY: "display"
	};

	var ACTIONS = {
		POST_AND_RELEASE: {
			name: "postAndRelease",
			title: "POST_AND_RELEASE",
			message: "POST_AND_RELEASE_ID",
			success: "PAYMENT_POSTED_AND_RELEASED"
		},
		RELEASE: {
			name: "release",
			title: "RELEASE",
			message: "RELEASE_ID",
			path: "/releasePayment",
			success: "PAYMENT_RELEASED"
		},
		POST: {
			name: "post",
			title: "POST",
			message: "POST_ID",
			path: "/postPayment",
			success: "PAYMENT_POSTED"
		},
		REVERSE: {
			name: "reverse",
			title: "REVERSE",
			message: "REVERSE_ID",
			path: "/reversePayment",
			success: "PAYMENT_REVERSED"
		}
	};

	var COPY_EXCLUDED_FLDS = [
		"__metadata",
		"PaymentRequest",
		"Delete_mc",
		"DraftUUID",
		"HasActiveEntity",
		"HasDraftEntity",
		"IsActiveEntity",
		"DraftAdministrativeData",
		"Activation_ac",
		"Edit_ac",
		"Preparation_ac",
		"Validation_ac",
		"DraftEntityCreationDateTime",
		"DraftEntityLastChangeDateTime",
		"to_ChangeUserContactCard",
		"to_UserContactCard",
		"SiblingEntity"
	];

	var SAVETEMPLATE_INPUT_IDS = ["templateName", "templateDescription"];

	var BANK_ENTRY_TYPES = {
		bankDetailsEntry: 0,
		ibanEntry: 1
	};

	return {
		APP_MODES: APP_MODES,
		ACTIVITIES: ACTIVITIES,
		STATUSES: STATUSES,
		RELEASE_STATUSES: RELEASE_STATUSES,
		REVERSE_STATUSES: REVERSE_STATUSES,
		POST_STATUSES: POST_STATUSES,
		POST_AND_RELEASE_STATUSES: POST_AND_RELEASE_STATUSES,
		EDIT_STATUSES: EDIT_STATUSES,
		BUTTON_CONFIGS: BUTTON_CONFIGS,
		PAYMENT_REQUEST_TYPES: PAYMENT_REQUEST_TYPES,
		PAY_REQUEST_ACTIONS: PAY_REQUEST_ACTIONS,
		ACTIONS: ACTIONS,
		COPY_EXCLUDED_FLDS: COPY_EXCLUDED_FLDS,
		SAVETEMPLATE_INPUT_IDS: SAVETEMPLATE_INPUT_IDS,
		REP_CODE_TYPE: REP_CODE_TYPE,
		BANK_ENTRY_TYPES: BANK_ENTRY_TYPES
	};
});