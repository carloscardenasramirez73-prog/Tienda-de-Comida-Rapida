export const CATEGORIES = [
  'Todos',
  'Hamburguesas',
  'Salchipapas',
  'Bebidas',
  'Pizzas',
  'Pollo',
  'Hot dogs',
]

export const DELIVERY_FEE = 5.9

export const PRODUCTS = [
  {
    id: 'brasa-doble',
    name: 'Brasa doble',
    category: 'Hamburguesas',
    price: 24.9,
    badge: 'La favorita',
    art: 'burger',
    desc: 'Doble carne, doble cheddar y nuestra salsa secreta.',
    long: 'Dos carnes de res a la plancha, doble cheddar fundido, cebolla caramelizada, pepinillos y nuestra salsa secreta. Todo entre un pan brioche suave y doradito.',
  },
  {
    id: 'hot-dog-clasico',
    name: 'Hot dog clásico',
    category: 'Hot dogs',
    price: 14.9,
    badge: 'Clásico',
    art: 'hotdog',
    desc: 'Salchicha suave, pan tostado y salsas caseras.',
    long: 'Salchicha jugosa a la plancha en pan suave y tostado, con mostaza, kétchup y nuestras salsas caseras. Simple, clásico y siempre rico.',
  },
  {
    id: 'pizza-pepperoni',
    name: 'Pizza pepperoni',
    category: 'Pizzas',
    price: 22.9,
    badge: 'Sabor intenso',
    homeBadge: 'La favorita',
    art: 'pizza',
    desc: 'Masa casera, queso mozzarella y pepperoni crujiente.',
    homeDesc: 'Mozzarella, pepperoni y masa crujiente.',
    long: 'Masa casera horneada al momento, salsa de tomate, mucha mozzarella y pepperoni que se pone crujiente en los bordes.',
  },
  {
    id: 'salchi-brava',
    name: 'Salchi brava',
    category: 'Salchipapas',
    price: 18.9,
    badge: 'Para compartir',
    art: 'salchi',
    desc: 'Papas doradas, salchicha y salsas de la casa.',
    long: 'Papas doradas y crocantes con salchicha en rodajas, bañadas en nuestras salsas de la casa. Ideales para compartir (o no).',
  },
  {
    id: 'pollo-plancha',
    name: 'Pollo a la plancha',
    category: 'Pollo',
    price: 20.9,
    badge: 'Extra queso',
    art: 'pollo',
    desc: 'Pollo jugoso, papas doradas y ensalada fresca.',
    long: 'Pechuga de pollo jugosa a la plancha con queso derretido, papas doradas y una ensalada fresca para equilibrar.',
  },
  {
    id: 'pizza-pollo-bbq',
    name: 'Pizza pollo BBQ',
    category: 'Pizzas',
    price: 23.9,
    badge: 'Bien servida',
    art: 'pizzabbq',
    desc: 'Pollo desmechado, cebolla, queso y salsa BBQ.',
    long: 'Pollo desmechado, cebolla morada, mozzarella y un chorrito generoso de salsa BBQ sobre nuestra masa casera.',
  },
  {
    id: 'maracuya',
    name: 'Maracuyá de la casa',
    category: 'Bebidas',
    price: 6,
    note: '400 ml',
    badge: 'Hecha en casa',
    art: 'maracuya',
    desc: 'Fruta de verdad, bien fría. Vaso de 400 ml.',
    long: 'Maracuyá preparada con fruta de verdad, bien fría y con el punto justo de dulce. Vaso de 400 ml.',
  },
  {
    id: 'limonada',
    name: 'Limonada fresca',
    category: 'Bebidas',
    price: 6,
    note: '400 ml',
    badge: 'Refrescante',
    art: 'limonada',
    desc: 'Limón recién exprimido. Vaso de 400 ml.',
    long: 'Limón recién exprimido con hielo y hierbabuena. Vaso de 400 ml.',
  },
]

// Producto especial del banner de inicio (no aparece en la carta)
export const COMBO = {
  id: 'combo-semana',
  name: 'Combo de la semana',
  category: 'Combos',
  price: 32.9,
  art: 'burger',
  desc: 'Brasa doble + papas clásicas + maracuyá.',
  long: 'Brasa doble + papas clásicas + maracuyá.',
}

export const getProduct = (id) =>
  id === COMBO.id ? COMBO : PRODUCTS.find((p) => p.id === id)

export const money = (n) => `S/ ${n.toFixed(2)}`
