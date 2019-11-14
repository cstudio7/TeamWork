"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _gif_route = _interopRequireDefault(require("./routes/gif_route"));

var _user_route = _interopRequireDefault(require("./routes/user_route"));

var _article_route = _interopRequireDefault(require("./routes/article_route"));

var _flag_route = _interopRequireDefault(require("./routes/flag_route"));

var _swaggerDoc = _interopRequireDefault(require("../swaggerDoc"));

var _cors = _interopRequireDefault(require("./usingDB/middleware/cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use('/uploads', _express["default"]["static"]('uploads'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _morgan["default"])('dev'));
app.use(_cors["default"]);
app.use('/', _user_route["default"]);
app.use('/', _gif_route["default"]);
app.use('/', _article_route["default"]);
app.use('/', _flag_route["default"]);
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerDoc["default"]));
module.exports = app;