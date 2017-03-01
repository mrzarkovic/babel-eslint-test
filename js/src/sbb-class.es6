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
		this.form.select('input').each((el) => {
			el.observe('change', () => {
				let formFieldName = el.readAttribute('name');

				if (formFieldName == 'data[phone]') {
					el.value = el.value.replaceAll(/[^0-9]/, '');
				}

				let formFieldValue = el.value;
				let formData = {};
				formData[formFieldName] = formFieldValue;

				if (this.formDataErrors(formData).length) {
					this.showFormErrors(formFieldName);
				} else {
					this.removeFormErrors(formFieldName);
				}
			});
		});
	},
	formSubmitHandler: function(evt) {
		evt.preventDefault();

		let formData = this.form.serialize(true);
		let formErros = this.formDataErrors(formData);

		if (!formErros.length) {
			// Send data
			this.form.disable();
			formData['action'] = 'ajax_cable_post';
			let url = 'sbb.php';
			new Ajax.Request('/' + url, {
				parameters: formData,
				onComplete: function (transport) {
					let json = transport.responseText.evalJSON(true);
					if (json['success']) {
						this.formSection.hide();
						this.postSubmitSection.show();
						this.postSubmitSection.select('[action-name="lead-id"]')[0].innerHTML = json['lead_id'];
						this.postSubmitSection.select('[action-name="user-message-holder"]')[0].innerHTML = json['message_to_user'];
					} else {
						let serverSideErrors = [];
						for (let error in json['errors']) {
							let fieldName = 'data[' + error + ']';
							serverSideErrors.push(fieldName);
						}
						this.showFormErrors(serverSideErrors);
						this.form.enable();
					}
				}.bind(this)
			});
		} else {
			this.showFormErrors(formErros);
		}
	},
	formDataErrors: function(formData) {
		let validateFields = ['data[first_name]', 'data[phone]'];
		let errors = [];

		for (let validateField of validateFields) {
			if (typeof formData[validateField] !== 'undefined' && formData[validateField] == '') {
				errors.push(validateField);
			}
		}

		return errors;
	},
	showFormErrors: function(formFields) {
		this.form.select('[action-name="validate"]').each(function(el) {
			let fieldName = el.readAttribute('action-value');
			if (formFields.indexOf(fieldName) !== -1) {
				el.addClassName('validation-error');
			}
		});
	},
	removeFormErrors: function(formFields) {
		this.form.select('[action-name="validate"]').each(function(el) {
			let fieldName = el.readAttribute('action-value');
			if (formFields.indexOf(fieldName) !== -1) {
				el.removeClassName('validation-error');
			}
		});
	}
});

String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};

class Rectangle {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}

	hello() {
	}
}

let rect = new Rectangle(100, 200);
rect.hello();