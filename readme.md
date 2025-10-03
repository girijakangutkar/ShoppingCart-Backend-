# Shopping Cart App

A full-stack shopping cart application with complete CRUD and checkout functionality. The backend uses `.json` files as a data source instead of a traditional database, and the frontend provides a dynamic UI for product browsing, cart management, and payment flow.

---

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, TailwindCss, JavaScript
- **Data Storage**: JSON files (`data.json`, `orders.json`)

---

## Features

### Backend

- ** Backend Deployed Link:**
- https://goshopping-3lv9.onrender.com/

- **Product Management (CRUD)**:

  - `GET /products` – Fetch all products
  - `POST /addProducts` – Add a new product
  - `PATCH /editProducts/:id` – Update product details
  - `DELETE /deleteProduct/:id` – Remove a product

- **Checkout API**:

  - `POST /checkout` – Accepts cart data and saves order details to `orders.json`
  - Stores product info, quantity, total price, and timestamp

- **Data Handling**:
  - All product and order data is stored in `.json` files
  - No external database required

### Frontend

- **Frontend Deployed link:**
- https://goshopping-three.vercel.app/

- Fetches product data from backend API
- Displays product listings on the UI
- Allows users to:
  - Add products to cart
  - View and update cart items
  - Proceed to checkout
- On checkout, sends cart data to backend and confirms order

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd ShopCom
npm install
npm run dev
```
