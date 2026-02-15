import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { fetchSectionPosts, addReaction } from '../services/sectionService';
import { auth } from '../config/firebase.config';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CreatePostModal from '../components/section/CreatePostModal';
import toast from 'react-hot-toast';

// Section metadata
const SECTIONS = {
    hackathons: {
        name: 'Hackathons & Coding',
        description: 'Competitive coding, hackathons, and coding challenges',
    },
    startups: {
        name: 'Startups & Entrepreneurship',
        description: 'Build the next big thing, discuss ideas, find co-founders',
    },
    design: {
        name: 'Design & Creativity',
        description: 'UI/UX, graphic design, content creation, and creative projects',
    },
    placement: {
        name: 'Placements & Internships',
        description: 'Job opportunities, interview prep, resume tips',
    },
    sports: {
        name: 'Sports & Fitness',
        description: 'Team formation, tournaments, fitness goals',
    },
    events: {
        name: 'Events & Workshops',
        description: 'Campus events, workshops, seminars, and meetups',
    },
};

const SectionDetail = () => {
    const { sectionId } = useParams();
    const [selectedTag, setSelectedTag] = useState('all');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const section = SECTIONS[sectionId] || {
        name: 'Unknown Section',
        description: 'Section not found',
    };

    const tags = [
        { id: 'all', label: 'All' },
        { id: 'looking-for-team', label: 'Looking for Team' },
        { id: 'resources', label: 'Resources' },
        { id: 'announcement', label: 'Announcement' },
        { id: 'hiring', label: 'Hiring' },
    ];

    useEffect(() => {
        loadPosts();
    }, [sectionId, selectedTag]);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const fetchedPosts = await fetchSectionPosts(sectionId, selectedTag);
            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleReaction = async (postId, emoji) => {
        if (!auth.currentUser) {
            toast.error('Please login to react');
            return;
        }

        try {
            await addReaction(postId, emoji);
            // Optimistically update UI
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        reactions: {
                            ...post.reactions,
                            [emoji]: (post.reactions[emoji] || 0) + 1
                        }
                    };
                }
                return post;
            }));
        } catch (error) {
            console.error('Error adding reaction:', error);
            toast.error('Failed to add reaction');
        }
    };

    const handleNewPost = () => {
        if (!auth.currentUser) {
            toast.error('Please login to create posts');
            return;
        }
        setIsCreateModalOpen(true);
    };

    const tagBadgeColors = {
        'looking-for-team': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        'resources': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        'announcement': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
        'hiring': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    };

    // Filter posts by selected tag (client-side filter for empty state)
    const filteredPosts = selectedTag === 'all'
        ? posts
        : posts.filter(post => post.tags?.includes(selectedTag));

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/sections">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{section.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{section.description}</p>
                    </div>
                </div>
                <Button
                    variant="primary"
                    icon={<Plus className="w-5 h-5" />}
                    onClick={handleNewPost}
                >
                    New Post
                </Button>
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <button
                        key={tag.id}
                        onClick={() => setSelectedTag(tag.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTag === tag.id
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        {tag.label}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-12">
                    <div className="spinner w-12 h-12 text-primary-600" />
                </div>
            )}

            {/* Posts */}
            {!loading && (
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <Card key={post.id} variant="default" className="p-6 hover:shadow-lg transition-shadow">
                            {/* Post Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">{post.author?.name || 'Anonymous'}</span>
                                        {post.author?.year && post.author?.branch && (
                                            <>
                                                <span>•</span>
                                                <span>{post.author.year}{post.author.year === 1 ? 'st' : post.author.year === 2 ? 'nd' : post.author.year === 3 ? 'rd' : 'th'} Year {post.author.branch}</span>
                                            </>
                                        )}
                                        <span>•</span>
                                        <span>{post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Recently'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Post Body */}
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{post.body}</p>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${tagBadgeColors[tag] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {tags.find(t => t.id === tag)?.label || tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Reactions */}
                            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {['👍', '🔥', '💡'].map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => handleReaction(post.id, emoji)}
                                        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="text-lg">{emoji}</span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {post.reactions?.[emoji] || 0}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">
                        No posts yet in this section. Be the first to post!
                    </p>
                </div>
            )}

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={loadPosts}
                sectionId={sectionId}
                sectionName={section.name}
            />
        </div>
    );
};

export default SectionDetail;
