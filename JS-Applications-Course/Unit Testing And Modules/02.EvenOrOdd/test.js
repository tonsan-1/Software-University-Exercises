let assert = require('chai').assert;
let {isOddOrEven} = require('./isOddOrEven');

describe('isOddOrEven', () =>{
    it('should return undefined with param different from string', () =>{
        assert.equal(undefined, isOddOrEven(5));
    });
    it('should return even', () =>{
        assert.equal('even', isOddOrEven('word'));
    });
    it('should return odd', () =>{
        assert.equal('odd', isOddOrEven('words'));
    });
});