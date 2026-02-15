import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { Code, Rocket, Briefcase, TrendingUp, Paintbrush, GraduationCap } from 'lucide-react';

const Sections = () => {
    const sections = [
        {
            id: 'hackathons',
            name: 'Hackathons & Coding',
            description: 'Competitive coding, hackathons, and coding challenges',
            icon: Code,
            color: 'from-blue-500 to-cyan-500',
            postCount: 24,
        },
        {
            id: 'startups',
            name: 'Startups & E-Cell',
            description: 'Startup ideas, entrepreneurship, and business discussions',
            icon: Rocket,
            color: 'from-purple-500 to-pink-500',
            postCount: 18,
        },
        {
            id: 'projects',
            name: 'Branch Projects',
            description: 'Semester projects, mini-projects, and technical work',
            icon: Briefcase,
            color: 'from-orange-500 to-red-500',
            postCount: 32,
        },
        {
            id: 'placements',
            name: 'Placements & Internships',
            description: 'Job opportunities, interview prep, and career advice',
            icon: TrendingUp,
            color: 'from-green-500 to-teal-500',
            postCount: 45,
        },
        {
            id: 'design',
            name: 'Design & Content',
            description: 'UI/UX, graphic design, video editing, and content creation',
            icon: Paintbrush,
            color: 'from-pink-500 to-rose-500',
            postCount: 15,
        },
        {
            id: 'academics',
            name: 'Academics & Study',
            description: 'Study groups, notes sharing, and academic discussions',
            icon: GraduationCap,
            color: 'from-indigo-500 to-blue-500',
            postCount: 28,
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interest Sections</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Join communities around your interests
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <Link key={section.id} to={`/sections/${section.id}`}>
                            <Card
                                variant="default"
                                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {section.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    {section.description}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {section.postCount} posts
                                    </span>
                                    <span className="text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                        Explore →
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sections;
