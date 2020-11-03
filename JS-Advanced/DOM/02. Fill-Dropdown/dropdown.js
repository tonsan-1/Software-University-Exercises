function addItem() {
    let textElement = document.getElementById('newItemText');
    let valueElement = document.getElementById('newItemValue');

    let selectElement = document.getElementById('menu');
    let option = `<option value='${valueElement.value}'>${textElement.value}</option>`;

    selectElement.innerHTML += option;

    textElement.value = '';
    valueElement.value = '';
}