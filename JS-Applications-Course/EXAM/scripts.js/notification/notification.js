const notification = (type, message) => {
    let element = document.querySelector(`#notificationBox`);

    element.className = `notification ${type}Box`;
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(function () {
        element.style.display = 'none';
    }, 3000);

    element.addEventListener('click', (e) =>{
        e.target.style.display = 'none';
    })
}