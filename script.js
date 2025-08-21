// Плейсхолдер-картинка (SVG) если фото не загрузилось
function ph(text) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='520'>
    <rect width='100%' height='100%' fill='#e9eef3'/>
    <text x='24' y='72' font-family='Arial, sans-serif' font-size='28' fill='#1f2937'>${text}</text>
    <text x='24' y='120' font-family='Arial, sans-serif' font-size='16' fill='#6b7280'>Фото скоро будет</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function renderCatalog(items) {
  const grid = document.getElementById('grid');
  grid.innerHTML = items.length ? '' : '<p class="muted">Каталог временно пуст.</p>';

  items.forEach(it => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = it.image;
    img.alt = it.name;
    img.loading = 'lazy';
    img.onerror = () => { img.src = ph(it.name); }; // ← если не загрузилось — ставим заглушку

    const h3 = document.createElement('h3'); h3.textContent = it.name;
    const pcat = document.createElement('p'); pcat.className = 'muted'; pcat.textContent = it.category;
    const pprice = document.createElement('p'); pprice.innerHTML = `<strong>${it.price}</strong>`;

    card.append(img, h3, pcat, pprice);
    grid.appendChild(card);
  });
}

function applyFilters() {
  const q = (document.getElementById('search').value || '').toLowerCase();
  const cat = document.getElementById('category').value;
  const filtered = catalog.filter(i =>
    (cat === '' || i.category === cat) &&
    i.name.toLowerCase().includes(q)
  );
  renderCatalog(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(catalog);
  document.getElementById('search').addEventListener('input', applyFilters);
  document.getElementById('category').addEventListener('change', applyFilters);
});
