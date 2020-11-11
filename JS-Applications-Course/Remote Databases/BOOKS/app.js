function solve() {
    let baseUrl = `https://softuni-exercises-b5ae1.firebaseio.com/`;

    let loadBooksButton = document.querySelector('#loadBooks');
    let tbody = document.querySelector('tbody');
    let editForm = document.querySelector('#edit-form');

    let createTitle = document.querySelector('#create-title');
    let createAuthor = document.querySelector('#create-author');
    let createIsbn = document.querySelector('#create-isbn');
    let submitButton = document.querySelector('#submit-button');

    let editTitle = document.querySelector('#edit-title');
    let editAuthor = document.querySelector('#edit-author');
    let editIsbn = document.querySelector('#edit-isbn');
    let editButton = document.querySelector('#edit-button');

    loadBooksButton.addEventListener('click', render);
    submitButton.addEventListener('click', submit);

    function submit(e) {
        e.preventDefault();

        if (createTitle.value !== '' && createAuthor.value !== '' && createIsbn.value !== '') {
            fetch(`${baseUrl}/Books.json`, {
                method: 'POST',
                body: JSON.stringify({
                    title: createTitle.value,
                    author: createAuthor.value,
                    isbn: createIsbn.value
                })
            })
                .then(res => res.json())
                .catch(handleError);


            setTimeout(function () { render() }, 250);

            createTitle.value = '';
            createAuthor.value = '';
            createIsbn.value = '';
        } else {
            const error = { message: '' };

            if (createTitle.value === '') {
                error.message += 'Title input must not be empty! ';
            }
            if (createAuthor.value === '') {
                error.message += 'Author input must not be empty! ';
            }
            if (createIsbn.value === '') {
                error.message += 'Isbn input must not be empty! ';
            }

            handleError(error);
        }

    }
    function render() {
        tbody.innerHTML = '';

        fetch(`${baseUrl}/Books.json`)
            .then(res => res.json())
            .then(data => {
                for (const key in data) {

                    const buttons = createDomElement('td', [
                        createDomElement('button', 'Edit', { 'data-key': key }, { click: loadBookById }),
                        createDomElement('button', 'Delete', { 'data-key': key }, { click: deleteById })
                    ]);

                    const task = createDomElement('tr', [
                        createDomElement('td', `${data[key].title}`),
                        createDomElement('td', `${data[key].author}`),
                        createDomElement('td', `${data[key].isbn}`),
                        buttons
                    ]);

                    tbody.appendChild(task);
                }
            })
            .catch(handleError);
    }
    function patch(e) {
        e.preventDefault();
        const id = this.getAttribute('data-key');

        if (editTitle.value !== '' && editAuthor.value !== '' && editIsbn.value !== '') {

            fetch(`${baseUrl}/Books/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: editTitle.value,
                    author: editAuthor.value,
                    isbn: editIsbn.value
                })
            })
                .then(res => res.json());

            setTimeout(function () { render() }, 250);

            editTitle.value = '';
            editAuthor.value = '';
            editIsbn.value = '';
        } else {
            const error = { message: '' };

            if (editTitle.value === '') {
                error.message += 'Title input must not be empty! ';
            }
            if (editAuthor.value === '') {
                error.message += 'Author input must not be empty! ';
            }
            if (editIsbn.value === '') {
                error.message += 'Isbn input must not be empty! ';
            }

            handleError(error);
        }
    }
    function loadBookById() {
        editForm.style.display = 'block';
        const id = this.getAttribute('data-key');

        fetch(`${baseUrl}/Books/${id}.json`)
            .then(res => res.json())
            .then(book => {
                editTitle.value = book.title;
                editAuthor.value = book.author;
                editIsbn.value = book.isbn;
                editButton.setAttribute('data-key', id);
            });

        editButton.addEventListener('click', patch);
    }
    function handleError(err) {
        const error = document.querySelector('#error-notification');
        error.style.display = 'block';
        error.textContent = err.message;

        setTimeout(() => {
            error.style.display = 'none';
        }, 3000);

    }
    function deleteById() {
        const id = this.getAttribute('data-key');

        fetch(`${baseUrl}Books/${id}.json`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .catch(handleError);

        setTimeout(() => {
            loadBooksButton.click()
        }, 200);

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