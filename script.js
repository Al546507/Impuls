const grid = document.getElementById('grid');

function render(items){
  grid.innerHTML = '';
  if(!items || !items.length){
    grid.innerHTML = '<p class="muted">Каталог временно пуст.</p>';
    return;
  }
  items.forEach(it=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${it.image}" alt="${it.title}">
      <h3>${it.title}</h3>
      <p class="muted">${it.category}</p>
      <p>${it.desc}</p>
      <div class="row"><span class="price">${it.price}</span><span class="muted">MOQ: ${it.moq}</span></div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  render(window.CATALOG);
});
