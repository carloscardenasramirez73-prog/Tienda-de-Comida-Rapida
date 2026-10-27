/*
 * Ilustraciones SVG de cada plato.
 * Si pones una foto en src/assets/products/<id>.jpg|png|webp
 * (por ejemplo brasa-doble.jpg) se usará en lugar de la ilustración.
 */
const photos = import.meta.glob('../../assets/products/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const photoFor = (id) =>
  Object.entries(photos).find(([path]) =>
    path.split('/').pop().replace(/\.\w+$/, '') === id,
  )?.[1]

const Defs = () => (
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#f1e1cc" />
      <stop offset="1" stopColor="#e6cfb2" />
    </linearGradient>
    <linearGradient id="table" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#dcbb94" />
      <stop offset="1" stopColor="#c99f73" />
    </linearGradient>
    <linearGradient id="bun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#e39a38" />
      <stop offset="1" stopColor="#b9631b" />
    </linearGradient>
    <linearGradient id="juice" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffd04a" />
      <stop offset="1" stopColor="#f39a17" />
    </linearGradient>
    <linearGradient id="lemonade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#f6f8d0" />
      <stop offset="1" stopColor="#e6ec9a" />
    </linearGradient>
    <radialGradient id="dark" cx="0.7" cy="0.4" r="0.9">
      <stop offset="0" stopColor="#5b3220" />
      <stop offset="1" stopColor="#22100b" />
    </radialGradient>
  </defs>
)

const Backdrop = () => (
  <>
    <rect width="400" height="300" fill="url(#wall)" />
    <rect y="205" width="400" height="95" fill="url(#table)" />
  </>
)

const Shadow = ({ cx = 200, cy = 262, rx = 120 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.1} fill="rgba(70,35,10,.25)" />
)

/* ---------- Hamburguesa ---------- */
function Burger() {
  return (
    <g>
      <rect x="70" y="190" width="260" height="76" rx="6" fill="#f4ecdd" transform="rotate(-3 200 228)" />
      <Shadow cy={262} rx={124} />
      <rect x="196" y="34" width="8" height="82" rx="4" fill="#ecd5a2" />
      {/* pan superior */}
      <path d="M86 142C86 90 134 62 200 62s114 28 114 80z" fill="url(#bun)" />
      <path d="M118 104c18-18 48-26 82-26" stroke="#f6c07a" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".55" />
      {[
        [150, 92, -20], [186, 80, 10], [222, 86, 30], [256, 100, 50],
        [130, 116, -35], [170, 108, 0], [210, 108, 20], [246, 120, 40], [284, 124, 60],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#fbe7bd" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      {/* cebolla */}
      <rect x="88" y="140" width="224" height="13" rx="6.5" fill="#6a3f1c" />
      {/* queso */}
      <path d="M84 150h232l-6 12-20-8-18 16-24-12-26 14-26-12-22 14-22-10-26 12-14-8z" fill="#f8bb2a" />
      {/* carne 1 */}
      <rect x="80" y="160" width="240" height="28" rx="14" fill="#4a2217" />
      <path d="M100 168h60" stroke="#6b3524" strokeWidth="5" strokeLinecap="round" />
      {/* pepinillos */}
      {[[126, 192], [200, 195], [274, 192]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="32" ry="7" fill="#7f9a2c" />
      ))}
      {/* carne 2 */}
      <rect x="84" y="192" width="232" height="26" rx="13" fill="#3f1c13" />
      <path d="M84 206h232l-8 10-22-8-20 12-24-10-26 12-24-10-24 12-20-8-28 10z" fill="#f8bb2a" opacity="0" />
      {/* pan inferior */}
      <path d="M90 220h220c0 22-18 34-42 34H132c-24 0-42-12-42-34z" fill="#c27a2a" />
    </g>
  )
}

/* ---------- Hot dog ---------- */
function Hotdog() {
  return (
    <g>
      <ellipse cx="200" cy="205" rx="160" ry="56" fill="#f6f1e8" stroke="#e2d6c3" strokeWidth="2" />
      <Shadow cy={262} rx={140} />
      <rect x="70" y="148" width="260" height="64" rx="32" fill="#d8a052" />
      <rect x="70" y="148" width="260" height="22" rx="11" fill="#e8b66a" opacity=".6" />
      <rect x="58" y="128" width="284" height="42" rx="21" fill="#b5432a" />
      <rect x="74" y="134" width="240" height="8" rx="4" fill="#d3664a" opacity=".7" />
      <path d="M78 140l16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14" stroke="#f3c22c" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 150l16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12" stroke="#cf3c26" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="70" y="180" width="260" height="32" rx="16" fill="#c98b3d" />
    </g>
  )
}

/* ---------- Pizzas ---------- */
const PEPPERONI = [
  [200, 150], [160, 120], [240, 118], [150, 175], [250, 178],
  [200, 100], [200, 200], [172, 150], [230, 148],
]
function Pizza() {
  return (
    <g>
      <rect x="318" y="140" width="70" height="22" rx="8" fill="#6f4426" />
      <circle cx="200" cy="150" r="122" fill="#8a5a32" />
      <circle cx="200" cy="150" r="122" fill="none" stroke="#6f4426" strokeWidth="4" />
      <circle cx="200" cy="150" r="106" fill="#dfa458" />
      <circle cx="200" cy="150" r="93" fill="#c8452a" />
      <path d="M200 58c30 0 56 12 74 34 14 18 20 44 12 70-8 26-30 48-58 55-30 8-62-4-80-26-20-24-24-58-8-84 14-26 34-42 60-49z" fill="#f4d27c" />
      {PEPPERONI.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="15" fill="#a3281b" />
          <circle cx={x - 4} cy={y - 4} r="5" fill="#c4452f" />
        </g>
      ))}
      {[[135, 140], [262, 150], [188, 76], [222, 224], [165, 208]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="9" ry="5" fill="#4f8a35" transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
    </g>
  )
}
function PizzaBBQ() {
  return (
    <g>
      <Shadow cy={268} rx={150} />
      <circle cx="200" cy="150" r="124" fill="#f7f1e8" stroke="#e2d6c3" strokeWidth="2" />
      <circle cx="200" cy="150" r="106" fill="#d99c4c" />
      <circle cx="200" cy="150" r="93" fill="#7a3a1c" />
      <circle cx="200" cy="150" r="90" fill="#f0cf80" />
      {[[160, 110], [210, 96], [250, 130], [140, 160], [190, 150], [240, 180], [170, 205], [215, 220], [120, 125]].map(([x, y], i) => (
        <rect key={i} x={x - 17} y={y - 10} width="34" height="20" rx="9" fill="#f7e4b8" transform={`rotate(${i * 25} ${x} ${y})`} />
      ))}
      {[[180, 130], [230, 160], [150, 185], [205, 190], [260, 115]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="16" ry="9" fill="none" stroke="#a8478f" strokeWidth="3" transform={`rotate(${i * 35} ${x} ${y})`} />
      ))}
      <path d="M118 140q22-24 46-4t46-4 46 4 32-8M120 176q22-20 46 0t46-4 46 4 28-10M140 108q22-14 44 0t44-2 40 8" stroke="#5a2712" strokeWidth="6" fill="none" strokeLinecap="round" />
      {[[150, 150], [210, 120], [240, 200], [180, 220], [270, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#4f8a35" />
      ))}
    </g>
  )
}

/* ---------- Salchipapa ---------- */
const FRIES = [
  [110, 160, 20], [140, 150, -30], [170, 140, 10], [200, 135, 40], [230, 142, -20],
  [260, 150, 25], [290, 162, -15], [125, 180, -10], [160, 172, 35], [195, 165, -40],
  [230, 170, 15], [265, 178, -25], [145, 195, 20], [185, 190, -15], [225, 195, 30],
  [180, 120, -10], [215, 118, 25], [150, 128, 50], [250, 128, -50],
]
function Salchi() {
  return (
    <g>
      <Shadow cy={262} rx={150} />
      <ellipse cx="200" cy="190" rx="156" ry="66" fill="#f8f2e9" stroke="#e2d6c3" strokeWidth="2" />
      <ellipse cx="200" cy="178" rx="138" ry="50" fill="#eadfce" />
      {FRIES.map(([x, y, r], i) => (
        <rect key={i} x={x - 30} y={y - 5} width="60" height="10" rx="4" fill={i % 3 ? '#f2b94a' : '#e5a634'} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      {[[130, 165], [170, 150], [215, 160], [255, 150], [150, 190], [200, 188], [245, 185], [185, 128]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="18" ry="13" fill="#8f3524" />
          <ellipse cx={x} cy={y} rx="13" ry="8" fill="#bd5a3a" />
        </g>
      ))}
      <path d="M100 160q25-22 50 0t50 0 50 0 50 0" stroke="#f6c93a" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M110 178q25-18 50 0t50 0 50 0 40 0" stroke="#d63a2a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M125 142q25-14 50 0t50 0 40 0" stroke="#fbf0d8" strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  )
}

/* ---------- Pollo a la plancha ---------- */
function Pollo() {
  return (
    <g>
      <Shadow cy={266} rx={160} />
      <ellipse cx="200" cy="172" rx="168" ry="88" fill="#f9f5ee" stroke="#e2d6c3" strokeWidth="2" />
      <ellipse cx="200" cy="172" rx="130" ry="64" fill="#f1eadd" />
      <path d="M150 118c30-18 78-14 98 12 16 20 4 52-28 64-34 12-80 2-90-28-6-18 2-36 20-48z" fill="#c9792d" />
      <path d="M170 130l56 40M156 150l56 40M190 120l56 40" stroke="#7a3f14" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      <path d="M160 140c20-14 50-16 70 0 14 12 2 28-20 30-30 2-56-10-50-30z" fill="#f4c443" opacity=".85" />
      {[[270, 150, 20], [290, 170, -25], [262, 185, 35], [285, 195, -10], [250, 165, 50], [300, 150, 40], [275, 215, 25]].map(([x, y, r], i) => (
        <rect key={i} x={x - 28} y={y - 5} width="56" height="10" rx="4" fill="#f0b43f" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      {[[105, 165], [130, 190], [95, 195], [125, 150], [150, 205], [110, 215]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="20" ry="11" fill={i % 2 ? '#6fa043' : '#85b84f'} transform={`rotate(${i * 45} ${x} ${y})`} />
      ))}
      {[[118, 178], [140, 200], [102, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill="#d1432e" />
      ))}
    </g>
  )
}

/* ---------- Bebidas ---------- */
const Straw = () => (
  <g>
    <path d="M214 30 232 90" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
    <path d="M216 38 220 50M222 58 226 70" stroke="#e24a35" strokeWidth="8" strokeLinecap="round" />
  </g>
)
function Maracuya() {
  return (
    <g>
      <Shadow cy={258} rx={96} />
      {/* maracuyá */}
      <circle cx="298" cy="238" r="30" fill="#e8962a" />
      <circle cx="298" cy="238" r="23" fill="#f6dc7a" />
      <circle cx="298" cy="238" r="15" fill="#e9b93a" />
      {[[292, 232], [300, 236], [296, 244], [304, 230], [290, 242]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#3a2a14" />
      ))}
      <Straw />
      <path d="M144 74h112l-10 176c0 6-5 10-11 10h-70c-6 0-11-4-11-10z" fill="rgba(255,255,255,.55)" stroke="#fff" strokeWidth="2" />
      <path d="M150 104h100l-8 146c0 5-4 8-9 8h-66c-5 0-9-3-9-8z" fill="url(#juice)" />
      <rect x="138" y="62" width="124" height="16" rx="8" fill="#fff" opacity=".9" />
      {[[180, 150], [215, 175], [190, 205], [225, 130], [175, 235], [220, 225], [200, 120]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#4a2a10" opacity=".75" />
      ))}
      <path d="M158 110v120" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".45" />
    </g>
  )
}
function Limonada() {
  return (
    <g>
      <Shadow cy={258} rx={96} />
      {[[300, 238, 26], [270, 246, 18]].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#e6d23a" />
          <circle cx={x} cy={y} r={r - 4} fill="#f6ec8a" />
          <path d={`M${x} ${y - r + 4}V${y + r - 4}M${x - r + 4} ${y}H${x + r - 4}`} stroke="#fbf6c0" strokeWidth="2" />
        </g>
      ))}
      <Straw />
      <path d="M144 74h112l-10 176c0 6-5 10-11 10h-70c-6 0-11-4-11-10z" fill="rgba(255,255,255,.55)" stroke="#fff" strokeWidth="2" />
      <path d="M149 96h102l-7 154c0 5-4 8-9 8h-70c-5 0-9-3-9-8z" fill="url(#lemonade)" />
      {[[178, 130, 18], [214, 150, -12], [190, 190, 8], [222, 215, 20], [176, 235, -15]].map(([x, y, r], i) => (
        <rect key={i} x={x - 18} y={y - 18} width="36" height="36" rx="8" fill="rgba(255,255,255,.55)" stroke="#fff" strokeWidth="1.5" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <circle cx="250" cy="82" r="24" fill="#e6d23a" />
      <circle cx="250" cy="82" r="19" fill="#f6ec8a" />
      <path d="M250 63V101M231 82H269" stroke="#fbf6c0" strokeWidth="2" />
      <ellipse cx="160" cy="72" rx="12" ry="6" fill="#5c9b3c" transform="rotate(-25 160 72)" />
      <ellipse cx="176" cy="66" rx="12" ry="6" fill="#6fb04a" transform="rotate(20 176 66)" />
    </g>
  )
}

/* ---------- Escena oscura del banner ---------- */
function Hero() {
  return (
    <g>
      <rect width="600" height="360" fill="url(#dark)" />
      <rect y="262" width="600" height="98" fill="#35190f" />
      <rect y="262" width="600" height="3" fill="#6b3a24" opacity=".6" />
      {/* vaso */}
      <path d="M440 120h80l-9 150h-62z" fill="#d89a2a" opacity=".85" />
      <rect x="435" y="112" width="90" height="12" rx="6" fill="#f3e9d8" opacity=".85" />
      <path d="M502 62 492 112" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      {/* papas */}
      <g transform="translate(20 0)">
      <path d="M70 200h160l-18 100H88z" fill="#f4ead6" />
      <path d="M70 200h160l-4 22H74z" fill="#d6422b" />
      {[[90, 120, -12], [110, 100, -4], [132, 110, 6], [154, 95, 12], [176, 108, 4], [198, 122, 14], [120, 130, -8], [166, 126, 8], [145, 140, 0], [100, 150, -14], [190, 150, 16]].map(([x, y, r], i) => (
        <rect key={i} x={x - 6} y={y} width="12" height={90 + (i % 3) * 8} rx="3" fill={i % 2 ? '#f2b94a' : '#e3a334'} transform={`rotate(${r} ${x} ${y + 40})`} />
      ))}
      </g>
      {/* hamburguesa */}
      <g transform="translate(150 28) scale(1.02)">
        <ellipse cx="200" cy="262" rx="135" ry="14" fill="rgba(0,0,0,.4)" />
        <rect x="70" y="236" width="260" height="30" rx="8" fill="#cfc3b0" />
        <rect x="196" y="34" width="8" height="82" rx="4" fill="#ecd5a2" />
        <path d="M86 142C86 90 134 62 200 62s114 28 114 80z" fill="url(#bun)" />
        <path d="M118 104c18-18 48-26 82-26" stroke="#f6c07a" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".5" />
        {[[150, 92, -20], [186, 80, 10], [222, 86, 30], [256, 100, 50], [170, 108, 0], [210, 108, 20]].map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#fbe7bd" transform={`rotate(${r} ${x} ${y})`} />
        ))}
        <rect x="88" y="140" width="224" height="13" rx="6.5" fill="#6a3f1c" />
        <path d="M84 150h232l-6 12-20-8-18 16-24-12-26 14-26-12-22 14-22-10-26 12-14-8z" fill="#f8bb2a" />
        <rect x="80" y="160" width="240" height="28" rx="14" fill="#4a2217" />
        {[[126, 192], [200, 195], [274, 192]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="32" ry="7" fill="#7f9a2c" />
        ))}
        <rect x="84" y="192" width="232" height="26" rx="13" fill="#3f1c13" />
        <path d="M90 220h220c0 22-18 34-42 34H132c-24 0-42-12-42-34z" fill="#c27a2a" />
      </g>
    </g>
  )
}

const ARTS = {
  burger: Burger,
  hotdog: Hotdog,
  pizza: Pizza,
  pizzabbq: PizzaBBQ,
  salchi: Salchi,
  pollo: Pollo,
  maracuya: Maracuya,
  limonada: Limonada,
}

export default function FoodArt({ product, kind, className = '', alt = '' }) {
  if (kind === 'hero') {
    const heroPhoto = photoFor('hero')
    if (heroPhoto) return <img className={className} src={heroPhoto} alt={alt} />
    return (
      <svg className={className} viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
        <Defs />
        <Hero />
      </svg>
    )
  }
  const photo = product && photoFor(product.id)
  if (photo) return <img className={className} src={photo} alt={alt || product.name} />
  const Art = ARTS[product?.art ?? kind] ?? Burger
  return (
    <svg className={className} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt || product?.name}>
      <Defs />
      <Backdrop />
      <Art />
    </svg>
  )
}
