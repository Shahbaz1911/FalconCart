# Firebase Firestore Setup Guide

Your application is configured to use Firebase Firestore for storing customer orders.

When a user places an order, the data is automatically saved to an `orders` collection in your Firestore database.

## 1. Create Firestore Database

If you haven't already, create a Firestore database in your Firebase project:

- Go to your Firebase project console.
- In the left-hand menu, click on **Build > Firestore Database**.
- Click **Create database**.
- Choose to **Start in production mode**.
- Select a Firestore location. Choose the one closest to your users.
- Click **Enable**.

## 2. Orders Collection

There's no need to manually create the `orders` collection. The app will create it automatically when the first order is placed.

For reference, here is the data structure for an order document:

```json
{
    "userId": "some-firebase-auth-uid",
    "date": "July 20, 2024",
    "createdAt": "July 20, 2024 at 10:00:00 AM UTC-5",
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
                "data_ai_hint": "telescope space",
                "description": "...",
                "rating": 5,
                "stock": 15
            }
        }
    ]
}
```

Product and customer data for this application are managed locally within the app's code and are not stored in Firestore.
