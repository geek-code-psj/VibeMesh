import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { Heart, Smile, MessageCircle } from 'lucide-react';

const CreateVibeModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        text: '',
        type: 'compliment',
    });
    const [loading, setLoading] = useState(false);

    const types = [
        { id: 'compliment', label: 'Compliment', icon: Heart, color: 'pink' },
        { id: 'gratitude', label: 'Gratitude', icon: Smile, color: 'yellow' },
        { id: 'confession', label: 'Confession', icon: MessageCircle, color: 'purple' },
    ];

    const colors = ['pink', 'purple', 'orange', 'teal', 'yellow', 'lime', 'blue'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Random color assignment
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            await addDoc(collection(db, 'vibes'), {
                text: formData.text,
                type: formData.type,
                color: randomColor,
                heartsCount: 0,
                heartedBy: [],  // Required by Firestore rules
                createdAt: Timestamp.now(),
            });

            toast.success('Vibe posted! 🎉');
            setFormData({ text: '', type: 'compliment' });
            onClose();
            onSuccess();
        } catch (error) {
            console.error('Error creating vibe:', error);
            toast.error(`Error posting vibe: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const charLimit = 300;
    const remaining = charLimit - formData.text.length;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Share Your Vibe" size="md">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Choose Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {types.map((type) => {
                            const Icon = type.icon;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: type.id })}
                                    className={`p-4 rounded-lg border-2 transition-all ${formData.type === type.id
                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon
                                        className={`w-6 h-6 mx-auto mb-2 ${formData.type === type.id
                                            ? 'text-primary-600'
                                            : 'text-gray-400'
                                            }`}
                                    />
                                    <span
                                        className={`text-sm font-medium ${formData.type === type.id
                                            ? 'text-primary-600'
                                            : 'text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        {type.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Text Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Message
                    </label>
                    <textarea
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none custom-scrollbar"
                        rows={5}
                        maxLength={charLimit}
                        placeholder="Share your positive vibes..."
                        required
                    />
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Posts are anonymous 🔒
                        </p>
                        <p
                            className={`text-sm font-medium ${remaining < 50
                                ? 'text-red-600'
                                : remaining < 100
                                    ? 'text-yellow-600'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {remaining} characters left
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        isLoading={loading}
                        disabled={!formData.text.trim() || loading}
                    >
                        Post Vibe
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateVibeModal;
