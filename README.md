# Student Portal Web Application

A modern web application built with Next.js 13+ with React 19 for managing student information and services.

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd student-portal-web
```

2. Install dependencies:

```bash
npm install --force

or

npm install --legacy-peer-deps
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
student-portal-web/
├── app/                      # Main application directory (Next.js 13+ App Router)
│   ├── api/                  # API routes and endpoints
│   ├── (auth pages)/        # Authentication related pages
│   ├── (main pages)/        # Main application pages
│   ├── components/          # Page-specific components
│   ├── coming-soon/         # Coming soon page
│   ├── maintenece/          # Maintenance page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   ├── error.tsx            # Error page component
│   └── not-found.tsx        # 404 page component
│
├── components/              # Shared components used across the application
├── lib/                    # Utility functions and shared logic
├── types/                  # TypeScript type definitions
├── public/                 # Static assets (images, fonts, etc.)
│
├── auth.ts                 # Authentication configuration and utilities
├── middleware.ts           # Next.js middleware for request handling
├── routes.ts              # Application routing configuration
├── next.config.ts         # Next.js configuration
│
├── package.json           # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
├── prettier.config.js    # Prettier configuration
└── postcss.config.mjs    # PostCSS configuration
```

## Key Directories and Files

- **app/**: Contains all the pages and API routes using Next.js 13+ App Router architecture
- **components/**: Reusable UI components shared across the application
- **lib/**: Utility functions, hooks, and shared business logic
- **types/**: TypeScript type definitions and interfaces
- **public/**: Static assets that are served directly
- **auth.ts**: Authentication setup and utilities
- **middleware.ts**: Request middleware for handling authentication and routing
- **routes.ts**: Centralized routing configuration

## Configuration Files

- **next.config.ts**: Next.js framework configuration
- **tsconfig.json**: TypeScript compiler options
- **eslint.config.mjs**: Code linting rules
- **prettier.config.js**: Code formatting rules
- **postcss.config.mjs**: CSS processing configuration

## Development

This project uses:

- Next.js 13+ with App Router
- TypeScript for type safety
- ESLint and Prettier for code quality
- PostCSS for CSS processing
