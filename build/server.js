"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 8000; // Welcome message

_app["default"].get('/', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to Victor Godwin API.'
  });
});

var server = _http["default"].createServer(_app["default"]); // server.listen(port);


_app["default"].listen(port, function () {
  console.log("Miracle happens on port ".concat(port));
});

var _default = _app["default"];
exports["default"] = _default;