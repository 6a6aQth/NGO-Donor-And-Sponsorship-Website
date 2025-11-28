# Complete Neon Database Setup Guide for Prisma

This guide covers the complete setup process for integrating Neon PostgreSQL with Prisma, including all the common pitfalls and how to avoid them.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Create Neon Database](#step-1-create-neon-database)
3. [Step 2: Get the Correct Connection String](#step-2-get-the-correct-connection-string)
4. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
5. [Step 4: Install Dependencies](#step-4-install-dependencies)
6. [Step 5: Create Prisma Schema](#step-5-create-prisma-schema)
7. [Step 6: Push Schema to Database](#step-6-push-schema-to-database)
8. [Step 7: Verify Tables Exist](#step-7-verify-tables-exist)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Prerequisites

- Node.js installed (v18 or higher recommended)
- A Neon account (free at https://neon.tech)
- Basic understanding of PostgreSQL and Prisma

---

## Step 1: Create Neon Database

1. Go to https://console.neon.tech
2. Click **"Create Project"**
3. Choose a **project name** (e.g., "NGO-Website")
4. Select a **region** (choose closest to your users)
5. **Important**: Note the database name - it's usually `neondb` by default
6. You can rename it to your preferred name (e.g., `NGO`)

---

## Step 2: Get the Correct Connection String

### ⚠️ CRITICAL: Understand Connection Types

Neon provides **TWO** types of connection strings:

### 1. **Direct Connection** (Use for Prisma migrations)
- **When to use**: For `prisma db push`, `prisma migrate`, schema changes
- **Format**: `postgresql://user:pass@ep-xxxxx.region.aws.neon.tech/dbname`
- **No `-pooler` in the hostname**

### 2. **Pooled Connection** (Use for runtime)
- **When to use**: For your application in production
- **Format**: `postgresql://user:pass@ep-xxxxx-pooler.region.aws.neon.tech/dbname`
- **Has `-pooler` in the hostname**

### How to Get the Connection String:

1. In Neon Console, go to your project
2. Click on **"Dashboard"** or **"Connection Details"**
3. Look for **"Connection string"** section
4. **Toggle to "Direct"** (not "Pooled") ← THIS IS CRUCIAL
5. Copy the **Direct connection string**

Example of correct Direct connection:
```
postgresql://username:password@ep-xxxxx.region.aws.neon.tech/NGO?sslmode=require
```

Example of Pooled connection (DON'T use for migrations):
```
postgresql://username:password@ep-xxxxx-pooler.region.aws.neon.tech/NGO?sslmode=require
```

---

## Step 3: Configure Environment Variables

### Create `.env` file

Create a `.env` file in your project root:

```bash
# IMPORTANT: No spaces before variable names!
# IMPORTANT: Use DIRECT connection (no -pooler)
# IMPORTANT: Verify database name is correct

DATABASE_URL="postgresql://username:password@ep-xxxxx.region.aws.neon.tech/NGO?sslmode=require"
```

### ⚠️ Common Mistakes to Avoid:

**❌ WRONG - Has spaces:**
```
   DATABASE_URL="postgresql://..."
```

**❌ WRONG - Using pooled connection:**
```
DATABASE_URL="postgresql://...@ep-xxxxx-pooler.region.aws.neon.tech/..."
```

**❌ WRONG - Wrong database name:**
```
DATABASE_URL="postgresql://.../neondb?..."  # Should be your actual DB name
```

**✅ CORRECT:**
```
DATABASE_URL="postgresql://username:password@ep-xxxxx.region.aws.neon.tech/NGO?sslmode=require"
```

### Verify Your `.env` File:

Check that:
- [ ] No spaces before `DATABASE_URL`
- [ ] Using direct connection (no `-pooler`)
- [ ] Database name is correct (e.g., `NGO`, not `neondb`)
- [ ] Ends with `?sslmode=require`
- [ ] File is in project root directory

---

## Step 4: Install Dependencies

```bash
# Using pnpm
pnpm add prisma @prisma/client

# Or using npm
npm install prisma @prisma/client

# Or using yarn
yarn add prisma @prisma/client
```

---

## Step 5: Create Prisma Schema

### Initialize Prisma (if not done):

```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma` file
- `.env` file (if it doesn't exist)

### Configure `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Your models here
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

---

## Step 6: Push Schema to Database

### Generate Prisma Client:

```bash
npx prisma generate
```

### Push Schema to Neon:

```bash
npx prisma db push
```

**Expected output:**
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "NGO", schema "public" at "ep-xxxxx.region.aws.neon.tech"

🚀  Your database is now in sync with your Prisma schema. Done in 15.40s
```

### ⚠️ If You See Errors:

**Error: "Can't reach database server"**
- Check your connection string is correct
- Verify you're using direct connection (no `-pooler`)
- Check your internet connection
- Verify Neon database is active

**Error: Database not found**
- Check database name in connection string
- Create database in Neon if it doesn't exist

---

## Step 7: Verify Tables Exist

### Method 1: Using Node.js Script

Create `verify-db.js`:

```javascript
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function verify() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to database')
    
    // Try to count records in your table
    const count = await prisma.user.count()
    console.log('✅ Tables exist! User count:', count)
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

verify()
```

Run it:
```bash
node verify-db.js
```

### Method 2: Using Prisma Studio

```bash
npx prisma studio
```

Opens at http://localhost:5555 - you should see your tables.

### Method 3: Neon Dashboard

1. Go to Neon Console
2. Click **"SQL Editor"**
3. **Refresh the page** (Ctrl+F5 or Cmd+Shift+R)
4. Look for **"Tables"** panel on the left
5. Expand database → public schema

**Or run this SQL query:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### Method 4: Command Line

```bash
npx prisma db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
```

---

## Troubleshooting

### Tables Don't Show in Neon Dashboard

**Problem**: Ran `prisma db push` but tables don't appear in Neon UI.

**Solutions**:
1. **Hard refresh browser**: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. **Verify using SQL Editor**: Run the SQL query above
3. **Check you're using direct connection**: Should NOT have `-pooler` in hostname
4. **Verify correct database**: Make sure you're looking at the right database in Neon
5. **Wait a few seconds**: Sometimes takes a moment to update UI

### Connection Issues

**Problem**: "Can't reach database server"

**Solutions**:
1. Verify `.env` file has correct connection string
2. Make sure using **direct connection** (not pooled)
3. Check database name is correct
4. Verify no extra spaces in `.env` file
5. Test connection: `npx prisma db execute --stdin <<< "SELECT 1;"`

### Wrong Database Name

**Problem**: Tables created in wrong database

**Solutions**:
1. Check your connection string's database name
2. Should be: `.../YourDatabaseName?sslmode=require`
3. Not the default `neondb` unless that's what you want

### Prisma Client Not Generated

**Problem**: Import errors for `@prisma/client`

**Solutions**:
```bash
npx prisma generate
```

### Schema Out of Sync

**Problem**: Schema changes not reflected

**Solutions**:
```bash
# Push changes
npx prisma db push

# Regenerate client
npx prisma generate

# Restart dev server
```

---

## Best Practices

### 1. Use Direct Connection for Development

During development, use the direct connection for:
- Running migrations
- Pushing schema changes
- Database operations in development

### 2. Use Pooled Connection for Production

In production `.env`:
```
DATABASE_URL="postgresql://user:pass@ep-xxxxx-pooler.region.aws.neon.tech/NGO?sslmode=require"
```

Benefits:
- Better connection handling
- Improved performance
- Handles connection limits better

### 3. Use Environment-Specific Connection Strings

```bash
# .env.development (Direct)
DATABASE_URL="postgresql://...@ep-xxxxx.region.aws.neon.tech/NGO?sslmode=require"

# .env.production (Pooled)
DATABASE_URL="postgresql://...@ep-xxxxx-pooler.region.aws.neon.tech/NGO?sslmode=require"
```

### 4. Add Prisma Commands to package.json

```json
{
  "scripts": {
    "dev": "prisma generate && next dev",
    "build": "prisma generate && next build",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev"
  }
}
```

### 5. Never Commit `.env` File

Ensure `.gitignore` includes:
```
.env
.env.local
.env*.local
```

### 6. Use Migrations in Production

For production, use migrations instead of `db push`:

```bash
# Create migration
npx prisma migrate dev --name init

# Apply in production
npx prisma migrate deploy
```

---

## Quick Reference: Common Commands

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma Client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Validate schema
npx prisma validate

# Format schema
npx prisma format

# Pull schema from database
npx prisma db pull

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

---

## Connection String Format Reference

### Basic Format:
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?OPTIONS
```

### Neon Direct Connection:
```
postgresql://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require
```

### Neon Pooled Connection:
```
postgresql://username:password@ep-xxxxx-pooler.region.aws.neon.tech/dbname?sslmode=require
```

### Common Options:
- `sslmode=require` - Required for Neon
- `connection_limit=10` - Limit connections
- `pool_timeout=10` - Pool timeout in seconds
- `schema=public` - Specify schema (default: public)

---

## Security Checklist

- [ ] Never commit `.env` file
- [ ] Use environment variables for connection strings
- [ ] Use different credentials for dev/prod
- [ ] Enable SSL (`sslmode=require`)
- [ ] Restrict database access to specific IPs (in Neon settings)
- [ ] Use least privilege database users
- [ ] Rotate passwords regularly
- [ ] Monitor database logs

---

## Summary: Key Takeaways

1. **Always use DIRECT connection** for `prisma db push` and migrations
2. **Verify database name** in your connection string
3. **No spaces** before variable names in `.env`
4. **Refresh Neon dashboard** if tables don't show immediately
5. **Use pooled connection** only in production runtime
6. **Run `prisma generate`** after schema changes
7. **Test connection** before pushing schema

---

## Need Help?

- Prisma Docs: https://www.prisma.io/docs
- Neon Docs: https://neon.tech/docs
- Prisma GitHub: https://github.com/prisma/prisma
- Neon Community: https://community.neon.tech

---

**Last Updated**: November 2025
**Version**: 1.0

