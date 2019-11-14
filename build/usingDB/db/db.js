"use strict";

/* eslint-disable no-unused-vars */
var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var pool = new Pool();

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.TEST_DATABASE_URL,
    ssl: true
  });
} else if (process.env.NODE_ENV_DEV === 'development') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

pool.on('connect', function () {
  console.log('connected to the db');
}); // create user, gif articles and flag tables

var createUserTables = function createUserTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        users(\n          id UUID PRIMARY KEY,\n          token VARCHAR(8000),\n          email VARCHAR(128) UNIQUE NOT NULL,\n          first_name VARCHAR(128),\n          last_name VARCHAR(128),\n          password VARCHAR(128) NOT NULL,\n          is_admin BOOL DEFAULT 'f',\n          address VARCHAR(128),\n          gender VARCHAR(128),\n          job_role VARCHAR(128),\n          department VARCHAR(128)\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createGifTables = function createGifTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      gifs(\n        gif_id UUID PRIMARY KEY,\n        created_on VARCHAR(128),\n        title VARCHAR(128),\n        gif_url VARCHAR(128),\n        author_id VARCHAR(128)\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createArticleTables = function createArticleTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n       articles(\n            article_id UUID PRIMARY KEY,\n            created_on VARCHAR(128),\n            title VARCHAR(128),\n            article VARCHAR(600),\n            author_id VARCHAR(128)\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createCommentTables = function createCommentTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n       comments(\n            comment_id UUID PRIMARY KEY,\n            gif_article_Id VARCHAR(128),\n            created_on VARCHAR(128),\n            comment VARCHAR(255),\n            author_id VARCHAR(128)\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createFlagTables = function createFlagTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        flags(\n          id UUID PRIMARY KEY,\n          email VARCHAR(128) NOT NULL,        \n          reason VARCHAR(128),\n          description VARCHAR(128),\n          created_on TIMESTAMP,\n          comment_id VARCHAR(128)\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete Gif Tables


var dropGifTables = function dropGifTables() {
  var queryText = 'DROP TABLE IF EXISTS cars';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete article tables


var dropArticleTables = function dropArticleTables() {
  var queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete Feed Tables


var dropCommentTables = function dropCommentTables() {
  var queryText = 'DROP TABLE IF EXISTS comments';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete user tables


var dropUserTables = function dropUserTables() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete flag tables


var dropFlagTables = function dropFlagTables() {
  var queryText = 'DROP TABLE IF EXISTS flags';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  process.exit(0);
});
module.exports = {
  createUserTables: createUserTables,
  createGifTables: createGifTables,
  createCommentTables: createCommentTables,
  createFlagTables: createFlagTables,
  createArticleTables: createArticleTables,
  dropGifTables: dropGifTables,
  dropCommentTables: dropCommentTables,
  dropFlagTables: dropFlagTables,
  dropArticleTables: dropArticleTables,
  dropUserTables: dropUserTables
}; // eslint-disable-next-line import/no-extraneous-dependencies

require('make-runnable');