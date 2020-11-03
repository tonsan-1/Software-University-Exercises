class Movie {
    constructor(movieName,ticketPrice){
        this.movie = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = [];
        this.totalProfit = 0;
        this.ticketsCount = 0;
    }
    newScreening(date, hall, description){
        let currentScreening = {
            date: date,
            hall: hall,
            desc: description
        };

        if (this.screenings.find(scrn => scrn.date == date && scrn.hall == hall)) {
            throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
        }

        this.screenings.push(currentScreening);

        return `New screening of ${this.movie} is added.`
    }
    endScreening(date,hall,soldTickets){
        let screening = this.screenings.find(scrn => scrn.date == date && scrn.hall == hall);

        if (!screening) {
            throw new Error(`Sorry, there is no such screening for ${this.movie} movie.`)
        }

        let currentProfit = Number(soldTickets) * Number(this.ticketPrice);
        this.totalProfit += currentProfit;
        this.ticketsCount += Number(soldTickets);

        let index = this.screenings.indexOf(screening);

        this.screenings.splice(index,1);

        return `${this.movie} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;

    }
    toString(){
        let result = [
            `${this.movie} full information:`,
            `Total profit: ${this.totalProfit.toFixed(0)}$`,
            `Sold Tickets: ${this.ticketsCount}`
        ];

        if (this.screenings.length > 0) {
            result.push(`Remaining film screenings:`);
            let sortedScreenings = this.screenings.sort((a,b) => a.hall.localeCompare(b.hall));

            sortedScreenings.forEach(scrn =>{
                result.push(`${scrn.hall} - ${scrn.date} - ${scrn.desc}`);
            });
        }else{
            result.push("No more screenings!");
        }

        return result.join("\n");
    }
}
let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

// m.newScreening('October 4, 2020', '235', `regular`);
// m.newScreening('October 5, 2020', 'Main', `regular`);
// m.newScreening('October 3, 2020', '235', `regular`);
// m.newScreening('October 4, 2020', 'Main', `regular`);
// console.log(m.toString());