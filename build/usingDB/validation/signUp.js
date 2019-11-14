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
      error: 'email should not be empty and should include @ format'
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
}, (0, _expressValidator.body)('first_name').exists().isLength({
  min: 2,
  max: 50
}).withMessage('first_name should not be empty, should be more than five and less than 50 character').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'first_name should not be empty, should be more than five and less than 50 character'
    });
  }

  next();
}, (0, _expressValidator.body)('last_name').exists().isLength({
  min: 2,
  max: 50
}).withMessage('last_name should not be empty, should be more than five and less than 50 character').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'last_name should not be empty, should be more than five and less than 50 character'
    });
  }

  next();
}, (0, _expressValidator.body)('department').exists().isLength({
  min: 5,
  max: 50
}).withMessage('department should not be empty').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'department should not be empty'
    });
  }

  next();
}, (0, _expressValidator.body)('job_role').exists().isLength({
  min: 5,
  max: 50
}).withMessage('job_role should not be empty and should be descriptive').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'job_role should not be empty and should descriptive'
    });
  }

  next();
}, (0, _expressValidator.body)('address').exists().isLength({
  min: 5,
  max: 50
}).withMessage('address should not be empty and should be more than 5 words').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'address should not be empty and should be more than 5 words'
    });
  }

  next();
}, (0, _expressValidator.body)('gender').exists().isLength({
  min: 4,
  max: 50
}).isIn(['male', 'female']).withMessage('Please specify the gender status').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'Please specify the gender status'
    });
  }

  next();
}, (0, _expressValidator.body)('is_admin').exists().isLength({
  min: 4,
  max: 50
}).isIn(['true', 'false']).withMessage('Please specify status').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'Please specify your status'
    });
  }

  next();
}];
var _default = validateSignUp;
exports["default"] = _default;