const expect = require('chai').expect;
const sinon = require('sinon');
const server = require('../../server/server');
const request = require('supertest')
const PrimesHandler = require('../../server/PrimesHandler');

describe('router', () => {
    let instance;
    let sandbox;
    let primesMedianStub
    before(() => {
        instance = server.listen(3000);
        sandbox = sinon.sandbox.create();
        primesMedianStub = sandbox.stub(PrimesHandler, 'findPrimesMedian');
    })
    after(() => {
        instance.close();
        sandbox.restore();
    })

    describe('/api/primesMedian route', () => {
        describe('request receives valid parameters', () => {
           
            it('returns Primes median', (done) => {
                primesMedianStub.resolves([3, 5]);
                request(server).post('/api/primesMedian')
                    .send({ limit: 10 })
                    .set('Accept', 'application/json')
                    .expect(200, (err, res) => {
                        expect(res.body).to.be.eql({median:[3, 5]})
                    })
                done();
            })
            it('returns 500 and error when findPrimes rejects', (done) => {
                const error = { errMsg: 'TestError' }
                primesMedianStub.rejects(error)
                request(server).post('/api/primesMedian')
                    .send({ limit: 10 })
                    .set('Accept', 'application/json')
                    .expect(500, (err, res) => {
                        expect(res.body).to.be.eql(error);
                    })
                done()
            })
        })
        describe('request receives invalid parameters', () => {
            it('returns 400 error if less than lowest prime number', (done) => {
                request(server).post('/api/primesMedian')
                    .send({ limit: 0 })
                    .expect(400, done)
            })
            it('returns 400 error if no limit value', (done) => {
                request(server).post('/api/primesMedian')
                    .send({ limit: '' })
                    .expect(400, done)
            })
            it('returns 400 error if more than maximum limit value', (done) => {
                const MAX_LIMIT = 100000000;
                request(server).post('/api/primesMedian')
                    .send({ limit: MAX_LIMIT+1})
                    .expect(400, done)
            })
        })
    })
}) 
