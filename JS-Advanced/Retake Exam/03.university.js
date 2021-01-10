function solveClasses() {
    class Person {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.problems = [];
        }
        toString() {
            return `${this.firstName} ${this.lastName} is part of SoftUni community now!`;
        }

    }
    class Teacher extends Person {
        constructor(firstName, lastName,) {
            super(firstName, lastName);
        }
        createProblem(id, difficulty) {
            let problem = { id, difficulty };

            this.problems.push(problem);

            return this.problems;
        }
        getProblems() {
            return this.problems;
        }
        showProblemSolution(id) {
            let problem = this.problems.find(x => x.id === id);

            if (!problem) {
                throw new Error(`Problem with id ${id} not found.`);
            }

            problem.difficulty--;

            return problem;
        }
    }
    class Student extends Person {
        constructor(firstName, lastName, graduationCredits, problems) {
            super(firstName, lastName);

            this.graduationCredits = Number(graduationCredits);
            this.myCredits = 0;
            this.solvedProblems = [];
            this.problems = problems;
        }
        solveProblem(id) {
            let problem = this.problems.find(x => x.id === id);

            if (!problem) {
                throw new Error(`Problem with id ${id} not found.`);
            }

            this.myCredits += Number(problem.difficulty);

            if (!this.solvedProblems.find(x => x.id === id)) {
                this.solvedProblems.push(problem);
            }else{
                this.myCredits -= Number(problem.difficulty);
            }

            return this.myCredits;
        }

        graduate(){
            if (this.myCredits >= this.graduationCredits) {
                return `${this.firstName} ${this.lastName} has graduated succesfully.`;
            }

            let diff = Math.abs(this.myCredits - this.graduationCredits);

            let result = `${this.firstName} ${this.lastName}, you need ${diff} credits to graduate.`;

            return result.toString().trim();
        }
    }

    return {
        Person,
        Teacher,
        Student
    }
}

const classes = solveClasses();

const student = new classes.Student("Pesho", "Petrov", 23, [{id: '111', difficulty: 5}, {id: '222', difficulty: 15}]);

student.solveProblem('111');
console.log(student.myCredits);
console.log(student.graduate());

student.solveProblem('222');
console.log(student.solvedProblems);
console.log(student.graduate());
