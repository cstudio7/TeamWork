"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "users", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "articles", {
  enumerable: true,
  get: function get() {
    return _article["default"];
  }
});
Object.defineProperty(exports, "auth", {
  enumerable: true,
  get: function get() {
    return _auth["default"];
  }
});
Object.defineProperty(exports, "categories", {
  enumerable: true,
  get: function get() {
    return _categories["default"];
  }
});

var _user = _interopRequireDefault(require("./user"));

var _article = _interopRequireDefault(require("./article"));

var _auth = _interopRequireDefault(require("./auth"));

var _categories = _interopRequireDefault(require("./categories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }