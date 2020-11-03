function el(type,content,attributes){
    const result = document.createElement(type);

    if (attributes !== undefined) {
        Object.assign(result,attributes);
    }
    if (Array.isArray(content)) {
        content.forEach(append);
    }else{
        append(content);
    }

    function append(node){
        if (typeof node === 'string') {
            node = document.createTextNode(node);
        }
        result.appendChild(node);
    }
    return result;
}


//Use .item() for selecting ellements

// Примерна структура за създаване на ДОМ задача

// 1. запазваме референции към елементите,които ще манипулираме през целия живот на приложението
// 2. създаване на задачи (ДОМ елементи)
// 3. прочитаме съдържанието на формуляра и валидираме
// 4. създаваме елементите
// 5. закачаме фунционалност
// 6. добавяме елемента в ДОМ дървото