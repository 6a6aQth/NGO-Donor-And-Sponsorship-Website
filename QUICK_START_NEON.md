# Quick Start: Neon + Prisma Setup

⚡ **5-Minute Setup Guide** - Follow these exact steps to avoid common issues.

---

## Step 1: Get Direct Connection String

1. Go to https://console.neon.tech
2. Select your project
3. Click "Connection Details"
4. **Toggle to "Direct"** (NOT "Pooled") ⚠️
5. Copy the connection string

Should look like:
```
postgresql://user:pass@ep-xxxxx.region.aws.neon.tech/NGO?sslmode=require
```

**NOT** (no `-pooler`):
```
postgresql://user:pass@ep-xxxxx-pooler.region.aws.neon.tech/NGO
```

---

## Step 2: Create `.env` File

```bash
# In project root, create .env file:
DATABASE_URL="postgresql://user:pass@ep-xxxxx.region.aws.neon.tech/NGO?sslmode=require"
```

**✅ Checklist:**
- [ ] No spaces before `DATABASE_URL`
- [ ] No `-pooler` in hostname
- [ ] Database name is correct (e.g., `NGO`)
- [ ] Ends with `?sslmode=require`

---

## Step 3: Install & Setup

```bash
# Install dependencies
pnpm add prisma @prisma/client

# Initialize Prisma (if needed)
npx prisma init

# Edit prisma/schema.prisma with your models
# Then push to database:
npx prisma db push
```

---

## Step 4: Verify

```bash
# Open Prisma Studio to see tables
npx prisma studio
```

Or refresh Neon dashboard (Ctrl+Shift+R) and check SQL Editor.

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Tables don't show in Neon | Hard refresh browser (Ctrl+Shift+R) |
| Can't connect | Use **Direct** connection (not Pooled) |
| Wrong database | Check database name in connection string |
| Spaces error | Remove spaces before `DATABASE_URL=` |

---

## Production Setup

For production, use **Pooled** connection:

```env
DATABASE_URL="postgresql://user:pass@ep-xxxxx-pooler.region.aws.neon.tech/NGO?sslmode=require"
```

---

**That's it!** 🎉 Your Neon database is ready.

See `NEON_DATABASE_SETUP_GUIDE.md` for detailed documentation.

