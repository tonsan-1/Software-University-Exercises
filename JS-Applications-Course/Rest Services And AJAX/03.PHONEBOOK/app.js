function attachEvents() {
    let loadButton = document.querySelector('#btnLoad');
    let createButton = document.querySelector('#btnCreate');
    let ul = document.querySelector('#phonebook');

    let url = `https://phonebook-nakov.firebaseio.com/phonebook.json`;

    loadButton.addEventListener('click', () => {
        ul.innerHTML = '';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                for (const key in data) {
                    let liElement = document.createElement('li');
                    let deleteButton = document.createElement('button');
                    liElement.textContent = `${data[key].person}: ${data[key].phone}`;
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {del(key)});
                    liElement.appendChild(deleteButton);
                    ul.appendChild(liElement);
                }
            });
    });
    createButton.addEventListener('click', createContact);
    function del(key){
        let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
        fetch(deleteUrl, { method: 'DELETE' });
    }
    function createContact(e) {
        let name = document.querySelector('#person');
        let phone = document.querySelector('#phone');

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                person: name.value,
                phone: phone.value
            })
        })
            .then(res => res.json())

        name.value = '';
        phone.value = '';
        loadButton.click();
    }
}
attachEvents();