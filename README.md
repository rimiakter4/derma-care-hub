# 🌿 Derma Care Hub - Premium Inventory Management

Derma Care Hub is a high-end, medical-grade skincare product management system. It provides a seamless interface for managing premium skincare, haircare, and treatment products with a focus on aesthetics and performance.

## 🚀 Live Demo
**Live Link:** https://derma-care-hub.vercel.app/

---

## 🛠️ Technologies Used

- **Frontend:** Next.js 15 (App Router)
- **Backend API:** Express.js (Node.js) 
- **Data Management:** Local JSON Database (File-based storage)
- **Styling:** Tailwind CSS (Custom Theme Variables for Light/Dark Mode)
- **Authentication:** NextAuth.js
- **Icons:** Lucide React
- **Notifications:** React Toastify

---

## ✨ Features Implemented

1. **Dual-Theme Support:** A premium dark and light mode UI designed with custom background and surface variables (`bg-background`, `bg-surface`).
2. **Product Management:** Full CRUD capabilities to add, view, and manage skincare products.
3. **JSON-Based Storage:** Efficiently handling product data using an Express.js server and local JSON persistence.
4. **Secure Authentication:** Mock login system with protected routes (Add Product page is restricted to authenticated users).
5. **Base64 Image Upload:** Instant image preview and Base64 conversion for storing images directly within the product data.
6. **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop views.
7. **Toast Notifications:** Real-time feedback using React Toastify for successful product creation.

---

## 🔑 Login Credentials (Mock)
To access the protected inventory panel, use the following credentials:
- **Email:** `admin@dermacare.com`
- **Password:** `admin123`

---

## 🛤️ Route Summary

| Route | Description | Access |
| :--- | :--- | :--- |
| `/` | Home Page / Landing | Public |
| `/login` | Authentication Page | Public |
| `/Allproducts` | Product Listing / Gallery | Public |
| `/AddItem` | Add New Product Form | **Private (Protected)** |

---

## 💻 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rimiakter4/derma-care-hub.git
   cd derma-care-hub
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev