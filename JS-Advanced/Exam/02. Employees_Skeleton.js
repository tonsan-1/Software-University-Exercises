function solveClasses() {
    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;

            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }
        addTask(id, taskName, priority) {
            let currentTask = {
                id: id,
                taskName: taskName,
                priority: priority
            };

            if (priority == 'high') {
                this.tasks.unshift(currentTask);
            } else {
                this.tasks.push(currentTask);
            }

            return `Task id ${id}, with ${priority} priority, has been added.`;
        }
        doTask() {
            if (this.tasks.length > 0) {
                let newestTask = this.tasks.shift();

                return newestTask.taskName;
            } else {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`;
            }
        }
        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
        }
        reviewTasks() {
            let result = `Tasks, that need to be completed:`;

            if (this.tasks.length > 0) {
                for (const task of this.tasks) {
                    result += '\n';
                    result += `${task.id}: ${task.taskName} - ${task.priority}`;
                }
            }
            return result;
        }
    }
    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary += bonus;
            this.experience = experience;

            this.tasks = [];
        }
        learn(years) {
            this.experience += years;
        }
    }
    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary += bonus;
            this.experience = experience + 5;

            this.tasks = [];
        }
        changeTaskPriority(taskId) {
            let task = this.tasks.find(x => x.id == taskId);

            if (task.priority == 'high') {
                task.priority = 'low';

                let index = this.tasks.indexOf(task);

                this.tasks.splice(index, 1);

                this.tasks.push(task);
            }
            else if (task.priority == 'low') {
                task.priority = 'high';

                let index = this.tasks.indexOf(task);

                this.tasks.splice(index, 1);

                this.tasks.unshift(task);
            }

            return task;
        }
    }

    return {
        Developer,
        Junior,
        Senior
    }
}
let classes = solveClasses();
const senior = new classes.Senior("Joseph", "Joestar", 200, 2);
senior.addTask(1, "Create functionality", "low");
senior.addTask(2, "Update functionality", "high");
console.log(senior.changeTaskPriority(1)["priority"]);

