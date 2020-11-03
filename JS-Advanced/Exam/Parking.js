class Parking {
    constructor(capacity) {
        this.capacity = capacity;

        this.vehicles = [];
    }
    addCar(carModel, carNumber) {
        if (this.capacity <= this.vehicles.length) {
            throw Error(`Not enough parking space.`);
        }
        let currentCar = {
            carModel: carModel,
            carNumber: carNumber,
            payed: false
        };

        this.vehicles.push(currentCar);

        return `The ${carModel}, with a registration number ${carNumber}, parked.`
    }
    removeCar(carNumber) {
        let car = this.vehicles.find(x => x.carNumber == carNumber);

        if (!car) {
            throw Error(`The car, you're looking for, is not found.`);
        }
        if (!car.payed) {
            throw Error(`${car.carNumber} needs to pay before leaving the parking lot.`);
        }

        let index = this.vehicles.indexOf(car);
        this.vehicles.splice(index, 1);

        return `${car.carNumber} left the parking lot.`;
    }
    pay(carNumber) {
        let car = this.vehicles.find(x => x.carNumber == carNumber);

        if (!car) {
            throw Error(`The car, you're looking for, is not found.`);
        }
        if (car.payed) {
            throw Error(`${car.carNumber}'s driver has already payed his ticket.`);
        }

        car.payed = true;

        return `${car.carNumber}'s driver successfully payed for his stay.`;

    }
    getStatistics(carNumber) {
        if (carNumber !== undefined) {
            let car = this.vehicles.find(x => x.carNumber == carNumber);

            if (car) {
                let payedOrNot = '';

                if (car.payed) {
                    payedOrNot = 'Has payed';
                } else {
                    payedOrNot = 'Not payed';
                }

                return `${car.carModel} == ${car.carNumber} - ${payedOrNot}`;
            }

        } else {
            let result = `The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.`;

            if (this.vehicles.length > 0) {
                let sortedList = this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel));

                for (const car of sortedList) {
                    result += '\n';

                    let payedOrNot = '';

                    if (car.payed) {
                        payedOrNot = 'Has payed';
                    } else {
                        payedOrNot = 'Not payed';
                    }
                    result += `${car.carModel} == ${car.carNumber} - ${payedOrNot}`;
                }
            }

            return result.trim();
        }
    }
}
