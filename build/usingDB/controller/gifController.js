"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

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

var Gif =
/*#__PURE__*/
function () {
  function Gif() {
    _classCallCheck(this, Gif);
  }

  _createClass(Gif, null, [{
    key: "createAd",

    /**
    * Create A Gif Ad
    * @param {object} req
    * @param {object} res
    * @returns {object} car object
    */
    value: function () {
      var _createAd = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, gif_url, filename, token, decode, author_id, text, values, _ref, rows, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _cloudinary["default"].config({
                  cloud_name: process.env.CLOUD_NAME,
                  api_key: process.env.API_KEY,
                  api_secret: process.env.API_SECRET
                });

                if (!req.files) {
                  _context.next = 8;
                  break;
                }

                if (!req.files.gif_url) {
                  _context.next = 8;
                  break;
                }

                filename = req.files.gif_url.path;
                _context.next = 6;
                return _cloudinary["default"].uploader.upload(filename, {
                  tags: 'gotemps',
                  resource_type: 'auto'
                })["catch"](function (err) {
                  if (err) {
                    util.setError(400, '.. server not connecting');
                    return util.send(res);
                  }
                });

              case 6:
                result = _context.sent;
                gif_url = result.secure_url;

              case 8:
                token = req.headers['x-access-token'] || req.query.token || req.body.token;
                decode = _jsonwebtoken["default"].verify(token, process.env.TOKEN);
                author_id = decode.id;
                text = "INSERT INTO\n    gifs(gif_id, created_on, title, gif_url, author_id)\n    VALUES($1, $2, $3, $4, $5)\n      returning *";
                values = [(0, _v["default"])(), (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'), req.body.title, gif_url, author_id];

                if (gif_url) {
                  _context.next = 16;
                  break;
                }

                util.setError(400, 'Please select a gif image');
                return _context.abrupt("return", util.send(res));

              case 16:
                _context.prev = 16;
                _context.next = 19;
                return _db["default"].query(text, values);

              case 19:
                _ref = _context.sent;
                rows = _ref.rows;
                dataValues = rows[0];
                note = {
                  message: 'GIF image successfully posted'
                };
                data = _objectSpread({}, note, {}, dataValues);
                util.setSuccess(200, data);
                return _context.abrupt("return", util.send(res));

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](16);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[16, 28]]);
      }));

      function createAd(_x, _x2) {
        return _createAd.apply(this, arguments);
      }

      return createAd;
    }()
    /**
     * Delete an Article
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 400
     */

  }, {
    key: "deleteGif",
    value: function () {
      var _deleteGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var findOneQuery, deleteOneQuery, _ref2, rows, response, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findOneQuery = 'SELECT * FROM gifs WHERE gif_id=$1 ';
                deleteOneQuery = 'DELETE FROM gifs WHERE gif_id=$1 returning *';

                if (req.body.gif_id) {
                  _context2.next = 5;
                  break;
                }

                util.setError(400, 'Please select an article to be deleted');
                return _context2.abrupt("return", util.send(res));

              case 5:
                _context2.prev = 5;
                _context2.next = 8;
                return _db["default"].query(findOneQuery, [req.body.gif_id]);

              case 8:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 13;
                  break;
                }

                util.setError(400, 'gif not found');
                return _context2.abrupt("return", util.send(res));

              case 13:
                _context2.next = 15;
                return _db["default"].query(deleteOneQuery, [req.body.gif_id]);

              case 15:
                response = _context2.sent;
                dataValues = response.rows[0];
                note = {
                  message: 'gif post successfully deleted'
                };
                data = _objectSpread({}, note, {}, dataValues);
                util.setSuccess(200, data);
                return _context2.abrupt("return", util.send(res));

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](5);
                util.setError(400, _context2.t0);
                return _context2.abrupt("return", util.send(res));

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 23]]);
      }));

      function deleteGif(_x3, _x4) {
        return _deleteGif.apply(this, arguments);
      }

      return deleteGif;
    }()
    /**
     * Comment on a Gif
     * @param {object} req
     * @param {object} res
     * @returns {object} comment on a gif
     */

  }, {
    key: "commentOnGif",
    value: function () {
      var _commentOnGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var token, decode, author_id, findOneQuery, text, values, _ref3, rows, title, response, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = req.headers['x-access-token'] || req.query.token || req.body.token;
                decode = _jsonwebtoken["default"].verify(token, process.env.TOKEN);
                author_id = decode.id;
                findOneQuery = 'SELECT * FROM gifs WHERE gif_id=$1';
                text = "INSERT INTO\n      comments(comment_id, gif_article_id, created_on, comment, author_id)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
                values = [(0, _v["default"])(), req.body.gif_id || req.body.article_id, (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'), req.body.comment, author_id];

                if (!(!req.body.gif_id || !req.body.comment)) {
                  _context3.next = 9;
                  break;
                }

                util.setError(400, 'Please select an article or gif you want to comment on');
                return _context3.abrupt("return", util.send(res));

              case 9:
                _context3.prev = 9;
                _context3.next = 12;
                return _db["default"].query(findOneQuery, [req.body.gif_id]);

              case 12:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                title = {
                  title: rows[0].title
                };

                if (rows[0]) {
                  _context3.next = 18;
                  break;
                }

                util.setError(400, 'Image not found');
                return _context3.abrupt("return", util.send(res));

              case 18:
                _context3.next = 20;
                return _db["default"].query(text, values);

              case 20:
                response = _context3.sent;
                dataValues = response.rows[0];
                note = {
                  message: 'comment Successfully  Created'
                };
                data = _objectSpread({}, note, {}, title, {}, dataValues);
                util.setSuccess(200, data);
                return _context3.abrupt("return", util.send(res));

              case 28:
                _context3.prev = 28;
                _context3.t0 = _context3["catch"](9);
                util.setError(400, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 32:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[9, 28]]);
      }));

      function commentOnGif(_x5, _x6) {
        return _commentOnGif.apply(this, arguments);
      }

      return commentOnGif;
    }()
    /**
     * Employee can view a specific gif
     * @param {object} req
     * @param {object} res
     * @returns {object} Employee can view a specific gif
     */

  }, {
    key: "viewSpecificGif",
    value: function () {
      var _viewSpecificGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var findOneQuery, text, crow, _ref4, rows, comments, dataValues, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                findOneQuery = "SELECT gif_id, created_on, title, gif_url FROM gifs WHERE gif_id=$1";
                text = "SELECT comment_id, comment, author_id FROM comments WHERE gif_article_id = $1;";

                if (req.body.gif_id) {
                  _context4.next = 5;
                  break;
                }

                util.setError(400, 'Please select a gif you want to comment on');
                return _context4.abrupt("return", util.send(res));

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return _db["default"].query(text, [req.body.gif_id]);

              case 8:
                crow = _context4.sent;
                _context4.next = 11;
                return _db["default"].query(findOneQuery, [req.body.gif_id]);

              case 11:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                comments = crow.rows;

                if (rows[0]) {
                  _context4.next = 17;
                  break;
                }

                util.setError(400, 'Image not found');
                return _context4.abrupt("return", util.send(res));

              case 17:
                dataValues = rows[0];
                data = _objectSpread({}, dataValues, {
                  comments: comments
                });
                util.setSuccess(200, data);
                return _context4.abrupt("return", util.send(res));

              case 23:
                _context4.prev = 23;
                _context4.t0 = _context4["catch"](5);
                util.setError(400, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 23]]);
      }));

      function viewSpecificGif(_x7, _x8) {
        return _viewSpecificGif.apply(this, arguments);
      }

      return viewSpecificGif;
    }()
    /**
     * Employee can view all articles,showing the most recently posted articles  first
     * @param {object} req
     * @param {object} res
     * @returns {object} Employee can view all articles
     **/

  }, {
    key: "viewFeeds",
    value: function () {
      var _viewFeeds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var findOneQuery, _ref5, rows, dataValues;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                findOneQuery = 'SELECT * FROM gifs ORDER BY created_on DESC';
                _context5.prev = 1;
                _context5.next = 4;
                return _db["default"].query(findOneQuery);

              case 4:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (rows[0]) {
                  _context5.next = 9;
                  break;
                }

                util.setError(400, 'Image not found');
                return _context5.abrupt("return", util.send(res));

              case 9:
                dataValues = rows;
                return _context5.abrupt("return", res.status(200).send({
                  status: 'success',
                  data: dataValues
                }));

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](1);
                util.setError(400, _context5.t0);
                return _context5.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 13]]);
      }));

      function viewFeeds(_x9, _x10) {
        return _viewFeeds.apply(this, arguments);
      }

      return viewFeeds;
    }()
  }]);

  return Gif;
}();

var _default = Gif;
exports["default"] = _default;