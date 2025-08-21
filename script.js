// SVG-заглушка если фото не загрузилось
function placeholderSVG(text = 'Фото скоро будет') {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="520">
    <rect width="100%" height="100%" fill="#eef1f5"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          fill="#7a8599" font-size="18" font-family="Arial, sans-serif">${text}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// --- КАТАЛОГ / ФИЛЬТРЫ -------------------------------------------------------
const grid = document.getElementById('grid');

function renderCatalog(items) {
  if (!items || !items.length) {
    grid.innerHTML = '<p class="muted">Каталог временно пуст.</p>';
    return;
  }

  grid.innerHTML = '';
  items.forEach((it, idx) => {
    const card = document.createElement('article');
    card.className = 'card';

    // картинка
    const img = document.createElement('img');
    img.src = it.image;
    img.alt = it.name;
    img.loading = 'lazy';
    img.onerror = () => { img.src = placeholderSVG(); };

    // текст
    const h3 = document.createElement('h3');
    h3.textContent = it.name;

    const cat = document.createElement('p');
    cat.className = 'muted';
    cat.textContent = it.category;

    const price = document.createElement('p');
    price.className = 'price';
    price.innerHTML = `<strong>${it.price}</strong>`;

    // контролы покупки
    const controls = document.createElement('div');
    controls.className = 'buy';

    const qty = document.createElement('input');
    qty.type = 'number';
    qty.min = '1';
    qty.value = '1';
    qty.className = 'qty';

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Купить';
    btn.onclick = () => addToCart({ ...it, qty: Number(qty.value || 1) });

    controls.append(qty, btn);

    card.append(img, h3, cat, price, controls);
    grid.append(card);
  });
}

function applyFilters() {
  const q = (document.getElementById('search').value || '').toLowerCase();
  const cat = document.getElementById('category').value;
  const list = (window.catalog || []).filter(it => {
    const okCat = !cat || it.category === cat;
    const okText = !q || it.name.toLowerCase().includes(q);
    return okCat && okText;
  });
  renderCatalog(list);
}

// --- КОРЗИНА -----------------------------------------------------------------
const CART_KEY = 'impuls_cart_v1';
let cart = [];

function loadCart() {
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { cart = []; }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(item) {
  // объединяем по названию
  const idx = cart.findIndex(p => p.name === item.name);
  if (idx >= 0) cart[idx].qty += item.qty || 1;
  else cart.push({ ...item, qty: item.qty || 1 });
  saveCart();

  // открываем корзину
  openDrawer();
}

function removeFromCart(name) {
  cart = cart.filter(p => p.name !== name);
  saveCart();
}

function changeQty(name, delta) {
  const it = cart.find(p => p.name === name);
  if (!it) return;
  it.qty = Math.max(1, it.qty + delta);
  saveCart();
}

function cartTotalText() {
  // из «от 450 ₽ / т» берём число; если нет — «—»
  let sum = 0, hasAny = false;
  cart.forEach(i => {
    const m = (i.price || '').match(/(\d[\d\s]*)/);
    if (m) { hasAny = true; sum += Number(m[1].replace(/\s+/g, '')) * (i.qty || 1); }
  });
  return hasAny ? (sum.toLocaleString('ru-RU') + ' ₽ (ориентировочно)') : '—';
}

function updateCartUI() {
  // счётчик
  const count = cart.reduce((a, b) => a + (b.qty || 1), 0);
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = String(count);

  // список
  const box = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');
  if (!box || !total) return;

  if (!cart.length) {
    box.innerHTML = '<p class="muted">Корзина пуста.</p>';
    total.textContent = '—';
    return;
  }

  box.innerHTML = '';
  cart.forEach(it => {
    const row = document.createElement('div');
    row.className = 'cart-row';

    const title = document.createElement('div');
    title.className = 'cart-title';
    title.innerHTML = `<strong>${it.name}</strong><span class="muted">${it.price}</span>`;

    const controls = document.createElement('div');
    controls.className = 'cart-controls';

    const minus = document.createElement('button');
    minus.className = 'icon-btn';
    minus.textContent = '−';
    minus.onclick = () => changeQty(it.name, -1);

    const qty = document.createElement('span');
    qty.className = 'cart-qty';
    qty.textContent = it.qty;

    const plus = document.createElement('button');
    plus.className = 'icon-btn';
    plus.textContent = '+';
    plus.onclick = () => changeQty(it.name, +1);

    const remove = document.createElement('button');
    remove.className = 'icon-btn';
    remove.textContent = '✕';
    remove.title = 'Удалить';
    remove.onclick = () => removeFromCart(it.name);

    controls.append(minus, qty, plus, remove);
    row.append(title, controls);
    box.append(row);
  });

  total.textContent = cartTotalText();
}

// --- ДРОВЕР/МОДАЛКА ----------------------------------------------------------
const drawer = document.getElementById('cartDrawer');
const orderModal = document.getElementById('orderModal');

function openDrawer(){ drawer?.classList.add('open'); }
function closeDrawer(){ drawer?.classList.remove('open'); }
function openOrder(){ orderModal?.classList.add('open'); }
function closeOrder(){ orderModal?.classList.remove('open'); }

document.getElementById('openCart')?.addEventListener('click', openDrawer);
document.getElementById('closeCart')?.addEventListener('click', closeDrawer);
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  if (!cart.length) return;
  openOrder();
});
document.getElementById('closeOrder')?.addEventListener('click', closeOrder);

// --- ОТПРАВКА ЗАКАЗА ---------------------------------------------------------
function buildOrderText(form) {
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const comment = form.comment.value.trim();

  const lines = [];
  lines.push('Заказ с сайта «Импульс»');
  lines.push('');
  lines.push('Товары:');
  cart.forEach(it => lines.push(`• ${it.name} — ${it.price} × ${it.qty}`));
  lines.push('');
  lines.push('Итого (оценочно): ' + cartTotalText());
  lines.push('');
  lines.push('Клиент: ' + name);
  lines.push('Телефон: ' + phone);
  if (comment) lines.push('Комментарий: ' + comment);

  return lines.join('\n');
}

document.getElementById('orderForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  const subject = encodeURIComponent('Заказ с сайта «Импульс»');
  const body = encodeURIComponent(buildOrderText(form));
  const mail = window.ORDER_EMAIL || 'alex546507@gmail.com';

  // Открываем почтовый клиент
  window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;

  // закрыть модалку и очистить корзину локально
  closeOrder();
  closeDrawer();
  cart = [];
  saveCart();
});

// --- ИНИЦИАЛИЗАЦИЯ -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(window.catalog || []);
  document.getElementById('search')?.addEventListener('input', applyFilters);
  document.getElementById('category')?.addEventListener('change', applyFilters);
  loadCart();
});
