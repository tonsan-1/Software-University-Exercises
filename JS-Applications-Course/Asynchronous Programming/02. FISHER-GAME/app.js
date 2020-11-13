function attachEvents() {
    let baseUrl = `https://fisher-game.firebaseio.com/catches.json`;

    let catchesElement = document.querySelector('#catches');
    let loadButton = document.querySelector('button.load');
    let addButton = document.querySelector('button.add');

    loadButton.addEventListener('click', () => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(loadAllCatches);
    });
    addButton.addEventListener('click', () => {
        let addForm = document.querySelector('#addForm');
        let inputs = addForm.querySelectorAll('input');

        let [angler,weight,species,location,bait,captureTime] = inputs;

        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify({
                "angler": angler.value,
                "weight": weight.value,
                "species": species.value,
                "location": location.value,
                "bait": bait.value,
                "captureTime": captureTime.value
            })

        }).then(res => res.json());

        angler.value = '';
        weight.value = '';
        species.value = '';
        location.value = '';
        bait.value = '';
        captureTime.value = '';
    })
    document.body.addEventListener('click', (e) =>{
        let url = `https://fisher-game.firebaseio.com/catches/`;
        if (hasClass(e.target, 'update')) {
            let id = e.target.parentElement.getAttribute('data-id');

            let [angler,weight,species,location,bait,captureTime] = e.target.parentElement.querySelectorAll('input');

            fetch(url + `${id}.json`, {
                method: 'PUT',
                body: JSON.stringify({
                    "angler": angler.value,
                    "weight": weight.value,
                    "species": species.value,
                    "location": location.value,
                    "bait": bait.value,
                    "captureTime": captureTime.value
                })
            }).then(res => res.json());

        }else if(hasClass(e.target,'delete')){
            let id = e.target.parentElement.getAttribute('data-id');

            fetch(url + `${id}.json`, {
                method: 'DELETE',
            }).then(res => res.json());
            
        }
    })

    function loadAllCatches(data) {
        catchesElement.innerHTML = '';

        for (const x in data) {
            const task = el('div', [
                el('label', 'Angler'),
                el('input', '', { type: 'text', className: 'angler', value: `${data[x].angler}` }),
                el('hr', ''),
                el('label', 'Weight'),
                el('input', '', { type: 'number', className: 'weight', value: `${data[x].weight}` }),
                el('hr', ''),
                el('label', 'Species'),
                el('input', '', { type: 'text', className: 'species', value: `${data[x].species}` }),
                el('hr', ''),
                el('label', 'Location'),
                el('input', '', { type: 'text', className: 'location', value: `${data[x].location}` }),
                el('hr', ''),
                el('label', 'Bait'),
                el('input', '', { type: 'text', className: 'bait', value: `${data[x].bait}` }),
                el('hr', ''),
                el('label', 'Capture Time'),
                el('input', '', { type: 'number', className: 'captureTime', value: `${data[x].captureTime}` }),
                el('hr', ''),
                el('button', 'Update', { className: 'update' }),
                el('button', 'Delete', { className: 'delete' })
            ], { className: 'catch' });

            task.setAttribute('data-id', x);
            catchesElement.appendChild(task);
        }
    }
    function hasClass(elem, className) {
        return elem.className.split(' ').indexOf(className) > -1;
    }
    function el(type, content, attributes) {
        const result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }
        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }

        function append(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }
            result.appendChild(node);
        }
        return result;
    }
}

attachEvents();

