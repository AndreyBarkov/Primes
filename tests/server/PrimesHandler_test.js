const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;
const PrimesHandler = require('../../server/PrimesHandler');

describe('PrimesHandler', () => {
    describe('findPrimesMedian', () => {
        beforeEach(() => {

        })
        it('returns 2 digit median when input is valid', (done) => {
            expect(PrimesHandler.findPrimesMedian(10)).to.eventually.eql([3, 5])
            done();
        })
        it('returns 1 digit median when input is valid', () => {
            expect(PrimesHandler.findPrimesMedian(18)).to.eventually.eql([7])
        })
        it('rejects when limit value is invalid', ()=>{
            expect(PrimesHandler.findPrimesMedian(1)).to.be.rejected;
        })
        it('returns limit when limit is lowest prime number', ()=>{
            expect(PrimesHandler.findPrimesMedian(2)).to.eventually.eql([])
        })
    })
    describe('findArrayMedian', ()=>{
        it('returns 1 digit array when array length is odd number', ()=>{
            expect(PrimesHandler.findArrayMedian([1,2,3])).to.be.eql([2])
        })
        it('returns 2 digit array when array length is odd number', ()=>{
            expect(PrimesHandler.findArrayMedian([1,2,3,4])).to.be.eql([2,3])
        })
    })
})
