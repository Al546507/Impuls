function renderCatalog(items){
  const grid=document.getElementById('grid');
  grid.innerHTML='';
  items.forEach(p=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="muted">${p.category}</p>
      <p><strong>${p.price}</strong></p>`;
    grid.appendChild(card);
  });
}
function applyFilters(){
  const q=document.getElementById('search').value.toLowerCase();
  const cat=document.getElementById('category').value;
  let f=catalog.filter(p=>(!cat||p.category===cat)&&(p.name.toLowerCase().includes(q)));
  renderCatalog(f);
}
document.addEventListener('DOMContentLoaded',()=>{
  renderCatalog(catalog);
  document.getElementById('search').addEventListener('input',applyFilters);
  document.getElementById('category').addEventListener('change',applyFilters);
});
