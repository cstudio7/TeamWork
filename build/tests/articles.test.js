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
(0, _mocha.describe)('Articles endpoint tests', function () {
  it('Should fail to create an article ', function (done) {
    var data = {};

    _chai["default"].request(_server["default"]).post('/api/v1/article').send(data).set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
    });

    done();
  });
  it('Should fail to create an article due to database issues ', function (done) {
    var articles = {};

    _chai["default"].request(_server["default"]).post('/api/v1/article').send(articles).set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
    });

    done();
  });
  it('should create an article', function (done) {
    var data = {
      'title': 'Egetsque id',
      'article': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    };

    _chai["default"].request(_server["default"]).post('/api/v1/article').set('Content-Type', 'application/json').set('x-access-token', token).send(data).end(function (request, response) {
      response.body.should.have.property('status').equal('success');
      response.body.data.should.be.an('Object');
      response.body.data.should.have.property('message').equal('Article successfully posted');
      response.body.data.should.have.property('title').equal(data.title);
      response.body.data.should.have.property('article').equal(data.article);
    });

    done();
  });
  it('should not found article', function (done) {
    _chai["default"].request(_server["default"]).get("/api/v1/article/articleId").set('x-access-token', token).send({}).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
      response.body.should.have.property('error').equal('Please select an article you want to comment on');
    });

    done();
  });
  it('should found article', function (done) {
    var article = {
      "article_id": "1d8165f9-0fae-4dd0-9009-9154e4bc706b",
      "created_on": "2019-11-10 22:53:37",
      "title": "Thomas Editing",
      "article": "Being happy does good like medcine, im happy and will always be. As an Administrator"
    };

    _chai["default"].request(_server["default"]).get("/api/v1/article/articleId").set('Content-Type', 'application/json').set('x-access-token', token).send(article).end(function (request, response) {
      response.body.should.have.property('status').equal('success');
      response.body.should.have.property('data');
    });

    done();
  });
  it('should get an article feeds', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/feed').set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('success');
      response.body.should.have.property('data');
    });

    done();
  });
  it('should delete article', function (done) {
    var data = {
      "article_Id": "47e0b147-4137-4cb6-86a1-f71dbf7eb9c7"
    };

    _chai["default"].request(_server["default"])["delete"]("/api/v1/article/articleId").set('Content-Type', 'application/json').set('x-access-token', token).send(data).end(function (request, response) {
      response.body.should.have.property('status');
    });

    done();
  });
  it('should fail to delete article 2', function (done) {
    _chai["default"].request(_server["default"])["delete"]("/api/v1/article/articleId").set('x-access-token', token).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
      response.body.should.have.property('error').equal('Please select an article to be deleted');
    });

    done();
  });
  it('should fail to add comment', function (done) {
    var comment = '';

    _chai["default"].request(_server["default"]).post("/api/v1/article/:articleId/comment").set('x-access-token', token).send({
      comment: comment
    }).end(function (request, response) {
      response.body.should.have.property('status').equal('error');
    });

    done();
  });
});