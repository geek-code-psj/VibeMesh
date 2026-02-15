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

// Create a new section post
export const createSectionPost = async (postData) => {
    try {
        const post = {
            ...postData,
            reactions: { '👍': 0, '🔥': 0, '💡': 0 },
            createdAt: Timestamp.now()
        };
        const docRef = await addDoc(collection(db, 'sectionPosts'), post);
        return { id: docRef.id, ...post };
    } catch (error) {
        console.error('Error creating section post:', error);
        throw error;
    }
};

// Fetch posts for a specific section
export const fetchSectionPosts = async (sectionId, tagFilter = 'all') => {
    try {
        let q = query(
            collection(db, 'sectionPosts'),
            where('sectionId', '==', sectionId),
            orderBy('createdAt', 'desc'),
            limit(50)
        );

        if (tagFilter !== 'all') {
            q = query(
                collection(db, 'sectionPosts'),
                where('sectionId', '==', sectionId),
                where('tags', 'array-contains', tagFilter),
                orderBy('createdAt', 'desc'),
                limit(50)
            );
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching section posts:', error);
        throw error;
    }
};

// Add reaction to a post
export const addReaction = async (postId, emoji) => {
    try {
        const postRef = doc(db, 'sectionPosts', postId);
        await updateDoc(postRef, {
            [`reactions.${emoji}`]: increment(1)
        });
        return true;
    } catch (error) {
        console.error('Error adding reaction:', error);
        throw error;
    }
};

// Get post count for a section
export const getSectionPostCount = async (sectionId) => {
    try {
        const q = query(
            collection(db, 'sectionPosts'),
            where('sectionId', '==', sectionId)
        );
        const snapshot = await getDocs(q);
        return snapshot.size;
    } catch (error) {
        console.error('Error getting post count:', error);
        return 0;
    }
};
