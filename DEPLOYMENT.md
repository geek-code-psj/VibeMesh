# 🚀 Deployment Guide - Campus Connect

Complete step-by-step guide to deploy your Campus Connect app to production.

---

## ✅ Pre-Deployment Checklist

### Things Already Done:
- [x] Firebase project created
- [x] Authentication enabled (Email/Password)
- [x] Firestore database created
- [x] Firebase credentials configured
- [x] App tested locally
- [x] All mock data removed
- [x] Firebase services implemented
- [x] Security rules created

### Things You Need to Do Manually:
- [ ] Update Firestore security rules
- [ ] Create Firestore indexes
- [ ] Set up deployment platform (Vercel recommended)
- [ ] Configure environment variables on deployment platform
- [ ] Test production deployment

---

## 📋 Manual Steps Required

### Step 1: Update Firestore Security Rules (5 minutes)

1. **Go to Firebase Console** → https://console.firebase.google.com
2. **Open your project**: campus-connect-sati
3. **Click "Firestore Database"** in left sidebar
4. **Click the "Rules" tab** at the top
5. **Delete all existing content** in the editor
6. **Copy and paste** the contents from `firestore.rules` file in your project
7. **Click "Publish"** button

**What this does:** Sets proper security so only authenticated users can create posts, anyone can read, and users can only edit their own content.

---

### Step 2: Create Firestore Indexes (10 minutes)

Firebase needs indexes for efficient querying. Create these:

1. **In Firebase Console** → Firestore Database → **Indexes** tab

2. **Create these indexes:**

   **Index 1: Vibes - Today Filter**
   - Collection: `vibes`
   - Fields: 
     - `createdAt` (Descending)
   - Query scope: Collection
   
   **Index 2: Vibes - Most Loved**
   - Collection: `vibes`
   - Fields:
     - `heartsCount` (Descending)
   - Query scope: Collection

   **Index 3: Section Posts**
   - Collection: `sectionPosts`
   - Fields:
     - `sectionId` (Ascending)
     - `createdAt` (Descending)
   - Query scope: Collection

   **Index 4: Collabs**
   - Collection: `collabs`
   - Fields:
     - `createdAt` (Descending)
   - Query scope: Collection

3. **Click "Create Index"** for each one
4. **Wait** for each index to build (1-5 minutes each)

**Alternative:** Firebase will automatically suggest indexes when you use the app. You'll see error messages with links to create them.

---

### Step 3: Deploy to Vercel (10 minutes)

**Recommended Platform:** Vercel (easiest for React + Vite apps)

#### Option A: GitHub → Vercel (Recommended)

1. **Push code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Campus Connect"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to** https://vercel.com
3. **Sign in with GitHub**
4. **Click "Add New"** → **"Project"**
5. **Import** your repository
6. **Framework Preset**: Vite (should auto-detect)
7. **Build Command**: `npm run build`
8. **Output Directory**: `dist`

9. **Environment Variables** - Click "Add" for each:
   ```
   VITE_FIREBASE_API_KEY = AIzaSyBXoRJ2-jnEuuB5MEVOedGFQqCL9RVnTHQ
   VITE_FIREBASE_AUTH_DOMAIN = campus-connect-sati.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID = campus-connect-sati
   VITE_FIREBASE_STORAGE_BUCKET = campus-connect-sati.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID = 350410519092
   VITE_FIREBASE_APP_ID = 1:350410519092:web:427fb99e4ea21fb9a09061
   ```

10. **Click "Deploy"**
11. **Wait 2-3 minutes** for build to complete
12. **Get your live URL!** (e.g., campus-connect-xxx.vercel.app)

#### Option B: Netlify

1. **Go to** https://netlify.com
2. **Sign in with GitHub**
3. **Click "Add new site"** → **"Import an existing project"**
4. **Connect to GitHub** → Select repository
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Add environment variables** (same as above)
7. **Click "Deploy site"**

---

### Step 4: Configure Firebase for Production Domain

1. **In Firebase Console** → Authentication → Settings
2. **Scroll to "Authorized domains"**
3. **Click "Add domain"**
4. **Add your Vercel/Netlify URL** (e.g., `campus-connect-xxx.vercel.app`)
5. **Click "Add"**

**Why?** Firebase only allows sign-ins from authorized domains.

---

## 🧪 Testing Production Deployment

After deployment, test these core features:

### Test Checklist:

1. **Authentication**:
   - [ ] Can create new account
   - [ ] Can log in
   - [ ] Onboarding saves data to Firestore
   - [ ] Guest mode works

2. **Vibe Wall**:
   - [ ] Can view vibes
   - [ ] Can create new vibe
   - [ ] Filters work (All, Today, Most Loved)
   - [ ] Hearts work

3. **Interest Sections**:
   - [ ] All 6 sections visible
   - [ ] Can view section details
   - [ ] Posts load correctly

4. **Collab Board**:
   - [ ] Collabs display
   - [ ] Filters work

5. **Profile**:
   - [ ] Shows user data from onboarding
   - [ ] Logout works

---

## 🔐 Security & Privacy

### Current Setup:
- ✅ Firestore Security Rules protect data
- ✅ Environment variables kept private
- ✅ Firebase API key safe to expose (domain-restricted)

### For Extra Security (Optional):
1. **Enable App Check** in Firebase Console
2. **Set up reCAPTCHA** for signup
3. **Monitor usage** in Firebase Console → Usage tab

---

## 📊 Monitoring & Analytics (Optional)

### Set Up Google Analytics:
1. **Firebase Console** → Project Settings
2. **Integrations** → Google Analytics
3. **Click "Enable"**
4. Follow prompts

### Monitor Firestore Usage:
- Firebase Console → Firestore Database → **Usage** tab
- Check reads, writes, deletes per day

---

## 🔄 Continuous Deployment

**Good news!** Once set up:
- Any push to `main` branch → **Auto-deploys** to Vercel/Netlify
- Changes go live in 2-3 minutes
- Rollback available if needed

---

## 🎯 Post-Deployment Actions

### Day 1:
- [ ] Share app link with 5-10 beta testers
- [ ] Ask them to create accounts and test features
- [ ] Monitor Firebase Console for errors

### Week 1:
- [ ] Check error logs in Firebase Console
- [ ] Review user feedback
- [ ] Check Firestore usage (stay within free tier)

### Week 2:
- [ ] Official launch to campus
- [ ] Share link on college WhatsApp groups
- [ ] Announce on social media

---

## 💰 Firebase Free Tier Limits

**Good for ~5,000 daily active users:**
- Firestore: 50K reads/day, 20K writes/day
- Authentication: Unlimited
- Hosting: 10GB storage, 360MB/day bandwidth

**Monitor usage:** Firebase Console → Usage & Billing

---

## 🆘 Troubleshooting

### Issue: "Firebase: Error (auth/unauthorized-domain)"
**Solution:** Add your deployment domain to Firebase → Authentication → Settings → Authorized domains

### Issue: "Missing or insufficient permissions"
**Solution:** Deploy the updated `firestore.rules` (Step 1)

### Issue: Build fails on Vercel
**Solution:** Check environment variables are all added correctly

### Issue: White screen after deployment
**Solution:** 
1. Check browser console for errors
2. Verify all environment variables are set
3. Try hard refresh (Ctrl + Shift + R)

---

## ✅ Final Verification

Before announcing to campus:

```bash
# Test these URLs (replace with your domain):
https://your-app.vercel.app/               # Home
https://your-app.vercel.app/login          # Login
https://your-app.vercel.app/vibe-wall      # Vibe Wall
https://your-app.vercel.app/sections       # Sections
https://your-app.vercel.app/collab         # Collab
```

All should load without errors!

---

## 🎉 You're Live!

Your Campus Connect app is now production-ready and deployed!

**Live URL:** `https://your-domain.vercel.app`

**What's Next:**
- Share with friends
- Gather feedback
- Iterate and improve
- Add more features from the roadmap

---

## 📞 Need Help?

If you encounter issues during deployment:
1. Check Firebase Console error logs
2. Check Vercel/Netlify build logs
3. Test locally first (`npm run build` && `npm run preview`)

Happy deploying! 🚀
