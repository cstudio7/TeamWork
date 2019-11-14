"use strict";

var _express = _interopRequireDefault(require("express"));

var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));

var _gifController = _interopRequireDefault(require("../usingDB/controller/gifController"));

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

var _createAd = _interopRequireDefault(require("../usingDB/validation/createAd"));

var _commentAD = _interopRequireDefault(require("../usingDB/validation/commentAD"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multipartyMiddleware = (0, _connectMultiparty["default"])();

var router = _express["default"].Router(); // protected route to post gif


router.post('/api/v1/gifs', _checkAuth["default"].checkToken, multipartyMiddleware, _createAd["default"], _gifController["default"].createAd); // protected route to delete gif

router["delete"]('/api/v1/gif/:gifId', _checkAuth["default"].checkToken, _gifController["default"].deleteGif); // protected route to comment on a gif

router.post('/api/v1/gifs/:gifId/comment', _checkAuth["default"].checkToken, _commentAD["default"], _gifController["default"].commentOnGif); // protected route to get a specific gif

router.get('/api/v1/gif/:gifId', _checkAuth["default"].checkToken, _gifController["default"].viewSpecificGif); // protected route to get feed

router.get('/api/v1/feeds', _checkAuth["default"].checkToken, _gifController["default"].viewFeeds);
module.exports = router;