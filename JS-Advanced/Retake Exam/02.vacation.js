class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination
        this.budget = Number(budget);
        this.kids = {};
    }
    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`
        }

        if (this.kids[grade] !== undefined) {
            if (this.kids[grade].find(x => x.name === name && x.budget === budget)) {
                return `${name} is already in the list for this ${this.destination} vacation.`;
            }
        } else {
            this.kids[grade] = [];
        }

        this.kids[grade].push({
            name: name,
            budget: budget
        });

        return this.kids[grade];
    }
    removeChild(name, grade) {
        let currentKid = this.kids[grade].find(x => x.name === name);

        if (!currentKid) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        let index = this.kids[grade].indexOf(currentKid);

        this.kids[grade].splice(index, 1);

        return this.kids[grade];
    }
    toString() {
        let result = '';
        let numberOfKids = 0;

        console.log(Object.keys(this.kids).length);

        if (Object.keys(this.kids).length > 0) {
            Object.keys(this.kids).forEach(grade => {
                this.kids[grade].forEach(kid => {
                    numberOfKids++;
                })
            })

            console.log(numberOfKids);

            result += `${this.organizer} will take ${numberOfKids} children on trip to ${this.destination}\n`;

            Object.keys(this.kids)
                .sort((a,b) => a-b)
                .forEach(grade => {
                let counter = 1;

                result += `Grade: ${grade}\n`;


                for (const kid of this.kids[grade]) {
                    result += `${counter}. ${kid.name}-${kid.budget}\n`;
                    counter++;
                }

                result += `\n`;
            });

            return result.toString().trim();
        }

        result += `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;

        return result.toString().trim();
    }
}

let vacation = new Vacation('Miss Elizabeth', 'The bahamas', 400);
vacation.registerChild('Gosho', 12, 3400);
vacation.registerChild('Pesho', 12, 400);
vacation.registerChild('Pesho', 12, 400);
vacation.registerChild('Skaro', 11, 400);
vacation.registerChild('Gosho', 11, 3444);
console.log(vacation.toString());


