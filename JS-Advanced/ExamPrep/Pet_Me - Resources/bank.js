class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }
    newCustomer(customer) {
        if (this.allCustomers.find(x => x.personalId == customer.personalId)) {
            throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
        }

        this.allCustomers.push(customer);

        return customer;
    }
    depositMoney(personalId, amount) {
        personalId = Number(personalId);
        let currentMoney = Number(amount);

        let currentCustomer = this.allCustomers.find(x => x.personalId == personalId);

        if (!currentCustomer) {
            throw new Error('We have no customer with this ID!');
        }

        if (isNaN(currentCustomer.totalMoney)) {
            currentCustomer.totalMoney = amount;
        } else {
            currentCustomer.totalMoney += currentMoney;
        }

        if (!Array.isArray(currentCustomer.transactionInfo)) {
            currentCustomer.transactionInfo = [];
        }

        let transactionInfo = `${currentCustomer.transactionInfo.length + 1}. ${currentCustomer.firstName} ${currentCustomer.lastName} made deposit of ${amount}$!`;

        currentCustomer.transactionInfo.push(transactionInfo);

        return `${currentCustomer.totalMoney}$`;
    }
    withdrawMoney(personalId, amount) {
        personalId = Number(personalId);
        amount = Number(amount);

        let currentCustomer = this.allCustomers.find(x => x.personalId == personalId);

        if (!currentCustomer) {
            throw new Error('We have no customer with this ID!');
        }

        if (currentCustomer.totalMoney < amount) {
            throw new Error(`${currentCustomer.firstName} ${currentCustomer.lastName} does not have enough money to withdraw that amount!`);
        }

        currentCustomer.totalMoney -= amount;

        let transactionInfo = `${currentCustomer.transactionInfo.length + 1}. ${currentCustomer.firstName} ${currentCustomer.lastName} withdrew ${amount}$!`;

        currentCustomer.transactionInfo.push(transactionInfo);

        return `${currentCustomer.totalMoney}$`;
    }
    customerInfo(personalId) {
        let currentCustomer = this.allCustomers.find(x => x.personalId == personalId);

        if (!currentCustomer) {
            throw new Error('We have no customer with this ID!');
        }

        let result = `Bank name: ${this._bankName}\n`;
        result += `Customer name: ${currentCustomer.firstName} ${currentCustomer.lastName}\n`;
        result += `Customer ID: ${currentCustomer.personalId}\n`;
        result += `Total Money: ${currentCustomer.totalMoney}$\n`;
        result += `Transactions:\n`;

        for(let index = currentCustomer.transactionInfo.length - 1; index >= 0; index--){
            result += currentCustomer.transactionInfo[index];
            if (index !== 0) {
                result += '\n';
            }
        }

        return result;
    }

}
let bank = new Bank("SoftUni Bank");

console.log(bank.newCustomer({ firstName: "Svetlin", lastName: "Nakov", personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: "Mihaela", lastName: "Mileva", personalId: 4151596 }));
bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);
console.log(bank.withdrawMoney(6233267, 125));
console.log(bank.customerInfo(6233267));
