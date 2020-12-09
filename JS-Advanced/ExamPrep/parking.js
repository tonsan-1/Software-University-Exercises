class Parking {
    constructor(capacity) {
        this.capacity = Number(capacity);

        this.vehicles = [];
    }
    addCar(carModel, carNumber) {
        if (this.capacity === this.vehicles.length) {
            throw Error(`Not enough parking space.`);
        }

        this.vehicles.push({
            carModel: carModel,
            carNumber: carNumber,
            payed: false
        });

        return `The ${carModel}, with a registration number ${carNumber}, parked.`
    }
    removeCar(carNumber) {
        let car = this.vehicles.find(x => x.carNumber == carNumber);

        if (!car) {
            throw Error(`The car, you\'re looking for, is not found.`);
        }
        if (car.payed === false) {
            throw Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }

        let index = this.vehicles.indexOf(car);

        this.vehicles.splice(index, 1);

        return `${car.carNumber} left the parking lot.`;
    }
    pay(carNumber) {
        let car = this.vehicles.find(x => x.carNumber == carNumber);

        if (!car) {
            throw Error(`${carNumber} is not in the parking lot.`);
        }
        if (car.payed === true) {
            throw Error(`${carNumber}'s driver has already payed his ticket.`);
        }

        car.payed = true;

        console.log(this.vehicles);

        return `${carNumber}'s driver successfully payed for his stay.`;

    }
    getStatistics(carNumber) {
        if (carNumber !== undefined) {
            let car = this.vehicles.find(x => x.carNumber == carNumber);
            return `${car.carModel} == ${car.carNumber} - ${car.payed === true ? 'Has payed' : 'Not payed'}`;
        }

        let result = [];
        let count = 0;
        for (let i = 0; i < this.vehicles.length; i++) {
            count++;
        }
        result.push(`The Parking Lot has ${this.capacity - count} empty spots left.`);
        let sorted = this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel));
        for (let car of sorted) {
            result.push(`${car.carModel} == ${car.carNumber} - ${car.payed === true ? 'Has payed' : 'Not payed'}`);
        }
        return result.join('\n');
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
