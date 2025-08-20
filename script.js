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
      <img src="${it.image}" alt="${it.name}" loading="lazy" width="600" height="400" onerror="this.onerror=null;this.src='images/brick.jpg'">
      <h3>${it.name}</h3>
      <p class="muted">${it.category}</p>
      <p class="price">${it.price}</p>
      <button class="btn" data-item="${it.name}">Заказать</button>
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

// Simple order via mailto
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-item]');
  if(!btn) return;
  const item = btn.getAttribute('data-item');
  const body = `Здравствуйте! Интересует позиция: ${encodeURIComponent(item)}.%0AКоличество: [укажите]%0AДоставка: [город]%0AКонтакты: [имя, телефон]`;
  window.location.href = `mailto:alex546507@gmail.com?subject=Заявка с сайта&body=${body}`;
});

render(catalog);
