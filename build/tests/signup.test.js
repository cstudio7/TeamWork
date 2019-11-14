"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiThings = _interopRequireDefault(require("chai-things"));

var _mocha = require("mocha");

var _server = _interopRequireDefault(require("../server"));

var _mock = require("../mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_chai["default"].should();

_chai["default"].use(_chaiThings["default"]);

_chai["default"].use(_chaiHttp["default"]);

var token = _mock.auth.token;
before(function (done) {
  var login = {
    email: 'conquerorsword36@yahoo.com',
    password: 'kaliboy556'
  };

  _chai["default"].request(_server["default"]).post('/api/v1/auth/signin/').send(login).set('x-access-token', token).end(function (request, response) {
    response.body.should.have.property('status').equal('success');
  });

  done();
});
(0, _mocha.describe)('Sign up endpoints', function () {
  it('it should fail to create user', function (done) {
    var data = {};

    _chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').send(data).set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
    });

    done();
  });
});
