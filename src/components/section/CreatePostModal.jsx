import { useState } from 'react';
import { auth } from '../../config/firebase.config';
import { createSectionPost } from '../../services/sectionService';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const CreatePostModal = ({ isOpen, onClose, onSuccess, sectionId, sectionName }) => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        tags: []
    });
    const [loading, setLoading] = useState(false);

    const availableTags = [
        { id: 'looking-for-team', label: 'Looking for Team' },
        { id: 'resources', label: 'Resources' },
        { id: 'announcement', label: 'Announcement' },
        { id: 'hiring', label: 'Hiring' },
        { id: 'question', label: 'Question' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            toast.error('Please login to create posts');
            return;
        }

        setLoading(true);

        try {
            await createSectionPost({
                sectionId,
                title: formData.title,
                body: formData.body,
                tags: formData.tags,
                author: {
                    name: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'Anonymous',
                    uid: auth.currentUser.uid
                },
                createdBy: auth.currentUser.uid
            });

            toast.success('Post created! 🎉');
            setFormData({ title: '', body: '', tags: [] });
            onClose();
            onSuccess();
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error(`Error creating post: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleTag = (tagId) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tagId)
                ? prev.tags.filter(t => t !== tagId)
                : [...prev.tags, tagId]
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`New Post in ${sectionName}`} size="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Post Title *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="e.g., Looking for ML developers for SIH 2026"
                        required
                        maxLength={100}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formData.title.length}/100 characters
                    </p>
                </div>

                {/* Body Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description *
                    </label>
                    <textarea
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none custom-scrollbar"
                        rows={6}
                        placeholder="Describe what you're looking for, sharing, or announcing..."
                        required
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formData.body.length}/500 characters
                    </p>
                </div>

                {/* Tags Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Tags (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(tag.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${formData.tags.includes(tag.id)
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {tag.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Buttons */}
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
                        disabled={!formData.title.trim() || !formData.body.trim() || loading}
                    >
                        Create Post
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreatePostModal;
