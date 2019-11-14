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
(0, _mocha.describe)('Gif endpoint tests', function () {
  it('Should fail to create a gif ', function (done) {
    var data = {
      "gif_id": "",
      "created_on": "\"2019-11-06T17:12:53.671Z\"",
      "title": "New Zee",
      "gif_url": "https://res.cloudinary.com/drmiaugou/image/upload/v1573060374/rnk73jv1pqomdbyxs0i1.jpg",
      "author_id": null
    };

    _chai["default"].request(_server["default"]).post('/api/v1/gifs').send(data).set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
    });

    done();
  });
  it('should get all gif', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/feeds').set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('success');
      response.body.should.have.property('data');
    });

    done();
  });
  it('should delete gif', function (done) {
    var data = {
      "gif_id": "4f1ba724-52c8-4a49-8a39-fc4db7aeb2ba"
    };

    _chai["default"].request(_server["default"])["delete"]("/api/v1/gif/gifId").set('Content-Type', 'application/json').set('x-access-token', token).send(data).end(function (request, response) {
      response.body.should.have.property('status');
    });

    done();
  });
  it('should fail to delete article 2', function (done) {
    _chai["default"].request(_server["default"])["delete"]("/api/v1/gif/:gifId").set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
      response.body.should.have.property('error').equal('Please select an article to be deleted');
    });

    done();
  });
  it('should fail to add comment', function (done) {
    var comment = '';

    _chai["default"].request(_server["default"]).post("/api/v1/gifs/gifId/comment").set('x-access-token', token).send({
      comment: comment
    }).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
    });

    done();
  });
});