export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  data_ai_hint?: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Astro-Gazer 9000',
    description: 'The latest in personal telescopes. Bring the wonders of the cosmos to your backyard with unparalleled clarity. Features a computerized GoTo mount for easy tracking of celestial objects.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop',
    category: 'Electronics',
    data_ai_hint: 'telescope space',
  },
  {
    id: '2',
    name: 'Quantum Sneakers',
    description: 'Walk on air with these revolutionary sneakers. Featuring self-lacing technology and kinetic energy harvesting soles, they are the future of footwear.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop',
    category: 'Footwear',
    data_ai_hint: 'futuristic shoes',
  },
  {
    id: '3',
    name: 'Hydro-Synth Plant Pot',
    description: 'A smart plant pot that plays serene music based on your plant\'s hydration levels. Never forget to water your green friends again. Connects via Bluetooth to our companion app.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1487035242944-78f234964654?q=80&w=1964&auto=format&fit=crop',
    category: 'Home Goods',
    data_ai_hint: 'smart planter',
  },
  {
    id: '4',
    name: 'Chronos Coffee Machine',
    description: 'The perfect cup of coffee, every time. The Chronos uses atomic clock precision to time its brewing cycle, resulting in a consistently flawless beverage. Your mornings will never be the same.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1611090956424-ec4a57161b9e?q=80&w=1964&auto=format&fit=crop',
    category: 'Appliances',
    data_ai_hint: 'coffee machine',
  },
  {
    id: '5',
    name: 'Nova-Glow Lamp',
    description: 'A smart lamp that simulates natural light cycles, from sunrise to sunset. Helps regulate your circadian rhythm for better sleep and more energetic days. Customizable colors and brightness.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1964&auto=format&fit=crop',
    category: 'Home Goods',
    data_ai_hint: 'desk lamp',
  },
  {
    id: '6',
    name: 'Aero-Drone Pro',
    description: 'Capture stunning aerial footage with this professional-grade drone. 4K camera, 3-axis gimbal, and 30 minutes of flight time. Intelligent flight modes make cinematic shots easy.',
    price: 799.00,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1965&auto=format&fit=crop',
    category: 'Electronics',
    data_ai_hint: 'camera drone',
  },
  {
    id: '7',
    name: 'Stealth-Tech Backpack',
    description: 'The ultimate backpack for the modern commuter. Water-resistant, anti-theft design with hidden zippers and pockets. Integrated USB charging port to keep your devices powered up.',
    price: 159.50,
    image: 'https://images.unsplash.com/photo-1577733966930-d98d7b73a334?q=80&w=1965&auto=format&fit=crop',
    category: 'Accessories',
    data_ai_hint: 'modern backpack',
  },
  {
    id: '8',
    name: 'Cyber-Shell Jacket',
    description: 'A sleek, water-resistant jacket with smart-fabric technology. Adapts to temperature changes and has built-in connectivity pockets for your devices.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16e2d8?q=80&w=1964&auto=format&fit=crop',
    category: 'Apparel',
    data_ai_hint: 'tech jacket',
  },
  {
    id: '9',
    name: 'Chrono-Weave Tee',
    description: 'A stylish t-shirt made from responsive fabric that subtly changes hue with ambient temperature.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1980&auto=format&fit=crop',
    category: 'Apparel',
    data_ai_hint: 'white t-shirt',
  },
  {
    id: '10',
    name: 'Gravity-Defy Jeans',
    description: 'Experience unparalleled comfort with these ultra-lightweight denim jeans, designed for the modern mover.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1602293589914-9e1952a8a349?q=80&w=1964&auto=format&fit=crop',
    category: 'Apparel',
    data_ai_hint: 'denim jeans',
  },
  {
    id: '11',
    name: 'Solaris Sun Hat',
    description: 'A fashionable wide-brimmed hat with UPF 50+ protection, perfect for sunny days and outdoor adventures.',
    price: 45.0,
    image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=2070&auto=format&fit=crop',
    category: 'Apparel',
    data_ai_hint: 'straw hat',
  },
  {
    id: '12',
    name: 'Aura Silk Scarf',
    description: 'A luxurious silk scarf with a timeless pattern, adding a touch of elegance to any outfit.',
    price: 75.0,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1935&auto=format&fit=crop',
    category: 'Apparel',
    data_ai_hint: 'elegant scarf',
  },
  {
    id: '13',
    name: 'Terra-Grip Hiking Boots',
    description: 'Conquer any trail with these durable, waterproof hiking boots featuring advanced grip technology.',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1520639888713-7851c4a0360a?q=80&w=1974&auto=format&fit=crop',
    category: 'Footwear',
    data_ai_hint: 'hiking boots',
  },
  {
    id: '14',
    name: 'Velocity Runners',
    description: 'Feel the speed with these lightweight running shoes, engineered for performance and comfort.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2070&auto=format&fit=crop',
    category: 'Footwear',
    data_ai_hint: 'running shoes',
  },
  {
    id: '15',
    name: 'Urban Glider Loafers',
    description: 'The perfect blend of style and comfort, these leather loafers are ideal for city life and casual outings.',
    price: 149.0,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop',
    category: 'Footwear',
    data_ai_hint: 'leather loafers',
  },
  {
    id: '16',
    name: 'Zenith Comfort Sandals',
    description: 'Embrace warm weather with these minimalist sandals, designed for breathability and all-day comfort.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1603487742131-4160a9991c84?q=80&w=1974&auto=format&fit=crop',
    category: 'Footwear',
    data_ai_hint: 'comfortable sandals',
  },
  {
    id: '17',
    name: 'Omni-Watch Series 8',
    description: 'A sleek and powerful smartwatch that tracks your fitness, manages notifications, and looks great on your wrist.',
    price: 429.0,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    category: 'Accessories',
    data_ai_hint: 'smart watch',
  },
  {
    id: '18',
    name: 'Kinetic Leather Wallet',
    description: 'A classic bifold wallet crafted from premium leather, with RFID-blocking technology to keep your cards secure.',
    price: 85.0,
    image: 'https://images.unsplash.com/photo-1619118399943-611b193d56a7?q=80&w=1974&auto=format&fit=crop',
    category: 'Accessories',
    data_ai_hint: 'leather wallet',
  },
  {
    id: '19',
    name: 'Echo-Shades Sunglasses',
    description: 'Protect your eyes in style with these classic aviator sunglasses featuring polarized lenses.',
    price: 155.0,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop',
    category: 'Accessories',
    data_ai_hint: 'stylish sunglasses',
  },
  {
    id: '20',
    name: 'Geo-Metric Leather Belt',
    description: 'Complete your look with this versatile leather belt, featuring a modern and durable buckle.',
    price: 55.0,
    image: 'https://images.unsplash.com/photo-1623908382137-89741fa2c275?q=80&w=1974&auto=format&fit=crop',
    category: 'Accessories',
    data_ai_hint: 'leather belt',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
