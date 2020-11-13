import monkeys from './monkeys.js';

const elements = {
    allMonkeys: () => document.querySelector('div.monkeys'),
};

fetch('./template.hbs')
    .then((r) => r.text())
    .then((monkeyTemplateSrc) => {
        let template = Handlebars.compile(monkeyTemplateSrc);
        let resultHtml = template({ monkeys });
        elements.allMonkeys().innerHTML = resultHtml;
        attachEventListener();
    })
    .catch((e) => console.error(e));

function attachEventListener() {
    elements.allMonkeys().addEventListener('click', (e) => {
        const { target } = e;

        if (target.nodeName === 'BUTTON' && target.textContent === 'Info') {
            let pElement = e.target.parentNode.querySelector('p');

            if (pElement.style.display === 'none') {
                pElement.style.display = 'block';
            } else {
                pElement.style.display = 'none';
            }
        }

    });
}
