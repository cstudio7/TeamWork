"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var validateSignUp = [(0, _expressValidator.body)('email').exists().isEmail().isLength({
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
}, (0, _expressValidator.body)('reason').exists().isLength({
  min: 3,
  max: 50
}).withMessage('Please a geniue reason ').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'Please state a geniue reason'
    });
  }

  next();
}, (0, _expressValidator.body)('description').exists().isLength({
  min: 10,
  max: 500
}).withMessage('description should not be empty, should be descriptive and must contain more than 10 words').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'description should not be empty, should be descriptive and must contain more than 10 words'
    });
  }

  next();
}];
var _default = validateSignUp;
exports["default"] = _default;