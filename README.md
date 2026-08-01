# Nearby

A real-time location-based social discovery platform. Users sign in with
Google (via Clerk), share their location to discover nearby people,
send and accept friend requests, and chat with friends in real time.

## Structure

- `client/` — React 19 + Vite + Tailwind CSS v4
- `server/` — Node.js + Express + Prisma + PostgreSQL + Socket.io
- `docker/` — Dockerfiles and Nginx config
- `docs/` — architecture notes (grows over time)

## Features

- **Auth** — Google sign-in via Clerk; the backend syncs each Clerk
  identity into its own `User` row on first request (`modules/users`).
- **Discovery** — users opt in to share their location; nearby matches
  are found with a self-contained geohash implementation
  (`server/src/algorithms/geohash.js`) that queries a 3×3 grid of
  geohash cells around the user, then ranks candidates by distance and
  recent activity (`algorithms/ranking.js`). Rendered on a Leaflet map
  and as a ranked list (`client/src/features/discovery`).
- **Friends** — send/accept/reject friend requests, remove friends
  (`modules/friends` on the server, `features/friends` on the client).
  Friendships are stored as one canonical undirected row per pair.
- **Chat** — real-time messaging over Socket.io, authenticated by
  verifying the same Clerk session token the REST API uses
  (`server/src/sockets/index.js`). Falls back to a REST endpoint if the
  socket hasn't connected yet, so sending a message never silently
  fails (`features/chat`).
- **Profile** — edit bio, toggle discoverability.

## Getting started

```bash
# Server
cd server
cp .env.example .env   # fill in DATABASE_URL, CLERK_SECRET_KEY, CLERK_PUBLISHABLE_KEY
npm install
npx prisma migrate dev --name init
npm run dev             # http://localhost:4000

# Client (separate terminal)
cd client
cp .env.example .env    # fill in VITE_CLERK_PUBLISHABLE_KEY
npm install
npm run dev              # http://localhost:5173
```

Docker alternative: `docker compose up --build` (server env vars come
from `server/.env`).

### Clerk setup

In your Clerk Dashboard: enable **Google** under Social Connections,
and make sure the publishable/secret keys in both `.env` files belong
to the same Clerk instance.

## Environment variables

**client/.env**
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_BASE_URL` (default `http://localhost:4000/api`)
- `VITE_SOCKET_URL` (default `http://localhost:4000`)

**server/.env**
- `PORT`
- `CLIENT_URL`
- `DATABASE_URL` (Neon Postgres connection string)
- `CLERK_SECRET_KEY`
- `CLERK_PUBLISHABLE_KEY`

## Notes on the implementation

- Geohashing, ranking, distance, and pair-ordering are hand-written in
  `server/src/algorithms` and `server/src/utils/pairKey.js` — no
  geospatial library or extension (e.g. PostGIS) required.
- The backend uses Node's native subpath imports (`#config/*`,
  `#modules/*`, etc., declared in `server/package.json`) instead of
  relative `../../../` paths.
- Every module follows routes → controller → service → repository →
  validation, as laid out in the original architecture brief.
