"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util =
/*#__PURE__*/
function () {
  function Util() {
    _classCallCheck(this, Util);

    this.statusCode = null;
    this.type = null;
    this.payload = null;
    this.error = null;
    this.message = null;
  }

  _createClass(Util, [{
    key: "setSuccess",
    value: function setSuccess(statusCode, payload, message) {
      this.statusCode = statusCode;
      this.payload = payload;
      this.type = 'success';
    }
  }, {
    key: "setSuccessful",
    value: function setSuccessful(statusCode, data, message) {
      this.statusCode = statusCode;
      this.data = data;
      this.type = 'success';
    }
  }, {
    key: "setError",
    value: function setError(statusCode, error) {
      this.statusCode = statusCode;
      this.error = error;
      this.type = 'error';
    }
  }, {
    key: "send",
    value: function send(res) {
      var result = {
        status: this.type,
        payload: this.payload
      };

      if (this.type === 'success') {
        var my1 = {
          message: this.message
        };
        return res.status(this.statusCode).json({
          status: 'success',
          data: _objectSpread({}, this.payload)
        });
      }

      if (this.type === 'error') {
        return res.status(this.statusCode).json({
          status: this.type,
          error: this.error
        });
      }

      return res.status(this.statusCode).json({
        status: this.type,
        message: this.message
      });
    }
  }]);

  return Util;
}();

exports["default"] = Util;