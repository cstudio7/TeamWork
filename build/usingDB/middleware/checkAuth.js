"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _gifutils = _interopRequireDefault(require("../utils/gifutils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var util = new _gifutils["default"]();

var dotenv = require('dotenv');
/**
 * Class representing the Authentication methods
 * @class Authorization
 * @description Authenticate protected routes
 */


var Authorization =
/*#__PURE__*/
function () {
  function Authorization() {
    _classCallCheck(this, Authorization);
  }

  _createClass(Authorization, null, [{
    key: "checkToken",

    /**
     *
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {callback} next - The callback that passes the request
     * to the next handler
     * @returns {callback} next - The callback that passes the request
     * to the next handler
     * @returns {object} res - Response object containing an error due
     * to invalid token or no token in the request
     */
    value: function () {
      var _checkToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers['x-access-token'] || req.query.token || req.body.token;

                if (token) {
                  _context.next = 4;
                  break;
                }

                util.setError(400, 'Access denied. No token provided.');
                return _context.abrupt("return", util.send(res));

              case 4:
                next();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkToken(_x, _x2, _x3) {
        return _checkToken.apply(this, arguments);
      }

      return checkToken;
    }()
    /**
     *
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {callback} next - The callback that passes the request
     * to the next handler
     * @returns {callback} next - The callback that passes the request
     * to the next handler
     * @returns {object} res - Response object containing an error due
     * to unauthorized user
     */

  }, {
    key: "confirmAdmin",
    value: function () {
      var _confirmAdmin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers['x-access-token'] || req.query.token || req.body.token;

                _jsonwebtoken["default"].verify(token, process.env.TOKEN, function (err, decoded) {
                  if (decoded.isAdmin === 'false') {
                    util.setError(400, 'Access denied, Protect Admin Privilege alone');
                    return util.send(res);
                  }

                  next();
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function confirmAdmin(_x4, _x5, _x6) {
        return _confirmAdmin.apply(this, arguments);
      }

      return confirmAdmin;
    }()
  }]);

  return Authorization;
}();

var _default = Authorization;
exports["default"] = _default;