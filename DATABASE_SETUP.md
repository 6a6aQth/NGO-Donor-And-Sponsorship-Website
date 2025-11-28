# Database Setup Guide

This guide will help you set up Neon PostgreSQL database with Prisma for the Chiyembekezo Scholar Foundation website.

## Prerequisites

- A Neon account (sign up at https://neon.tech)
- A Neon database named "NGO" (or update the connection string)
- Node.js and pnpm installed

## Step 1: Get Your Neon Connection String

1. Log in to your Neon dashboard
2. Select your project and database
3. Go to the "Connection Details" section
4. Copy your PostgreSQL connection string
   - It should look like: `postgresql://username:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/NGO?sslmode=require`

## Step 2: Set Up Environment Variables

1. Create a `.env` file in the root directory (if it doesn't exist)
2. Add your database connection string:

```env
DATABASE_URL="postgresql://username:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/NGO?sslmode=require"
```

**Important:** Replace the connection string with your actual Neon database credentials.

## Step 3: Generate Prisma Client

Run the following command to generate the Prisma Client:

```bash
pnpm db:generate
```

Or:

```bash
pnpm prisma generate
```

## Step 4: Push Schema to Database

Push your Prisma schema to the Neon database:

```bash
pnpm db:push
```

Or:

```bash
pnpm prisma db push
```

This will create all the tables defined in `prisma/schema.prisma`:
- `donors` - Donor information
- `donations` - Donation records
- `scholarship_applications` - Scholarship application submissions
- `admins` - Admin user accounts

## Step 5: Verify Setup

You can verify your database setup by:

1. Opening Prisma Studio (visual database browser):
   ```bash
   pnpm db:studio
   ```

2. Or checking your Neon dashboard to see the created tables

## Step 6: Run the Development Server

Start your development server:

```bash
pnpm dev
```

The server will automatically generate Prisma Client on startup.

## Database Models

### Donor
- Stores donor information (name, email, address, etc.)
- Linked to multiple donations

### Donation
- Stores individual donation records
- Links to a donor
- Tracks payment status and amount

### ScholarshipApplication
- Stores scholarship and sponsorship applications
- Includes personal, academic, and financial information
- Tracks application status

### Admin
- Stores admin user accounts (for future authentication)

## API Endpoints

The following API endpoints are available:

- `POST /api/donations` - Create a new donation
- `GET /api/donations` - Get all donations (with pagination)
- `POST /api/scholarships` - Submit a scholarship application
- `GET /api/scholarships` - Get all applications (with pagination)
- `GET /api/admin/donors` - Get all donors (admin only)
- `GET /api/admin/requests` - Get all scholarship requests (admin only)
- `PATCH /api/admin/requests` - Update request status (admin only)
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

## Troubleshooting

### Connection Issues

If you encounter connection errors:

1. Verify your `DATABASE_URL` is correct
2. Check that your Neon database is active
3. Ensure `sslmode=require` is in your connection string
4. Verify your IP is not blocked (Neon allows all IPs by default)

### Schema Sync Issues

If you modify the schema:

1. Run `pnpm db:push` to sync changes
2. Run `pnpm db:generate` to regenerate the client
3. Restart your development server

### Migration vs Push

- Use `db:push` for development (quick schema sync)
- Use `db:migrate` for production (creates migration files)

## Next Steps

1. Set up proper authentication (replace hardcoded admin password)
2. Integrate real payment processing (Stripe/PayPal)
3. Add email notifications for form submissions
4. Set up proper error logging and monitoring

## Useful Commands

```bash
# Generate Prisma Client
pnpm db:generate

# Push schema to database
pnpm db:push

# Create migration
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio

# Start development server
pnpm dev
```

