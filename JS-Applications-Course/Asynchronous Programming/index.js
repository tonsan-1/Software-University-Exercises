function solve() {
    // 1. запазваме референции към елементите,които ще манипулираме през целия живот на приложението
    let form = document.querySelector('form');
    let inputName = form.children[0].children[1];
    let inputDate = form.children[1].children[1];
    let inputModule = form.children[2].children[1];

    form.children[3].children[0].addEventListener('click', onAddButtonClick);

    let modules = document.querySelector('.modules');

    // 2. създаване на задачи (ДОМ елементи)

    function onAddButtonClick(e) {
        e.preventDefault();
        // 3. прочитаме съдържанието на формуляра и валидираме
        let lectureName = inputName.value;
        let dateAndTime = inputDate.value;
        let module = inputModule.value;

        if (lectureName.length > 0 && dateAndTime.length > 0 && module != 'Select module') {
            let date = dateAndTime.split('T')[0].split('-');
            let time = dateAndTime.split('T')[1];
            module = module.toUpperCase() + '-MODULE';

            // 4. създаваме елементите
            const deleteButton = el('button', 'Del', { className: 'red' });
            const li = el('li', [
                el('h4', `${lectureName} - ${date.join('/')} - ${time}`),
                deleteButton
            ], { className: 'flex' });

            let allModules = Array.from(document.querySelectorAll('.module'));
            console.log(allModules);
            let existingModule = allModules.find(x => x.children[0].textContent == module);


            if (!existingModule) {
                const task = el('div', [
                    el('h3', `${module}`),
                    el('ul', li)
                ], { className: 'module' });

                modules.appendChild(task);
            } else {
                const task = el('ul', li);

                let liElements = Array.from(existingModule.querySelectorAll('li'));

                liElements.push(task)

                liElements.sort((a,b) => a.children[0].localeCompare(b.children[0])).forEach(li =>{
                    existingModule.appendChild(li);
                });

            }

            deleteButton.addEventListener('click', e =>{
                let currentDiv = e.currentTarget.parentElement.parentElement.parentElement;
                e.currentTarget.parentElement.remove();

                if (currentDiv.children.length == 2) {
                    currentDiv.remove();
                }
            });
        }
    }
    function el(type, content, attributes) {
        const result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }
        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }

        function append(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }
            result.appendChild(node);
        }
        return result;
    }
}


