/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"jquery.sap.global",
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	"sap/m/MessageToast",
	"sap/ui/core/message/Message"
], function(jQuery, MessagePopover, MessageItem, MessageToast, Message) {
	"use strict";

	return {
		/**
		 * Gets Message Manager
		 *
		 * @return {sap.ui.core.message.MessageManager} Returns Message Manager
		 */
		getMessageManager: function() {
			return sap.ui.getCore().getMessageManager();
		},

		/**
		 * Gets Message Model
		 *
		 * @return {sap.ui.model.message.MessageModel} Returns Message Model
		 */
		getMessageModel: function() {
			return this.getMessageManager().getMessageModel();
		},

		/**
		 * Gets messages from Message Model 
		 *
		 * @return {Array} Returns Message Model messages
		 */
		getMessages: function() {
			return this.getMessageModel().getData();
		},

		/**
		 * Gets an existing Message popover or created a new one
		 *
		 * @return {sap.m.MessagePopover} Returns Message popover
		 */
		getMessagePopover: function() {
			if (!this.messagePopover) {
				this.messagePopover = new MessagePopover({
					items: {
						path: "message>/",
						template: new MessageItem({
							type: "{message>type}",
							title: "{message>message}",
							longtextUrl: "{message>descriptionUrl}"
						})
					}
				});

				this.messagePopover.setModel(this.getMessageModel(), "message");
			}

			return this.messagePopover;
		},

		/**
		 * Checks whether is the popover opened
		 *
		 * @return {Boolean} Returns whether is the popover opened
		 */
		isPopoverOpen: function() {
			return this.messagePopover && this.getMessagePopover().isOpen();
		},

		/**
		 * Opens popover
		 *
		 * @param {sap.ui.core.Control} control - control by which should be popover opened
		 *
		 * @return {void}
		 */
		ensurePopoverIsOpen: function(control) {
			var popover = this.getMessagePopover();
			if (!popover.isOpen()) {
				popover.openBy(control);
			}
		},

		/**
		 * Closes popover
		 *
		 * @return {void}
		 */
		closePopover: function() {
			var popover = this.getMessagePopover();
			if (popover.isOpen()) {
				popover.close();
			}
		},

		/**
		 * Gets property value from object
		 *
		 * @param {Object} thing - object
		 * @param {Object} property - property to get value of
		 *
		 * @return {String} Returns error description
		 */
		getProperty: function(thing, property) {
			var value = typeof thing === "object" && thing.hasOwnProperty(property) ? thing[property] : null;
			return value ? value : null;
		},

		/**
		 * Gets error description from message
		 *
		 * @param {Object} error - error object
		 *
		 * @return {String} Returns error description
		 */
		messageFromResponseText: function(error) {
			var message = null;
			var text = this.getProperty(error, "responseText");
			var wrapper = null;
			if (text) {
				try {
					wrapper = JSON.parse(text);
					message = wrapper.error.message.value;
				} catch (err) {
					message = null;
				}
			}

			return message;
		},

		/**
		 * Gets error description from status
		 *
		 * @param {Object} error - error object
		 *
		 * @return {String} Returns error description
		 */
		messageFromStatus: function(error) {
			var message = null;
			var statusText = this.getProperty(error, "statusText");

			if (statusText) {
				message = this.getProperty(error, "statusCode") + " - " + statusText;
			}

			return message;
		},

		/**
		 * Gets error description from response text
		 *
		 * @param {Object} error - error object
		 *
		 * @return {String} Returns error description
		 */
		messageFromMessage: function(error) {
			var msg = this.getProperty(error, "message");
			return msg ? msg : error;
		},

		/**
		 * Gets error description from response text, status, message or any other possible property
		 *
		 * @param {Object} error - error object
		 *
		 * @return {String} Returns error description
		 */
		getErrorMessage: function(error) {
			var messageExtractors = [
				this.messageFromResponseText.bind(this),
				this.messageFromStatus.bind(this),
				this.messageFromMessage.bind(this)
			];
			var index;
			var message;

			for (index = 0; index < messageExtractors.length; index++) {
				message = messageExtractors[index](error);
				if (message) {
					break;
				}
			}

			return message ? message : "";
		},

		/**
		 * Gets URL address for error long_text from response text, status, message or any other possible property
		 *
		 * @param {Object} error - error object
		 *
		 * @return {String} Returns url to error
		 */
		getErrorDescriptionUrl: function(error) {
			var descriptionUrl = null;
			var text = this.getProperty(error, "responseText");
			var wrapper = null;
			if (text) {
				try {
					wrapper = JSON.parse(text);
					descriptionUrl = wrapper.error.innererror.errordetails[0].longtext_url;
				} catch (err) {
					descriptionUrl = null;
				}
			}

			return descriptionUrl;
		},

		/**
		 * Getter for temporary message indicator
		 *
		 * @return {sap.ui.core.Control} Returns temporary message indicator
		 */
		getMessageIndicator: function() {
			return this.temporaryMessageIndicator ? this.temporaryMessageIndicator : this.messageIndicator;
		},

		/**
		 * Setter for message indicator
		 *
		 * @param {sap.ui.core.Control} messageIndicator -  message indicator to be set
		 *
		 * @return {void}
		 */
		setMessageIndicator: function(messageIndicator) {
			this.messageIndicator = messageIndicator;
			this.useCustomPopover();
		},

		/**
		 * Replaces default Message popover with custom and attaches it to Message indicator
		 *
		 * @return {void} 
		 */
		useCustomPopover: function() {
			var pressHandler;
			var messagePopover = this.getMessagePopover();
			var messageIndicator = this.getMessageIndicator();
			var eventRegistry = messageIndicator["mEventRegistry"];

			if (eventRegistry && eventRegistry.press) {
				// get handler reference (hack)
				pressHandler = eventRegistry.press[0];

				// detach handler attached by default and attach custom handler
				messageIndicator.detachPress(pressHandler.fFunction, pressHandler.oListener);
				messageIndicator.attachPress(function() {
					messagePopover.toggle.call(messagePopover, messageIndicator);
				}, this);
			}
		},

		/**
		 * Setter for temporary message indicator
		 *
		 * @param {sap.ui.core.Control} messageIndicator -  temporary message indicator to be set
		 *
		 * @return {void}
		 */
		setTemporaryMessagesIndicator: function(messageIndicator) {
			this.temporaryMessageIndicator = messageIndicator;
		},

		/**
		 * Toggles (Opens/Closes) the MessagePopover
		 *
		 * @param {sap.ui.core.Control} control - Control which toggles the MessagePopover
		 *
		 * @return {void}
		 */
		toggleMessagePopover: function(control) {
			if (this.isPopoverOpen()) {
				this.closePopover();
			} else {
				this.ensurePopoverIsOpen(control);
			}
		},

		/**
		 * Adds an UI error message
		 *
		 * @param {String|any} error - longtext provided by backend - string or additional error information object from error handler
		 *
		 * @return {void}
		 */
		addErrorMessage: function(error) {
			var indicator = this.getMessageIndicator();
			var errorMessage = this.getErrorMessage(error).replace(/&/g, "\"");

			if (!this.isDuplicateMessage(errorMessage)) {
				this.getMessageManager().addMessages(
					new Message({
						type: sap.ui.core.MessageType.Error,
						message: errorMessage,
						descriptionUrl: this.getErrorDescriptionUrl(error),
						processor: this.getMessageModel()
					})
				);
			}

			if (indicator) {
				// allow message indicator to be rendered for first message, otherwise the openBy will fail (hack)
				jQuery.sap.delayedCall(0, this, this.ensurePopoverIsOpen, [indicator]);
			}
		},

		/**
		 * Check if message already exists in the message center
		 *
		 * @param {String} message - Requested message text
		 *
		 * @return {Boolean} - true if message exists in message center
		 */
		isDuplicateMessage: function(message) {
			return this.getMessageModel().getData().some(function(item) {
				return item.getMessage() === message;
			});
		},

		/**
		 * Adds an UI success message
		 *
		 * @param {string} message - short text of message
		 *
		 * @return {void}
		 */
		addSuccessMessage: function(message) {
			var indicator = this.getMessageIndicator();

			this.getMessageManager().addMessages(
				new Message({
					type: sap.ui.core.MessageType.Success,
					message: message,
					processor: this.getMessageModel()
				})
			);

			if (indicator) {
				// allow message indicator to be rendered for first message, otherwise the openBy will fail (hack)
				jQuery.sap.delayedCall(0, this, this.ensurePopoverIsOpen, [indicator]);
			}
		},

		/**
		 * Clears all UI messages.
		 *
		 * @return {void}
		 */
		clearMessages: function() {
			this.getMessageManager().removeAllMessages();
		},

		/**
		 * Shows Message Toast message.
		 *
		 * @param {String} message - message to show 
		 *
		 * @return {void}
		 */
		showMessageToast: function(message) {
			MessageToast.show(message);
		}
	};
});