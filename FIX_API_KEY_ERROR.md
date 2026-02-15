# Fix: Firebase API Key Invalid Error

You're getting "auth/api-key-not-valid" even though we have the correct key. This is a Firebase Console configuration issue.

## 🔍 Root Cause

The API key is correct, BUT one of these is wrong in Firebase Console:
1. ❌ Authentication is not initialized
2. ❌ API key has restrictions enabled
3. ❌ Authentication services are not enabled

## 🛠️ Solution: Complete Firebase Setup

Follow these steps **exactly**:

---

### Step 1: Check Authentication Initialization

1. Go to https://console.firebase.google.com
2. Click your **"campus-connect-sati"** project (the card/tile with your project name)
3. Look at the **left sidebar menu**
4. Click **"Build"** (if it's collapsed, expand it)
5. Under "Build", click **"Authentication"** 

**What you should see:**
- ✅ If you see tabs (Users, Sign-in method, Templates): **GOOD! Go to Step 2**
- ❌ If you see "Get started" button: **CLICK IT NOW, then go to Step 2**

---

### Step 2: Enable Email/Password Authentication

1. Make sure you're on the **Authentication** page
2. Click the **"Sign-in method"** tab at the top
3. You should now see a list of providers (Email/Password, Google, Facebook, etc.)

**If you DON'T see the list:**
- The Authentication service didn't initialize properly
- Try refreshing the Firebase Console page
- Or click "Get started" again

4. Find **"Email/Password"** (should be first in the list)
5. Click on the **entire row** (not just the toggle)
6. A panel opens on the right
7. Toggle **"Enable"** to ON (turns blue/green)
8. Click **"Save"** at the bottom

---

### Step 3: Check API Key Restrictions

1. In Firebase Console, click the **⚙️ gear icon** (top left, next to "Project Overview")
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Find your web app (Campus Connect Web)
5. Click the **⚙️ settings icon** next to it
6. Look for **"API key"** section

**Check:** Is there a restriction message or warning?
- ✅ If it says "None" or no restrictions: **GOOD!**
- ❌ If it shows restrictions: Click "Edit" and remove restrictions (set to "None")

---

### Step 4: Alternative - Create New Web App

If nothing above works, let's get a fresh API key:

1. In Firebase Console → Project Settings
2. Scroll to **"Your apps"** 
3. Click **"Add app"** button
4. Choose **Web** (`</>` icon)
5. Nickname: `Campus Connect Fresh`
6. Click **"Register app"**
7. **COPY THE NEW firebaseConfig** values
8. Send me the new config and I'll update the app

---

## 🎯 Quick Test After Each Step

After completing Step 2 (enabling Email/Password):

1. **Wait 30 seconds** for Firebase to update
2. Go to your app: http://localhost:3000
3. **Refresh the page** (F5)
4. Try signing up again:
   - Email: `test@sati.ac.in`
   - Password: `test123456`
5. Click "Create Account"

**Expected result:** Should work! You'll be taken to onboarding.

---

## 📊 Verification Checklist

Before trying again, make sure:

- [ ] Authentication service is initialized (no "Get started" button)
- [ ] You can see the "Sign-in method" tab
- [ ] Email/Password provider shows as "Enabled" (green checkmark)
- [ ] No API key restrictions in Project Settings

---

## 🆘 If Still Not Working

Take a screenshot of:
1. Firebase Console → Authentication → Sign-in method page
2. The error message in your browser

And I'll help you troubleshoot further!

---

## ✅ What Works Already

- ✅ Guest mode (browse without login)
- ✅ Firebase config is loaded
- ✅ App is running correctly

We just need to enable authentication in Firebase Console!
