# Vehicle Management System

A full-stack vehicle management platform built with React (TypeScript) and Express (Node.js) with a PostgreSQL database managed by Prisma.

## Features

- Vehicle inventory CRUD with validation and status tracking
- Maintenance and inspection tracking with scheduling helpers
- Document management for invoices, quotations, delivery notes, and receipts with PDF export
- Dashboard and analytical reports with charts and CSV-ready data
- Data backup/export, JSON restore, and administrative tools
- Role-based access control with JWT authentication (admin and user roles)
- Internationalisation (Japanese and English) and responsive Material UI-based interface
- Progressive Web App support with service worker registration

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Material UI, React Query, React Router, Recharts, React Hook Form
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL, Zod, JSON Web Tokens, pdfmake, Node Cron
- **Testing:** Vitest & React Testing Library (frontend), Jest & Supertest (backend)
- **Tooling:** ESLint, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Docker (for local database)

### Installation

```bash
npm install
```

Install workspace dependencies:

```bash
npm install --workspace client
npm install --workspace server
```

### Environment Variables

Create a `.env` file in `server/` with the following values:

```
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/vms
JWT_SECRET=your-secret
SENDGRID_KEY=your-sendgrid-key
MAIL_FROM=no-reply@example.com
```

### Database

Generate Prisma client and apply migrations:

```bash
npm --workspace server run prisma generate
npm --workspace server run prisma migrate dev
```

### Development

Start database and services:

```bash
docker-compose up -d
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:4000`.

### Testing

```bash
npm run test
```

### Build

```bash
npm run build
```

### Netlify Deployment

The repository is configured for Netlify to build and serve the frontend from the `client` workspace.

1. Create a new Netlify site and connect this repository.
2. Use the following build settings (also captured in `netlify.toml`):
   - **Base directory:** `client`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `client/dist`
3. Ensure the `NODE_VERSION` environment variable is set to `18` (matching the project tooling).
4. If the backend API is hosted on another domain, set the `VITE_API_URL` environment variable to the API base URL (e.g. `https://api.example.com`).

An SPA redirect rule is provided via `client/public/_redirects` so that client-side routing works correctly in production.

## API Documentation

Swagger/OpenAPI documentation can be generated using libraries such as `swagger-jsdoc` and `swagger-ui-express`. Integrate under `server/src/app.ts` if required.

## Docker

The project ships with a `docker-compose.yml` file that starts PostgreSQL alongside the Node.js and Vite apps. Adjust environment variables as needed.

## License

MIT
