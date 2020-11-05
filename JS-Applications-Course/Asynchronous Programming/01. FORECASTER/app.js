function attachEvents() {
    let locationsUrl = `https://judgetests.firebaseio.com/locations.json`;
    let baseUrl = `https://judgetests.firebaseio.com/forecast/`;

    let getWeatherButton = document.querySelector('#submit');
    let locationInput = document.querySelector('#location');

    let forecastDiv = document.querySelector('#forecast');
    let currentForecastDiv = document.querySelector('#current');
    let upcomingForecastDiv = document.querySelector('#upcoming');


    const symbols = {
        Sunny: "☀",
        "Partly sunny": "⛅",
        Overcast: "☁",
        Rain: "☂",
        Degrees: "°"
    };


    getWeatherButton.addEventListener('click', () => {

        fetch(locationsUrl)
            .then(res => res.json())
            .then(data => {
                let { name, code } = data.find(x => x.name == locationInput.value);

                let currentForecast = fetch(baseUrl + `today/${code}.json`)
                    .then(res => res.json());
                let upcomingForecast = fetch(baseUrl + `upcoming/${code}.json`)
                    .then(res => res.json());


                currentForecastDiv.innerHTML = '';
                forecastDiv.children[1].innerHTML = '';
                let label1 = el('div','Current conditions',{className:'label'});
                let label2 = el('div','Three-day forecast',{className:'label'});

                currentForecastDiv.appendChild(label1);
                forecastDiv.children[1].appendChild(label2);

                Promise.all([currentForecast, upcomingForecast])
                    .then(showForecast)
                    
            })
            .catch((e) => {
                 forecastDiv.style.display = 'block';
                 forecastDiv.children[1].innerHTML = '';
                 
                 currentForecastDiv.innerHTML = '';

                 let error = el('div','Error',{className:'label'});

                 currentForecastDiv.appendChild(error);
            });
    });

    function showForecast([currentData, upcomingData]){
        forecastDiv.style.display = 'block';
        
        showCurrentForecast(currentData);
        showUpcomingForecast(upcomingData);

        locationInput.value = '';
    }

    function showCurrentForecast(currentData){
        const symbol = symbols[currentData.forecast.condition];

        const symbolElement = el('span', `${symbol}`, { className: 'condition symbol' });

        const conditionElement = el('span', [
            el('span', currentData.name, { className: 'forecast-data' }),
            el('span', `${currentData.forecast.low}${symbols.Degrees}/${currentData.forecast.high}${symbols.Degrees}`, { className: 'forecast-data' }),
            el('span', currentData.forecast.condition, { className: 'forecast-data' })
        ],{className: 'condition'});

        const task1 = el('div', [
            symbolElement,
            conditionElement
        ],{className: 'forecasts'});

        currentForecastDiv.appendChild(task1);
    }
    function showUpcomingForecast(upcomingData){
        const task2 = el('div', '',{className: 'forecast-info'});

        upcomingData.forecast.forEach(x =>{
            let upcomingSymbol = symbols[x.condition];
            let upcomingTemps = `${x.low}${symbols.Degrees}/${x.high}${symbols.Degrees}`;
           
            let upcoming = el('span',[
                el('span', upcomingSymbol, {className: 'symbol'}),
                el('span', upcomingTemps, {className: 'forecast-data'}),
                el('span', x.condition, {className: 'forecast-data'})
            ],{className: 'upcoming'});

            task2.appendChild(upcoming);
        });

        upcomingForecastDiv.appendChild(task2);
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