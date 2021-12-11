const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const keyStore = require('../key-store');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('express_authentication_middleware_basics', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generateKeysFile()
            .then(() => {
                done();
            })
    });

    afterEach((done) => {
        if (agent) {
            agent.close();
        }
        utils.clearKeysFile()
            .then(() => {
                done();
            })
    });

    it('Should generate an API key and add it to file', (done) => {
        keyStore(req, res);
        setTimeout(() => {
            utils.getKeysFromFile()
                .then(data => {
                    data.length.should.eql(1);
                    done();
                })
        }, 500);
    });

    it('Should generate 5 unique API Keys', done => {
        let n = 5;
        for (let i = 0; i < n; i++) {
            keyStore(req, res);
        }
        setTimeout(() => {
            utils.getKeysFromFile()
                .then(data => {
                    data.length.should.eql(n);
                    const uniqKeys = uniq(data);
                    uniqKeys.length.should.eql(data.length);
                    done();
                })
        }, 500);
    });


    it('Should return the API Key back in response', done => {
        let response;
        chai.request(server)
            .get('/auth')
            .then(res => {
                response = res;
                return utils.getKeysFromFile();
            })
            .then(keys => {
                keys[0].should.equal(response.body.apiKey);
                done();
            })
    });

    it('Should send a 401 if the x-api-key header is not present', done => {
        chai.request(server)
            .get('/tasks')
            .then(response => {
                response.status.should.equal(401);
                next.callCount.should.eql(0);
                done();
            })
    });

    it('Should send a 401 if the x-api-key is invalid', done => {
        chai.request(server)
            .get('/tasks')
            .set('x-api-key', 'INVALID_KEY')
            .then(response => {
                response.status.should.equal(401);
                done();
            })
    });


    it('Should validate header for protected routes', done => {
        agent = chai.request.agent(server);

        agent
            .get('/auth')
            .then(({body: {apiKey}}) => {
                return Promise.all([
                    agent
                        .get('/tasks')
                        .set('x-api-key', apiKey),
                    agent
                        .post('/tasks')
                        .set('x-api-key', apiKey)
                ])
            })
            .then(responseList => {
                responseList.forEach(response => {
                    response.status.should.match(/^20[0|1]/);
                });
                done();
            })
    });

    it('Should not require auth headers for unprotected routes', done => {
        agent = chai.request.agent(server);
        Promise
            .mapSeries([
                agent
                    .get('/tasks/3'),
                agent
                    .get('/'),
                agent
                    .post('/tasks')
            ], res => res)
            .then(responseList => {
                responseList.forEach((response, i) => {
                    if (i !== 2) {
                        response.status.should.match(/^20[0|1]/);
                    } else {
                        response.status.should.eql(401);
                    }
                });
                done();
            })

    });
});
