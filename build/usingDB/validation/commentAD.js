"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var commentCheck = [(0, _expressValidator.body)('comment').exists().isLength({
  min: 50,
  max: 500
}).withMessage('words should not be empty, should be more than 50 and less than 500 character').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'words should not be empty, should be more than 50 and less than 500 character'
    });
  }

  next();
}];
var _default = commentCheck;
exports["default"] = _default;