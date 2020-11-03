function solve(){
  const tbodyElement = document.querySelector('tbody');
  const items =  tbodyElement.querySelectorAll('tr');
   tbodyElement.addEventListener('click', parseTable);
   

   function parseTable(e){
      const target = e.target.parentNode;

      if (target.nodeName === 'TR') {
        
         if (target.style.backgroundColor !== '') {
            target.style.backgroundColor = '';
         }else{
            [...items].forEach(i => i.style.backgroundColor = '');
            target.style.backgroundColor = "#413f5e";
         }
      }
   }
}
