function solve() {
   // 1. запазваме референции към елементите,които ще манипулираме през целия живот на приложението
   let messageInput = document.querySelector('#chat_input');
   let chatMessagesSection = document.querySelector('#chat_messages');

   document.querySelector('#send').addEventListener('click', addTask);

   // 2. създаване на задачи (ДОМ елементи)
   function addTask(e) {
      // 3. прочитаме съдържанието на формуляра и валидираме
      const message = messageInput.value;
      // 4. създаваме елементите

      const task = el('div', message, { className: 'message my-message' });

      // 5. добавяме елемента в ДОМ дървото

      chatMessagesSection.appendChild(task);

      messageInput.value = '';
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


