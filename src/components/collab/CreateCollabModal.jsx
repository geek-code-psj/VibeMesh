import { useState } from 'react';
import { auth } from '../../config/firebase.config';
import { createCollab } from '../../services/collabService';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const CreateCollabModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'project',
        branches: [],
        rolesNeeded: '',
        deadline: ''
    });
    const [loading, setLoading] = useState(false);

    const types = [
        { id: 'project', label: '🚀 Project' },
        { id: 'hackathon', label: '💻 Hackathon' },
        { id: 'startup', label: '💡 Startup' },
        { id: 'study_group', label: '📚 Study Group' },
    ];

    const availableBranches = ['CSE', 'IT', 'EC', 'ME', 'CE', 'EE'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            toast.error('Please login to create collaborations');
            return;
        }

        if (formData.branches.length === 0) {
            toast.error('Please select at least one branch');
            return;
        }

        setLoading(true);

        try {
            // Parse roles from comma-separated string
            const rolesArray = formData.rolesNeeded
                .split(',')
                .map(r => r.trim())
                .filter(r => r.length > 0);

            await createCollab({
                title: formData.title,
                description: formData.description,
                type: formData.type,
                branches: formData.branches,
                rolesNeeded: rolesArray,
                deadline: formData.deadline,
                status: 'open',
                createdBy: auth.currentUser.uid,
                interestedUsers: [],
                interestedCount: 0
            });

            toast.success('Collaboration created! 🎉');
            setFormData({
                title: '',
                description: '',
                type: 'project',
                branches: [],
                rolesNeeded: '',
                deadline: ''
            });
            onClose();
            onSuccess();
        } catch (error) {
            console.error('Error creating collab:', error);
            toast.error(`Error creating collaboration: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleBranch = (branch) => {
        setFormData(prev => ({
            ...prev,
            branches: prev.branches.includes(branch)
                ? prev.branches.filter(b => b !== branch)
                : [...prev.branches, branch]
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Collaboration" size="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Collaboration Type *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {types.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: type.id })}
                                className={`p-4 rounded-lg border-2 transition-all ${formData.type === type.id
                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <span className={`text-sm font-medium ${formData.type === type.id
                                        ? 'text-primary-600'
                                        : 'text-gray-600 dark:text-gray-400'
                                    }`}>
                                    {type.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="e.g., Smart Campus IoT Project"
                        required
                        maxLength={100}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description *
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none custom-scrollbar"
                        rows={4}
                        placeholder="Describe your project, goals, and what you're looking for..."
                        required
                        maxLength={500}
                    />
                </div>

                {/* Branches Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Target Branches *
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {availableBranches.map((branch) => (
                            <button
                                key={branch}
                                type="button"
                                onClick={() => toggleBranch(branch)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${formData.branches.includes(branch)
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {branch}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Roles Needed */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Roles Needed (comma-separated)
                    </label>
                    <input
                        type="text"
                        value={formData.rolesNeeded}
                        onChange={(e) => setFormData({ ...formData, rolesNeeded: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="e.g., Frontend Dev, Designer, ML Engineer"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate multiple roles with commas
                    </p>
                </div>

                {/* Deadline */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deadline (Optional)
                    </label>
                    <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
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
                        disabled={!formData.title.trim() || !formData.description.trim() || formData.branches.length === 0 || loading}
                    >
                        Create Collaboration
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateCollabModal;
