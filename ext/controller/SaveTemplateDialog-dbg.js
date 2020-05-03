/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/core/ValueState",
	"fin/ap/process/payments/lib/Constants",
	"fin/ap/process/payments/model/additionalModels",
	"sap/ui/Global"
], function(
	Parent,
	ValueState,
	Constants,
	additionalModels,
	UI
) {
	"use strict";

	var TEMPLATE_NAME_EXISTS = "VARIANT_NAME_EXISTS";
	var INPUT_REQUIRED = "INPUT_REQUIRED";

	var SAVE_TEMPLATE_FRAGMENT = "fin.ap.process.payments.ext.fragment.SaveTemplateDialog";

	var SaveTemplateDialog = Parent.extend("fin.ap.process.payments.ext.controller.SaveTemplateDialog", {
		/**
		 * Constructor
		 *
		 * @param {sap.ui.core.mvc.View} view - object with data and references of the current view
		 *
		 * @return {void}
		 */
		constructor: function(view) {
			var fragment;

			this.view = function() {
				return view;
			};

			fragment = UI.xmlfragment(this.view().getId(), SAVE_TEMPLATE_FRAGMENT, this);

			this.fragment = function() {
				return fragment;
			};

			this.view().addDependent(this.fragment()); // Bind context of the parent
			this.view().setModel(additionalModels.saveTemplateModel(), "saveTemplate");
		}
	});

	/**
	 * Shows dialog fragment
	 *
	 * @param {Array} templateNames - Payment Request template names from backend
	 * 
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.showDialog = function(templateNames) {
		this.templateNames = templateNames;

		this.fragment().open();
	};

	/**
	 * Toggles between Save/Overwrite Template
	 *
	 * @param {Boolean} isOverwrite - whether is Save/Overwrite
	 *
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.toggleSaveOverwrite = function(isOverwrite) {
		this.getModel("saveTemplate").setProperty("/buttons/save", !isOverwrite);
		this.getModel("saveTemplate").setProperty("/buttons/overwrite", isOverwrite);
	};

	/**
	 * Handles 'press' event of Save Template button
	 *
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.onSaveTemplatePress = function() {
		if (this.validateInputFields()) {
			this.saveTemplate(false);
		}
	};

	/**
	 * Handles 'press' event of Overwrite Template button
	 *
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.onOverwriteTemplatePress = function() {
		if (this.validateInputFields()) {
			this.saveTemplate(true);
		}
	};

	/**
	 * Validates Template Input fields
	 *
	 * @return {sap.ui.core.ValueState} Returns result of validation
	 */
	SaveTemplateDialog.prototype.validateInputFields = function() {
		var input;
		var isNameTaken;

		return Constants.SAVETEMPLATE_INPUT_IDS.every(function(id) {
			input = this.view().byId(id);
			isNameTaken = (id === Constants.SAVETEMPLATE_INPUT_IDS[0]) ? this.checkName(input.getValue()) : false;

			return this.validateInput(input, isNameTaken);
		}.bind(this));
	};

	/**
	 * Saves draft data to template with given Name and Description
	 *
	 * @param {Boolean} isOverwrite - whether is Save/Overwrite
	 *
	 * @return {Promise} Returns promise of saving the template.
	 */
	SaveTemplateDialog.prototype.saveTemplate = function(isOverwrite) {
		var newName = this.view().byId("templateName").getValue();
		var newDescription = this.view().byId("templateDescription").getValue();
		var draftUUID = this.getProperty("DraftUUID");

		return this.save(newName, newDescription, draftUUID, isOverwrite).then(function() {
			this.closeDialog();
		}.bind(this));
	};

	/**
	 * Getter for property from view's binding context
	 *
	 * @param {String} property - name of the property
	 *
	 * @return {Any} Returns the value of given property.
	 */
	SaveTemplateDialog.prototype.getProperty = function(property) {
		var bindingContext = this.view().getBindingContext();

		return bindingContext.getProperty(property);
	};

	/**
	 * Saves template with given parameters
	 *
	 * @param {String} templateID - tamplate name
	 * @param {String} templateDesc - tamplate description 
	 * @param {String} draftUUID - draft UUID
	 * @param {Boolean} isOverwrite - whether is Save/Overwrite
	 *
	 * @return {Promise} Returns promise of saving the template.
	 */
	SaveTemplateDialog.prototype.save = function(templateID, templateDesc, draftUUID, isOverwrite) {
		return new Promise(function(resolve, reject) {
			this.getModel().callFunction("/saveTemplate", {
				method: "POST",
				urlParameters: {
					DRAFTUUID: draftUUID,
					TemplateDesc: templateDesc,
					TemplateID: templateID,
					IsOverwriteMode: isOverwrite
				},
				success: function(data) {
					resolve();
				}
			});
		}.bind(this));
	};

	/**
	 * Handles 'change' event of Template Name input field
	 *
	 * @param {sap.ui.base.Event} event - event object
	 *
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.onTemplNameChange = function(event) {
		var newValue = event.getParameter("newValue");
		var isNameTaken = this.checkName(newValue);

		this.validateInput(event.getSource(), isNameTaken);
	};

	/**
	 * Handles 'change' event of Template Description input field
	 *
	 * @param {sap.ui.base.Event} event - event object
	 *
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.onTemplDescriptionChange = function(event) {
		this.validateInput(event.getSource(), false);
	};

	/**
	 * Validates Template Input field
	 *
	 * @param {sap.m.Input} input - input field to validate
	 * @param {Boolean} isNameTaken - whether is the name already taken
	 *
	 * @return {sap.ui.core.ValueState} Returns result of validation
	 */
	SaveTemplateDialog.prototype.validateInput = function(input, isNameTaken) {
		var isEmpty = input.getValue() === "";
		var valueStateObj = this.getValueState(isEmpty, isNameTaken);
		var valueStateText = this.getResourceBundle().getText(valueStateObj.text, input.getLabels()[0].getText());

		input.setValueState(valueStateObj.state)
			.setValueStateText(valueStateText);

		return valueStateObj.state !== ValueState.Error;
	};

	/**
	 * Gets ValueState and ValueStateText according to the given parameters
	 *
	 * @param {Boolean}	isEmpty - whether is the input field empty
	 * @param {Boolean}	isNameTaken - whether is the name already taken
	 *
	 * @return {Object} Returns an object with ValueState and ValueStateText values
	 */
	SaveTemplateDialog.prototype.getValueState = function(isEmpty, isNameTaken) {
		var value = {
			state: ValueState.None,
			text: ""
		};

		if (isEmpty) {
			value.state = ValueState.Error;
			value.text = INPUT_REQUIRED;
		} else if (isNameTaken) {
			value.state = ValueState.Warning;
			value.text = TEMPLATE_NAME_EXISTS;
		}

		return value;
	};

	/*
	 * Checks whether new Template name unique
	 * According to the result toggles between save/overwrite mode
	 *
	 * @param {String} newName - new Template name
	 *
	 * @return {Boolena} Returns whether is the new name unique
	 */
	SaveTemplateDialog.prototype.checkName = function(newName) {
		var isNameTaken = this.templateNames.some(function(templateName) {
			return templateName === newName.toUpperCase();
		});

		this.toggleSaveOverwrite(isNameTaken);

		return isNameTaken;
	};

	/**
	 * Manages Cancel option in the fragment
	 * Closes the fragment
	 *
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.onSaveTemplateCancelPress = function() {
		this.closeDialog();
	};

	/**
	 * Wrapper for retrieving model by id
	 *
	 * @param {String} id - id of model
	 *
	 * @return {Object} View's model
	 */
	SaveTemplateDialog.prototype.getModel = function(id) {
		return this.view().getModel(id);
	};

	/**
	 * Getter for the resource bundle
	 *
	 * @return {sap.ui.model.resource.ResourceModel} The resourceModel of the component
	 */
	SaveTemplateDialog.prototype.getResourceBundle = function() {
		return this.getModel("i18n").getResourceBundle();
	};

	/**
	 * Closes and destroys the fragment
	 *
	 * @return {void}
	 */
	SaveTemplateDialog.prototype.closeDialog = function() {
		this.fragment().close();
	};

	return SaveTemplateDialog;
});