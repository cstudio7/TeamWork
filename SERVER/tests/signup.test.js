

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

let  token  =  '"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnF1ZXJvcnN3b3JkMzZAeWFob28uY29tIiwiaWQiOiI3ODEyMGFhYy1lZGU1LTQ2ZjctOGMyMy04ZTdmZDQzYjg4NzQiLCJpc0FkbWluIjoidHJ1ZSIsImlhdCI6MTU3MzY0MDg3NiwiZXhwIjoxNTc5Njg4ODc2fQ.8u8f5sd_HEbTSKKPk_ZkLrlEvxDysRoVEAZBdOxF4MU",';
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
  it('should create a user', (done) => {
    const data = {
    'first_name': 'hirwa',
    'last_name': 'felix',
    'email': 'reef01.1@gmail.com',
    'password': '$2b$08$q7.kLHnw35Nli',
    'gender': 'male',
    'job_role': 'developer',
    'department': 'Software developer',
    'address': 'kigali-kicukiro-noboye',
    'is_admin':'true'    
    };
    chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Content-Type', 'application/json')
        .set('x-access-token', token)
        .send(data)
        .end((request, response) => {
          response.body.should.have.property('status')
              .equal('success');
          response.body.data.should.be.an('Object');
          response.body.data.should.have.property('message')
              .equal('User account successfully created');
        });
    done();
  });






});

