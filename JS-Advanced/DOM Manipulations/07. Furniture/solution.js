function solve() {
  const tbody = document.querySelector('tbody');
  const [generate,buy] = [...document.querySelectorAll('button')];
  const[input,output] = [...document.querySelectorAll('textarea')];

  generate.addEventListener('click', onGenerate);
  buy.addEventListener('click', onBuy);

  function onGenerate(e){
    const data = JSON.parse(input.value);

    for(let item of data){
      const row = document.createElement('tr');
      const html = `<tr><td><img src="${item.img}"></td><td><p>${item.name}</p></td><td><p>${item.price}</p></td><td><p>${item.decFactor}</p></td><td><input type="checkbox"/></td></tr>`
      row.innerHTML = html;
      tbody.appendChild(row);
    }
  }

  function onBuy(e){
    const boughtItems = [...tbody.querySelectorAll('input')]
    .filter(i => i.checked)
    .map(i => i.parentNode.parentNode)
    .map(row => ({
      name: row.children[1].textContent.trim,
      price: Number(row.children[2].textContent),
      decFactor: Number(row.children[3].textContent),
    }));
    const result = [
      `Bought furniture: ${boughtItems.map(i => i.name).join(', ')}`,
      `Total price: ${boughtItems.reduce((p,c,i,a) => p + c.price, 0)}`,
      `Average decoration factor: ${boughtItems.reduce((p,c,i,a) => p + c.decFactor, 0) / boughtItems.length}`,
    ];

    output.value = result.join('\n');
  }
}