# Deployment Guide

## 🚀 Deploy Backend to Render

### Prerequisites
- GitHub account
- Render account (sign up at [render.com](https://render.com))
- Code pushed to GitHub

### Step 1: Push to GitHub

```bash
git push origin master
```

### Step 2: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository

### Step 3: Configure Service

**Basic Settings:**
- **Name**: `song-management-api`
- **Region**: Choose closest region (e.g., Oregon)
- **Branch**: `master`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Instance Type**: `Free`

**Build & Deploy Settings:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Step 4: Environment Variables

Click **"Advanced"** → Add these environment variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGO_URI` | `mongodb+srv://songadmin:Songadmin%40atlas123@songcluster.hbyktwi.mongodb.net/?appName=SongCluster` |

**Important**: Use `%40` instead of `@` in the password for URL encoding.

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Build TypeScript to JavaScript
   - Start the server
3. Wait for deployment (usually 2-5 minutes)

### Step 6: Get Your API URL

After deployment, you'll get a URL like:
```
https://song-management-api.onrender.com
```

### Step 7: Test Your API

```bash
# Health check
curl https://song-management-api.onrender.com

# Get songs
curl https://song-management-api.onrender.com/api/songs

# Get stats
curl https://song-management-api.onrender.com/api/stats
```

---

## 🌐 Deploy Frontend to Vercel/Netlify

### Update Frontend API URL

1. Update `frontend/.env`:
```env
VITE_API_BASE_URL=https://song-management-api.onrender.com/api
```

2. Commit and push:
```bash
git add frontend/.env.example
git commit -m "docs: update API URL for production"
git push origin master
```

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - `VITE_API_BASE_URL` = `https://song-management-api.onrender.com/api`
5. Deploy

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Import your GitHub repository
3. Configure:
   - **Base Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add environment variable:
   - `VITE_API_BASE_URL` = `https://song-management-api.onrender.com/api`
5. Deploy

---

## 🔧 Troubleshooting

### Backend Issues

**Build fails:**
- Check `package.json` has correct scripts
- Ensure `tsconfig.json` is properly configured
- Check Render logs for errors

**Database connection fails:**
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MONGO_URI is correctly URL-encoded
- Ensure MongoDB Atlas cluster is running

**API not responding:**
- Check Render logs: Dashboard → Your Service → Logs
- Verify environment variables are set
- Check if service is running

### Frontend Issues

**API calls fail:**
- Update CORS settings in backend to allow your frontend domain
- Check `VITE_API_BASE_URL` is correct
- Verify backend is deployed and running

**Build fails:**
- Clear cache and rebuild
- Check all dependencies are in `package.json`
- Verify TypeScript has no errors

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment history

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading for production use

---

## 🔄 Continuous Deployment

Both Render and Vercel/Netlify support automatic deployments:
- Push to `master` branch
- Services automatically rebuild and redeploy
- Zero downtime deployments

---

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] MongoDB Atlas allows connections
- [ ] CORS configured for frontend domain
- [ ] API endpoints tested
- [ ] Frontend connects to production API
- [ ] Error handling tested
- [ ] Logs monitored

---

Your application is now live! 🎉
