// ===== helpers =====
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const money = n => (n).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' ₽';

const save = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
const load = (k,d)=>{ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } };

let CART = load('cart', []); // [{id, title, priceFrom, unit, image, qty}]

// ===== catalog render =====
function renderCatalog(list){
  const grid = $('#catalogGrid');
  grid.innerHTML = '';
  list.forEach(it=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__media">
        <img src="./images/${it.image || ''}" alt="${it.title}"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{textContent:'фото будет позже',className:'badge'}))">
      </div>
      <div class="card__title">${it.title}</div>
      <div class="card__cat">${it.category}</div>
      <div class="card__price">от ${money(it.priceFrom)} <span class="unit">${it.unit}</span></div>
      <div class="card__footer">
        <span class="badge">В наличии</span>
        <button class="btn" data-buy="${it.id}">Купить</button>
      </div>`;
    grid.appendChild(card);
  });
}

// фильтры
function bindFilters(){
  const catSel = $('#category');
  window.CATEGORIES.forEach(c=>{
    const o = document.createElement('option');
    o.value = c; o.textContent = c; catSel.appendChild(o);
  });

  function apply(){
    const q = ($('#search').value || '').toLowerCase().trim();
    const cat = catSel.value;
    const list = window.CATALOG.filter(it=>{
      const okCat = !cat || it.category === cat;
      const okQ = !q || (it.title.toLowerCase().includes(q));
      return okCat && okQ;
    });
    renderCatalog(list);
  }

  $('#search').addEventListener('input', apply);
  catSel.addEventListener('change', apply);
  apply();
}

// ===== quick order modal =====
let QUICK_PRODUCT = null;

function openModal(id){ const m=$(id); m.setAttribute('aria-hidden','false'); }
function closeModal(el){
  const m = el.closest('.modal'); m?.setAttribute('aria-hidden','true');
}

function openQuickOrder(productId){
  const it = window.CATALOG.find(x=>x.id===productId);
  if(!it) return;
  QUICK_PRODUCT = it;
  $('#qoTitle').value = it.title;
  $('#qoQty').value = 1;
  openModal('#quickOrderModal');
}
function addToCart(it, qty=1){
  const n = Number(qty) || 1;
  const idx = CART.findIndex(x=>x.id===it.id);
  if(idx>-1){ CART[idx].qty += n; }
  else { CART.push({ id: it.id, title: it.title, priceFrom: it.priceFrom, unit: it.unit, image: it.image, qty: n }); }
  save('cart', CART);
  renderCart();
  updateCount();
}
function updateCount(){
  const cnt = CART.reduce((s,i)=>s+i.qty,0);
  $('#cart-count').textContent = cnt;
}

$('#quickOrderForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  addToCart(QUICK_PRODUCT, $('#qoQty').value);
  closeModal(e.target);
  openModal('#cartModal');
});

// делегирование «Купить»
document.addEventListener('click', e=>{
  const buy = e.target.closest('[data-buy]');
  if(buy){ openQuickOrder(buy.getAttribute('data-buy')); }

  if(e.target.matches('[data-close]')){ closeModal(e.target); }

  if(e.target.matches('.qty-btn[data-op]')){
    const id = e.target.dataset.id;
    const op = e.target.dataset.op;
    const i = CART.findIndex(x=>x.id===id);
    if(i>-1){
      CART[i].qty += (op==='plus'?1:-1);
      if(CART[i].qty<=0) CART.splice(i,1);
      save('cart', CART); renderCart(); updateCount();
    }
  }
  if(e.target.matches('.remove-btn')){
    const id = e.target.dataset.id;
    CART = CART.filter(x=>x.id!==id);
    save('cart', CART); renderCart(); updateCount();
  }
});

$('#openCartBtn')?.addEventListener('click', ()=>{
  openModal('#cartModal');
});

// ===== cart render =====
function renderCart(){
  const list = $('#cartList');
  if(!list) return;
  if(CART.length===0){
    list.innerHTML = `<div class="muted">Корзина пуста</div>`;
    $('#cartTotal').textContent = money(0);
    return;
  }
  list.innerHTML = '';
  CART.forEach(it=>{
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="./images/${it.image || ''}" alt="${it.title}"
           onerror="this.src='./images/placeholder.jpg'">
      <div>
        <div class="card__title">${it.title}</div>
        <div class="card__cat">от ${money(it.priceFrom)} <span class="unit">${it.unit}</span></div>
      </div>
      <div class="cart-qty">
        <button class="qty-btn" data-op="minus" data-id="${it.id}">−</button>
        <div>${it.qty}</div>
        <button class="qty-btn" data-op="plus" data-id="${it.id}">+</button>
        <button class="remove-btn" title="Удалить" data-id="${it.id}">✕</button>
      </div>`;
    list.appendChild(row);
  });
  const total = CART.reduce((s,i)=>s + i.priceFrom*i.qty, 0);
  $('#cartTotal').textContent = money(total);
}

updateCount();
renderCart();
bindFilters();

// ===== checkout (отправка на email через серверлес) =====
$('#checkoutForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(CART.length===0){ alert('Корзина пуста'); return; }

  const form = new FormData(e.target);
  const customer = Object.fromEntries(form.entries());

  const payload = {
    customer,
    cart: CART,
    total: CART.reduce((s,i)=>s + i.priceFrom*i.qty, 0),
    site: location.origin
  };

  try{
    const res = await fetch('/api/order', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(!res.ok) throw new Error('Не удалось отправить заказ');
    const data = await res.json();
    alert('Заказ отправлен! Мы свяжемся с вами.');
    CART = []; save('cart', CART); renderCart(); updateCount();
    closeModal(e.target);
  }catch(err){
    console.error(err);
    alert('Ошибка отправки. Попробуйте позже или свяжитесь по телефону.');
  }
});
