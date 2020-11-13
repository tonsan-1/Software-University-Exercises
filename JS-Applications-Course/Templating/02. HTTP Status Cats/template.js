const elements = {
    allCats: () => document.getElementById('allCats'),
};

Promise.all([
    getTemplate('./template.hbs'),
    getTemplate('./cat.hbs')
])
    .then(([templateSource, catSrc]) => {
        Handlebars.registerPartial('cat',catSrc);
        let template = Handlebars.compile(templateSource);
        let resultHtml = template({ cats });
        elements.allCats().innerHTML = resultHtml;
    })
    .catch((e) => console.error(e));

document.addEventListener('click', showStatusCode);

function showStatusCode(e){
    if (e.target.className == 'showBtn') {
        let statusDiv = e.target.parentElement.children[1];

        if (statusDiv.style.display == 'block') {
            statusDiv.style.display = 'none';
            e.target.textContent = 'Show status code';
        }else{
            statusDiv.style.display = 'block';
            e.target.textContent = 'Hide status code';
        }
    }
}
function getTemplate(templateLocation) {
    return fetch(templateLocation).then((r) => r.text());
}