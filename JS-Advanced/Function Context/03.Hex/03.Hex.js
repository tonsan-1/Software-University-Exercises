class Hex{
    constructor(value){
        this.value = value;
    }
    toString(){
        return '0x' + this.value.toString(16).toUpperCase();
    }
    valueOf(){
        return this.value;
    }
    /**
     * @param {Hex} hex Hex NUmber to add
     */
    plus(hex){
        return new Hex(this.value + hex)
    }
    /**
     * @param {Hex} hex Hex NUmber to add
     */
    minus(hex){
        return new Hex(this.value - hex)
    }

    static parse(hexValue){
        return parseInt(hexvalue,16);
    }
}