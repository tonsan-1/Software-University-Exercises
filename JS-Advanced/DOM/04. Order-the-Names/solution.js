function solve() {
    let inputElement = document.getElementsByTagName("input")[0];
    let buttonElement = document.getElementsByTagName("button")[0];

    let database = {};
    let index = 0;
    for(let symbol = 65; symbol <= 90; symbol++){
        let letter = String.fromCharCode(symbol);

        database[letter] = index++;
    }

    buttonElement.addEventListener('click', () =>{
    let array = document.getElementsByTagName("ol")[0].children;

    let currentName = inputElement.value.toString()[0].toUpperCase() + inputElement.value.toString().slice(1).toLowerCase();
    let capitalLetter = currentName[0];

    if (database[capitalLetter] != undefined) {
        let currentIndex = database[capitalLetter];
        let currentElement = array[currentIndex];

        if (currentElement.innerText != '') {
            currentElement.textContent += ', ';
        }

        currentElement.textContent += currentName;
    }

    inputElement.value = '';
    });
}