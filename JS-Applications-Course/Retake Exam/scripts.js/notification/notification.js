const notification = (type, message) => {
    let element = document.querySelector(`#notification`);

    element.className = `p-3 mb-2 bg-${type} w-50 text-white text-center`;
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(function () {
        element.style.display = 'none';
    }, 3000);

    element.addEventListener('click', (e) =>{
        e.target.style.display = 'none';
    })
}