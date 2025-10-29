# 🚀 Deploy NEARX Backend to Render (FREE)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `NEARX`
3. Make it **Public** (required for free Render deployment)
4. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

After creating the repository, copy YOUR GitHub username and run:

```powershell
cd "C:\Users\Travellers Health\Desktop\NEARX"
git commit -m "Initial commit - NEARX platform"
git remote add origin https://github.com/YOUR_USERNAME/NEARX.git
git branch -M main  
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!

## Step 3: Deploy Backend to Render

1. Go to https://render.com/
2. Click **"Get Started for Free"** (NO credit card needed!)
3. Sign up with your GitHub account
4. Click **"New +"** → **"Web Service"**
5. Click **"Connect GitHub"** and select your `NEARX` repository
6. Configure the service:

### ⚙️ Configuration

- **Name**: `nearx-backend`
- **Root Directory**: `apps/backend`
- **Environment**: `Node`
- **Region**: Choose closest to you (Oregon, Frankfurt, Singapore, etc.)
- **Branch**: `main`
- **Build Command**: 
  ```
  cd ../.. && pnpm install && cd apps/backend && pnpm build
  ```
- **Start Command**: 
  ```
  pnpm start
  ```
- **Instance Type**: **Free** (select this!)

### 🔧 Environment Variables

Click **"Advanced"** → Add environment variable:
- **Key**: `PORT`
- **Value**: `10000`

7. Click **"Create Web Service"**

## Step 4: Wait for Deployment (5-10 minutes)

Render will:
- ✅ Install dependencies
- ✅ Build your NestJS backend
- ✅ Start the server
- ✅ Give you a public URL like: `https://nearx-backend-xxxx.onrender.com`

## Step 5: Update Frontend

Once deployed, copy your Render URL and update the frontend:

1. Open: `apps/web/app/page.tsx`
2. Change line 7 to:
   ```typescript
   const [baseUrl, setBaseUrl] = useState('https://YOUR-RENDER-URL.onrender.com/api');
   ```
3. Deploy frontend:
   ```powershell
   cd "C:\Users\Travellers Health\Desktop\NEARX"
   vercel --prod
   ```

## ✅ Done!

Your NEARX platform will be fully functional with:
- 💚 Frontend on Vercel
- 💚 Backend on Render (FREE)
- 💚 Full authentication working

---

**Need help?** Let me know which step you're on!
