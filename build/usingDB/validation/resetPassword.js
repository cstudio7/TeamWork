"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var validateEmail = [(0, _expressValidator.body)('email').exists().isEmail().isLength({
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
}];
var _default = validateEmail;
exports["default"] = _default;