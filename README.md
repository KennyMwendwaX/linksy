# Linksy - Modern Link Management Platform

![Linksy](https://linksy.vercel.app)
is a modern, full-featured URL shortening and link management platform built with Next.js, React, and TypeScript. It allows users to shorten, customize, and track links with comprehensive analytics.

## ✨ Features

- **URL Shortening**: Transform long URLs into clean, memorable links
- **Custom Links**: Personalize your shortened URLs with custom slugs
- **Advanced Analytics**: Track clicks, geographic data, referral sources, and more
- **Link Management**: Organize, edit, and manage all your links from a single dashboard
- **QR Code Generation**: Generate QR codes for your shortened links
- **User Authentication**: Secure user accounts with authentication
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Mode**: Choose between light and dark themes

## 🛠️ Tech Stack

- **Frontend**:

  - [Next.js 14](https://nextjs.org/) - React framework with App Router
  - [React](https://reactjs.org/) - UI library
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
  - [shadcn/ui](https://ui.shadcn.com/) - UI component library

- **Backend**:

  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - API endpoints
  - [PostgreSQL](https://www.postgresql.org/) - Database
  - [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
  - [Better Auth](https://www.better-auth.com/) - Authentication

- **Deployment**:
  - [Vercel](https://vercel.com/) - Hosting platform

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.17.0 or higher)
- npm or yarn or pnpm
- PostgreSQL (v14 or higher)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/KennyMwendwaX/linksy.git
   cd linksy
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`

   # Database

   DATABASE_URL=postgresql://username:password@localhost:5432/linksy

   # BetterAuth

   - BETTER_AUTH_URL=http://localhost:3000
   - BETTER_AUTH_SECRET=your-secret-key

   # Optional: OAuth providers

   - GOOGLE_CLIENT_ID=your-google-client-id
   - GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Base URL for shortened links

   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

### Database Setup

1. Create a PostgreSQL database:
   \`\`\`bash
   createdb linksy
   \`\`\`

2. Run database migrations:
   \`\`\`bash
   npm run db:migrate

   # or

   yarn db:migrate

   # or

   pnpm db:migrate
   \`\`\`

3. (Optional) Seed the database with initial data:
   \`\`\`bash
   npm run db:seed
   # or
   yarn db:seed
   # or
   pnpm db:seed
   \`\`\`

### Development

Start the development server:
\`\`\`bash
npm run dev

# or

yarn dev

# or

pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

\`\`\`
linksy/
├── app/ # Next.js App Router
│ ├── api/ # API routes
│ ├── (auth)/ # Authentication routes
│ ├── dashboard/ # Dashboard routes
│ └── [...slug]/ # Dynamic link redirect route
├── components/ # React components
│ ├── ui/ # shadcn/ui components
│ └── ... # Custom components
├── db/ # Database configuration
│ ├── schema/ # Drizzle schema definitions
│ ├── migrations/ # Database migrations
│ └── index.ts # Database client
├── lib/ # Utility functions
│ ├── auth.ts # Authentication utilities
│ ├── utils.ts # General utilities
│ └── ... # Other utilities
├── public/ # Static assets
├── styles/ # Global styles
├── types/ # TypeScript type definitions
├── .env.example # Example environment variables
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore file
├── drizzle.config.ts # Drizzle ORM configuration
├── next.config.mjs # Next.js configuration
├── package.json # Project dependencies
├── postcss.config.js # PostCSS configuration
├── README.md # Project documentation
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
\`\`\`

## 🗄️ Database Schema

\`\`\`typescript
// Example schema definition with Drizzle ORM
import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
id: serial('id').primaryKey(),
name: text('name'),
email: text('email').notNull().unique(),
password: text('password'),
createdAt: timestamp('created_at').defaultNow(),
updatedAt: timestamp('updated_at').defaultNow(),
});

export const links = pgTable('links', {
id: serial('id').primaryKey(),
userId: integer('user_id').references(() => users.id),
originalUrl: text('original_url').notNull(),
shortCode: text('short_code').notNull().unique(),
title: text('title'),
isActive: boolean('is_active').default(true),
expiresAt: timestamp('expires_at'),
createdAt: timestamp('created_at').defaultNow(),
updatedAt: timestamp('updated_at').defaultNow(),
});

export const clicks = pgTable('clicks', {
id: serial('id').primaryKey(),
linkId: integer('link_id').references(() => links.id),
referrer: text('referrer'),
userAgent: text('user_agent'),
ipAddress: text('ip_address'),
country: text('country'),
city: text('city'),
device: text('device'),
browser: text('browser'),
os: text('os'),
createdAt: timestamp('created_at').defaultNow(),
});
\`\`\`

## 🔄 API Routes

### URL Shortening

- `POST /api/links` - Create a new shortened link
- `GET /api/links` - Get all links for the authenticated user
- `GET /api/links/:id` - Get a specific link by ID
- `PUT /api/links/:id` - Update a link
- `DELETE /api/links/:id` - Delete a link

### Analytics

- `GET /api/links/:id/stats` - Get analytics for a specific link
- `GET /api/dashboard/stats` - Get aggregated stats for the dashboard

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get the current authenticated user

## 🧪 Testing

Run tests with:
\`\`\`bash
npm run test

# or

yarn test

# or

pnpm test
\`\`\`

## 🚢 Deployment

### Deploying to Vercel

The easiest way to deploy Linksy is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add the required environment variables
4. Deploy

### Database Deployment

For production, we recommend using:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ by [Your Name](https://github.com/yourusername)

# Linksy - Modern Link Management Platform

![Linksy](https://via.placeholder.com/1200x630?text=Linksy+-+Modern+Link+Management)

Linksy is a modern, full-featured URL shortening and link management platform built with Next.js, React, and TypeScript. It allows users to shorten, customize, and track links with comprehensive analytics.

## ✨ Features

- **URL Shortening**: Transform long URLs into clean, memorable links
- **Custom Links**: Personalize your shortened URLs with custom slugs
- **Advanced Analytics**: Track clicks, geographic data, referral sources, and more
- **Link Management**: Organize, edit, and manage all your links from a single dashboard
- **QR Code Generation**: Generate QR codes for your shortened links
- **User Authentication**: Secure user accounts with authentication
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Mode**: Choose between light and dark themes

## 🛠️ Tech Stack

- **Frontend**:

  - [Next.js 14](https://nextjs.org/) - React framework with App Router
  - [React](https://reactjs.org/) - UI library
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
  - [shadcn/ui](https://ui.shadcn.com/) - UI component library

- **Backend**:

  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - API endpoints
  - [PostgreSQL](https://www.postgresql.org/) - Database
  - [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
  - [NextAuth.js](https://next-auth.js.org/) - Authentication

- **Deployment**:
  - [Vercel](https://vercel.com/) - Hosting platform

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.17.0 or higher)
- npm or yarn or pnpm
- PostgreSQL (v14 or higher)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/linksy.git
   cd linksy
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`

   # Database

   DATABASE_URL=postgresql://username:password@localhost:5432/linksy

   # NextAuth

   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # Optional: OAuth providers

   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Base URL for shortened links

   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

### Database Setup

1. Create a PostgreSQL database:
   \`\`\`bash
   createdb linksy
   \`\`\`

2. Run database migrations:
   \`\`\`bash
   npm run db:migrate

   # or

   yarn db:migrate

   # or

   pnpm db:migrate
   \`\`\`

3. (Optional) Seed the database with initial data:
   \`\`\`bash
   npm run db:seed
   # or
   yarn db:seed
   # or
   pnpm db:seed
   \`\`\`

### Development

Start the development server:
\`\`\`bash
npm run dev

# or

yarn dev

# or

pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

\`\`\`
linksy/
├── app/ # Next.js App Router
│ ├── api/ # API routes
│ ├── (auth)/ # Authentication routes
│ ├── dashboard/ # Dashboard routes
│ └── [...slug]/ # Dynamic link redirect route
├── components/ # React components
│ ├── ui/ # shadcn/ui components
│ └── ... # Custom components
├── db/ # Database configuration
│ ├── schema/ # Drizzle schema definitions
│ ├── migrations/ # Database migrations
│ └── index.ts # Database client
├── lib/ # Utility functions
│ ├── auth.ts # Authentication utilities
│ ├── utils.ts # General utilities
│ └── ... # Other utilities
├── public/ # Static assets
├── styles/ # Global styles
├── types/ # TypeScript type definitions
├── .env.example # Example environment variables
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore file
├── drizzle.config.ts # Drizzle ORM configuration
├── next.config.mjs # Next.js configuration
├── package.json # Project dependencies
├── postcss.config.js # PostCSS configuration
├── README.md # Project documentation
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
\`\`\`

## 🗄️ Database Schema

\`\`\`typescript
// Example schema definition with Drizzle ORM
import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
id: serial('id').primaryKey(),
name: text('name'),
email: text('email').notNull().unique(),
password: text('password'),
createdAt: timestamp('created_at').defaultNow(),
updatedAt: timestamp('updated_at').defaultNow(),
});

export const links = pgTable('links', {
id: serial('id').primaryKey(),
userId: integer('user_id').references(() => users.id),
originalUrl: text('original_url').notNull(),
shortCode: text('short_code').notNull().unique(),
title: text('title'),
isActive: boolean('is_active').default(true),
expiresAt: timestamp('expires_at'),
createdAt: timestamp('created_at').defaultNow(),
updatedAt: timestamp('updated_at').defaultNow(),
});

export const clicks = pgTable('clicks', {
id: serial('id').primaryKey(),
linkId: integer('link_id').references(() => links.id),
referrer: text('referrer'),
userAgent: text('user_agent'),
ipAddress: text('ip_address'),
country: text('country'),
city: text('city'),
device: text('device'),
browser: text('browser'),
os: text('os'),
createdAt: timestamp('created_at').defaultNow(),
});
\`\`\`

## 🔄 API Routes

### URL Shortening

- `POST /api/links` - Create a new shortened link
- `GET /api/links` - Get all links for the authenticated user
- `GET /api/links/:id` - Get a specific link by ID
- `PUT /api/links/:id` - Update a link
- `DELETE /api/links/:id` - Delete a link

### Analytics

- `GET /api/links/:id/stats` - Get analytics for a specific link
- `GET /api/dashboard/stats` - Get aggregated stats for the dashboard

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get the current authenticated user

## 🧪 Testing

Run tests with:
\`\`\`bash
npm run test

# or

yarn test

# or

pnpm test
\`\`\`

## 🚢 Deployment

### Deploying to Vercel

The easiest way to deploy Linksy is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add the required environment variables
4. Deploy

### Database Deployment

For production, we recommend using:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ by [Kennedy Mwendwa](https://github.com/KennyMwendwax)
