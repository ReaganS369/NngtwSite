# NNGTW Studio Website

Production-ready Next.js 15 website for NNGTW Studio — an independent game and animation studio creating original worlds, games, stories, characters, and interactive experiences.

## Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Firebase Auth, Firestore, and Storage
- Vercel deployment configuration

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the Firebase environment template:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in Firebase web app values in `.env.local`.

4. Seed Firestore with NNGTW studio content:

   ```bash
   npm run seed:firestore
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

## Vercel

The project is configured as a Next.js application in `vercel.json`. Vercel should run `npm run build` and deploy the generated Next.js output automatically.

## Firebase collections

- `projects`
- `news`
- `users`
- `media`
- `settings`

See `docs/firestore-schema.md` for the complete schema.
