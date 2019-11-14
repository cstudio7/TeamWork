"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _gifutils = _interopRequireDefault(require("../utils/gifutils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var util = new _gifutils["default"]();

var Flag =
/*#__PURE__*/
function () {
  function Flag() {
    _classCallCheck(this, Flag);
  }

  _createClass(Flag, null, [{
    key: "createReport",

    /**
     * Create A Flag
     * @param {object} req
     * @param {object} res
     * @returns {object} flag object
     */
    value: function () {
      var _createReport = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var text, values, _ref, rows, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = "INSERT INTO\n      flags(id, email, reason, description, created_on, comment_id)\n      VALUES($1, $2, $3, $4, $5, $6)\n      returning *";
                values = [(0, _v["default"])(), req.body.email, req.body.reason, req.body.description, (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'), req.body.comment_id];

                if (req.body.comment_id) {
                  _context.next = 5;
                  break;
                }

                util.setError(400, 'Please select a particular comment to be flagged');
                return _context.abrupt("return", util.send(res));

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return _db["default"].query(text, values);

              case 8:
                _ref = _context.sent;
                rows = _ref.rows;
                dataValues = rows[0];
                note = {
                  message: 'Flagged request reported'
                };
                data = _objectSpread({}, note, {}, dataValues);
                util.setSuccess(200, data);
                return _context.abrupt("return", util.send(res));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](5);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 17]]);
      }));

      function createReport(_x, _x2) {
        return _createReport.apply(this, arguments);
      }

      return createReport;
    }()
    /**
     * Delete an Article
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 400
     */

  }, {
    key: "deleteReport",
    value: function () {
      var _deleteReport = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var findOneQuery, deleteOneQuery, _ref2, rows, response, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findOneQuery = 'SELECT * FROM comments WHERE comment_id=$1 ';
                deleteOneQuery = 'DELETE FROM comments WHERE comment_id=$1 returning *';

                if (req.body.comment_id) {
                  _context2.next = 5;
                  break;
                }

                util.setError(400, 'Please select a particular comment to be flagged');
                return _context2.abrupt("return", util.send(res));

              case 5:
                _context2.prev = 5;
                _context2.next = 8;
                return _db["default"].query(findOneQuery, [req.body.comment_id]);

              case 8:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 13;
                  break;
                }

                util.setError(400, 'Comment not found');
                return _context2.abrupt("return", util.send(res));

              case 13:
                _context2.next = 15;
                return _db["default"].query(deleteOneQuery, [req.body.comment_id]);

              case 15:
                response = _context2.sent;
                dataValues = response.rows[0];
                note = {
                  message: 'Comment deleted Successfully'
                };
                data = _objectSpread({}, note, {}, dataValues);
                util.setSuccess(200, data);
                return _context2.abrupt("return", util.send(res));

              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](5);
                util.setError(400, _context2.t0);
                return _context2.abrupt("return", util.send(res));

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 24]]);
      }));

      function deleteReport(_x3, _x4) {
        return _deleteReport.apply(this, arguments);
      }

      return deleteReport;
    }()
  }]);

  return Flag;
}();

var _default = Flag;
exports["default"] = _default;