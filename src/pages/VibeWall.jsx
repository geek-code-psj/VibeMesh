import { useState, useEffect } from 'react';
import { fetchVibes as fetchVibesService } from '../services/vibeService';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import VibeCard from '../components/vibe/VibeCard';
import CreateVibeModal from '../components/vibe/CreateVibeModal';

const VibeWall = () => {
    const [vibes, setVibes] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVibesData();
    }, [filter]);

    const fetchVibesData = async () => {
        setLoading(true);
        try {
            const vibesData = await fetchVibesService(filter);
            setVibes(vibesData);
        } catch (error) {
            console.error('Error fetching vibes:', error);
            setVibes([]);
        } finally {
            setLoading(false);
        }
    };

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'today', label: 'Today' },
        { id: 'loved', label: 'Most Loved' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vibe Wall</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Spread positivity, share gratitude ✨
                    </p>
                </div>
                <Button
                    variant="primary"
                    icon={<Plus className="w-5 h-5" />}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    New Vibe
                </Button>
            </div>

            {/* Filters */}
            <div className="flex space-x-2">
                {filters.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f.id
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-12">
                    <div className="spinner w-12 h-12 text-primary-600" />
                </div>
            )}

            {/* Masonry Grid */}
            {!loading && (
                <div className="masonry-grid">
                    {vibes.map((vibe) => (
                        <div key={vibe.id} className="masonry-item">
                            <VibeCard vibe={vibe} />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && vibes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">No vibes yet. Be the first to post!</p>
                </div>
            )}

            <CreateVibeModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchVibesData}
            />
        </div>
    );
};

export default VibeWall;
