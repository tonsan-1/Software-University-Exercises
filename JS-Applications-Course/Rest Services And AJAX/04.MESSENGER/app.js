function attachEvents() {
    let submitButton = document.querySelector('#submit');
    let refreshButton = document.querySelector('#refresh');
    let textArea = document.querySelector('#messages');

    let url = `https://rest-messanger.firebaseio.com/messanger.json`;

    submitButton.addEventListener('click', sendMessage);
    function sendMessage() {
        let name = document.querySelector('#author');
        let message = document.querySelector('#content');


        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                author: name.value,
                content: message.value
            })
        })
            .then(res => res.json())
    }

    refreshButton.addEventListener('click', refreshPage);
    function refreshPage() {
        textArea.disabled = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                for (const key in data) {
                    console.log(data[key].content);
                    let message = `${data[key].author}: ${data[key].content}\n`;

                    textArea.innerHTML += message;
                }
            })
    }
}

attachEvents();