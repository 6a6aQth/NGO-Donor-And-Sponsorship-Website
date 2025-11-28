# Finding Tables in Neon Database

## Where to Look in Neon Dashboard

1. **Log into Neon Dashboard**: https://console.neon.tech
2. **Select your project** (the one with database "NGO")
3. **Click on "SQL Editor"** or **"Tables"** in the left sidebar
4. **Make sure you're looking at the correct database**: Should be "NGO"
5. **Check the schema**: Should be "public" (default)

## Table Names to Look For

Based on your Prisma schema, the tables are named (lowercase):
- ✅ `donors`
- ✅ `donations`
- ✅ `scholarship_applications`
- ✅ `admins`

**Note**: The Prisma models use `@@map()` directives, so:
- Model `Donor` → Table `donors`
- Model `Donation` → Table `donations`
- Model `ScholarshipApplication` → Table `scholarship_applications`
- Model `Admin` → Table `admins`

## If Tables Don't Show Up

### Option 1: Refresh the Browser
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or close and reopen the Neon dashboard

### Option 2: Check SQL Editor
Run this query in Neon's SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

This should show:
- admins
- donations
- donors
- scholarship_applications

### Option 3: Verify Connection String
Make sure your `.env` file points to the correct database:
- Database name should be "NGO"
- Schema should be "public" (default)

### Option 4: Try Creating Tables Manually
If tables still don't exist, we can create them using migrations instead of `db push`.

## Quick Test

Try running this in Neon's SQL Editor:

```sql
SELECT * FROM donors LIMIT 1;
```

If you get an error saying table doesn't exist, then the tables weren't created.
If you get an empty result (no rows), then the tables exist but are empty (which is correct for a new database).

