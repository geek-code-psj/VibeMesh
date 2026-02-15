import { Link } from 'react-router-dom';
import { Sparkles, Users, Briefcase } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="glass rounded-2xl p-8 md:p-12 text-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="/vibemesh_logo.png"
                        alt="VibeMesh Logo"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-xl animate-float"
                    />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to{' '}
                    <span className="text-vibe">Vibe</span>
                    <span className="text-mesh">Mesh</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    <span className="text-connect font-semibold">Connect</span>, collaborate, and celebrate with your SATI community
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
                <Link to="/vibe-wall">
                    <Card variant="default" className="p-6 hover:shadow-xl transition-shadow cursor-pointer h-full">
                        <div className="w-12 h-12 rounded-xl vibe-pink flex items-center justify-center mb-4">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Vibe Wall</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Share anonymous shoutouts, gratitude, and positive vibes with the community
                        </p>
                        <Button variant="ghost" size="sm" className="w-full">
                            Explore Wall →
                        </Button>
                    </Card>
                </Link>

                <Link to="/sections">
                    <Card variant="default" className="p-6 hover:shadow-xl transition-shadow cursor-pointer h-full">
                        <div className="w-12 h-12 rounded-xl vibe-purple flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Interest Sections</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Join topic-based communities and connect with like-minded students
                        </p>
                        <Button variant="ghost" size="sm" className="w-full">
                            Browse Sections →
                        </Button>
                    </Card>
                </Link>

                <Link to="/collab">
                    <Card variant="default" className="p-6 hover:shadow-xl transition-shadow cursor-pointer h-full">
                        <div className="w-12 h-12 rounded-xl vibe-teal flex items-center justify-center mb-4">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Collab Board</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Find teammates for projects, hackathons, and startup ideas
                        </p>
                        <Button variant="ghost" size="sm" className="w-full">
                            View Opportunities →
                        </Button>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default Home;
