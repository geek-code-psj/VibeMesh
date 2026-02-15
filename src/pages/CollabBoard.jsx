import { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { fetchCollabs, showInterest } from '../services/collabService';
import { auth } from '../config/firebase.config';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CreateCollabModal from '../components/collab/CreateCollabModal';
import toast from 'react-hot-toast';

const CollabBoard = () => {
    const [filters, setFilters] = useState({
        type: 'all',
        branch: 'all',
        year: 'all',
    });
    const [collabs, setCollabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const types = [
        { id: 'all', label: 'All' },
        { id: 'project', label: 'Project' },
        { id: 'hackathon', label: 'Hackathon' },
        { id: 'startup', label: 'Startup' },
        { id: 'study_group', label: 'Study Group' },
    ];

    const branches = ['all', 'CSE', 'IT', 'EC', 'ME', 'CE', 'EE'];
    const years = ['all', '1', '2', '3', '4'];

    useEffect(() => {
        loadCollabs();
    }, [filters]);

    const loadCollabs = async () => {
        setLoading(true);
        try {
            const fetchedCollabs = await fetchCollabs(filters);
            setCollabs(fetchedCollabs);
        } catch (error) {
            console.error('Error loading collabs:', error);
            setCollabs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleShowInterest = async (collabId) => {
        if (!auth.currentUser) {
            toast.error('Please login to show interest');
            return;
        }

        try {
            await showInterest(collabId, auth.currentUser.uid);
            toast.success('Interest shown!');
            // Refresh collabs
            loadCollabs();
        } catch (error) {
            console.error('Error showing interest:', error);
            toast.error('Failed to show interest');
        }
    };

    const handleCreateCollab = () => {
        if (!auth.currentUser) {
            toast.error('Please login to create collabs');
            return;
        }
        setIsCreateModalOpen(true);
    };

    const handleViewDetails = (collabId) => {
        toast.info('Collab details view coming soon!');
    };

    const typeColors = {
        project: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        hackathon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
        startup: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
        study_group: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    };

    // Client-side filtering for year (since Firestore query is limited)
    const filteredCollabs = collabs.filter(collab => {
        if (filters.year !== 'all' && collab.targetYears && !collab.targetYears.includes(parseInt(filters.year))) {
            return false;
        }
        return true;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Collab Board</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Find teammates and collaborate on amazing projects
                    </p>
                </div>
                <Button
                    variant="primary"
                    icon={<Plus className="w-5 h-5" />}
                    onClick={handleCreateCollab}
                >
                    Create Collab
                </Button>
            </div>

            {/* Filters */}
            <Card variant="glass" className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                    <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Filters</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {/* Type Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Type
                        </label>
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            {types.map(type => (
                                <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Branch Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Branch
                        </label>
                        <select
                            value={filters.branch}
                            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            {branches.map(branch => (
                                <option key={branch} value={branch}>
                                    {branch === 'all' ? 'All Branches' : branch}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Year
                        </label>
                        <select
                            value={filters.year}
                            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year === 'all' ? 'All Years' : `${year}${year === '1' ? 'st' : year === '2' ? 'nd' : year === '3' ? 'rd' : 'th'} Year`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredCollabs.length} {filteredCollabs.length === 1 ? 'opportunity' : 'opportunities'}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-12">
                    <div className="spinner w-12 h-12 text-primary-600" />
                </div>
            )}

            {/* Collab Cards */}
            {!loading && (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredCollabs.map((collab) => (
                        <Card key={collab.id} variant="default" className="p-6 hover:shadow-xl transition-shadow">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[collab.type]}`}>
                                    {types.find(t => t.id === collab.type)?.label}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${collab.status === 'open'
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}>
                                    {collab.status === 'open' ? 'Open' : 'Closed'}
                                </span>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {collab.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {collab.description}
                            </p>

                            {/* Branches */}
                            {collab.branches && collab.branches.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {collab.branches.map(branch => (
                                        <span
                                            key={branch}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                                        >
                                            {branch}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Roles Needed */}
                            {collab.rolesNeeded && collab.rolesNeeded.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                                        Roles Needed:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {collab.rolesNeeded.map(role => (
                                            <span
                                                key={role}
                                                className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-medium"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <p>{collab.interestedCount || 0} interested</p>
                                    {collab.deadline && (
                                        <p>Deadline: {new Date(collab.deadline).toLocaleDateString()}</p>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleShowInterest(collab.id)}
                                    >
                                        Show Interest
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleViewDetails(collab.id)}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredCollabs.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">
                        No collaborations found with these filters. Try adjusting your filters or create a new collab!
                    </p>
                </div>
            )}

            {/* Create Collab Modal */}
            <CreateCollabModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={loadCollabs}
            />
        </div>
    );
};

export default CollabBoard;
