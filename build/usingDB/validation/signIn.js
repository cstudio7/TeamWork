"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var validateSignIn = [(0, _expressValidator.body)('email').exists().isEmail().isLength({
  min: 1,
  max: 50
}).withMessage('email should not be empty and should include @').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'email should not be empty and should include @'
    });
  }

  next();
}, (0, _expressValidator.body)('password').exists().isLength({
  min: 5,
  max: 50
}).withMessage('password should not be empty, should be more than five and less than 50 character').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'password should not be empty, should be more than five and less than 50 character'
    });
  }

  next();
}];
var _default = validateSignIn;
exports["default"] = _default;