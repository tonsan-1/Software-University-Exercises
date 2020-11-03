function attachEventsListeners() {
    let daysElement = document.getElementById('days');
    let hoursElement = document.getElementById('hours');
    let minutesElement = document.getElementById('minutes');
    let secondsElement = document.getElementById('seconds');


    document.getElementById('daysBtn').addEventListener('click', () => {convert(+daysElement.value * 86400)});
    document.getElementById('hoursBtn').addEventListener('click', () => {convert(+hoursElement.value * 3600)});
    document.getElementById('minutesBtn').addEventListener('click', () => {convert(+minutesElement.value * 60)});
    document.getElementById('secondsBtn').addEventListener('click', () => {convert(+secondsElement.value)});


    function convert(time = 0){
        let day = time / (24 * 60 * 60);
        let hour = time / 3600;
        let minutes = time / 60;

        daysElement.value = day;
        hoursElement.value = hour;
        minutesElement.value = minutes;
        secondsElement.value = time;
    }
}