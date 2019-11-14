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
(0, _mocha.describe)('Sign in endpoints', function () {
  it('it should fail to signin', function (done) {
    var data = {};

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(data).set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
    });

    done();
  });
});