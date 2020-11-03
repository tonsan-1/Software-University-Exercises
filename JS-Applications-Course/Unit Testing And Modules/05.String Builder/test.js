let {assert} = require('chai');
let StringBuilder = require('./string-builder');

describe('StringBuilder', () =>{
    let sb ;
    beforeEach(() => {
        sb = new StringBuilder();
    });
    describe('vrfyParam' ,() =>{
        it('should throw error when param is not a string', () =>{
            assert.throw(() =>{
                new StringBuilder({});
            },'Argument must be string');
        });
    });

    describe('constructor', () =>{
        it('should work properly without an argument', () =>{
            assert.equal('', sb.toString());
        });
        it('should work correctly with argument', () => {
            sb = new StringBuilder('pesho');

            assert.equal('pesho', sb.toString());
        });
    });
    describe('append', () =>{
        it('should append text at the end of the string', () =>{
            sb.append('pesho');

            assert.equal('pesho',sb.toString());
        });
    });
    describe('prepend', () =>{
        it('should append text at the start of the string', () =>{
            sb.prepend('pesho');

            assert.equal('pesho',sb.toString());
        });
    });
    describe('insertAt', () =>{
        it('should insert text at a given index', () =>{
            sb.append('psho');
            sb.insertAt('e',1);

            assert.equal('pesho',sb.toString());
        });
    });
    describe('remove', () =>{
        it('should remove text at a given index with a given length', () =>{
            sb.append('pesho');
            sb.remove(0,1)

            assert.equal('esho',sb.toString());
        });
    });
    describe('toString', () =>{
        it('should return correct string', () =>{
            sb.append('pesho');

            assert.equal('pesho',sb.toString());
        });
    });
});