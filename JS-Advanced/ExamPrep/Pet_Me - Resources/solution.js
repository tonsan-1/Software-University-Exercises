function solve() {
    let buttonElement = document.querySelector('#container button');
    let inputElements = Array.from(document.querySelectorAll('#container input'));
    let [name,age,kind,currentOwner] = inputElements;

    let adoptionElement = document.querySelector('#adoption ul');
    let adoptedElement = document.querySelector('#adopted ul');

    buttonElement.addEventListener('click', e => {
        e.preventDefault();

        if (!inputElements.every(x => x.value)) {
            return;
        }
        if (!Number(age.value)) {
            return;
        }

        let liElement = document.createElement('li');
        let pElement = document.createElement('p');
        let spanElement = document.createElement('span');
        let petButtonElement = document.createElement('button');

        pElement.innerHTML = `<strong>${name.value}</strong> is a <strong>${age.value}</strong> year old <strong>${kind.value}</strong>`;
        spanElement.textContent = `Owner: ${currentOwner.value}`;
        petButtonElement.textContent = `Contact with owner`;

        liElement.appendChild(pElement);
        liElement.appendChild(spanElement);
        liElement.appendChild(petButtonElement);


        adoptionElement.appendChild(liElement);

        name.value = '';
        age.value = '';
        kind.value = '';
        currentOwner.value = '';

        petButtonElement.addEventListener('click', onPetButtonElementClick);
    });

    function onPetButtonElementClick(e){
        let parent = e.currentTarget.parentElement;

        e.currentTarget.remove();

        let divElement = document.createElement('div');
        let inputElement = document.createElement('input');
        let takeItButton  = document.createElement('button');

        takeItButton.textContent = `Yes! I take it!`;
        inputElement.placeholder = `Enter your names`;

        divElement.appendChild(inputElement);
        divElement.appendChild(takeItButton);

        parent.appendChild(divElement);

        takeItButton.addEventListener('click', onTakeItButtonClick);

    }

    function onTakeItButtonClick(e){

        let parentButtonElement = e.currentTarget.parentElement;
        let liElement = e.currentTarget.parentElement.parentElement;


        let input = liElement.querySelector('input');
        let ownerNameSpan = liElement.querySelector('span');

        let newOwnerName = input.value;

        if (!newOwnerName) {
            return;
        }
        
        ownerNameSpan.textContent = `New Owner: ${newOwnerName}`;

        adoptedElement.appendChild(liElement);

        parentButtonElement.remove();

        let checkedButtonElement = document.createElement('button');
        checkedButtonElement.textContent = 'Checked';

        liElement.appendChild(checkedButtonElement);

        checkedButtonElement.addEventListener('click', e =>{
            liElement.remove();
        })
    }
}

