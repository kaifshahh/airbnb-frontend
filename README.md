# 🌐 Airbnb Clone - Frontend

The frontend for the Airbnb clone, built with **React** and **Tailwind CSS**. It provides a sleek, interactive user experience for browsing and hosting properties.

---

## 🚀 Features

- **Dynamic Browsing:** Home listings fetched from the Node.js API.
- **GSAP Animations:** Smooth entrance animations for a premium feel.
- **Context API:** Global state management for Authentication and Favorites.
- **Protected Routes:** Only authenticated users can access hosting features.
- **Responsive Layout:** Optimized for all screen sizes.

## 🛠️ Tech Stack

- **React.js (Vite)**
- **Tailwind CSS**
- **GSAP**
- **Lucide Icons**
- **React Router**

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🔗 Project Structure

- `src/components`: Reusable UI components like `HomeCard`.
- `src/pages`: Main view components (Home, Host, Favorites).
- `src/context`: Authentication and User state logic.
- `src/layouts`: Navigation and layout wrappers.

---

Part of the [Airbnb Fullstack](https://github.com/kaifshahh/airbnb-fullstack) project.
