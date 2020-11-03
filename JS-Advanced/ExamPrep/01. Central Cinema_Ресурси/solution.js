function solve() {
    let inputElements = Array.from(document.querySelectorAll('#container input'));
    let buttonElement = document.querySelector('#container button');
    let [nameElement, hallElement, ticketPriceElement] = inputElements;

    let onScreenElement = document.querySelector('#movies ul');
    let archiveElement = document.querySelector('#archive ul');

    buttonElement.addEventListener('click', onButtonElementClick)

    function onButtonElementClick(e) {
        e.preventDefault();

        if (!inputElements.every(x => x.value)) {
            return;
        }
        if (!Number(ticketPriceElement.value)) {
            return;
        }

        let liElement = document.createElement('li');
        let divElement = document.createElement('div');
        let archiveButtonElement = document.createElement('button');
        let InputElement = document.createElement('input');
        let spanElement = document.createElement('span');
        let hallStrongElement = document.createElement('strong');
        let priceStrongElement = document.createElement('strong');

        spanElement.textContent = nameElement.value;
        archiveButtonElement.textContent = 'Archive';
        InputElement.placeholder = 'Tickets Sold';
        hallStrongElement.textContent = `Hall: ${hallElement.value}`;
        priceStrongElement.textContent = ticketPriceElement.value;

        liElement.appendChild(spanElement);
        liElement.appendChild(hallStrongElement);
        divElement.appendChild(priceStrongElement);
        divElement.appendChild(InputElement);
        divElement.appendChild(archiveButtonElement);
        liElement.appendChild(divElement);


        onScreenElement.appendChild(liElement);

        nameElement.value = '';
        hallElement.value = '';
        ticketPriceElement.value = '';

        archiveButtonElement.addEventListener('click', e => {
            let soldTicketsInputElement = e.currentTarget.parentElement.children[1];
            let ticketPriceInputElement = e.currentTarget.parentElement.children[0];

            let liElement = e.currentTarget.parentElement.parentElement;

            console.log(liElement);

            if (Number(soldTicketsInputElement.value)) {

                liElement.querySelector('div').remove();
                liElement.children[1].remove();

                archiveElement.appendChild(liElement);

                let totalAmount = soldTicketsInputElement.value * Number(ticketPriceInputElement.textContent);

                let deleteButtonElement = document.createElement('button');
                let strongElement = document.createElement('strong');

                deleteButtonElement.textContent = 'Delete';
                strongElement.textContent = `Total amount: ${totalAmount.toFixed(2)}`;

                liElement.appendChild(strongElement);
                liElement.appendChild(deleteButtonElement);

                deleteButtonElement.addEventListener('click', e => {
                    e.currentTarget.parentElement.remove();
                });

            }
        });
    }
}