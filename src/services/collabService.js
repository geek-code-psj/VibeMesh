import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs,
    doc,
    updateDoc,
    arrayUnion,
    where,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase.config';

// Create a new collab post
export const createCollab = async (collabData) => {
    try {
        const collab = {
            ...collabData,
            createdAt: Timestamp.now()
        };
        const docRef = await addDoc(collection(db, 'collabs'), collab);
        return { id: docRef.id, ...collab };
    } catch (error) {
        console.error('Error creating collab:', error);
        throw error;
    }
};

// Fetch collabs with filters
export const fetchCollabs = async (filters = {}) => {
    try {
        let q = query(
            collection(db, 'collabs'),
            orderBy('createdAt', 'desc'),
            limit(50)
        );

        const snapshot = await getDocs(q);
        let collabs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Client-side filtering (Firestore has limitations on multiple where clauses)
        if (filters.type && filters.type !== 'all') {
            collabs = collabs.filter(c => c.type === filters.type);
        }
        if (filters.branch && filters.branch !== 'all') {
            collabs = collabs.filter(c => c.branches?.includes(filters.branch));
        }
        if (filters.year && filters.year !== 'all') {
            collabs = collabs.filter(c => c.targetYears?.includes(filters.year));
        }

        return collabs;
    } catch (error) {
        console.error('Error fetching collabs:', error);
        throw error;
    }
};

// Show interest in a collab
export const showInterest = async (collabId, userId) => {
    try {
        const collabRef = doc(db, 'collabs', collabId);
        await updateDoc(collabRef, {
            interestedUsers: arrayUnion(userId),
            interestedCount: increment(1)
        });
        return true;
    } catch (error) {
        console.error('Error showing interest:', error);
        throw error;
    }
};

// Update collab status
export const updateCollabStatus = async (collabId, status) => {
    try {
        const collabRef = doc(db, 'collabs', collabId);
        await updateDoc(collabRef, { status });
        return true;
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
};
