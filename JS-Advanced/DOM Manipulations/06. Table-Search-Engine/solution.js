function solve() {
   let inputElement = document.getElementById('searchField');

   document.getElementById('searchBtn').addEventListener('click', () => {

      [...document.querySelectorAll('tbody > tr')].forEach(row => {

         if (row.textContent.includes(inputElement.value)) {
            row.className = 'select';
         }else {
            row.className = '';
         }
      });
      inputElement.value = '';
   });
}