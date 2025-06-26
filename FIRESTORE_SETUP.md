# Firebase Firestore Setup Guide

Your application is now configured to use Firebase Firestore as its database. To get it running, you need to populate your database with some initial data.

## 1. Create Firestore Database

- Go to your Firebase project console.
- In the left-hand menu, click on **Build > Firestore Database**.
- Click **Create database**.
- Choose **Start in production mode**.
- Select a Firestore location. Choose the one closest to your users.
- Click **Enable**.

## 2. Create Collections

You need to create three collections: `products`, `orders`, and `customers`.

- In the Firestore data viewer, click **+ Start collection**.
- Enter the collection ID (e.g., `products`).

## 3. Add Documents

For each collection, you need to add documents. Here is the sample data that was previously used in the app.

---

### `products` collection

Create a new document for each product. Use the `id` value as the **Document ID**.

**Document ID: 1**
```json
{
    "name": "Astro-Gazer 9000",
    "description": "The latest in personal telescopes. Bring the wonders of the cosmos to your backyard with unparalleled clarity. Features a computerized GoTo mount for easy tracking of celestial objects.",
    "price": 1299.99,
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop",
    "category": "Electronics",
    "rating": 5,
    "stock": 15,
    "data_ai_hint": "telescope space"
}
```

**Document ID: 2**
```json
{
    "name": "Quantum Sneakers",
    "description": "Walk on air with these revolutionary sneakers. Featuring self-lacing technology and kinetic energy harvesting soles, they are the future of footwear.",
    "price": 349.99,
    "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
    "category": "Footwear",
    "rating": 4,
    "stock": 30,
    "data_ai_hint": "futuristic shoes"
}
```

**Document ID: 3**
```json
{
    "name": "Hydro-Synth Plant Pot",
    "description": "A smart plant pot that plays serene, synthesized music based on your plant's moisture levels. Keeps your plant and you happy.",
    "price": 89.99,
    "image": "https://images.unsplash.com/photo-1487035242944-78f234964654?q=80&w=1964&auto=format&fit=crop",
    "category": "Home Goods",
    "rating": 5,
    "stock": 50,
    "data_ai_hint": "smart planter"
}
```

**Document ID: 4**
```json
{
    "name": "Gravity-Defy Hoodie",
    "description": "A sleek, modern hoodie made from advanced smart-fabric that adapts to your body temperature. Perfect for any urban explorer.",
    "price": 189.99,
    "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop",
    "category": "Apparel",
    "rating": 5,
    "stock": 25,
    "data_ai_hint": "stylish hoodie"
}
```

**Document ID: 5**
```json
{
    "name": "Chrono-Watch X",
    "description": "A minimalist smartwatch that blends classic design with futuristic tech. Track your vitals, get notifications, and look sharp.",
    "price": 499.99,
    "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1974&auto=format&fit=crop",
    "category": "Accessories",
    "rating": 5,
    "stock": 20,
    "data_ai_hint": "smart watch"
}
```

_... (You can add more products by following this structure)_


### `customers` collection

Create a new document for each customer. Use the `id` value as the **Document ID**.

**Document ID: usr-1**
```json
{
    "name": "Alex Johnson",
    "email": "alex.j@example.com",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    "totalOrders": 3,
    "totalSpent": 1549.97,
    "data_ai_hint": "man portrait"
}
```

**Document ID: usr-2**
```json
{
    "name": "Maria Garcia",
    "email": "maria.g@example.com",
    "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    "totalOrders": 1,
    "totalSpent": 499.99,
    "data_ai_hint": "woman portrait"
}
```

---

### `orders` collection

For orders, you can let Firestore auto-generate the Document ID. When you submit a new order through the checkout page in the app, it will be added here automatically. Here's an example of the data structure for reference. Note that the `date` field will be a `timestamp` type in Firestore.

```json
{
    "date": "July 20, 2024",
    "total": 1389.98,
    "status": "Delivered",
    "shippingAddress": {
        "fullName": "John Doe",
        "address": "123 Cosmos Lane",
        "city": "Starlight City",
        "state": "CA",
        "zip": "90210",
        "country": "USA"
    },
    "items": [
        {
            "quantity": 1,
            "product": {
                "id": "1",
                "name": "Astro-Gazer 9000",
                "price": 1299.99,
                "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop",
                "category": "Electronics",
                "data_ai_hint": "telescope space",
                "description": "The latest in personal telescopes...",
                "rating": 5,
                "stock": 15
            }
        },
        {
            "quantity": 1,
            "product": {
                "id": "3",
                "name": "Hydro-Synth Plant Pot",
                "price": 89.99,
                "image": "https://images.unsplash.com/photo-1487035242944-78f234964654?q=80&w=1964&auto=format&fit=crop",
                "category": "Home Goods",
                "data_ai_hint": "smart planter",
                "description": "A smart plant pot that plays serene music...",
                "rating": 5,
                "stock": 50
            }
        }
    ]
}
```

Once you've added this data, your application will be fully functional.
