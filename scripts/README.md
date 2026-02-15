# 🌱 Sample Data Seed Script

This script adds sample data to your Firestore database for testing purposes.

## What It Adds

- **4 Sample Vibes** - Compliments, gratitude, and confessions
- **4 Sample Collabs** - Projects, hackathons, startup, study group
- **2 Sample Section Posts** - For the Hackathons section

## How to Run

### Option 1: Manual Copy-Paste (Recommended)

1. Open Firebase Console: https://console.firebase.google.com
2. Go to **Firestore Database**
3. Click **Start Collection**
4. Manually add documents using the sample data from `scripts/seedData.js`

### Option 2: Run Script (Requires Firebase Admin SDK setup)

```bash
# Install dependencies
npm install

# Run the seed script
node scripts/seedData.js
```

## Sample Data Preview

### Vibes
- "Shoutout to the team who organized yesterday's tech fest!"
- "Thank you to everyone who helped me with my project"
- "I actually really enjoy Data Structures class..."

### Collabs
- Smart Dustbin IoT Project
- SIH 2026 - Healthcare Solution
- Campus Marketplace Startup
- Machine Learning Study Group

### Section Posts
- Looking for 2 ML developers for SIH 2026
- Free DSA resources compilation

## After Seeding

Refresh your app and you should see:
- ✅ Vibes on the Vibe Wall
- ✅ Collabs on the Collab Board
- ✅ Posts in Hackathons section

## Clean Up

To remove sample data later, go to Firestore Console and delete the documents manually, or run:

```bash
# Coming soon: cleanup script
```
