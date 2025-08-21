// Константы: куда отправлять заказ (mailto)
const ORDER_EMAIL = 'alex546507@gmail.com';
const ORDER_PHONE = '+7 (993) 264-84-00';

// ---- Иконки (вектор) ----
function iconSvg(kind){
  const stroke = '#0f172a';
  const sw = 2.2;
  switch(kind){
    case 'brick':   return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="52" height="24" rx="3" fill="#e2e8f0" stroke="${stroke}" stroke-width="${sw}"/>
      <rect x="10" y="18" width="12" height="8" rx="1.5" fill="#fff" stroke="${stroke}" stroke-width="1.6"/>
      <rect x="26" y="18" width="12" height="8" rx="1.5" fill="#fff" stroke="${stroke}" stroke-width="1.6"/>
      <rect x="42" y="18" width="12" height="8" rx="1.5" fill="#fff" stroke="${stroke}" stroke-width="1.6"/>
      <rect x="18" y="28" width="12" height="8" rx="1.5" fill="#fff" stroke="${stroke}" stroke-width="1.6"/>
      <rect x="34" y="28" width="12" height="8" rx="1.5" fill="#fff" stroke="${stroke}" stroke-width="1.6"/>
    </svg>`;
    case 'aerated': return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="52" height="24" rx="3" fill="#eef2ff" stroke="${stroke}" stroke-width="${sw}"/>
      <circle cx="18" cy="24" r="2" fill="${stroke}" opacity=".3"/><circle cx="26" cy="18" r="1.6" fill="${stroke}" opacity=".3"/>
      <circle cx="30" cy="26" r="1.4" fill="${stroke}" opacity=".25"/><circle cx="36" cy="21" r="2" fill="${stroke}" opacity=".28"/>
      <circle cx="44" cy="26" r="1.8" fill="${stroke}" opacity=".3"/>
    </svg>`;
    case 'cement':  return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 12h36l4 8-4 16H14L10 20l4-8Z" fill="#e5e7eb" stroke="${stroke}" stroke-width="${sw}" />
      <path d="M20 22h24" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
    case 'sand':    return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 36h48L42 22l-8 4-6-10-8 12-12 8Z" fill="#fde68a" stroke="${stroke}" stroke-width="${sw}" />
    </svg>`;
    case 'gravel':  return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="#cbd5e1" stroke="${stroke}" stroke-width="1.5">
        <circle cx="16" cy="30" r="6"/><circle cx="28" cy="26" r="5"/><circle cx="40" cy="30" r="7"/><circle cx="50" cy="26" r="4"/>
      </g>
    </svg>`;
    case 'slab':    return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="18" width="48" height="12" rx="3" fill="#e2e8f0" stroke="${stroke}" stroke-width="${sw}"/>
      <circle cx="18" cy="24" r="2" fill="#94a3b8"/><circle cx="30" cy="24" r="2" fill="#94a3b8"/><circle cx="42" cy="24" r="2" fill="#94a3b8"/>
    </svg>`;
    case 'fbs':     return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="48" height="16" rx="3" fill="#e2e8f0" stroke="${stroke}" stroke-width="${sw}"/>
      <rect x="14" y="20" width="12" height="8" fill="#cbd5e1" rx="1.5"/><rect x="38" y="20" width="12" height="8" fill="#cbd5e1" rx="1.5"/>
    </svg>`;
    case 'roof':    return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="48" height="20" rx="3" fill="#e0e7ff" stroke="${stroke}" stroke-width="${sw}"/>
      <path d="M12 20h40M12 24h40M12 28h40" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
    case 'wool':    return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="44" height="20" rx="4" fill="#fff7ed" stroke="${stroke}" stroke-width="${sw}"/>
      <path d="M14 24c6-6 12 6 18 0s12 6 18 0" stroke="${stroke}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    </svg>`;
    case 'drywall': return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="20" rx="2" fill="#eef2f7" stroke="${stroke}" stroke-width="${sw}"/>
      <rect x="16" y="16" width="40" height="20" rx="2" fill="#f8fafc" stroke="${stroke}" stroke-width="1.6"/>
    </svg>`;
    case 'wood':    return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="16" width="44" height="6" rx="2" fill="#fde68a" stroke="${stroke}" stroke-width="${sw}"/>
      <rect x="10" y="26" width="44" height="6" rx="2" fill="#fcd34d" stroke="${stroke}" stroke-width="${sw}"/>
      <path d="M18 16v6M18 26v6M38 16v6M38 26v6" stroke="${stroke}" stroke-width="1.6"/>
    </svg>`;
    case 'paint':   return `<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 14h20l4 8-4 12H22L18 22l4-8Z" fill="#e0e7ff" stroke="${stroke}" stroke-width="${sw}"/>
      <path d="M26 26h12" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
      <path d="M46 34c6 0 6 8 0 8s-6-8 0-8Z" fill="#f43f5e" opacity=".7"/>
    </svg>`;
    default:        return `<svg viewBox="0 0 64 48" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="48" height="24" rx="4" fill="#e2e8f0"/></svg>`;
  }
}

// ---- Рендер каталога ----
const grid = document.getElementById('grid');
function render(items){
  grid.innerHTML = '';
  if(!items.length){
    grid.innerHTML = `<div class="muted">Ничего не найдено.</div>`;
    return;
  }
  items.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="img">${iconSvg(p.icon)}</div>
      <div class="body">
        <h3>${p.name}</h3>
        <div class="meta">${p.category}</div>
        <p class="price">от ${p.price.toLocaleString('ru-RU')} ${p.unit}</p>
      </div>
      <div class="actions"><button class="btn primary" data-id="${p.id}">Купить</button></div>
    `;
    grid.appendChild(card);
  });
}

// ---- Поиск / фильтр ----
const qEl = document.getElementById('search');
const catEl = document.getElementById('category');
function applyFilters(){
  const q = (qEl.value||'').toLowerCase();
  const cat = catEl.value||'';
  const res = catalog.filter(it=>{
    const passCat = !cat || it.category === cat;
    const passQ = !q || [it.name,it.category].join(' ').toLowerCase().includes(q);
    return passCat && passQ;
  });
  render(res);
}
qEl.addEventListener('input',applyFilters);
catEl.addEventListener('change',applyFilters);

// ---- Корзина ----
let cart = [];
const cartBtn = document.getElementById('cartOpen');
const cartPanel = document.getElementById('cartPanel');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');

function addToCart(id){
  const item = catalog.find(x=>x.id===id);
  if(!item) return;
  const exist = cart.find(x=>x.id===id);
  if(exist) exist.qty += 1;
  else cart.push({id:item.id, name:item.name, price:item.price, unit:item.unit, icon:item.icon, qty:1});
  updateCart();
}
function updateCart(){
  cartItems.innerHTML = cart.map(row=>`
    <div class="cart-item">
      <div class="thumb">${iconSvg(row.icon)}</div>
      <div>
        <h4>${row.name}</h4>
        <div class="muted">от ${row.price.toLocaleString('ru-RU')} ${row.unit}</div>
        <div class="qty">
          <button data-dec="${row.id}">−</button>
          <b>${row.qty}</b>
          <button data-inc="${row.id}">+</button>
          <button data-del="${row.id}" class="icon-btn" style="margin-left:8px">Удалить</button>
        </div>
      </div>
      <div><strong>${(row.price*row.qty).toLocaleString('ru-RU')} ₽</strong></div>
    </div>
  `).join('');
  const total = cart.reduce((s,x)=>s + x.price*x.qty, 0);
  cartTotal.textContent = `${total.toLocaleString('ru-RU')} ₽`;
  cartCount.textContent = cart.reduce((s,x)=>s+x.qty,0);
  cartPanel.classList.toggle('open', cart
