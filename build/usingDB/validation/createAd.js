"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var postGif = [(0, _expressValidator.body)('title').exists().isLength({
  min: 5,
  max: 50
}).withMessage('title should not be empty, should be more than five and less than 50 character').trim(), function (req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 'error',
      error: 'title should not be empty, should be more than five and less than 50 character'
    });
  }

  next();
}];
var _default = postGif;
exports["default"] = _default;