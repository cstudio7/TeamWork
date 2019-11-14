

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../server';
import { users, auth,  } from '../mock';
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

describe('Sign up endpoints', () => {
  it('it should fail to create user', (done) => {
    const data = {};
    chai.request(server)
        .post('/api/v1/auth/create-user')
        .send(data)
        .set('x-access-token', token)
        .end((request, response) => {
          response.body.should.have.property('status')
              .equal('error');
        });
    done();
  });
 




});

