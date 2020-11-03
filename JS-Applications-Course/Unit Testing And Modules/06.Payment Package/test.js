let { assert } = require('chai');
let PaymentPackage = require('./paymentPackage');

describe('PaymentPackage', () => {
    let payPackage;
    beforeEach(() => {
        payPackage = new PaymentPackage('pesho', 10);
    });
    describe('constructor and setter tests', () => {
        it('should work correctly', () => {
            let expected = new PaymentPackage('pesho', 10);

            assert.deepEqual(payPackage, expected);
        });
        it('should throw exception with incorrect name', () => {
            assert.throw(() => {
                let package = new PaymentPackage(10, 10);
            }, 'Name must be a non-empty string');
        });
        it('should throw exception with empty name', () => {
            assert.throw(() => {
                let package = new PaymentPackage('', 10);
            }, 'Name must be a non-empty string');
        });
        it('should throw exception with incorrect value', () => {
            assert.throw(() => {
                let package = new PaymentPackage('pesho', 'gosho');
            }, 'Value must be a non-negative number');
        });
        it('should throw exception with negative value', () => {
            assert.throw(() => {
                let package = new PaymentPackage('pesho', -4);
            }, 'Value must be a non-negative number');
        });
        it('should have a correct default VAT value of 20', () => {
            assert.equal(20, payPackage.VAT);
        });
        it('should throw exception when VAT is not a number', () => {
            assert.throw(() => {
                payPackage.VAT = 'Pesho';
            }, 'VAT must be a non-negative number');
        });
        it('should throw exception when VAT is a negative number', () => {
            assert.throw(() => {
                payPackage.VAT = -32;
            }, 'VAT must be a non-negative number');
        });
        it('should have a correct default active value boolean true', () => {
            assert.equal(true, payPackage.active);
        });
        it('should throw exception when active is not a boolean', () => {
            assert.throw(() => {
                payPackage.active = 'pesho';
            }, 'Active status must be a boolean');
            assert.throw(() => {
                payPackage.active = 23;
            }, 'Active status must be a boolean');
        });
        it('should have a correct toString message', () => {
            let actual = [
                `Package: pesho`,
                `- Value (excl. VAT): 10`,
                `- Value (VAT 20%): ${10 * (1 + 20 / 100)}`
            ].join('\n');

            assert.equal(actual,payPackage.toString());
        });
    });
});