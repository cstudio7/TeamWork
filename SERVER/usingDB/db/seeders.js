/* eslint-disable no-unused-vars */

const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

let pool = new Pool();

if (process.env.NODE_ENV === 'test') {
    pool = new Pool({

        connectionString: process.env.TEST_DATABASE_URL, ssl: true,
    });
} else {
    pool = new Pool({

        connectionString: process.env.DATABASE_URL,
    });
}

pool.on('connect', () => {
    console.log('connected to the db');
});

// create user, gif articles and flag tables



    const createUserTables = () => {
        const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          token VARCHAR(8000),
          email VARCHAR(128) UNIQUE NOT NULL,
          first_name VARCHAR(128),
          last_name VARCHAR(128),
          password VARCHAR(128) NOT NULL,
          is_admin BOOL DEFAULT 'f',
          address VARCHAR(128),
          gender VARCHAR(128),
          job_role VARCHAR(128),
          department VARCHAR(128)
        )`;
        pool.query(queryText)
            .then((res) => {
                console.log(res);
                pool.end();
            })
            .catch((err) => {
                console.log(err);
                pool.end();
            });
    };

const createGifTables = () => {

    const queryText = `CREATE TABLE IF NOT EXISTS
      gifs(
        gif_id UUID PRIMARY KEY,
        created_on VARCHAR(128),
        title VARCHAR(128),
        gif_url VARCHAR(128),
        author_id VARCHAR(128)
      )`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createArticleTables = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
       articles(
            article_id UUID PRIMARY KEY,
            created_on VARCHAR(128),
            title VARCHAR(128),
            article VARCHAR(128),
            author_id VARCHAR(128)
        )`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createCommentTables = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
       comments(
            comment_id UUID PRIMARY KEY,
            gif_article_Id VARCHAR(128),
            created_on VARCHAR(128),
            comment VARCHAR(255),
            author_id VARCHAR(128)
        )`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createFlagTables = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        flags(
          id UUID PRIMARY KEY,
          email VARCHAR(128) NOT NULL,        
          reason VARCHAR(128),
          description VARCHAR(128),
          created_on TIMESTAMP,
          comment_id VARCHAR(128)
        )`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// delete Gif Tables
const dropGifTables = () => {
    const queryText = 'DROP TABLE IF EXISTS cars';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// delete article tables
const dropArticleTables = () => {
    const queryText = 'DROP TABLE IF EXISTS orders';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// delete Feed Tables
const dropCommentTables = () => {
    const queryText = 'DROP TABLE IF EXISTS comments';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// delete user tables
const dropUserTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

// delete flag tables
const dropFlagTables = () => {
    const queryText = 'DROP TABLE IF EXISTS flags';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    process.exit(0);
});

module.exports = {
    createUserTables,
    createGifTables,
    createCommentTables,
    createFlagTables,
    createArticleTables,
    dropGifTables,
    dropCommentTables,
    dropFlagTables,
    dropArticleTables,
    dropUserTables,
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');
