import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import toast from 'react-hot-toast';

const VibeCard = ({ vibe }) => {
    const [hearts, setHearts] = useState(vibe.heartsCount || 0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const colorClasses = {
        pink: 'vibe-pink',
        purple: 'vibe-purple',
        orange: 'vibe-orange',
        teal: 'vibe-teal',
        yellow: 'vibe-yellow',
        lime: 'vibe-lime',
        blue: 'vibe-blue',
    };

    const typeLabels = {
        compliment: '💝 Compliment',
        gratitude: '🙏 Gratitude',
        confession: '💭 Confession',
    };

    const handleHeart = async (e) => {
        e.stopPropagation();
        if (hasLiked) return;

        try {
            setHearts(hearts + 1);
            setHasLiked(true);

            // Update in Firestore
            const vibeRef = doc(db, 'vibes', vibe.id);
            await updateDoc(vibeRef, {
                heartsCount: increment(1),
            });
        } catch (error) {
            console.error('Error adding heart:', error);
            setHearts(hearts);
            setHasLiked(false);
            toast.error('Could not add heart');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, rotate: Math.random() > 0.5 ? 1 : -1 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${colorClasses[vibe.color] || colorClasses.blue} p-6 rounded-lg sticky-note cursor-pointer relative overflow-hidden`}
        >
            {/* Type Badge */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white/90 bg-black/10 px-3 py-1 rounded-full">
                    {typeLabels[vibe.type]}
                </span>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleHeart}
                    disabled={hasLiked}
                    className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
                >
                    <Heart
                        className={`w-4 h-4 ${hasLiked ? 'fill-white text-white' : 'text-white'}`}
                    />
                    <span className="text-sm font-medium text-white">{hearts}</span>
                </motion.button>
            </div>

            {/* Content */}
            <p
                className={`text-white font-medium leading-relaxed ${!isExpanded && vibe.text.length > 120 ? 'line-clamp-3' : ''
                    }`}
            >
                {vibe.text}
            </p>

            {/* Timestamp */}
            <p className="text-xs text-white/70 mt-3">
                {vibe.createdAt?.toDate ?
                    vibe.createdAt.toDate().toLocaleDateString() :
                    new Date(vibe.createdAt).toLocaleDateString()
                }
            </p>

            {/* Decorative corner fold */}
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-black/5"
                style={{
                    clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                }}
            />
        </motion.div>
    );
};

export default VibeCard;
