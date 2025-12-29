# Orendion Backend

## Setup local
1. Copy `.env.example` -> `.env` and set:
   - MONGODB_URI
   - ADMIN_PASSWORD
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION
   - AWS_S3_BUCKET

2. Install:
   npm install

3. Start dev:
   npm run dev

## Endpoints (example)
- GET /api/products
- POST /api/products  (admin; multipart/form-data; header x-admin-pass)
- POST /api/orders

## Deploy
Deploy to Render.com: point to this repo, set build command `npm install` and start command `npm start`.
Add environment variables in Render (same as .env).
