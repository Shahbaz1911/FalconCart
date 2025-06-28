
import type { DocumentReference } from 'firebase/firestore';

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

// Storing product data locally as requested.
const allProducts: Product[] = [
    // Electronics (20 total)
    {
        id: '1',
        name: "Astro-Gazer 9000",
        description: "The latest in personal telescopes. Bring the wonders of the cosmos to your backyard with unparalleled clarity. Features a computerized GoTo mount for easy tracking of celestial objects.",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop",
        category: "Electronics",
        rating: 5,
        stock: 15,
        data_ai_hint: "telescope space"
    },
    { id: 'elec-1', name: 'Recon Drone', description: 'Capture stunning aerial footage with this 4K camera drone. Features GPS follow-me and 30-minute flight time.', price: 499.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 25, data_ai_hint: 'camera drone' },
    { id: 'elec-2', name: 'Nexus VR Headset', description: 'Immerse yourself in virtual worlds with this high-resolution VR headset. Crystal clear optics and comfortable design.', price: 399.00, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 30, data_ai_hint: 'vr headset' },
    { id: 'elec-3', name: 'Aura Smart Speaker', description: 'A voice-controlled smart speaker with rich, room-filling sound and a helpful AI assistant built-in.', price: 129.50, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 100, data_ai_hint: 'smart speaker' },
    { id: 'elec-4', name: 'Viper Gaming Mouse', description: 'Ultra-lightweight gaming mouse with a high-precision optical sensor for competitive gaming performance.', price: 79.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 150, data_ai_hint: 'gaming mouse' },
    { id: 'elec-5', name: 'Typist-Pro Mechanical Keyboard', description: 'A tactile and responsive mechanical keyboard for an unparalleled typing experience. Fully customizable RGB lighting.', price: 159.00, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 80, data_ai_hint: 'mechanical keyboard' },
    { id: 'elec-6', name: 'CineBeam Portable Projector', description: 'Turn any wall into a cinema with this compact, 1080p portable projector. Built-in battery and speakers.', price: 299.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 40, data_ai_hint: 'portable projector' },
    { id: 'elec-7', name: 'SilentMode ANC Headphones', description: 'Block out the world and focus on your music with these active noise-cancelling over-ear headphones.', price: 249.00, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 75, data_ai_hint: 'headphones lifestyle' },
    { id: 'elec-8', name: 'Inkwell E-Reader', description: 'Carry your entire library in one lightweight device. Paper-like display is easy on the eyes, even in direct sunlight.', price: 139.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 90, data_ai_hint: 'e-reader device' },
    { id: 'elec-9', name: 'Adrenaline Action Camera', description: 'A rugged, waterproof action camera that records your adventures in stunning 5K video. Hyper-smooth stabilization.', price: 399.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 55, data_ai_hint: 'action camera' },
    { id: 'elec-10', name: 'Titan Power Bank', description: 'A massive 20,000mAh power bank to keep all your devices charged on the go. Fast charging support.', price: 59.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 200, data_ai_hint: 'power bank' },
    { id: 'elec-11', name: 'Portal Smart Display', description: 'A smart display for your kitchen or desk. Make video calls, watch recipes, and control your smart home.', price: 229.00, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 65, data_ai_hint: 'smart display' },
    { id: 'elec-12', name: 'Clarity Pro Webcam', description: 'A 4K webcam with AI-powered auto-framing and noise-cancelling mics for professional video calls.', price: 199.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 85, data_ai_hint: 'webcam' },
    { id: 'elec-13', name: 'CleanSweep Robot Vacuum', description: 'An intelligent robot vacuum with laser navigation that automatically mops and vacuums your floors.', price: 449.00, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 35, data_ai_hint: 'robot vacuum' },
    { id: 'elec-14', name: 'BreatheEasy Air Purifier', description: 'A HEPA air purifier that removes 99.97% of dust, pollen, and other allergens from your home.', price: 149.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 70, data_ai_hint: 'air purifier' },
    { id: 'elec-15', name: 'Guardian Security Camera', description: 'A wireless indoor/outdoor security camera with night vision and two-way audio to protect your home.', price: 179.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 110, data_ai_hint: 'security camera' },
    { id: 'elec-16', name: 'SonicClean Electric Toothbrush', description: 'Experience a dentist-clean feeling every day with this sonic toothbrush. 5 modes and a 2-minute timer.', price: 89.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 130, data_ai_hint: 'electric toothbrush' },
    { id: 'elec-17', name: 'ClimateControl Smart Thermostat', description: 'Save energy and stay comfortable with a smart thermostat that learns your schedule and preferences.', price: 249.00, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 60, data_ai_hint: 'smart thermostat' },
    { id: 'elec-18', name: 'Vault Portable SSD', description: 'A blazingly fast and durable 1TB portable SSD for transferring large files in seconds. Fits in your pocket.', price: 169.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 5, stock: 95, data_ai_hint: 'portable ssd' },
    { id: 'elec-19', name: 'SoundWave Bluetooth Speaker', description: 'A waterproof, portable Bluetooth speaker with deep bass and 24 hours of playtime. Perfect for any party.', price: 99.99, image: 'https://placehold.co/600x400.png', category: 'Electronics', rating: 4, stock: 180, data_ai_hint: 'bluetooth speaker' },

    // Footwear (20 total)
    {
        id: '2',
        name: "Quantum Sneakers",
        description: "Walk on air with these revolutionary sneakers. Featuring self-lacing technology and kinetic energy harvesting soles, they are the future of footwear.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
        category: "Footwear",
        rating: 4,
        stock: 30,
        data_ai_hint: "futuristic shoes"
    },
    { id: 'foot-1', name: 'TrailBlazer Hiking Boots', description: 'Waterproof and durable hiking boots designed for the toughest trails. Superior grip and ankle support.', price: 179.99, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 40, data_ai_hint: 'hiking boots' },
    { id: 'foot-2', name: 'Metropolis Leather Loafers', description: 'Classic penny loafers handcrafted from full-grain Italian leather. The perfect blend of comfort and style.', price: 220.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 60, data_ai_hint: 'leather loafers' },
    { id: 'foot-3', name: 'Breeze-Knit Runners', description: 'Lightweight and breathable running shoes with a sock-like fit. Perfect for your daily jog or gym session.', price: 129.99, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 120, data_ai_hint: 'running shoes' },
    { id: 'foot-4', name: 'Riviera Suede Espadrilles', description: 'Casual yet elegant espadrilles with a soft suede upper and traditional jute sole. Perfect for summer.', price: 89.50, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 80, data_ai_hint: 'suede espadrilles' },
    { id: 'foot-5', name: 'Everest Winter Boots', description: 'Insulated and waterproof winter boots to keep your feet warm and dry in the harshest conditions.', price: 199.99, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 50, data_ai_hint: 'winter boots' },
    { id: 'foot-6', name: 'Dunk-King High-Tops', description: 'Iconic basketball high-tops with superior cushioning and court feel. A classic reborn.', price: 160.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 75, data_ai_hint: 'basketball shoes' },
    { id: 'foot-7', name: 'Urban-Ride Skate Shoes', description: 'Durable skate shoes with a reinforced suede upper and a grippy gum rubber outsole for board control.', price: 85.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 110, data_ai_hint: 'skate shoes' },
    { id: 'foot-8', name: 'Heritage Oxford Shoes', description: 'Timeless cap-toe Oxford shoes made from polished calfskin. A staple for any formal wardrobe.', price: 280.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 45, data_ai_hint: 'oxford shoes' },
    { id: 'foot-9', name: 'Shoreline Boat Shoes', description: 'Classic two-eye boat shoes with non-marking rubber outsoles for grip on wet surfaces.', price: 110.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 90, data_ai_hint: 'boat shoes' },
    { id: 'foot-10', name: 'Nomad Chelsea Boots', description: 'Versatile and stylish Chelsea boots in a rich brown suede. Easy to pull on and endlessly comfortable.', price: 190.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 65, data_ai_hint: 'chelsea boots' },
    { id: 'foot-11', name: 'Cloud-Walk Slippers', description: 'Plush memory foam slippers with a cozy fleece lining. Perfect for relaxing at home.', price: 49.99, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 150, data_ai_hint: 'cozy slippers' },
    { id: 'foot-12', name: 'Oasis Flip-Flops', description: 'Comfortable and durable flip-flops with a contoured footbed for all-day arch support.', price: 39.99, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 200, data_ai_hint: 'flip flops' },
    { id: 'foot-13', name: 'Terra-Flex Trail Runners', description: 'Hybrid trail running shoes that offer the cushioning of a road shoe with the grip of a trail beast.', price: 140.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 85, data_ai_hint: 'trail runners' },
    { id: 'foot-14', name: 'Summit Alpine Boots', description: 'Professional mountaineering boots for high-altitude expeditions. Crampon-compatible and fully insulated.', price: 450.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 25, data_ai_hint: 'alpine boots' },
    { id: 'foot-15', name: 'Canvas Classic Sneakers', description: 'The iconic low-top canvas sneaker. A versatile and timeless choice for any casual look.', price: 60.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 300, data_ai_hint: 'canvas sneakers' },
    { id: 'foot-16', name: 'StormChaser Rain Boots', description: 'Keep your feet perfectly dry with these stylish matte-finish rain boots. Comfortable and 100% waterproof.', price: 75.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 95, data_ai_hint: 'rain boots' },
    { id: 'foot-17', name: 'Momentum Cross-Trainers', description: 'Versatile cross-training shoes designed for stability during lifts and flexibility for agility drills.', price: 115.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 4, stock: 130, data_ai_hint: 'cross trainers' },
    { id: 'foot-18', name: 'Velvet Evening Pumps', description: 'Elegant evening pumps in a luxurious velvet finish. The perfect accessory for any formal event.', price: 150.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 55, data_ai_hint: 'evening pumps' },
    { id: 'foot-19', name: 'WorkForce Steel-Toe Boots', description: 'Protect your feet on the job with these durable, comfortable, and ASTM-rated steel-toe work boots.', price: 135.00, image: 'https://placehold.co/600x400.png', category: 'Footwear', rating: 5, stock: 70, data_ai_hint: 'work boots' },

    // Home Goods (20 total)
    {
        id: '3',
        name: "Hydro-Synth Plant Pot",
        description: "A smart plant pot that plays serene, synthesized music based on your plant's moisture levels. Keeps your plant and you happy.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1487035242944-78f234964654?q=80&w=1964&auto=format&fit=crop",
        category: "Home Goods",
        rating: 5,
        stock: 50,
        data_ai_hint: "smart planter"
    },
    { id: 'home-1', name: 'Barista-Pro Espresso Machine', description: 'Create cafe-quality espresso, lattes, and cappuccinos at home with this semi-automatic espresso machine.', price: 699.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 20, data_ai_hint: 'espresso machine' },
    { id: 'home-2', name: 'Vortex Power Blender', description: 'A high-speed blender that pulverizes ice, nuts, and frozen fruit in seconds for the smoothest smoothies.', price: 199.00, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 45, data_ai_hint: 'power blender' },
    { id: 'home-3', name: 'Crisp-Fry Air Fryer', description: 'Enjoy your favorite fried foods with up to 85% less fat. Large capacity for family-sized meals.', price: 119.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 80, data_ai_hint: 'air fryer' },
    { id: 'home-4', name: 'Lift-Off Standing Desk', description: 'An electric height-adjustable standing desk to improve your posture and productivity. Smooth and quiet motor.', price: 499.00, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 30, data_ai_hint: 'standing desk' },
    { id: 'home-5', name: 'Ergo-Flow Office Chair', description: 'A fully adjustable ergonomic office chair with lumbar support, a breathable mesh back, and 4D armrests.', price: 349.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 40, data_ai_hint: 'office chair' },
    { id: 'home-6', name: 'Dream-Weave Sheet Set', description: 'A luxurious 480-thread-count sateen sheet set made from premium long-staple cotton.', price: 179.00, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 100, data_ai_hint: 'bed sheets' },
    { id: 'home-7', name: 'Gravity Weighted Blanket', description: 'A 15lb weighted blanket designed to improve sleep and reduce anxiety through deep pressure stimulation.', price: 129.50, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 70, data_ai_hint: 'weighted blanket' },
    { id: 'home-8', name: 'Plush-Towel Set', description: 'An 8-piece set of ultra-soft and absorbent towels made from 100% Turkish cotton.', price: 99.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 120, data_ai_hint: 'towel set' },
    { id: 'home-9', name: 'Chef-Grade Cookware Set', description: 'A 12-piece non-stick ceramic cookware set that is durable, easy to clean, and free of harmful chemicals.', price: 299.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 55, data_ai_hint: 'cookware set' },
    { id: 'home-10', name: 'Aroma-Zen Diffuser', description: 'An ultrasonic essential oil diffuser that adds a calming, fragrant mist to your space. With 7 color LED lights.', price: 39.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 200, data_ai_hint: 'oil diffuser' },
    { id: 'home-11', name: 'Abstract Canvas Wall Art', description: 'A large, hand-painted abstract canvas painting to be the focal point of any modern living room.', price: 250.00, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 35, data_ai_hint: 'canvas art' },
    { id: 'home-12', name: 'Velvet-Touch Throw Pillows', description: 'A set of two decorative throw pillows in a luxurious velvet fabric to add a pop of color to your sofa.', price: 59.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 150, data_ai_hint: 'throw pillows' },
    { id: 'home-13', name: 'Minimalist Ladder Bookshelf', description: 'A 5-tier ladder bookshelf with a sleek industrial design, perfect for storage and display.', price: 149.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 65, data_ai_hint: 'ladder bookshelf' },
    { id: 'home-14', name: 'Arc Floor Lamp', description: 'An elegant arc floor lamp with a marble base that provides overhead lighting without ceiling suspension.', price: 189.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 50, data_ai_hint: 'floor lamp' },
    { id: 'home-15', name: 'Secure-Touch Smart Lock', description: 'A keyless smart lock that you can control from your phone. Grant access remotely and see who comes and goes.', price: 219.00, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 60, data_ai_hint: 'smart lock' },
    { id: 'home-16', name: 'Precision-Cut Knife Set', description: 'A 15-piece high-carbon stainless steel knife set with a stylish wooden block. Incredibly sharp and balanced.', price: 159.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 75, data_ai_hint: 'knife set' },
    { id: 'home-17', name: 'Cast-Iron Dutch Oven', description: 'A 5.5-quart enameled cast iron Dutch oven, perfect for slow-cooking, braising, and baking bread.', price: 139.50, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 5, stock: 85, data_ai_hint: 'dutch oven' },
    { id: 'home-18', name: 'Rise & Shine Smart Alarm', description: 'A smart alarm clock that simulates sunrise to wake you up naturally and tracks your sleep quality.', price: 129.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 90, data_ai_hint: 'smart alarm' },
    { id: 'home-19', name: 'Gourmet Cold Brew Maker', description: 'Make smooth, delicious cold brew coffee at home. Just add grounds and water, then leave it overnight.', price: 49.99, image: 'https://placehold.co/600x400.png', category: 'Home Goods', rating: 4, stock: 110, data_ai_hint: 'cold brew' },

    // Accessories (20 total)
    {
        id: '5',
        name: "Chrono-Watch X",
        description: "A minimalist smartwatch that blends classic design with futuristic tech. Track your vitals, get notifications, and look sharp.",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1974&auto=format&fit=crop",
        category: "Accessories",
        rating: 5,
        stock: 20,
        data_ai_hint: "smart watch"
    },
    { id: 'acc-1', name: 'Slim-Line Leather Wallet', description: 'A minimalist wallet made from premium leather with RFID-blocking technology to protect your cards.', price: 59.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 150, data_ai_hint: 'leather wallet' },
    { id: 'acc-2', name: 'Polar-View Sunglasses', description: 'Classic aviator sunglasses with polarized lenses for glare reduction and 100% UV protection.', price: 149.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 100, data_ai_hint: 'aviator sunglasses' },
    { id: 'acc-3', name: 'Urban-Explorer Backpack', description: 'A water-resistant backpack with a dedicated laptop compartment and smart organizational pockets.', price: 119.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 80, data_ai_hint: 'modern backpack' },
    { id: 'acc-4', name: 'Nomad Messenger Bag', description: 'A stylish and durable canvas messenger bag, perfect for work or travel. Fits a 15-inch laptop.', price: 99.50, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 70, data_ai_hint: 'messenger bag' },
    { id: 'acc-5', name: 'Signature Series Baseball Cap', description: 'A classic six-panel baseball cap made from comfortable cotton twill with an adjustable strap.', price: 29.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 200, data_ai_hint: 'baseball cap' },
    { id: 'acc-6', name: 'Woven Silk Tie', description: 'A luxurious 100% silk tie with a subtle geometric pattern, handcrafted in Italy. The perfect finishing touch.', price: 79.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 90, data_ai_hint: 'silk tie' },
    { id: 'acc-7', name: 'Monogrammed Cufflinks', description: 'Elegant silver-plated cufflinks that can be personalized with your initials. A timeless gift.', price: 89.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 60, data_ai_hint: 'silver cufflinks' },
    { id: 'acc-8', name: 'Classic Leather Belt', description: 'A versatile and durable belt made from genuine Italian leather with a solid brass buckle.', price: 69.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 120, data_ai_hint: 'leather belt' },
    { id: 'acc-9', name: 'Cashmere Scarf', description: 'An incredibly soft and warm scarf made from 100% pure cashmere. The ultimate in winter luxury.', price: 180.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 50, data_ai_hint: 'cashmere scarf' },
    { id: 'acc-10', name: 'Tech-Touch Leather Gloves', description: 'Stay warm and connected with these fine leather gloves featuring touchscreen-compatible fingertips.', price: 75.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 110, data_ai_hint: 'leather gloves' },
    { id: 'acc-11', name: 'Storm-Proof Umbrella', description: 'A compact travel umbrella with a wind-resistant frame that won\'t break or invert in strong gusts.', price: 35.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 180, data_ai_hint: 'travel umbrella' },
    { id: 'acc-12', name: 'Aegis Phone Case', description: 'A slim yet protective phone case with military-grade drop protection and a comfortable grip.', price: 45.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 250, data_ai_hint: 'phone case' },
    { id: 'acc-13', name: 'Armor-Shell Laptop Sleeve', description: 'A padded and water-resistant laptop sleeve with a soft fleece lining to protect against scratches.', price: 39.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 140, data_ai_hint: 'laptop sleeve' },
    { id: 'acc-14', name: 'Key-Master Organizer', description: 'A compact key organizer that keeps your keys neat, quiet, and easy to access.', price: 25.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 300, data_ai_hint: 'key organizer' },
    { id: 'acc-15', 'name': 'Hydro-Flow Water Bottle', 'description': 'A 32oz insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12.', 'price': 34.99, 'image': 'https://placehold.co/600x400.png', 'category': 'Accessories', 'rating': 5, 'stock': 220, 'data_ai_hint': 'water bottle' },
    { id: 'acc-16', name: 'Commuter Travel Mug', description: 'A leak-proof travel mug with a ceramic interior to ensure your coffee tastes perfect. Fits in any cup holder.', price: 29.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 4, stock: 190, data_ai_hint: 'travel mug' },
    { id: 'acc-17', name: 'Voyager Passport Holder', description: 'A stylish leather passport holder with slots for your passport, boarding pass, and credit cards.', price: 49.99, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 100, data_ai_hint: 'passport holder' },
    { id: 'acc-18', name: 'Chrono-Case Watch Box', description: 'A handsome wooden watch box with a glass lid and plush cushions to display and protect 6 watches.', price: 119.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 40, data_ai_hint: 'watch box' },
    { id: 'acc-19', name: 'Apex Automatic Watch', description: 'A self-winding automatic watch with a sapphire crystal and a detailed skeleton dial. An affordable luxury.', price: 350.00, image: 'https://placehold.co/600x400.png', category: 'Accessories', rating: 5, stock: 30, data_ai_hint: 'automatic watch' },

    // Apparel (20 total)
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
    { id: 'ap13', name: 'Cosmic Bomber Jacket', price: 229.99, image: 'https://images.unsplash.com/photo-1542485223-e69c095a12d1?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 20, description: 'A sleek bomber jacket with an embroidered star map on the back. Out of this world style.', data_ai_hint: 'bomber jacket' },
    { id: 'ap14', name: 'Orbit Performance Shorts', price: 79.99, image: 'https://images.unsplash.com/photo-1591585721625-f5581c3c9e6c?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 50, description: 'Lightweight, breathable shorts designed for maximum mobility and comfort, whether you are on a run or exploring the city.', data_ai_hint: 'athletic shorts' },
    { id: 'ap15', name: 'Nebula-Weave Sweater', price: 159.99, image: 'https://images.unsplash.com/photo-1616704128212-040296715f57?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 30, description: 'A cozy sweater made from a unique, shimmering thread that mimics the colors of a distant nebula.', data_ai_hint: 'stylish sweater' },
    { id: 'ap16', name: 'Horizon Henley Shirt', price: 99.99, image: 'https://images.unsplash.com/photo-1622470953794-32404b8ce17c?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 40, description: 'A classic Henley shirt, reimagined with durable, soft-spun cotton for everyday adventures.', data_ai_hint: 'henley shirt' },
    { id: 'ap17', name: 'Apex Athletic Leggings', price: 119.99, image: 'https://images.unsplash.com/photo-1594911772127-4a78b77464a9?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 35, description: 'High-performance leggings that offer both support and style, perfect for a workout or a day out.', data_ai_hint: 'athletic leggings' },
    { id: 'ap18', name: 'Strata Layered Tee', price: 69.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 60, description: 'A comfortable tee with a unique layered design, adding a touch of modern style to a classic look.', data_ai_hint: 'stylish tshirt' },
    { id: 'ap19', name: 'Vortex Denim Jacket', price: 199.99, image: 'https://images.unsplash.com/photo-1543087904-2cb235aadd35?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 22, description: 'A timeless denim jacket with a modern fit and subtle, futuristic detailing on the cuffs and collar.', data_ai_hint: 'denim jacket' },
    { id: 'ap20', name: 'Pulse Performance Socks', price: 29.99, image: 'https://images.unsplash.com/photo-1610212570263-039c99e90089?q=80&w=2070&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 100, description: 'Comfortable and durable socks designed to keep your feet cool and supported all day long.', data_ai_hint: 'athletic socks' },
];

// Type for creating a new product.
type ProductInput = Omit<Product, 'id'>;

export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return allProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return allProducts.find(p => p.id === id);
}

export async function createProduct(productData: ProductInput): Promise<Product> {
  // Simulate network delay and creating an ID
  await new Promise(resolve => setTimeout(resolve, 50));
  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}`,
  };
  allProducts.push(newProduct);
  return newProduct;
}
