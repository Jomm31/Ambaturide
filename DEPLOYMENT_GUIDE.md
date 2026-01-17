# Vercel Deployment Guide for Ambaturide Backend

## Prerequisites

1. **Database Setup** (choose one):
   - **PlanetScale** (recommended): Free tier with built-in connection pooling
   - **Railway**: Simple MySQL hosting with free tier
   - **AWS RDS**: Production-grade, pay-as-you-go
   - **Azure Database for MySQL**: Enterprise option

## Deployment Steps

### 1. Prepare Your Environment Variables

Create a `.env` file locally (already in `.gitignore`):

```env
DB_HOST=your-database-host.com
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=ambaturide_db
DB_PORT=3306
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=true
NODE_ENV=production
SESSION_SECRET=generate-a-secure-random-string-here
CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

**Option B: Using Git Integration**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables (see step 3)

### 3. Configure Environment Variables in Vercel

In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable from your `.env` file:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT`
   - `DB_SSL`
   - `DB_SSL_REJECT_UNAUTHORIZED`
   - `SESSION_SECRET`
   - `CLIENT_ORIGIN`
   - `NODE_ENV` (set to "production")

### 4. Database Provider Examples

**PlanetScale:**
```env
DB_HOST=aws.connect.psdb.cloud
DB_USER=your-username
DB_PASSWORD=pscale_pw_xxxxxxxxxxxx
DB_NAME=ambaturide_db
DB_PORT=3306
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=true
```

**Railway:**
```env
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=xxxxxxxxxxxxx
DB_NAME=railway
DB_PORT=6543
DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=false
```

## Important Notes for Vercel Serverless

### File Uploads
⚠️ **Vercel serverless functions have read-only file systems**. You cannot store uploads in `/uploads` folder.

**Solutions:**
1. **Use cloud storage** (recommended):
   - AWS S3
   - Cloudinary
   - Vercel Blob Storage
   - Azure Blob Storage

2. **Modify multer configuration** to use cloud storage:
```javascript
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ambaturide',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });
```

### Session Management
⚠️ **In-memory sessions won't work** across serverless function invocations.

**Solutions:**
1. **Use JWT tokens** instead of sessions
2. **Use connect-redis** with Redis database
3. **Use database-backed sessions**:
```javascript
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';

const MySQLStore = MySQLStoreFactory(session);

const sessionStore = new MySQLStore({
  /* MySQL connection options */
}, pool);

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));
```

## Testing Locally

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your local database credentials

3. Run the development server:
```bash
node src/Backend/server.js
```

## Migration Checklist

- [x] Replace `createConnection` with `createPool`
- [x] Convert all `db.query` to `await pool.query`
- [x] Add `async` to all route handlers
- [x] Move credentials to environment variables
- [x] Add SSL configuration
- [x] Export app for Vercel
- [ ] Migrate remaining db.query calls (see MIGRATION_GUIDE.md)
- [ ] Replace file uploads with cloud storage
- [ ] Replace in-memory sessions with persistent storage
- [ ] Update frontend API URL to Vercel deployment URL

## Helpful Commands

```bash
# Install dependencies
npm install

# Test locally
node src/Backend/server.js

# Deploy to Vercel
vercel --prod

# View logs
vercel logs

# Check environment variables
vercel env ls
```

## Troubleshooting

**Connection timeout errors:**
- Check if your database allows connections from any IP (or Vercel's IP range)
- Verify SSL settings match your provider's requirements

**"db.query is not a function":**
- You missed updating some queries from `db` to `pool`
- Search for all `db.query` in your code

**502 errors:**
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Check database connection settings

## Security Best Practices

1. ✅ Never commit `.env` to git
2. ✅ Use strong, random `SESSION_SECRET`
3. ✅ Enable SSL for database connections in production
4. ✅ Use `helmet` for security headers (already configured)
5. ✅ Implement rate limiting (already configured)
6. ✅ Use prepared statements (parameterized queries) - already using `?` placeholders
7. ✅ Hash passwords with bcrypt (already implemented)
8. ⚠️ Implement JWT-based authentication for serverless
9. ⚠️ Validate and sanitize all user inputs
10. ⚠️ Set up CORS properly with your frontend domain
