
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  data_ai_hint?: string;
}

const allProducts: Product[] = [
    // Apparel
    { id: 'ap1', name: 'Gravity-Defy Hoodie', price: 189.99, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 25, description: 'A sleek, modern hoodie made from advanced smart-fabric.', data_ai_hint: 'stylish hoodie' },
    { id: 'ap2', name: 'Cyber-Knit Beanie', price: 49.99, image: 'https://images.unsplash.com/photo-1575428652377-a3d80e281e6e?q=80&w=1964&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 40, description: 'A stylish beanie with integrated tech fibers.', data_ai_hint: 'tech beanie' },
    { id: 'ap3', name: 'Aero-Mesh T-Shirt', price: 79.99, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 60, description: 'A breathable and lightweight t-shirt for any activity.', data_ai_hint: 'black tshirt' },
    { id: 'ap4', name: 'Chrono-Trench Coat', price: 399.99, image: 'https://images.unsplash.com/photo-1515426685495-a26831553c48?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 15, description: 'A timeless trench coat with a futuristic twist.', data_ai_hint: 'trench coat' },
    { id: 'ap5', name: 'Stealth Cargo Pants', price: 149.99, image: 'https://images.unsplash.com/photo-1604176354204-926873782855?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 35, description: 'Durable and stylish cargo pants with smart pockets.', data_ai_hint: 'cargo pants' },
    { id: 'ap6', name: 'Kinetic-Flex Jeans', price: 169.99, image: 'https://images.unsplash.com/photo-1602293589914-9e296ba2a7c4?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 30, description: 'Jeans that move with you, made from flexible denim.', data_ai_hint: 'modern jeans' },
    { id: 'ap7', name: 'Solaris Windbreaker', price: 129.99, image: 'https://images.unsplash.com/photo-1592019442659-c6df67b45b23?q=80&w=1999&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 28, description: 'A lightweight jacket that protects from the elements.', data_ai_hint: 'windbreaker jacket' },
    { id: 'ap8', name: 'Echo-Scarf', price: 69.99, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 50, description: 'A soft and stylish scarf with a modern pattern.', data_ai_hint: 'stylish scarf' },
    { id: 'ap9', name: 'Vertex Vest', price: 119.99, image: 'https://images.unsplash.com/photo-1544022669-e489b019919b?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 22, description: 'A versatile vest for layering in any season.', data_ai_hint: 'utility vest' },
    { id: 'ap10', name: 'Tempest Tactical Jacket', price: 249.99, image: 'https://images.unsplash.com/photo-1591946614725-3b15a6873263?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 18, description: 'A rugged jacket with a clean, modern design.', data_ai_hint: 'tactical jacket' },
    { id: 'ap11', name: 'Nova-Thread Polo', price: 89.99, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 45, description: 'A classic polo shirt made with advanced, soft-touch fabric.', data_ai_hint: 'polo shirt' },
    { id: 'ap12', name: 'Zenith Zip-Up', price: 139.99, image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 20, description: 'A comfortable and stylish zip-up for everyday wear.', data_ai_hint: 'zip-up hoodie' },
    // Footwear
    { id: 'fw1', name: 'Quantum Sneakers', price: 349.99, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 30, description: 'Walk on air with these revolutionary sneakers, featuring self-lacing technology.', data_ai_hint: 'futuristic shoes' },
    { id: 'fw2', name: 'Hyper-Glide Runners', price: 219.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2070&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 25, description: 'Experience frictionless running with magnetic-levitation soles.', data_ai_hint: 'running shoes' },
    { id: 'fw3', name: 'Zero-G Boots', price: 499.99, image: 'https://images.unsplash.com/photo-1604264809359-42c245d84343?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 15, description: 'Stylish and rugged boots designed for urban exploration.', data_ai_hint: 'black boots' },
    { id: 'fw4', name: 'Stealth-Mode Loafers', price: 299.99, image: 'https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?q=80&w=2070&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 20, description: 'Elegant loafers with sound-dampening soles for a silent step.', data_ai_hint: 'leather loafers' },
    { id: 'fw5', name: 'Aero-Slippers', price: 99.99, image: 'https://images.unsplash.com/photo-1603487742131-4128699b9318?q=80&w=1964&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 50, description: 'Light-as-air slippers that contour to your feet perfectly.', data_ai_hint: 'comfy slippers' },
    { id: 'fw6', name: 'Momentum Trainers', price: 259.99, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 35, description: 'Trainers that harness kinetic energy to give you a boost.', data_ai_hint: 'stylish footwear' },
    { id: 'fw7', name: 'Chrono-Lace Boots', price: 389.99, image: 'https://images.unsplash.com/photo-1638247025965-b43d2294c653?q=80&w=1935&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 18, description: 'Classic boots with a futuristic self-tightening lace system.', data_ai_hint: 'brown boots' },
    { id: 'fw8', name: 'City-Trek Sandals', price: 129.99, image: 'https://images.unsplash.com/photo-1603425112182-8a9b31d99a25?q=80&w=1965&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 40, description: 'Durable sandals with adaptive straps for all-day comfort.', data_ai_hint: 'modern sandals' },
    { id: 'fw9', name: 'Vortex Cleats', price: 279.99, image: 'https://images.unsplash.com/photo-1612282213888-84b8a1c02844?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 22, description: 'Soccer cleats with aerodynamic grooves for enhanced speed.', data_ai_hint: 'soccer cleats' },
    { id: 'fw10', name: 'Gravity-Grip Hikers', price: 319.99, image: 'https://images.unsplash.com/photo-1520211601693-0c634bf60b9e?q=80&w=1964&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 28, description: 'Hiking boots with electro-adhesive soles for superior grip.', data_ai_hint: 'hiking boots' },
    { id: 'fw11', name: 'Urban Nomad High-Tops', price: 289.99, image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 33, description: 'Stylish high-tops with chameleon fabric that changes color.', data_ai_hint: 'white sneakers' },
    { id: 'fw12', name: 'Fusion-Form Dress Shoes', price: 459.99, image: 'https://images.unsplash.com/photo-1463100099107-d0ab6c6c5286?q=80&w=2070&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 12, description: 'Elegant dress shoes made from a single piece of smart leather.', data_ai_hint: 'dress shoes' },
    // Electronics
    { id: 'el1', name: 'Astro-Gazer 9000', price: 1299.99, image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 15, description: 'Bring the wonders of the cosmos to your backyard with unparalleled clarity.', data_ai_hint: 'telescope space' },
    { id: 'el2', name: 'Nova-Glow Lamp', price: 129.99, image: 'https://images.unsplash.com/photo-1543508389-436c6a75d812?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 40, description: 'A lamp that simulates natural light cycles to improve your mood.', data_ai_hint: 'modern lamp' },
    { id: 'el3', name: 'Chrono-Coffee Machine', price: 399.99, image: 'https://images.unsplash.com/photo-1565452344015-772b145b5a45?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 20, description: 'Brews the perfect cup of coffee in seconds, customized to your taste.', data_ai_hint: 'coffee machine' },
    { id: 'el4', name: 'Echo-Sphere Speaker', price: 249.99, image: 'https://images.unsplash.com/photo-1590658263928-8612543819b5?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 30, description: 'A floating speaker with 360-degree sound and ambient lighting.', data_ai_hint: 'bluetooth speaker' },
    { id: 'el5', name: 'Quantum-Pad Tablet', price: 899.99, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 25, description: 'A paper-thin tablet with a holographic display for immersive work.', data_ai_hint: 'modern tablet' },
    { id: 'el6', name: 'Holo-Projector Mini', price: 699.99, image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 18, description: 'A pocket-sized projector that creates high-definition holograms.', data_ai_hint: 'mini projector' },
    { id: 'el7', name: 'Synth-Wave Headphones', price: 349.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 35, description: 'Noise-cancelling headphones that adapt sound to your hearing profile.', data_ai_hint: 'stylish headphones' },
    { id: 'el8', name: 'Cyber-Scan Mouse', price: 149.99, image: 'https://images.unsplash.com/photo-1615663245649-ebb5de3b04c8?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 50, description: 'An ergonomic mouse with a built-in fingerprint scanner for security.', data_ai_hint: 'computer mouse' },
    { id: 'el9', name: 'Kinetic-Charge Power Bank', price: 119.99, image: 'https://images.unsplash.com/photo-1588701103689-35a47ea68378?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 60, description: 'A power bank that charges itself through your movement.', data_ai_hint: 'power bank' },
    { id: 'el10', name: 'Stealth Drone', price: 1499.99, image: 'https://images.unsplash.com/photo-1507582020474-9a334a761929?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 12, description: 'A whisper-quiet drone with an invisibility-cloak shell.', data_ai_hint: 'stealth drone' },
    { id: 'el11', name: 'Aura-Light Panel Kit', price: 299.99, image: 'https://images.unsplash.com/photo-1658145495567-3d014436c732?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 28, description: 'Modular light panels that create stunning visual displays on your wall.', data_ai_hint: 'led panels' },
    { id: 'el12', name: 'Vision-X AR Glasses', price: 1999.99, image: 'https://images.unsplash.com/photo-1593462823615-8485a3313a96?q=80&w=1931&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 10, description: 'Augmented reality glasses that blend digital information with the real world.', data_ai_hint: 'ar glasses' },
    // Accessories
    { id: 'ac1', name: 'Chrono-Watch X', price: 499.99, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 20, description: 'A minimalist smartwatch that blends classic design with futuristic tech.', data_ai_hint: 'smart watch' },
    { id: 'ac2', name: 'Cyber-Shade Sunglasses', price: 249.99, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 30, description: 'Sunglasses with a built-in display for notifications and navigation.', data_ai_hint: 'cool sunglasses' },
    { id: 'ac3', name: 'Quantum-Link Bracelet', price: 189.99, image: 'https://images.unsplash.com/photo-1611159063981-b8c805a3178c?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 25, description: 'A stylish bracelet that doubles as a secure crypto wallet.', data_ai_hint: 'chain bracelet' },
    { id: 'ac4', name: 'Aero-Weave Belt', price: 129.99, image: 'https://images.unsplash.com/photo-1606132801385-69b5bf457c46?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 40, description: 'A lightweight belt made from aerospace-grade fibers.', data_ai_hint: 'leather belt' },
    { id: 'ac5', name: 'Stealth-Wallet', price: 159.99, image: 'https://images.unsplash.com/photo-1620923984931-140a358a6a8a?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 50, description: 'A slim, RFID-blocking wallet with a biometric lock.', data_ai_hint: 'slim wallet' },
    { id: 'ac6', name: 'Nova-Pendant Necklace', price: 219.99, image: 'https://images.unsplash.com/photo-1599459345758-91b35345b597?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 22, description: 'A necklace with a pendant that glows softly in the dark.', data_ai_hint: 'pendant necklace' },
    { id: 'ac7', name: 'Chrono-Cufflinks', price: 179.99, image: 'https://images.unsplash.com/photo-1611312338692-20593414a331?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 15, description: 'Cufflinks with a tiny, functioning clockwork mechanism.', data_ai_hint: 'silver cufflinks' },
    { id: 'ac8', name: 'City-Scape Backpack', price: 399.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb68c6a62?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 28, description: 'A sleek, anti-theft backpack with integrated charging ports.', data_ai_hint: 'modern backpack' },
    { id: 'ac9', name: 'Vortex-Ring', price: 299.99, image: 'https://images.unsplash.com/photo-1627292230352-32f004c35967?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 18, description: 'A smart ring that tracks your health and controls your devices.', data_ai_hint: 'silver ring' },
    { id: 'ac10', name: 'Echo-Tech Gloves', price: 199.99, image: 'https://images.unsplash.com/photo-1590823880453-27e03429d201?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 33, description: 'Gloves with haptic feedback for immersive VR experiences.', data_ai_hint: 'tech gloves' },
    { id: 'ac11', name: 'Kinetic-Key Fob', price: 89.99, image: 'https://images.unsplash.com/photo-1631899924905-6c71550a3a71?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 45, description: 'A key fob that never needs a battery, powered by motion.', data_ai_hint: 'car key' },
    { id: 'ac12', name: 'Fusion-Frame Glasses', price: 349.99, image: 'https://images.unsplash.com/photo-1614715838556-348e11c37c22?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 26, description: 'Eyeglasses with adjustable tint and a built-in audio system.', data_ai_hint: 'stylish glasses' },
    // Home Goods
    { id: 'hg1', name: 'Hydro-Synth Plant Pot', price: 89.99, image: 'https://images.unsplash.com/photo-1487035242944-78f234964654?q=80&w=1964&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 50, description: 'A smart pot that plays music based on your plant\'s moisture levels.', data_ai_hint: 'smart planter' },
    { id: 'hg2', name: 'Zero-Gravity Bookshelf', price: 799.99, image: 'https://images.unsplash.com/photo-1558309534-4942e0a027c4?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 10, description: 'A magnetic bookshelf that makes your books appear to float.', data_ai_hint: 'floating bookshelf' },
    { id: 'hg3', name: 'Aura-Cleanse Air Purifier', price: 499.99, image: 'https://images.unsplash.com/photo-1624386189916-ae67652790ae?q=80&w=1964&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 25, description: 'An air purifier that uses light to neutralize pollutants.', data_ai_hint: 'air purifier' },
    { id: 'hg4', name: 'Kinetic-Field Coasters', price: 79.99, image: 'https://images.unsplash.com/photo-1610483125219-bf5b8830113c?q=80&w=2070&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 60, description: 'Coasters that keep your drink at the perfect temperature.', data_ai_hint: 'stone coasters' },
    { id: 'hg5', name: 'Chrono-Cube Alarm Clock', price: 129.99, image: 'https://images.unsplash.com/photo-1542847504-58e653034e34?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 35, description: 'An alarm clock that projects the time and weather onto your ceiling.', data_ai_hint: 'digital clock' },
    { id: 'hg6', name: 'Nova-Flame Electric Fireplace', price: 999.99, image: 'https://images.unsplash.com/photo-1611956844431-455b8e1cec69?q=80&w=2070&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 15, description: 'A wall-mounted fireplace that creates realistic, heatless flames.', data_ai_hint: 'electric fireplace' },
    { id: 'hg7', name: 'Stealth-Store Storage Unit', price: 649.99, image: 'https://images.unsplash.com/photo-1588694853104-a524c28c82a5?q=80&w=2070&auto=format=fit&crop', category: 'Home Goods', rating: 4, stock: 20, description: 'A minimalist storage unit with hidden, touch-to-open compartments.', data_ai_hint: 'modern cabinet' },
    { id: 'hg8', name: 'Echo-View Smart Mirror', price: 1299.99, image: 'https://images.unsplash.com/photo-1618763268897-399a533658f8?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 12, description: 'A mirror that displays news, weather, and your schedule.', data_ai_hint: 'smart mirror' },
    { id: 'hg9', name: 'Fusion-Dish Set', price: 349.99, image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2070&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 30, description: 'A self-heating dish set that keeps your food warm.', data_ai_hint: 'ceramic dishes' },
    { id: 'hg10', name: 'Quantum-Cut Knife Block', price: 499.99, image: 'https://images.unsplash.com/photo-1622083541094-1508a881a251?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 22, description: 'A knife block that uses lasers to keep your knives perfectly sharp.', data_ai_hint: 'knife block' },
    { id: 'hg11', name: 'City-Bloom Indoor Garden', price: 459.99, image: 'https://images.unsplash.com/photo-1596700661138-84a8a05e2a1b?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 18, description: 'An automated indoor garden that grows fresh herbs and vegetables.', data_ai_hint: 'indoor garden' },
    { id: 'hg12', name: 'Vortex-Vase', price: 159.99, image: 'https://images.unsplash.com/photo-1579943542344-8c8f0f07c33e?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 28, description: 'A vase that creates a gentle water vortex to keep flowers fresh.', data_ai_hint: 'modern vase' }
];


// Type for creating a new product, omitting fields generated by the server/app.
type ProductInput = Omit<Product, 'id'>;

export async function getProducts(): Promise<Product[]> {
  // Use static data instead of Firestore
  return Promise.resolve(allProducts);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Use static data instead of Firestore
  return Promise.resolve(allProducts.find(p => p.id === id));
}

export async function createProduct(productData: Omit<ProductInput, 'id' | 'data_ai_hint'>): Promise<string> {
    console.log("This is a demo. Product creation is not implemented for static data.", productData);
    // Return a mock ID for UI feedback.
    return `new-prod-${Math.random().toString(36).substring(2, 9)}`;
}
