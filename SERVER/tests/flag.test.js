

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

describe('Flag endpoint tests', () => {
    it('Should fail to post a flag ', (done) => {
        const data = {};
        chai.request(server)
            .post('/api/v1/flag')
            .send(data)
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
            });
        done();
    });
    it('should post a flagged comment', (done) => {
        const data = {
            'comment_id': '99af8de9-3a8f-4671-9c54-5f2997292976',
            'email': 'victoranimate556@gmail.com',
            'reason': 'evil comment',
            'description': 'this man does not seem born again and i dont really know what to do about it'
        };
        chai.request(server)
            .post('/api/v1/flag')
            .set('Content-Type', 'application/json')
            .set('x-access-token', token)
            .send(data)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('success');
                response.body.data.should.be.an('Object');
                response.body.data.should.have.property('message')
                    .equal('Flagged request reported');
            });
        done();
    });



    it('should delete article', (done) => {
            const data = { 'comment_id': '99af8de9-3a8f-4671-9c54-5f2997292976'};
            chai.request(server)
                .delete(`/api/v1/flag/flagId`)
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
            .delete(`/api/v1/flag/flagId`)
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
                response.body.should.have.property('error')
                    .equal('Please select a particular comment to be flagged');
            });
        done();
    });


});

