function getInfo() {
    let idElement = document.querySelector('#stopId');
    let busesElement = document.querySelector('#buses');
    let stopNameElement = document.querySelector('#stopName');

    let validIdNumbers = ['1287', '1308', '1327', '2334'];

    if (validIdNumbers.includes(idElement.value)) {
        let url = `https://judgetests.firebaseio.com/businfo/${idElement.value}.json`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let stopName = data.name;
                let allBuses = data.buses;

                stopNameElement.textContent = stopName;
                busesElement.innerHTML = '';
                for (const [bus,time] of Object.entries(allBuses)) {
                    let liElement = document.createElement('li');
                    liElement.textContent = `Bus ${bus} in ${time} minutes`;

                    busesElement.appendChild(liElement);
                }
            });
    } else {
        stopName.textContent = 'Error';
        busesElement.innerHTML = '';
    }
    idElement.value = '';
}