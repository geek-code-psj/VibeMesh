/**
 * Seed script to populate Firestore with sample data for testing
 * Run this once to add sample vibes, posts, and collabs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Import your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBXoRJ2-jnEuuB5MEVOedGFQqCL9RVnTHQ",
    authDomain: "campus-connect-sati.firebaseapp.com",
    projectId: "campus-connect-sati",
    storageBucket: "campus-connect-sati.firebasestorage.app",
    messagingSenderId: "350410519092",
    appId: "1:350410519092:web:427fb99e4ea21fb9a09061"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample Vibes
const sampleVibes = [
    {
        text: "Shoutout to the team who organized yesterday's tech fest! It was amazing! 🚀",
        type: "compliment",
        color: "pink",
        heartsCount: 24,
        heartedBy: [],
        createdAt: Timestamp.now()
    },
    {
        text: "Thank you to everyone who helped me with my project. Couldn't have done it without you! 🙏",
        type: "gratitude",
        color: "yellow",
        heartsCount: 18,
        heartedBy: [],
        createdAt: Timestamp.now()
    },
    {
        text: "I actually really enjoy Data Structures class... am I the only one? 👀",
        type: "confession",
        color: "purple",
        heartsCount: 42,
        heartedBy: [],
        createdAt: Timestamp.now()
    },
    {
        text: "Props to the library staff for staying open late during exam week. You're the real MVPs!",
        type: "compliment",
        color: "teal",
        heartsCount: 15,
        heartedBy: [],
        createdAt: Timestamp.now()
    }
];

// Sample Collabs
const sampleCollabs = [
    {
        title: "Smart Dustbin IoT Project",
        description: "Building an IoT-based smart dustbin that detects fill level and sends alerts. Need hardware expertise and app development skills.",
        type: "project",
        branches: ["CSE", "EC"],
        rolesNeeded: ["Hardware", "App Dev", "IoT"],
        status: "open",
        deadline: "2026-03-15",
        createdBy: "sample_user_1",
        interestedUsers: [],
        interestedCount: 3,
        createdAt: Timestamp.now()
    },
    {
        title: "SIH 2026 - Healthcare Solution",
        description: "Developing a telemedicine platform for rural areas. Looking for full stack developers, UI/UX designers, and ML engineers.",
        type: "hackathon",
        branches: ["CSE", "IT"],
        rolesNeeded: ["Frontend Dev", "Backend Dev", "Designer", "ML Engineer"],
        status: "open",
        deadline: "2026-02-28",
        createdBy: "sample_user_2",
        interestedUsers: [],
        interestedCount: 8,
        createdAt: Timestamp.now()
    },
    {
        title: "Campus Marketplace Startup",
        description: "Building a marketplace for college students to buy/sell used items, find roommates, and share resources.",
        type: "startup",
        branches: ["CSE", "IT", "ME"],
        rolesNeeded: ["Full Stack Dev", "Designer", "Marketing", "Finance"],
        status: "open",
        deadline: "2026-04-01",
        createdBy: "sample_user_3",
        interestedUsers: [],
        interestedCount: 12,
        createdAt: Timestamp.now()
    },
    {
        title: "Machine Learning Study Group",
        description: "Weekly study sessions for ML enthusiasts. Covering theory and hands-on projects. All levels welcome!",
        type: "study_group",
        branches: ["CSE", "IT"],
        rolesNeeded: ["ML Enthusiasts"],
        status: "open",
        deadline: "2026-02-25",
        createdBy: "sample_user_4",
        interestedUsers: [],
        interestedCount: 15,
        createdAt: Timestamp.now()
    }
];

// Sample Section Posts
const sampleSectionPosts = [
    {
        title: "Looking for 2 ML developers for SIH 2026",
        body: "We have a great idea for Smart India Hackathon. Need people who know Python, ML frameworks like TensorFlow or PyTorch. Experience with CNNs preferred.",
        sectionId: "hackathons",
        tags: ["looking-for-team"],
        author: {
            name: "Rahul Sharma",
            year: 3,
            branch: "CSE"
        },
        reactions: { "👍": 12, "🔥": 5, "💡": 3 },
        createdBy: "sample_user_1",
        createdAt: Timestamp.now()
    },
    {
        title: "Free DSA resources compilation",
        body: "I compiled all the best free resources for Data Structures and Algorithms. Includes YouTube playlists, practice platforms, and PDFs.",
        sectionId: "hackathons",
        tags: ["resources"],
        author: {
            name: "Priya Singh",
            year: 2,
            branch: "IT"
        },
        reactions: { "👍": 34, "🔥": 18, "💡": 7 },
        createdBy: "sample_user_2",
        createdAt: Timestamp.now()
    }
];

async function seedData() {
    console.log('🌱 Starting to seed data...');

    try {
        // Add Vibes
        console.log('Adding sample vibes...');
        for (const vibe of sampleVibes) {
            await addDoc(collection(db, 'vibes'), vibe);
        }
        console.log(`✅ Added ${sampleVibes.length} vibes`);

        // Add Collabs
        console.log('Adding sample collabs...');
        for (const collab of sampleCollabs) {
            await addDoc(collection(db, 'collabs'), collab);
        }
        console.log(`✅ Added ${sampleCollabs.length} collabs`);

        // Add Section Posts
        console.log('Adding sample section posts...');
        for (const post of sampleSectionPosts) {
            await addDoc(collection(db, 'sectionPosts'), post);
        }
        console.log(`✅ Added ${sampleSectionPosts.length} section posts`);

        console.log('🎉 Seeding complete!');
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    }

    process.exit(0);
}

seedData();
