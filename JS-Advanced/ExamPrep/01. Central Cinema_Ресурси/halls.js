function solveClasses() {
    class Hall {
        constructor(capacity, name) {
            this.capacity = capacity;
            this.name = name;
            this.events = [];
        }
        hallEvent(title) {
            let currentTitle = this.events.find(x => x == title);

            if (currentTitle) {
                throw new Error('This event is already added!');
            }
            this.events.push(title);

            return 'Event is added.'
        }
        close() {
            this.events = [];

            return `${this.name} hall is closed.`;
        }
        toString() {
            let result = `${this.name} hall - ${this.capacity}`;

            if (this.events.length > 0) {
                result += '\n';
                result += `Events: ${this.events.join(', ')}`;
            }

            return result;
        }
    }
    class MovieTheater extends Hall {
        constructor(capacity, name, screenSize) {
            super(capacity, name);

            this.screenSize = screenSize;
            this.events = [];
        }
        close() {
            let result = super.close() + `Аll screenings are over.`;

            return result;
        }
        toString() {
            let result = super.toString() + '\n';

            result += `${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`;

            return result;
        }

    }
    class ConcertHall extends Hall {
        constructor(capacity, name) {
            super(capacity, name);
            this.events = [];
            this.performer = [];
        }
        hallEvent(title, performers) {
           if (this.events.includes(title)) {
               throw new Error(`This event is already added!`);
           }

           this.events.push(title);
           this.performer.push(performers);

           return `Event is added.`;

        }
        close() {
            let result = super.close() + `Аll performances are over.`;

            return result;
        }
        toString() {
            let result = [super.toString()];

            if (this.events.length > 0) {
                this.performer.forEach(p => {
                    result.push(`Performers: ${p.join(', ')}`);
                })
            }
            return result.join('\n');
        }
    }
    return {
        Hall,
        MovieTheater,
        ConcertHall
    }
}
