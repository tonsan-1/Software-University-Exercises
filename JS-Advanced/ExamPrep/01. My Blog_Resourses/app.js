function solve() {
   let creatorElement = document.getElementById('creator');
   let titleElement = document.getElementById('title');
   let categoryElement = document.getElementById('category');
   let contentElement = document.getElementById('content');

   let createButtonElement = document.getElementsByClassName('btn create')[0];


   let siteContent = document.querySelector('h2').parentElement;

   console.log(siteContent);

   let archiveSection = document.getElementsByClassName('archive-section')[0].children[1];

   createButtonElement.addEventListener('click', onCreateButtonClick);

   function onCreateButtonClick(e) {
      e.preventDefault();

      let articleElement = document.createElement('article');

      let h1 = document.createElement('h1');
      let pCategory = document.createElement('p');
      let pCreator = document.createElement('p');
      let pContent = document.createElement('p');
      let div = document.createElement('div');
      let deleteBtn = document.createElement('button')
      let archiveBtn = document.createElement('button');

      h1.textContent = `${titleElement.value}`;
      div.className = 'buttons';
      deleteBtn.className = `btn delete`;
      deleteBtn.textContent = 'Delete';
      archiveBtn.className = `btn archive`;
      archiveBtn.textContent = 'Archive';

      pCategory.innerHTML += "Category:";
      pCategory.innerHTML += `<strong>${categoryElement.value}</strong>`;

      pCreator.innerHTML += "Creator:";
      pCreator.innerHTML += `<strong>${creatorElement.value}</strong>`;

      pContent.innerHTML += contentElement.value;

      div.appendChild(deleteBtn);
      div.appendChild(archiveBtn);

      articleElement.appendChild(h1);
      articleElement.appendChild(pCategory);
      articleElement.appendChild(pCreator);
      articleElement.appendChild(pContent);

      articleElement.appendChild(div);

      siteContent.appendChild(articleElement);

      console.log(articleElement);

      creatorElement.value = '';
      titleElement.value = '';
      categoryElement.value = '';
      contentElement.value = '';

      deleteBtn.addEventListener('click', e => {
         let currentArticle = e.currentTarget.parentElement.parentElement;

         currentArticle.remove();
      })

      archiveBtn.addEventListener('click', e => {
         let ulTitle = e.currentTarget.parentElement.parentElement.children[0];

         let archiveUl = document.querySelector('.archive-section ul');

         e.currentTarget.parentElement.parentElement.remove();

         let liElement = document.createElement('li');
         liElement.textContent = ulTitle.textContent;

         archiveSection.appendChild(liElement);

         let sortedLi = Array.from(archiveUl.getElementsByTagName('li')).sort((a,b) => (a.innerHTML).localeCompare(b.innerHTML));

         while (archiveUl.firstChild) {
            archiveUl.removeChild(archiveUl.firstChild);
         }

         for (const element of sortedLi) {
            archiveUl.appendChild(element);
         }
      });
   }
}
