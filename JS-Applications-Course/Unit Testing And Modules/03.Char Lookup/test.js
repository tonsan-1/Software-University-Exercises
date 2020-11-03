let {assert} = require('chai');
let {lookupChar} = require('./lookupChar');

describe('charLookup in a string', () =>{
    it('should return undefined with the first incorrect param', () =>{
        assert.equal(undefined,lookupChar(5,0));
    });
    it('should return undefined with the second incorrect param', () =>{
        assert.equal(undefined,lookupChar('human', 'pesho'));
    });
    it('should return incorect index with param equal to or bigger than the length', () =>{
        assert.equal('Incorrect index',lookupChar('human', 5));
    });
    it('should return the correct char', () =>{
        assert.equal('a',lookupChar('human', 3));
    });
});