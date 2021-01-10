function solve() {
   let ul = document.querySelector('#availableCourses ul');

   let jsFundamentals = ul.children[0];
   let jsAdvanced = ul.children[1];
   let jsApplications = ul.children[2];
   let jsWeb = ul.children[3];

   let signUpButton = document.querySelector('#availableCourses button');

   let onsiteForm = document.querySelector('#educationForm').children[1];
   let onlineForm = document.querySelector('#educationForm').children[3];

   let myCoursesUl = document.querySelector('#myCourses ul');

   let costElement = document.querySelector('.courseFoot > p');

   signUpButton.addEventListener('click', e => {
      if (jsFundamentals.children[0].checked === true &&
         jsAdvanced.children[0].checked === false && 
         jsApplications.children[0].checked === false &&
         jsWeb.children[0].checked === false) {
         myCoursesUl.innerHTML = '';

         let jsFundamentalsPrice = 170;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsFundamentalsPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsFundamentalsPrice - (jsFundamentalsPrice * 0.06);
         }
         

         let li = el('li', 'JS-Fundamentals');

         myCoursesUl.appendChild(li);

         console.log(totalPrice);

         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === false &&
         jsAdvanced.children[0].checked === true && 
         jsApplications.children[0].checked === false &&  
         jsWeb.children[0].checked === false) {
         myCoursesUl.innerHTML = '';

         let jsAdvancedPrice = 180;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsAdvancedPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsAdvancedPrice - (jsAdvancedPrice * 0.06);
         }
         

         let li = el('li', 'JS-Advanced');

         myCoursesUl.appendChild(li);

         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === false &&
         jsAdvanced.children[0].checked === false && 
         jsApplications.children[0].checked === true &&  
         jsWeb.children[0].checked === false) {
         myCoursesUl.innerHTML = '';

         let jsApplicationsPrice = 190;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsApplicationsPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsApplicationsPrice - (jsApplicationsPrice * 0.06);
         }
         

         let li = el('li', 'JS-Applications');

         myCoursesUl.appendChild(li);

         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === false &&
         jsAdvanced.children[0].checked === false && 
         jsApplications.children[0].checked === false &&  
         jsWeb.children[0].checked === true) {
         myCoursesUl.innerHTML = '';

         let jsWebPrice = 490;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsWebPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsWebPrice - (jsWebPrice * 0.06);
         }
         

         let li = el('li', 'JS-Web');

         myCoursesUl.appendChild(li);

         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === true &&
         jsAdvanced.children[0].checked === true && 
         jsApplications.children[0].checked === false &&  
         jsWeb.children[0].checked === false) {
         myCoursesUl.innerHTML = '';

         let jsFundamentalsPrice = 170;
         let jsAdvancedPrice = 180 - (180 * 0.10);

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsFundamentalsPrice + jsAdvancedPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsFundamentalsPrice + jsAdvancedPrice;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Fundamentals');
         let li2 = el('li', 'JS-Advanced');


         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);


         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === true &&
         jsAdvanced.children[0].checked === false && 
         jsApplications.children[0].checked === true &&  
         jsWeb.children[0].checked === false) {
         myCoursesUl.innerHTML = '';

         let jsFundamentalsPrice = 170;
         let jsApplicationsPrice = 190;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsFundamentalsPrice + jsApplicationsPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsFundamentalsPrice + jsApplicationsPrice;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Fundamentals');
         let li2 = el('li', 'JS-Applications');


         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);


         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === true &&
         jsAdvanced.children[0].checked === false && 
         jsApplications.children[0].checked === false &&  
         jsWeb.children[0].checked === true) {
         myCoursesUl.innerHTML = '';

         let jsFundamentalsPrice = 170;
         let jsWebPrice = 490;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsFundamentalsPrice + jsWebPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsFundamentalsPrice + jsWebPrice;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Fundamentals');
         let li2 = el('li', 'JS-Web');


         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);


         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === false &&
         jsAdvanced.children[0].checked === true && 
         jsApplications.children[0].checked === true &&  
         jsWeb.children[0].checked === false) {
         myCoursesUl.innerHTML = '';

         let jsAdvanced = 180;
         let jsApplications = 190;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsAdvanced + jsApplications;
         }
         if (onlineForm.checked) {
            totalPrice = jsAdvanced + jsApplications;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Advanced');
         let li2 = el('li', 'JS-Applications');


         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);


         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === false &&
         jsAdvanced.children[0].checked === true && 
         jsApplications.children[0].checked === false &&  
         jsWeb.children[0].checked === true) {
         myCoursesUl.innerHTML = '';

         let jsAdvanced = 180;
         let jsWebPrice = 490;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsAdvanced + jsWebPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsAdvanced + jsWebPrice;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Advanced');
         let li2 = el('li', 'JS-Web');


         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);


         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === false &&
         jsAdvanced.children[0].checked === false && 
         jsApplications.children[0].checked === true &&  
         jsWeb.children[0].checked === true) {
         myCoursesUl.innerHTML = '';

         let jsApplicationsPrice = 190;
         let jsWebPrice = 490;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsApplicationsPrice + jsWebPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsApplicationsPrice + jsWebPrice;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Applications');
         let li2 = el('li', 'JS-Web');


         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);


         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === true &&
         jsAdvanced.children[0].checked === true && 
         jsApplications.children[0].checked === true &&  
         jsWeb.children[0].checked === false) {
         myCoursesUl.innerHTML = '';

         let jsAdvancedPrice = 180 - (180 * 0.10);
         let totalModulePrice = 170 + jsAdvancedPrice + 190;
            totalModulePrice = totalModulePrice - (totalModulePrice * 0.06);

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = totalModulePrice;
         }
         if (onlineForm.checked) {
            totalPrice = totalModulePrice;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Fundamentals');
         let li2 = el('li', 'JS-Advanced');
         let li3 = el('li', 'JS-Applications');



         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);
         myCoursesUl.appendChild(li3);


         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }else if (jsFundamentals.children[0].checked === false &&
         jsAdvanced.children[0].checked === true && 
         jsApplications.children[0].checked === true &&  
         jsWeb.children[0].checked === true) {
         myCoursesUl.innerHTML = '';

         let jsAdvancedPrice = 180;
         let jsApplicationsPrice = 190;
         let jsWebPrice = 490;

         let totalPrice = 0; 
         if (onsiteForm.checked) {
            totalPrice = jsApplicationsPrice + jsWebPrice + jsAdvancedPrice;
         }
         if (onlineForm.checked) {
            totalPrice = jsApplicationsPrice + jsWebPrice + jsAdvancedPrice;

            totalPrice = totalPrice - (totalPrice * 0.06);
         }
         

         let li = el('li', 'JS-Advanced');
         let li2 = el('li', 'JS-Applications');
         let li3 = el('li', 'JS-Web');

         myCoursesUl.appendChild(li);
         myCoursesUl.appendChild(li2);
         myCoursesUl.appendChild(li3);

         costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

         return;
      }
      else if (jsFundamentals.children[0].checked === true && 
         jsAdvanced.children[0].checked === true && 
         jsApplications.children[0].checked === true &&
         jsWeb.children[0].checked === true) {
            myCoursesUl.innerHTML = '';

            let jsAdvancedPrice = 180 - (180 * 0.10);
            let totalModulePrice = 170 + jsAdvancedPrice + 190;
            totalModulePrice = totalModulePrice - (totalModulePrice * 0.06);

            let totalPrice = 0; 
            if (onsiteForm.checked) {
               totalPrice = totalModulePrice + 490;
            }
            if (onlineForm.checked) {
               totalPrice = totalModulePrice + 490;
               totalPrice = totalPrice - (totalPrice * 0.06);
            }

            let jsFundamentalsLi = el('li', 'JS-Fundamentals');
            let jsAdvancedLi = el('li', 'JS-Advanced');
            let jsApplicationsLi = el('li', 'JS-Applications');
            let jsWebLi = el('li', 'JS-Web');
            let bonus = el('li', 'HTML and CSS');

            myCoursesUl.appendChild(jsFundamentalsLi);
            myCoursesUl.appendChild(jsAdvancedLi);
            myCoursesUl.appendChild(jsApplicationsLi);
            myCoursesUl.appendChild(jsWebLi);
            myCoursesUl.appendChild(bonus);

            costElement.textContent = `Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`;

            return;
      }
      

   })

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

solve();