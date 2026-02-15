import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';

// Create or update user profile
export const saveUserProfile = async (userId, profileData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            ...profileData,
            updatedAt: new Date()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error('Error saving profile:', error);
        throw error;
    }
};

// Get user profile
export const getUserProfile = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting profile:', error);
        throw error;
    }
};

// Update user profile fields
export const updateUserProfile = async (userId, updates) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            ...updates,
            updatedAt: new Date()
        });
        return true;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};
