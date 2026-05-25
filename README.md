# 🐾 Pet Adoption Platform - PawPals

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-4ade80?style=for-the-badge&logo=vercel)](https://ninth-assignment-frontend-wjnb.vercel.app/)

---
## 📸 Project Screenshot

![Pawpals Preview](https://github.com/azmaeenmahtab/ninth-assignment-frontend/blob/main/public/image.png)---

---

## 🚀 Overview

Pet Adoption Platform is a full-stack web application that empowers users to easily sign up (with Google or email), create and manage pet listings, browse pets, and request adoptions. Enjoy filters, secure authentication, and owner approval workflows.

---

## 🏗️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** jose (JWT), Google OAuth

---

## ✨ Main Features

- 🆕 User registration and login (Email & Google)
- 🐕 Add and manage pet listings (CRUD)
- 🔍 Browse all pets with search and filters
- 💌 Request adoption (no self-requests, no duplicates!)
- ✅ Owners approve adoptions, pets marked adopted

---

## 📦 Core Dependencies

- **Backend:** `express`, `mongodb`, `dotenv`, `jose`, `cors`, `nodemon`
- **Frontend:** `next`, `react`, `react-dom`, `tailwindcss`, `better-auth`

---

## 🖥️ Local Development

### Prerequisites

- Node.js v16+
- MongoDB Atlas URI or local MongoDB instance

### Backend Setup

```bash
cd backend
cp .env.example .env      # Edit variables as needed
npm install
npm run dev
