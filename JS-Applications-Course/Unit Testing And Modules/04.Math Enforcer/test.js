let {assert} = require('chai');
let {addFive,subtractTen,sum} = require('./mathEnforcer'); 

describe('MathEnforcer', () => {
    describe('addFive', () =>{
        it('should return undefined with incorrect type', () =>{
            assert.equal(undefined, addFive('pesho'));
        });
        it('should return correct number', () =>{
            assert.equal(10, addFive(5));
        });

    });
    describe('subtractTen', () => {
        it('should return undefined with incorrect type', () =>{
            assert.equal(undefined, subtractTen('pesho'));
        });
        it('should return correct number', () =>{
            assert.equal(0, subtractTen(10));
        });
    });
    describe('sum', () => {
        it('should return undefined with incorrect first param', () =>{
            assert.equal(undefined, sum('pesho',5));
        });
        it('should return undefined with incorrect second param', () =>{
            assert.equal(undefined, sum(10,'stamat'));
        });
        it('should return correct sum', () =>{
            assert.equal(30,sum(10,20));
        });
    });
})
