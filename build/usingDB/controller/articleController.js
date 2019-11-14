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

var Article =
/*#__PURE__*/
function () {
  function Article() {
    _classCallCheck(this, Article);
  }

  _createClass(Article, null, [{
    key: "postArticle",

    /**
     * Create an Article
     * @param {object} req
     * @param {object} res
     * @returns {object} article object
     */
    value: function () {
      var _postArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var text, token, decode, author_id, values, _ref, rows, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = "INSERT INTO\n      articles(article_id, created_on, title, article, author_id)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
                token = req.headers['x-access-token'] || req.query.token || req.body.token;
                decode = _jsonwebtoken["default"].verify(token, process.env.TOKEN);
                author_id = decode.id;
                values = [(0, _v["default"])(), (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'), req.body.title, req.body.article, author_id];
                _context.prev = 5;
                _context.next = 8;
                return _db["default"].query(text, values);

              case 8:
                _ref = _context.sent;
                rows = _ref.rows;
                dataValues = rows[0];
                note = {
                  message: 'Article successfully posted'
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

      function postArticle(_x, _x2) {
        return _postArticle.apply(this, arguments);
      }

      return postArticle;
    }()
    /**
    * Update an Article
    * @param {object} req
    * @param {object} res
    * @returns {object} updated an article
    */

  }, {
    key: "updateArticle",
    value: function () {
      var _updateArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var token, decode, author, findOneQuery, updateOneQuery, _ref2, rows, values, response, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers['x-access-token'] || req.query.token || req.body.token;
                decode = _jsonwebtoken["default"].verify(token, process.env.TOKEN);
                author = decode.id;
                findOneQuery = 'SELECT * FROM articles WHERE article_id=$1 AND author_id=$2';
                updateOneQuery = "UPDATE articles\n    SET created_on=$1, article=$2\n    WHERE article_id=$3 returning *";

                if (!(!req.body.author_id || !req.body.article || !req.body.article_id)) {
                  _context2.next = 8;
                  break;
                }

                util.setError(400, 'Please select an article to be updated');
                return _context2.abrupt("return", util.send(res));

              case 8:
                if (!(req.body.author_id !== author)) {
                  _context2.next = 11;
                  break;
                }

                util.setError(400, 'You are cannot only update your post');
                return _context2.abrupt("return", util.send(res));

              case 11:
                _context2.prev = 11;
                _context2.next = 14;
                return _db["default"].query(findOneQuery, [req.body.article_id, req.body.author_id]);

              case 14:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 19;
                  break;
                }

                util.setError(400, 'Article not found');
                return _context2.abrupt("return", util.send(res));

              case 19:
                values = [(0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'), req.body.article, req.body.article_id];
                _context2.next = 22;
                return _db["default"].query(updateOneQuery, values);

              case 22:
                response = _context2.sent;
                dataValues = response.rows[0];
                note = {
                  message: 'Article Successfully  Updated'
                };
                data = _objectSpread({}, note, {}, dataValues);
                util.setSuccess(200, data);
                return _context2.abrupt("return", util.send(res));

              case 30:
                _context2.prev = 30;
                _context2.t0 = _context2["catch"](11);
                util.setError(400, error);
                return _context2.abrupt("return", util.send(res));

              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[11, 30]]);
      }));

      function updateArticle(_x3, _x4) {
        return _updateArticle.apply(this, arguments);
      }

      return updateArticle;
    }()
    /**
    * Delete an Article
    * @param {object} req
    * @param {object} res
    * @returns {void} return status code 400
    */

  }, {
    key: "deleteArticle",
    value: function () {
      var _deleteArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var findOneQuery, deleteOneQuery, _ref3, rows, response, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                findOneQuery = 'SELECT * FROM articles WHERE article_id=$1 ';
                deleteOneQuery = 'DELETE FROM articles WHERE article_id=$1 returning *';

                if (req.body.article_id) {
                  _context3.next = 5;
                  break;
                }

                util.setError(400, 'Please select an article to be deleted');
                return _context3.abrupt("return", util.send(res));

              case 5:
                _context3.prev = 5;
                _context3.next = 8;
                return _db["default"].query(findOneQuery, [req.body.article_id]);

              case 8:
                _ref3 = _context3.sent;
                rows = _ref3.rows;

                if (rows[0]) {
                  _context3.next = 13;
                  break;
                }

                util.setError(400, 'Article not found');
                return _context3.abrupt("return", util.send(res));

              case 13:
                _context3.next = 15;
                return _db["default"].query(deleteOneQuery, [req.body.article_id]);

              case 15:
                response = _context3.sent;
                dataValues = response.rows[0];
                note = {
                  message: 'Article Successfully  Deleted'
                };
                data = _objectSpread({}, note, {}, dataValues);
                util.setSuccess('success', data);
                return _context3.abrupt("return", util.send(res));

              case 24:
                _context3.prev = 24;
                _context3.t0 = _context3["catch"](5);
                util.setError(400, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 24]]);
      }));

      function deleteArticle(_x5, _x6) {
        return _deleteArticle.apply(this, arguments);
      }

      return deleteArticle;
    }()
    /**
     * Comment on an Article
     * @param {object} req
     * @param {object} res
     * @returns {object} comment on an article
     */

  }, {
    key: "commentOnAnArticle",
    value: function () {
      var _commentOnAnArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var token, decode, author_id, findOneQuery, text, values, _ref4, rows, title, response, dataValues, note, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = req.headers['x-access-token'] || req.query.token || req.body.token;
                decode = _jsonwebtoken["default"].verify(token, process.env.TOKEN);
                author_id = decode.id;
                findOneQuery = 'SELECT * FROM articles WHERE article_id=$1';
                text = "INSERT INTO\n      comments(comment_id, gif_article_id, created_on, comment, author_id)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
                values = [(0, _v["default"])(), req.body.gif_id || req.body.article_id, (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'), req.body.comment, author_id];

                if (!(!req.body.article_id || !req.body.comment)) {
                  _context4.next = 9;
                  break;
                }

                util.setError(400, 'Please select an article or gif you want to comment on');
                return _context4.abrupt("return", util.send(res));

              case 9:
                _context4.prev = 9;
                _context4.next = 12;
                return _db["default"].query(findOneQuery, [req.body.article_id]);

              case 12:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                title = {
                  title: rows[0].title
                };

                if (rows[0]) {
                  _context4.next = 18;
                  break;
                }

                util.setError(400, 'Article not found');
                return _context4.abrupt("return", util.send(res));

              case 18:
                _context4.next = 20;
                return _db["default"].query(text, values);

              case 20:
                response = _context4.sent;
                dataValues = response.rows[0];
                note = {
                  message: 'comment Successfully  Created'
                };
                data = _objectSpread({}, note, {}, title, {}, dataValues);
                util.setSuccess('success', data);
                return _context4.abrupt("return", util.send(res));

              case 28:
                _context4.prev = 28;
                _context4.t0 = _context4["catch"](9);
                util.setError(400, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[9, 28]]);
      }));

      function commentOnAnArticle(_x7, _x8) {
        return _commentOnAnArticle.apply(this, arguments);
      }

      return commentOnAnArticle;
    }()
    /**
     * Employee can view a specific article
     * @param {object} req
     * @param {object} res
     * @returns {object} Employee can view a specific article
     */

  }, {
    key: "viewSpecificArticle",
    value: function () {
      var _viewSpecificArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var findOneQuery, text, crow, _ref5, rows, comments, dataValues, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                findOneQuery = "SELECT article_id, created_on, title, article FROM articles WHERE article_id=$1";
                text = "SELECT comment_id, comment, author_id FROM comments WHERE gif_article_id = $1;";

                if (req.body.article_id) {
                  _context5.next = 5;
                  break;
                }

                util.setError(400, 'Please select an article you want to comment on');
                return _context5.abrupt("return", util.send(res));

              case 5:
                _context5.prev = 5;
                _context5.next = 8;
                return _db["default"].query(text, [req.body.article_id]);

              case 8:
                crow = _context5.sent;
                _context5.next = 11;
                return _db["default"].query(findOneQuery, [req.body.article_id]);

              case 11:
                _ref5 = _context5.sent;
                rows = _ref5.rows;
                comments = crow.rows;

                if (rows[0]) {
                  _context5.next = 17;
                  break;
                }

                util.setError(400, 'Article not found');
                return _context5.abrupt("return", util.send(res));

              case 17:
                dataValues = rows[0];
                data = _objectSpread({}, dataValues, {
                  comments: comments
                });
                util.setSuccess(200, data);
                return _context5.abrupt("return", util.send(res));

              case 23:
                _context5.prev = 23;
                _context5.t0 = _context5["catch"](5);
                util.setError(400, _context5.t0);
                return _context5.abrupt("return", util.send(res));

              case 27:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[5, 23]]);
      }));

      function viewSpecificArticle(_x9, _x10) {
        return _viewSpecificArticle.apply(this, arguments);
      }

      return viewSpecificArticle;
    }()
    /**
     * Employee can view all articles,showing the most recently posted articles  first
     * @param {object} req
     * @param {object} res
     * @returns {object} Employee can view all articles
     **/

  }, {
    key: "viewFeed",
    value: function () {
      var _viewFeed = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var findOneQuery, _ref6, rows, dataValues;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                findOneQuery = 'SELECT * FROM articles ORDER BY created_on DESC';
                _context6.prev = 1;
                _context6.next = 4;
                return _db["default"].query(findOneQuery);

              case 4:
                _ref6 = _context6.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context6.next = 9;
                  break;
                }

                util.setError(400, 'Article not found');
                return _context6.abrupt("return", util.send(res));

              case 9:
                dataValues = rows;
                return _context6.abrupt("return", res.status(200).send({
                  status: 'success',
                  data: dataValues
                }));

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](1);
                util.setError(400, _context6.t0);
                return _context6.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 13]]);
      }));

      function viewFeed(_x11, _x12) {
        return _viewFeed.apply(this, arguments);
      }

      return viewFeed;
    }()
  }]);

  return Article;
}();

var _default = Article;
exports["default"] = _default;