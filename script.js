const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');

function render(items){
  grid.innerHTML = '';
  if(!items.length){ grid.innerHTML = '<p class="muted">Ничего не найдено</p>'; return; }
  items.forEach(it=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${it.image}" alt="${it.name}" loading="lazy" width="600" height="400">
      <h3>${it.name}</h3>
      <p class="muted">${it.category}</p>
      <p class="price">${it.price}</p>
    `;
    grid.appendChild(card);
  });
}

function applyFilters(){
  const q = (searchInput.value || '').toLowerCase();
  const cat = categorySelect.value;
  const filtered = catalog.filter(it => {
    const matchQ = it.name.toLowerCase().includes(q) || (it.category||'').toLowerCase().includes(q);
    const matchC = !cat || it.category === cat;
    return matchQ && matchC;
  });
  render(filtered);
}

searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);

render(catalog);
