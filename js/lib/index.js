"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
  function Rectangle(height, width) {
    _classCallCheck(this, Rectangle);

    this.height = height;
    this.width = width;
  }

  _createClass(Rectangle, [{
    key: "hello",
    value: function hello() {
      console.log("hi!");
    }
  }]);

  return Rectangle;
}();

var rect = new Rectangle(100, 200);
rect.hello();