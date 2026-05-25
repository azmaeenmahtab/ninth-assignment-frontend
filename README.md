# Ninth Assignment — Pet Adoption Platform

Live Demo: https://ninth-assignment-frontend-wjnb.vercel.app/

Repositories:
- Frontend: https://github.com/azmaeenmahtab/ninth-assignment-frontend
- Backend: https://github.com/azmaeenmahtab/ninth-assignment-backend

Project Overview
This is a Pet Adoption web application where users can sign up or log in (including Google sign-in), create and manage pet listings, browse all pets with search and filters, request adoptions, and for owners to approve requests which marks pets as adopted.

Screenshot
Add a screenshot at `frontend/public/screenshot.png` to display here.

Main Technology Stack
- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Auth/Token: jose (JWKS JWT verification)

Main Features
- User signup and login (including Google social sign-in)
- Add, update and delete pet listings
- Browse all listings with search and filters
- Request adoption (owners cannot request their own pets; duplicate requests prevented)
- Owners can approve requests; approved pets are marked as adopted

Dependencies (core packages)
- Backend: `express`, `mongodb`, `dotenv`, `jose`, `cors`, `nodemon` (dev)
- Frontend: `next`, `react`, `react-dom`, `tailwindcss`, `better-auth` (if used), `swr` (optional)

Local Run Guide
Prerequisites: Node.js (16+), a MongoDB URI

Backend
```bash
cd backend
copy .env.example .env   # set environment variables
npm install
npm run dev
```

Frontend
```bash
cd frontend
copy .env.example .env   # set `NEXT_PUBLIC_BACKEND_URL` and other vars
npm install
npm run dev
```

Environment Variables (examples)
- Backend: `MONGODB_URI`, `BASE_URL`, `FRONTEND_URL`
- Frontend: `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

Deployment Notes
- Frontend: Deploy to Vercel and set `NEXT_PUBLIC_*` environment variables; configure Google OAuth redirect URI to `https://<your-domain>/api/auth/callback`.
- Backend: Deploy to Render or any Node host; set `MONGODB_URI`, `BASE_URL`, and `FRONTEND_URL`.

Contributing / Notes
- Upload a screenshot to `frontend/public/screenshot.png` to show it in this README.
- For small fixes or questions, open an issue or request changes directly in the repo.

Checklist (before release)
- Test signup/login (including Google)
- Test add/edit/delete listings
- Test adoption request flow and owner approval

---
If you want, I can add a real screenshot file or convert this README into a detailed developer setup guide.
