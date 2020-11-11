function solve() {
    let url = `https://softuni-exercises-b5ae1.firebaseio.com/Students.json`;

    let tbody = document.querySelector('tbody');
    let addButton = document.querySelector('#add-button');

    getAllStudents();
    addButton.addEventListener('click', addStudent);

    function addStudent(e) {
        e.preventDefault();

        let id = document.querySelector('#id');
        let firstName = document.querySelector('#firstName');
        let lastName = document.querySelector('#lastName');
        let facultyNumber = document.querySelector('#facultyNumber');
        let grade = document.querySelector('#grade');

        console.log(id);

        if (id.value !== '' && firstName.value !== '' && lastName.value !== '' && facultyNumber.value !== '' && grade.value !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    id: id.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    facultyNumber: facultyNumber.value,
                    grade: grade.value
                })
            })
                .then(res => res.json());

            setTimeout(() => getAllStudents(), 200);

            id.value = '';
            firstName.value = '';
            lastName.value = '';
            facultyNumber.value = '';
            grade.value = '';
        }


    }
    function getAllStudents() {

        fetch(url)
            .then(res => res.json())
            .then(renderStudents)
            .catch(handleError);

    }
    function renderStudents(data) {
        tbody.innerHTML = '';
        let studentsArray = Object.keys(data).map((s) => data[s]);

        studentsArray
            .sort((a, b) => a.id - b.id)
            .forEach(student => {
                const { id, firstName, lastName, facultyNumber, grade } = student;

                const task = createDomElement('tr', [
                    createDomElement('td', id),
                    createDomElement('td', firstName),
                    createDomElement('td', lastName),
                    createDomElement('td', facultyNumber),
                    createDomElement('td', grade),
                ]);
                tbody.appendChild(task);
            })
    }
    function handleError(err) {
        console.dir(err);
    }
    function createDomElement(type, content, attributes, events) {
        const domElement = document.createElement(type);

        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }
        function append(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }
            domElement.appendChild(node);
        }
        if (attributes !== undefined) {
            Object.entries(attributes)
                .forEach(([attrKey, atrrValue]) => {
                    domElement.setAttribute(attrKey, atrrValue);
                });
        }

        if (events !== undefined) {
            Object.entries(events)
                .forEach(([eventName, eventHandler]) => {
                    domElement.addEventListener(eventName, eventHandler);
                });
        }

        return domElement;
    }
}
solve();