'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KPSBB = Class.create({ // eslint-disable-line no-unused-vars
	initialize: function initialize(options) {
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
	onDomLoaded: function onDomLoaded() {
		this.loaded = true;
		this.init();
	},
	init: function init() {
		this.initObservers();
	},
	initObservers: function initObservers() {
		var _this = this;

		if (this.formAnchor) {
			this.formAnchor.observe('click', function () {
				Effect.ScrollTo('sbbForm', { duration: '0.4', offset: 0 });
			});
		}

		this.form.observe('submit', this.formSubmitHandler.bind(this));

		// Live input validation
		this.form.select('input').each(function (el) {
			el.observe('change', function () {
				var formFieldName = el.readAttribute('name');

				if (formFieldName == 'data[phone]') {
					el.value = el.value.replaceAll(/[^0-9]/, '');
				}

				var formFieldValue = el.value;
				var formData = {};
				formData[formFieldName] = formFieldValue;

				if (_this.formDataErrors(formData).length) {
					_this.showFormErrors(formFieldName);
				} else {
					_this.removeFormErrors(formFieldName);
				}
			});
		});
	},
	formSubmitHandler: function formSubmitHandler(evt) {
		evt.preventDefault();

		var formData = this.form.serialize(true);
		var formErros = this.formDataErrors(formData);

		if (!formErros.length) {
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
						var serverSideErrors = [];
						for (var error in json['errors']) {
							var fieldName = 'data[' + error + ']';
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
	formDataErrors: function formDataErrors(formData) {
		var validateFields = ['data[first_name]', 'data[phone]'];
		var errors = [];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = validateFields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var validateField = _step.value;

				if (typeof formData[validateField] !== 'undefined' && formData[validateField] == '') {
					errors.push(validateField);
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return errors;
	},
	showFormErrors: function showFormErrors(formFields) {
		this.form.select('[action-name="validate"]').each(function (el) {
			var fieldName = el.readAttribute('action-value');
			if (formFields.indexOf(fieldName) !== -1) {
				el.addClassName('validation-error');
			}
		});
	},
	removeFormErrors: function removeFormErrors(formFields) {
		this.form.select('[action-name="validate"]').each(function (el) {
			var fieldName = el.readAttribute('action-value');
			if (formFields.indexOf(fieldName) !== -1) {
				el.removeClassName('validation-error');
			}
		});
	}
});

String.prototype.replaceAll = function (target, replacement) {
	return this.split(target).join(replacement);
};

var Rectangle = function () {
	function Rectangle(height, width) {
		_classCallCheck(this, Rectangle);

		this.height = height;
		this.width = width;
	}

	_createClass(Rectangle, [{
		key: 'hello',
		value: function hello() {}
	}]);

	return Rectangle;
}();

var rect = new Rectangle(100, 200);
rect.hello();