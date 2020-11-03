function solve() {
    let departButton = document.querySelector('#depart');
    let arriveButton = document.querySelector('#arrive');
    let stopSign = document.querySelector('#info span');

    let url = `https://judgetests.firebaseio.com/schedule/depot.json`;
    let nextStop;
    let stopName;


    function depart() {
        departButton.disabled = 'true';
        arriveButton.disabled = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                stopName = data.name;
                nextStop = data.next;

                stopSign.textContent = `Next stop ${stopName}`;
            })
            .catch(err => {
                arriveButton.disabled = 'true';
                departButton.disabled = 'true';

                stopSign.textContent = `Error`;
            });
    }

    function arrive() {
        arriveButton.disabled = 'true';
        departButton.disabled = '';

        stopSign.textContent = `Arriving at ${stopName}`;

        url = `https://judgetests.firebaseio.com/schedule/${nextStop}.json`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();