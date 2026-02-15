# Testing & Troubleshooting Guide

Since I can't access your browser directly, please follow these steps to test and let me know what happens:

## 🧪 Test 1: Check if Firebase is Connected

1. **Open your browser** at http://localhost:3000
2. **Open Developer Console**:
   - Press `F12` or `Ctrl+Shift+I` (Windows)
   - Click the "Console" tab
3. **Look for this message**:
   ```
   Firebase Config Check: {hasApiKey: true, hasProjectId: true, projectId: 'campus-connect-sati'}
   ```
   
✅ **If you see this**: Firebase is connected correctly!  
❌ **If you see errors**: Copy the error message and send it to me

---

## 🧪 Test 2: Try Creating an Account

### Step-by-Step:

1. On the login page, click the **"Sign Up"** tab (on the right)

2. Fill in the form:
   - **Full Name**: `Demo User`
   - **Email**: `demo@sati.ac.in`
   - **Password**: `demo123456` (at least 6 characters)

3. Click **"Create Account"** button

4. **What should happen**:
   - ✅ You should see a success toast message
   - ✅ You'll be redirected to the onboarding page
   - ✅ You'll see 3 steps: Year/Branch → Interests → Skills

### If you see an error:

📸 **Take a screenshot** or copy the exact error message and send it to me.

Common errors and fixes:

| Error Message | Solution |
|--------------|----------|
| "auth/invalid-api-key" | Firebase credentials not loaded |
| "auth/network-request-failed" | Check internet connection |
| "auth/email-already-in-use" | Use a different email or try login instead |
| "auth/weak-password" | Use at least 6 characters |

---

## 🧪 Test 3: Try Guest Mode

1. On the login page, click **"Continue as Guest"** at the bottom

2. **What should happen**:
   - ✅ Success toast: "Welcome, Guest! Explore Campus Connect"
   - ✅ Redirected to Home page
   - ✅ You can browse Vibe Wall, Sections, and Collab Board

---

## 🧪 Test 4: Verify in Firebase Console

After creating an account:

1. Go to https://console.firebase.google.com
2. Open your **"campus-connect-sati"** project
3. Click **"Authentication"** in the left sidebar
4. Click **"Users"** tab

✅ **You should see**: Your test user (demo@sati.ac.in) listed!

---

## 📋 What to Report Back

Please tell me:

1. ✅ or ❌ **Did Test 1 pass**? (Firebase config in console)
2. ✅ or ❌ **Did Test 2 pass**? (Create account)
3. ✅ or ❌ **Did Test 3 pass**? (Guest mode)
4. If any failed, **what error message** did you see?

---

## 🔧 Quick Fixes I Can Try

Based on what you report, I can:
- Fix Firebase configuration issues
- Adjust authentication settings
- Fix any code errors
- Help with Firebase Console setup

**Just let me know what happens!** 😊
