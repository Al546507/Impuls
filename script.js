const elGrid = document.getElementById('grid')
const elSearch = document.getElementById('search')
const elCategory = document.getElementById('category')

function render(items){
  elGrid.innerHTML = ''
  if(!items.length){ elGrid.innerHTML = '<p class="muted">Ничего не найдено</p>'; return }
  for(const it of items){
    const card = document.createElement('article')
    card.className = 'card'
    const imgUrl = it.image
    card.innerHTML = `
      <img src="${imgUrl}" alt="${it.title}" onerror="this.onerror=null;this.src='https://picsum.photos/seed/fallback/600/400'">
      <h3>${it.title}</h3>
      <p class="muted">${it.category}</p>
      <p>${it.desc}</p>
      <div class="row"><span class="price">${it.price}</span><span class="muted">MOQ: ${it.moq}</span></div>
      <button class="btn" data-sku="${it.id}">Запросить прайс</button>
    `
    elGrid.appendChild(card)
  }
}

// filters
function applyFilters(){
  const q = (elSearch?.value || '').toLowerCase()
  const cat = elCategory?.value || ''
  const filtered = CATALOG.filter(it => {
    const matchQ = !q || it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
    const matchC = !cat || it.category === cat
    return matchQ && matchC
  })
  render(filtered)
}
elSearch?.addEventListener('input', applyFilters)
elCategory?.addEventListener('change', applyFilters)

// contact prefill
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-sku]')
  if(!btn) return
  const sku = btn.getAttribute('data-sku')
  const item = CATALOG.find(x=>x.id===sku)
  const subj = document.getElementById('subject')
  const msg = document.getElementById('message')
  if(subj) subj.value = `Запрос прайса: ${item.id} — ${item.title}`
  if(msg) msg.value = `Здравствуйте! Интересует позиция ${item.id} — ${item.title} (${item.category}).\nКоличество: [укажите]\nДоставка: [город]`
  document.getElementById('contacts').scrollIntoView({behavior:'smooth'})
})

render(CATALOG)
