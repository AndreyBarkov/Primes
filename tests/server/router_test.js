const expect = require('chai').expect;
const sinon = require('sinon');
const server = require('../../server/server');
const request = require('supertest')
const PrimesHandler = require('../../server/PrimesHandler');

describe('router', () => {
    let instance;
    before(() => {
        instance = server.listen(5000);
    })
    after(() => {
        instance.close();
    })
    let primesMedianStub = sinon.stub(PrimesHandler, 'findPrimesMedian');
    describe('default route', () => {
        it('returns test', (done) => {
            request(server).get('/').expect('Test', done)

        })
    })
    describe('/api/primesMedian route', () => {
        describe('request receives valid parameters', () => {
            it('returns Primes median', (done) => {
                primesMedianStub.resolves([3, 5]);
                request(server).post('/api/primesMedian')
                    .send({ limit: 10 })
                    .set('Accept', 'application/json')
                    .expect(200, (err, res) => {
                        expect(res.body).to.be.eql([3, 5])
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
            it('returns 400 error', (done) => {
                request(server).post('/api/primesMedian')
                    .send({ limit: 0 })
                    .set('Accept', 'application/json')
                    .expect(400, done)
            })
        })
    })
})