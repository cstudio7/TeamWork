"use strict";

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../usingDB/controller/userController"));

var _signIn = _interopRequireDefault(require("../usingDB/validation/signIn"));

var _signUp = _interopRequireDefault(require("../usingDB/validation/signUp"));

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // sign in user


router.post('/api/v1/auth/signin', _signIn["default"], _userController["default"].signIn); // // sign up a user

router.post('/api/v1/auth/create-user', _checkAuth["default"].checkToken, _checkAuth["default"].confirmAdmin, _signUp["default"], _userController["default"].signUp);
module.exports = router;