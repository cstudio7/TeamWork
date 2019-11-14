"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// cors middleware
var cors = function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PATCH, PUT, GET, POST, DELETE');
    return res.status(200).json({});
  }

  next();
};

var _default = cors;
exports["default"] = _default;