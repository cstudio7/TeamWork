"use strict";

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

var _flagController = _interopRequireDefault(require("../usingDB/controller/flagController"));

var _FlagAd = _interopRequireDefault(require("../usingDB/validation/FlagAd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var router = express.Router(); // protected route to report a posted Car Ad

router.post('/api/v1/flag', _FlagAd["default"], _checkAuth["default"].checkToken, _flagController["default"].createReport); // protected route to report a posted Car Ad

router["delete"]('/api/v1/flag/:flagId', _checkAuth["default"].checkToken, _checkAuth["default"].confirmAdmin, _flagController["default"].deleteReport);
module.exports = router;