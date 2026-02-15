# Firebase Setup Guide for Campus Connect

Follow these exact steps to set up Firebase for your app. This should take about 10 minutes.

---

## Step 1: Create Firebase Account & Project

### 1.1 Go to Firebase Console
- Open your browser and go to: **https://console.firebase.google.com**
- Sign in with your Google account (create one if you don't have it)

### 1.2 Create New Project
1. Click the **"Add project"** button (big plus icon)
2. Enter project name: `campus-connect-sati` (or any name you like)
3. Click **Continue**
4. **Disable** Google Analytics (toggle it off) - we don't need it for now
5. Click **Create project**
6. Wait 30-60 seconds for project creation
7. Click **Continue** when ready

✅ **You should now see your Firebase project dashboard**

---

## Step 2: Enable Email/Password Authentication

### 2.1 Navigate to Authentication
1. On the left sidebar, click **"Authentication"**
2. Click the **"Get started"** button

### 2.2 Enable Email/Password Sign-In
1. Click the **"Sign-in method"** tab at the top
2. You'll see a list of providers
3. Click on **"Email/Password"** (the first one)
4. Toggle **"Enable"** to ON (it will turn blue)
5. Click **"Save"**

✅ **Authentication is now enabled!**

---

## Step 3: Create Firestore Database

### 3.1 Navigate to Firestore
1. On the left sidebar, click **"Firestore Database"**
2. Click **"Create database"** button

### 3.2 Set Security Rules
1. A popup will appear asking about security rules
2. Select **"Start in test mode"** (good for development)
3. Click **Next**

### 3.3 Choose Location
1. Select a Cloud Firestore location
2. Recommended for India: **`asia-south1 (Mumbai)`**
3. Click **"Enable"**
4. Wait 30-60 seconds for database creation

✅ **Firestore database is ready!**

---

## Step 4: Get Your Firebase Credentials

### 4.1 Go to Project Settings
1. Click the **⚙️ gear icon** in the left sidebar (near "Project Overview")
2. Click **"Project settings"**

### 4.2 Register Web App
1. Scroll down to **"Your apps"** section
2. Click the **Web icon** (looks like `</>`)
3. Enter app nickname: `Campus Connect Web`
4. **DO NOT** check "Firebase Hosting" (leave it unchecked)
5. Click **"Register app"**

### 4.3 Copy Your Configuration
You'll see a code block that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "campus-connect-sati.firebaseapp.com",
  projectId: "campus-connect-sati",
  storageBucket: "campus-connect-sati.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

**COPY THESE VALUES** - you'll need them in the next step!

6. Click **"Continue to console"**

✅ **You have your Firebase credentials!**

---

## Step 5: Add Credentials to Your Project

### 5.1 Create .env File
1. Open your project in VS Code
2. In the root folder (where `package.json` is), create a new file
3. Name it exactly: `.env` (starts with a dot!)

### 5.2 Add Your Values
Copy this template and **replace the values** with YOUR values from Step 4.3:

```env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=campus-connect-sati.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=campus-connect-sati
VITE_FIREBASE_STORAGE_BUCKET=campus-connect-sati.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

**IMPORTANT:** 
- Each line is `VITE_FIREBASE_XXX=value` (no quotes, no spaces around `=`)
- Use YOUR actual values, not the example ones
- Save the file

### 5.3 Restart Dev Server
1. In your terminal, press `Ctrl + C` to stop the server
2. Run `npm run dev` again
3. The app will now connect to Firebase!

✅ **Configuration complete!**

---

## Step 6: Test Authentication

### 6.1 Create Test Account
1. Open http://localhost:3000
2. Click **"Sign Up"** tab
3. Enter:
   - Name: `Test User`
   - Email: `test@sati.ac.in`
   - Password: `password123`
4. Click **"Create Account"**
5. Complete the onboarding (select year, branch, interests, skills)

### 6.2 Verify in Firebase
1. Go back to Firebase Console
2. Click **"Authentication"** in sidebar
3. Click **"Users"** tab
4. You should see your test user listed!

✅ **Everything is working!**

---

## 🎉 Success Checklist

Make sure you've completed all these:

- ✅ Firebase project created
- ✅ Email/Password authentication enabled
- ✅ Firestore database created (test mode)
- ✅ Web app registered and credentials copied
- ✅ `.env` file created with all 6 values
- ✅ Dev server restarted
- ✅ Test account created successfully

---

## 🔒 Security Note

**For Production:**
1. Go to Firestore Database → Rules
2. Replace with proper security rules (I can help with this when you're ready to deploy)
3. Current "test mode" allows anyone to read/write for 30 days

---

## ❓ Troubleshooting

**Problem: "Firebase: Error (auth/invalid-api-key)"**
- Solution: Check that your `.env` file has the correct API key
- Make sure there are no quotes around the values
- Restart the dev server

**Problem: "Firebase: Error (auth/operation-not-allowed)"**
- Solution: Email/Password authentication is not enabled
- Go back to Step 2 and enable it

**Problem: Changes not working**
- Solution: Always restart dev server after editing `.env`
- Press `Ctrl + C`, then run `npm run dev` again

---

## 🚀 Next Steps

Once Firebase is working:
1. Test creating posts on Vibe Wall
2. Try the Collab Board
3. When ready to deploy, let me know - I'll help with deployment!

---

**Need help?** Just ask! I'm here to help with any step.
