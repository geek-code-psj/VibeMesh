# Firestore Indexes Setup Guide

This guide explains how to set up the required Firestore indexes for Campus Connect.

## 📋 What Are Firestore Indexes?

Indexes make your queries fast. Without them, complex queries will fail or be very slow.

## 🎯 Two Ways to Set Up Indexes

### Option 1: Automatic (Recommended) ✨

**Just use the app!** Firebase will automatically prompt you to create indexes when needed.

**How it works:**
1. Use the app (e.g., filter vibes by "Today")
2. Check browser console
3. If you see an error like "The query requires an index"
4. Click the link in the error message
5. Firebase Console opens → Click "Create Index"
6. Wait 1-2 minutes for it to build
7. Refresh your app

**This is the easiest method!** You only create indexes as you actually need them.

---

### Option 2: Deploy All Indexes at Once (Advanced)

Use Firebase CLI to deploy all indexes from `firestore.indexes.json`.

#### Prerequisites:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login
```

#### Deploy Indexes:
```bash
# Initialize Firebase (if not already done)
firebase init firestore

# When prompted, select:
# - Firestore Rules: firestore.rules
# - Firestore Indexes: firestore.indexes.json

# Deploy indexes
firebase deploy --only firestore:indexes
```

Wait 2-5 minutes for all indexes to build.

---

## 📊 Indexes Included

The `firestore.indexes.json` file includes indexes for:

### 1. Vibes Collection
- **All vibes** (sorted by newest)
- **Today's vibes** (filtered by date, sorted by newest)
- **Most loved** (sorted by hearts count)

### 2. Section Posts Collection
- **Posts by section** (filtered by section, sorted by newest)
- **Posts by section + tag** (filtered by section and tag, sorted by newest)

### 3. Collabs Collection
- **All collabs** (sorted by newest)

---

## ✅ Verify Indexes

After deploying, verify in Firebase Console:

1. Go to https://console.firebase.google.com
2. Open your project: **campus-connect-sati**
3. Click **Firestore Database** → **Indexes** tab
4. You should see all indexes with status "Enabled" ✅

---

## 🔍 Troubleshooting

### Issue: Index creation fails
**Solution:** Check that collection names match exactly (case-sensitive)

### Issue: "Index already exists"
**Solution:** Skip or delete the existing index first

### Issue: Index shows "Building" for a long time
**Solution:** Wait up to 10 minutes. Large collections take longer.

---

## 💡 Pro Tip

**Start with Option 1** (automatic). Only use Option 2 if you:
- Want all indexes ready before launch
- Are deploying programmatically
- Have multiple environments (dev, staging, prod)

For a simple launch, let Firebase create indexes on-demand! 🚀
