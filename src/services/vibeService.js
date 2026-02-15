import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs,
    doc,
    updateDoc,
    increment,
    where,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase.config';

// Create a new vibe post
export const createVibe = async (vibeData) => {
    try {
        const vibe = {
            ...vibeData,
            heartsCount: 0,
            heartedBy: [],
            createdAt: Timestamp.now()
        };
        const docRef = await addDoc(collection(db, 'vibes'), vibe);
        return { id: docRef.id, ...vibe };
    } catch (error) {
        console.error('Error creating vibe:', error);
        throw error;
    }
};

// Fetch vibes with filters
export const fetchVibes = async (filterType = 'all') => {
    try {
        let q;

        if (filterType === 'today') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            q = query(
                collection(db, 'vibes'),
                where('createdAt', '>=', Timestamp.fromDate(today)),
                orderBy('createdAt', 'desc'),
                limit(100)
            );
        } else if (filterType === 'loved') {
            q = query(
                collection(db, 'vibes'),
                orderBy('heartsCount', 'desc'),
                limit(100)
            );
        } else {
            q = query(
                collection(db, 'vibes'),
                orderBy('createdAt', 'desc'),
                limit(100)
            );
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching vibes:', error);
        throw error;
    }
};

// Toggle heart on a vibe
export const toggleHeart = async (vibeId, userId) => {
    try {
        const vibeRef = doc(db, 'vibes', vibeId);
        // In a real implementation, you'd check if user already hearted
        // For now, we'll just increment
        await updateDoc(vibeRef, {
            heartsCount: increment(1)
        });
        return true;
    } catch (error) {
        console.error('Error toggling heart:', error);
        throw error;
    }
};
