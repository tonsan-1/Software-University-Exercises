export default function notification(type, message) {
    let element = document.querySelector(`#${type}Box`); // type is either error or info
    element.textContent = message;
    element.style.display = 'block';
    setInterval(function () {
        element.style.display = 'none';
    }, 4000);
}