"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("../db"));

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

_dotenv["default"].config();

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "signUp",

    /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var text, userId, payload, options, secret, values, _ref, rows, displayMessage, data, dataValues;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = "INSERT INTO\n      Users(id, token, email,  first_name, last_name, password, is_admin, address, gender, job_role, department)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)\n      returning *"; // generate user token

                userId = (0, _v["default"])();
                payload = {
                  email: req.body.email,
                  id: userId,
                  isAdmin: req.body.is_admin
                };
                options = {
                  expiresIn: '70d'
                };
                secret = process.env.TOKEN;
                req.body.token = _jsonwebtoken["default"].sign(payload, secret, options);
                values = [userId, req.body.token, req.body.email, req.body.first_name, req.body.last_name, // eslint-disable-next-line no-unused-vars
                _bcrypt["default"].hashSync(req.body.password, 10, function (error, hash) {
                  if (error) {
                    return {
                      error: 'error found'
                    };
                  }

                  return null;
                }) || '', req.body.is_admin, req.body.address, req.body.gender, req.body.job_role, req.body.department];
                _context.prev = 7;
                _context.next = 10;
                return _db["default"].query(text, values);

              case 10:
                _ref = _context.sent;
                rows = _ref.rows;
                displayMessage = {
                  message: 'User account successfully created'
                };
                data = rows[0];
                dataValues = _objectSpread({}, displayMessage, {
                  data: data
                });
                util.setSuccess(200, dataValues);
                return _context.abrupt("return", util.send(res));

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](7);

                if (!(_context.t0.routine === '_bt_check_unique')) {
                  _context.next = 24;
                  break;
                }

                util.setError(400, 'User with that EMAIL already exist');
                return _context.abrupt("return", util.send(res));

              case 24:
                util.setError(400, _context.t0.message);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 19]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
    /**
     * //sign in a user
     * @param {object} req
     * @param {object} res
     * @returns {object} return user Object
     */

  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var text, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = 'SELECT * FROM users WHERE email = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return _db["default"].query(text, [req.body.email]);

              case 4:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 9;
                  break;
                }

                util.setError(400, 'A user with the specified email was not found');
                return _context2.abrupt("return", util.send(res));

              case 9:
                // check if user password is correct
                _bcrypt["default"].compare(req.body.password, rows[0].password, function (error, result) {
                  if (result) {
                    var data = rows[0];
                    util.setSuccess(200, data);
                    return util.send(res);
                  }

                  return res.status(401).send({
                    status: 401,
                    error: 'Authentication information is invalid'
                  });
                });

                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                util.setError(400, 'please check your internet connection');
                return _context2.abrupt("return", util.send(res));

              case 16:
                return _context2.abrupt("return", null);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 12]]);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;