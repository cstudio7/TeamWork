
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../server';
import { users, auth, gif } from '../mock';
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

describe('Gif endpoint tests', () => {

    it('Should fail to create a gif ', (done) => {
        const data = {
            "gif_id": "",
            "created_on": "\"2019-11-06T17:12:53.671Z\"",
            "title": "New Zee",
            "gif_url": "https://res.cloudinary.com/drmiaugou/image/upload/v1573060374/rnk73jv1pqomdbyxs0i1.jpg",
            "author_id": null
        };
        chai.request(server)
            .post('/api/v1/gifs')
            .send(data)
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('error');
            });
        done();
    });


    it('should get all gif', (done) => {
        chai.request(server)
            .get('/api/v1/feeds')
            .set('x-access-token', token)
            .end((request, response) => {
                response.body.should.have.property('status')
                    .equal('success');
                response.body.should.have.property('data');
            });
        done();
    });


    it('should delete gif', (done) => {
    const data =    {
            "gif_id": "4f1ba724-52c8-4a49-8a39-fc4db7aeb2ba"
        }
        chai.request(server)
            .delete(`/api/v1/gif/gifId`)
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
            .delete(`/api/v1/gif/:gifId`)
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
            .post(`/api/v1/gifs/gifId/comment`)
            .set('x-access-token', token)
            .send({ comment})
            .end((request, response) => {
                response.body.should.have.property('status')
            .equal('error');
            });
        done();
    });
});

