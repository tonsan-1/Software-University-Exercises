function solve() {
    let inputTaskElement = document.getElementById('task');
    let inputDescElement = document.getElementById('description');
    let inputDateElement = document.getElementById('date');

    let openSectionElement = document.querySelector('.orange');
    let inprogressSectionElement = document.querySelector('.yellow');
    let completeSectionElement = document.querySelector('.green');

    let addButtonElement = document.getElementById('add');
    addButtonElement.addEventListener('click', onAddButtonClick);

    function onAddButtonClick(e) {
        e.preventDefault();

        if (!inputTaskElement.value || !inputDescElement.value || !inputDateElement.value) {
            return;
        }

        let h3Element = document.createElement('h3');
        let descPElement = document.createElement('p');
        let datePElement = document.createElement('p');
        let startButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let buttonsDivElement = document.createElement('div');

        let articleElement = document.createElement('article');

        h3Element.textContent = inputTaskElement.value;
        descPElement.textContent = `Description: ${inputDescElement.value}`;
        datePElement.textContent = `Due Date: ${inputDateElement.value}`;
        startButton.textContent = 'Start';
        startButton.className = 'green';
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'red';
        buttonsDivElement.className = 'flex';

        buttonsDivElement.appendChild(startButton);
        buttonsDivElement.appendChild(deleteButton);

        articleElement.appendChild(h3Element);
        articleElement.appendChild(descPElement);
        articleElement.appendChild(datePElement);
        articleElement.appendChild(buttonsDivElement);

        openSectionElement.parentElement.parentElement.children[1].appendChild(articleElement);

        inputDescElement.value = '';
        inputDateElement.value = '';
        inputTaskElement.value = '';

        startButton.addEventListener('click', onStartButtonClick);
        deleteButton.addEventListener('click', onDeleteButtonClick);
    }
    function onStartButtonClick(e) {
        let article = e.currentTarget.parentElement.parentElement;

        e.currentTarget.parentElement.children[1].remove();

        let deleteButton = e.currentTarget;
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'red';

        let finishButton = document.createElement('button');
        finishButton.textContent = 'Finish';
        finishButton.className = 'orange';

        e.currentTarget.parentElement.appendChild(finishButton);

        inprogressSectionElement.parentElement.parentElement.children[1].appendChild(article);

        finishButton.addEventListener('click', onFinishButtonClick);
        deleteButton.addEventListener('click', onDeleteButtonClick);
    }
    function onDeleteButtonClick(e) {
        let article = e.currentTarget.parentElement.parentElement;

        article.remove();
    }
    function onFinishButtonClick(e) {
        let article = e.currentTarget.parentElement.parentElement;

        e.currentTarget.parentElement.remove();

        completeSectionElement.parentElement.parentElement.children[1].appendChild(article);
    }
}
