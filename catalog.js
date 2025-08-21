// catalog.js — готовый каталог с картинками (встроенные SVG, ничего не качаем)

const ICON = {
  brick: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <g transform="translate(50,90)" fill="#c2410c" stroke="#7c2d12" stroke-width="3">
        <rect x="0" y="0" width="90" height="50" rx="4"/>
        <rect x="100" y="0" width="90" height="50" rx="4"/>
        <rect x="200" y="0" width="90" height="50" rx="4"/>
        <rect x="50" y="60" width="90" height="50" rx="4"/>
        <rect x="150" y="60" width="90" height="50" rx="4"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Кирпич / блок</text>
    </svg>`),

  concrete: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#eef2ff"/>
      <g transform="translate(60,80)">
        <rect x="0" y="60" width="260" height="80" fill="#9ca3af" stroke="#4b5563" stroke-width="3" rx="6"/>
        <rect x="20" y="20" width="220" height="60" fill="#d1d5db" stroke="#6b7280" stroke-width="3" rx="6"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">ЖБИ / бетон</text>
    </svg>`),

  cement: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#fdf2f8"/>
      <g transform="translate(110,70)" stroke="#374151" stroke-width="3">
        <polygon points="0,0 140,0 120,140 0,140" fill="#e5e7eb"/>
        <line x1="10" y1="30" x2="110" y2="30"/>
        <line x1="8" y1="60" x2="108" y2="60"/>
        <line x1="6" y1="90" x2="106" y2="90"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Цемент</text>
    </svg>`),

  sand: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#fffbeb"/>
      <path d="M20 260 Q140 120 220 200 T380 230 L380 280 L20 280 Z" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Песок</text>
    </svg>`),

  gravel: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <g fill="#6b7280" stroke="#374151" stroke-width="2" transform="translate(60,120)">
        <circle cx="10" cy="30" r="12"/><circle cx="40" cy="20" r="10"/><circle cx="70" cy="35" r="14"/>
        <circle cx="100" cy="25" r="11"/><circle cx="130" cy="32" r="13"/><circle cx="160" cy="22" r="10"/>
        <circle cx="190" cy="33" r="12"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Щебень</text>
    </svg>`),

  roof: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#eff6ff"/>
      <g transform="translate(40,80)" fill="#1f2937" stroke="#0ea5e9" stroke-width="3">
        <path d="M0 80 L160 0 L320 80 Z" fill="#111827"/>
        <rect x="20" y="80" width="280" height="80" fill="#1f2937"/>
        <g fill="none">
          <line x1="40" y1="90" x2="40" y2="155"/>
          <line x1="80" y1="90" x2="80" y2="160"/>
          <line x1="120" y1="90" x2="120" y2="155"/>
          <line x1="160" y1="90" x2="160" y2="160"/>
          <line x1="200" y1="90" x2="200" y2="155"/>
          <line x1="240" y1="90" x2="240" y2="160"/>
          <line x1="280" y1="90" x2="280" y2="155"/>
        </g>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Профнастил / кровля</text>
    </svg>`),

  wool: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#ecfeff"/>
      <g transform="translate(60,90)" fill="#fde68a" stroke="#92400e" stroke-width="3">
        <rect x="0" y="0" width="260" height="60" rx="8"/>
        <rect x="0" y="70" width="260" height="60" rx="8"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Минвата</text>
    </svg>`),

  drywall: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#f5f3ff"/>
      <g transform="translate(90,70)" stroke="#6b7280" stroke-width="3">
        <rect x="0" y="0" width="200" height="140" fill="#e5e7eb" rx="4"/>
        <rect x="10" y="10" width="200" height="140" fill="#d1d5db" rx="4"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Гипсокартон</text>
    </svg>`),

  wood: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#fff7ed"/>
      <g transform="translate(40,110)" stroke="#92400e" stroke-width="3">
        <rect x="0" y="0" width="300" height="30" fill="#f59e0b" rx="4"/>
        <rect x="0" y="40" width="300" height="30" fill="#f59e0b" rx="4"/>
        <rect x="0" y="80" width="300" height="30" fill="#f59e0b" rx="4"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Пиломатериалы</text>
    </svg>`),

  paint: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#f0fdf4"/>
      <g transform="translate(120,70)" stroke="#111827" stroke-width="3">
        <rect x="0" y="50" width="140" height="110" rx="10" fill="#e5e7eb"/>
        <rect x="30" y="20" width="80" height="40" fill="#f43f5e"/>
        <rect x="50" y="20" width="40" height="20" fill="#111827"/>
      </g>
      <text x="20" y="30" fill="#111827" font-family="system-ui,Arial" font-size="18">Краска</text>
    </svg>`),
};

// Каталог
const catalog = [
  { name: "Кирпич керамический М150", category: "Кирпич и блоки",      price: "от 18 ₽ / шт",     image: ICON.brick },
  { name: "Газоблок D500 600×250×200", category: "Кирпич и блоки",      price: "от 145 ₽ / шт",    image: ICON.brick },
  { name: "Цемент М500 (50 кг)",       category: "Сыпучие материалы",   price: "от 410 ₽ / мешок", image: ICON.cement },
  { name: "Песок карьерный",           category: "Сыпучие материалы",   price: "от 450 ₽ / т",     image: ICON.sand },
  { name: "Щебень 5–20",               category: "Сыпучие материалы",   price: "от 1 200 ₽ / т",   image: ICON.gravel },
  { name: "Плита ПК 1.2×6.0",          category: "ЖБИ и плиты",         price: "от 12 900 ₽ / шт", image: ICON.concrete },
  { name: "ФБС 24-4-6",                category: "ЖБИ и плиты",         price: "от 3 350 ₽ / шт",  image: ICON.concrete },
  { name: "Профнастил НС-35",          category: "Кровля",              price: "от 520 ₽ / м²",     image: ICON.roof },
  { name: "Минвата 50 мм",             category: "Утеплитель",          price: "от 410 ₽ / м²",     image: ICON.wool },
  { name: "Гипсокартон 12.5 мм",       category: "Листовые материалы",  price: "от 520 ₽ / лист",   image: ICON.drywall },
  { name: "Доска обрезная 25×100×6",   category: "Дерево и пиломатериалы", price: "от 14 500 ₽ / м³", image: ICON.wood },
  { name: "Краска фасадная 10 л",      category: "Отделочные материалы",  price: "от 1 950 ₽ / ведро", image: ICON.paint },
];
