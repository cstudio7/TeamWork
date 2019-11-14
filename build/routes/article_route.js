"use strict";

var _express = _interopRequireDefault(require("express"));

var _articleController = _interopRequireDefault(require("../usingDB/controller/articleController"));

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

var _createArticle = _interopRequireDefault(require("../usingDB/validation/createArticle"));

var _commentAD = _interopRequireDefault(require("../usingDB/validation/commentAD"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // protected route to post an article


router.post('/api/v1/article', _createArticle["default"], _checkAuth["default"].checkToken, _articleController["default"].postArticle); // // protected route to update an article

router.patch('/api/v1/article/:articleId', _checkAuth["default"].checkToken, _articleController["default"].updateArticle); // // protected route to delete an article

router["delete"]('/api/v1/article/:articleId', _checkAuth["default"].checkToken, _articleController["default"].deleteArticle); // protected route to comment on an article

router.post('/api/v1/article/:articleId/comment', _checkAuth["default"].checkToken, _commentAD["default"], _articleController["default"].commentOnAnArticle); // // protected route to get a specific article

router.get('/api/v1/article/:articleId', _checkAuth["default"].checkToken, _articleController["default"].viewSpecificArticle); // // protected route to get feed

router.get('/api/v1/feed', _checkAuth["default"].checkToken, _articleController["default"].viewFeed);
module.exports = router;