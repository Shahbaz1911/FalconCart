# Firebase Firestore Setup Guide

Your application is configured to use Firebase Firestore for storing customer and order data.

When a user places an order, the data is automatically saved to `orders` and `customers` collections in your Firestore database.

## 1. Create Firestore Database

If you haven't already, create a Firestore database in your Firebase project:

- Go to your Firebase project console.
- In the left-hand menu, click on **Build > Firestore Database**.
- Click **Create database**.
- Choose to **Start in production mode**.
- Select a Firestore location. Choose the one closest to your users.
- Click **Enable**.

## 2. Data Collections

There's no need to manually create the collections. The app will create them automatically when the first order is placed.

### Orders Collection

For reference, here is the data structure for an order document:

```json
{
    "userId": "some-firebase-auth-uid",
    "createdAt": "Timestamp",
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
                "image": "...",
                "category": "Electronics",
                "description": "...",
                "rating": 5,
                "stock": 15
            }
        }
    ]
}
```

### Customers Collection

When a user places an order, a corresponding document is created or updated in the `customers` collection. The document ID is the user's Firebase Authentication UID.

```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "avatar": "https://url.to/user/photo.jpg",
    "totalOrders": 5,
    "totalSpent": 2450.75,
    "firstOrderAt": "Timestamp",
    "lastOrderAt": "Timestamp",
    "data_ai_hint": "person portrait"
}
```

Product data for this application is managed locally within the app's code and is not stored in Firestore.
