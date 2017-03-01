var KPSBB = Class.create({ // eslint-disable-line no-unused-vars
	initialize: function(options) {
		this.options = options || {};
		this.form = $(this.options['form']);
		this.formAnchor = $(this.options['formAnchor']);
		this.formSection = $(this.options['formSection']);
		this.postSubmitSection = $(this.options['postSubmitSection']);

		if (document.loaded) {
			this.onDomLoaded();
		} else {
			document.observe('dom:loaded', this.onDomLoaded.bind(this));
		}
	},
	onDomLoaded: function() {
		this.loaded = true;
		this.init();
	},
	init: function() {
		this.initObservers();
	},
	initObservers: function() {
		if (this.formAnchor) {
			this.formAnchor.observe('click', function() {
				Effect.ScrollTo('sbbForm', { duration:'0.4', offset: 0 });
			});
		}

		this.form.observe('submit', this.formSubmitHandler.bind(this));

		// Live input validation
		this.form.select('input').each(function(el) {
			el.observe('change', function() {
				var elName = el.readAttribute('name');
				if (el.value != '') {
					if (elName == 'data[phone]') {
						el.value = el.value.replaceAll(/[^0-9]/, '');
					}
					el.up('[action-name="validate"]').removeClassName('validation-error');
				} else {
					el.up('[action-name="validate"]').addClassName('validation-error');
				}
			});
		});
	},
	formSubmitHandler: function(evt) {
		evt.preventDefault();

		let formData = this.form.serialize(true);
		let formErros = this.checkFormData(formData);

		if (formErros.length == 0) {
			// Send data
			this.form.disable();
			formData['action'] = 'ajax_cable_post';
			var url = 'sbb.php';
			new Ajax.Request('/' + url, {
				parameters: formData,
				onComplete: function (transport) {
					var json = transport.responseText.evalJSON(true);
					if (json['success']) {
						this.formSection.hide();
						this.postSubmitSection.show();
						this.postSubmitSection.select('[action-name="lead-id"]')[0].innerHTML = json['lead_id'];
						this.postSubmitSection.select('[action-name="user-message-holder"]')[0].innerHTML = json['message_to_user'];
					} else {
						var postFormErrors = [];
						for (var error in json['errors']) {
							var fieldName = 'data[' + error + ']';
							postFormErrors.push(fieldName);
						}
						this.showFormErrors(postFormErrors);
						this.form.enable();
					}
				}.bind(this)
			});
		} else {
			this.showFormErrors(formErros);
		}
	},
	checkFormData: function(formData) {
		var possibleErrors = ['data[first_name]', 'data[phone]'];
		var errors = [];

		for (var i = 0; i < possibleErrors.length; i++) {
			var field = possibleErrors[i];
			if (typeof formData[field] != 'undefined' && formData[field] == '') {
				errors.push(field);
			}
		}

		return errors;
	},
	showFormErrors: function(formErrors) {
		this.form.select('[action-name="validate"]').each(function(el) {
			var fieldName = el.readAttribute('action-value');
			if (formErrors.indexOf(fieldName) !== -1) {
				el.addClassName('validation-error');
			} else {
				el.removeClassName('validation-error');
			}
		});
	}
});

String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};