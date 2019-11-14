

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../server';
import { users, auth, articles } from '../mock';
import { expect } from 'chai';
chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

let { token } = auth;
before((done) => {
    const login = {
        email: 'conquerorsword36@yahoo.com',
        password: 'kaliboy556'
    };

    chai.request(server)
        .post('/api/v1/auth/signin/')
        .send(login)
        .set('x-access-token', token)
        .end((request, response) => {
            response.body.should.have.property('status')
                .equal('success');
        });
    done();
});

describe('Articles endpoint tests', () => {
    it('Should fail to create an article ', (done) => {
        const data = {};
        chai.request(server)
            .post('/api/v1/article')
            .send(data)
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
            });
        done();
    });
    it('Should fail to create an article due to database issues ', (done) => {
        const articles = {}
        chai.request(server)
            .post('/api/v1/article')
            .send(articles)
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
            });
        done();
    });
    it('should create an article', (done) => {
        const data = {
            'title': 'Egetsque id',
            'article': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        };
        chai.request(server)
            .post('/api/v1/article')
            .set('Content-Type', 'application/json')
            .set('x-access-token', token)
            .send(data)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('success');
                response.body.data.should.be.an('Object');
                response.body.data.should.have.property('message')
                    .equal('Article successfully posted');
                response.body.data.should.have.property('title')
                    .equal(data.title);
                response.body.data.should.have.property('article')
                    .equal(data.article);
            });
        done();
    });

    it('should not found article', (done) => {
        chai.request(server)
            .get(`/api/v1/article/articleId`)
            .set('x-access-token', token)
            .send({})
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
                response.body.should.have.property('error')
                    .equal('Please select an article you want to comment on');
            });
        done();
    });

    it('should found article', (done) => {
        const article = {
            "article_id": "1d8165f9-0fae-4dd0-9009-9154e4bc706b",
            "created_on": "2019-11-10 22:53:37",
            "title": "Thomas Editing",
            "article": "Being happy does good like medcine, im happy and will always be. As an Administrator",
        };
            chai.request(server)
            .get(`/api/v1/article/articleId`)
                .set('Content-Type', 'application/json')
                .set('x-access-token', token)
                .send(article)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('success');
                response.body.should.have.property('data');
            });
        done();
    });


    it('should get an article feeds', (done) => {
        chai.request(server)
            .get('/api/v1/feed')
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('success');
                response.body.should.have.property('data');
            });
        done();
    });


    it('should delete article', (done) => {
            const data = { "article_Id" : "47e0b147-4137-4cb6-86a1-f71dbf7eb9c7"};
            chai.request(server)
                .delete(`/api/v1/article/articleId`)
                .set('Content-Type', 'application/json')
                .set('x-access-token', token)
                .send( data)
                .end((request, response) => {
                    response.body.should.have.property('status')
                });
            done();
        });

    it('should fail to delete article 2', (done) => {
        chai.request(server)
            .delete(`/api/v1/article/articleId`)
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
                response.body.should.have.property('error')
                    .equal('Please select an article to be deleted');
            });
        done();
    });

    it('should fail to add comment', (done) => {
        const comment = '';
        chai.request(server)
            .post(`/api/v1/article/:articleId/comment`)
            .set('x-access-token', token)
            .send({ comment})
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
            });
        done();
    });
});

