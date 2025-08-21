// ---- helpers ----
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const money = n => new Intl.NumberFormat('ru-RU').format(n);

// Плейсхолдер для картинок, если не загрузились
const FALLBACK_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <text x="50%" y="50%" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".35em">фото будет позже</text>
</svg>`);

// ---- рендер каталога ----
function renderCatalog(items){
  const grid = $('#grid');
  grid.setAttribute('aria-busy','true');
  grid.innerHTML = '';
  items.forEach((it, idx) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'thumb';
    img.loading = 'lazy';
    img.alt = it.name;
    img.src = it.image;
    img.onerror = () => { img.src = FALLBACK_IMG; };

    const h = document.createElement('h3');
    h.className = 'title';
    h.textContent = it.name;

    const c = document.createElement('p');
    c.className = 'cat';
    c.textContent = it.category;

    const p = document.createElement('div');
    p.className = 'price';
    p.textContent = it.price;

    const btn = document.createElement('button');
    btn.className = 'btn primary';
    btn.textContent = 'Купить';
    btn.addEventListener('click', () => addToCart(it));

    card.append(img, h, c, p, btn);
    grid.append(card);
  });
  grid.setAttribute('aria-busy','false');
}

// ---- фильтры ----
function applyFilters(){
  const q = ($('#search').value || '').toLowerCase().trim();
  const cat = $('#category').value;
  const list = catalog.filter(i => {
    const okCat = !cat || i.category === cat;
    const okQ = !q || i.name.toLowerCase().includes(q);
    return okCat && okQ;
  });
  renderCatalog(list);
}

// ---- корзина ----
const CART_KEY = 'impuls-cart-v1';
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const setCart = (v) => localStorage.setItem(CART_KEY, JSON.stringify(v));

function addToCart(item){
  const cart = getCart();
  const found = cart.find(x => x.name === item.name);
  if (found) found.qty += 1;
  else cart.push({ ...item, qty: 1, priceNum: guessPrice(item.price) });
  setCart(cart);
  updateCartBadge();
}

function guessPrice(priceStr){
  // из строки вида "от 520 ₽ / м²" берём число 520
  const m = priceStr.replace(/\s/g,'').match(/(\d[\d]*)/);
  return m ? Number(m[1]) : 0;
}

function updateCartBadge(){
  const cart = getCart();
  const count = cart.reduce((s,i)=>s+i.qty,0);
  $('#cartCount').textContent = count;
}

function openModal(id){ const m = $(id); m.classList.add('show'); m.setAttribute('aria-hidden','false'); }
function closeModal(id){ const m = $(id); m.classList.remove('show'); m.setAttribute('aria-hidden','true'); }

function renderCart(){
  const wrap = $('#cartItems');
  const cart = getCart();
  wrap.innerHTML = cart.length ? '' : '<p class="muted">Корзина пуста</p>';

  let total = 0;

  cart.forEach((it, idx) => {
    total += it.priceNum * it.qty;

    const row = document.createElement('div');
    row.className = 'cart-row';

    const im = document.createElement('img');
    im.src = it.image; im.alt = it.name; im.onerror = ()=> im.src = FALLBACK_IMG;

    const info = document.createElement('div');
    info.innerHTML = `<div class="title">${it.name}</div><div class="cat">${it.price}</div>`;

    const qty = document.createElement('div');
    qty.className = 'qty';
    const minus = document.createElement('button'); minus.textContent = '–';
    const plus  = document.createElement('button'); plus.textContent = '+';
    const n     = document.createElement('span'); n.textContent = it.qty;

    minus.addEventListener('click',()=>{
      const c = getCart();
      if (c[idx].qty > 1) c[idx].qty -= 1; else c.splice(idx,1);
      setCart(c); updateCartBadge(); renderCart();
    });
    plus.addEventListener('click',()=>{
      const c = getCart();
      c[idx].qty += 1;
      setCart(c); updateCartBadge(); renderCart();
    });

    qty.append(minus,n,plus);

    const sum = document.createElement('div');
    sum.textContent = money(it.priceNum * it.qty) + ' ₽';

    row.append(im, info, qty, sum);
    wrap.append(row);
  });

  $('#cartTotal').textContent = money(total) + ' ₽';
}

// ---- оформление ----
function sendOrder(formData){
  // Для MVP оформляем простую «заявку»: собираем текст и открываем mailto:
  const cart = getCart();
  const lines = cart.map(i => `• ${i.name} × ${i.qty} = ${money(i.priceNum*i.qty)} ₽`).join('%0D%0A');
  const total = money(cart.reduce((s,i)=>s+i.priceNum*i.qty,0)) + ' ₽';

  const name = encodeURIComponent(formData.get('name'));
  const phone = encodeURIComponent(formData.get('phone'));
  const comment = encodeURIComponent(formData.get('comment') || '');

  const subject = encodeURIComponent('Заказ с сайта ИМПУЛЬС');
  const body =
    `Имя: ${name}%0D%0AТелефон: ${phone}%0D%0AКомментарий: ${comment}%0D%0A%0D%0A` +
    `Корзина:%0D%0A${lines}%0D%0AИтого: ${total}%0D%0A%0D%0A` +
    `Связаться: ${encodeURIComponent(window.ORDER_PHONE)} / ${encodeURIComponent(window.ORDER_EMAIL)}`;

  window.location.href = `mailto:${encodeURIComponent(window.ORDER_EMAIL)}?subject=${subject}&body=${body}`;
}

// ---- init ----
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(catalog);
  updateCartBadge();

  // фильтры
  $('#search').addEventListener('input', applyFilters);
  $('#category').addEventListener('change', applyFilters);

  // корзина
  $('#openCart').addEventListener('click', () => { renderCart(); openModal('#cartModal'); });
  $('#closeCart').addEventListener('click', () => closeModal('#cartModal'));
  $('#clearCart').addEventListener('click', () => { setCart([]); updateCartBadge(); renderCart(); });

  // заказ
  $('#checkoutBtn').addEventListener('click', () => { closeModal('#cartModal'); openModal('#orderModal'); });
  $('#closeOrder').addEventListener('click', () => closeModal('#orderModal'));
  $('#orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    sendOrder(fd);
  });
});
