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
    category: 'Apparel',
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
    name: 'Echo-Scribe Smartpen',
    description: 'Digitize your handwritten notes in real-time. The Echo-Scribe captures your every stroke and syncs it to the cloud. It can also record audio linked to your notes.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop',
    category: 'Office',
    data_ai_hint: 'smart pen',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
