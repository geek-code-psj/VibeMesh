import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Sparkles, Users, Briefcase, User, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    const navigation = [
        { name: 'Home', path: '/', icon: HomeIcon },
        { name: 'Vibe Wall', path: '/vibe-wall', icon: Sparkles },
        { name: 'Sections', path: '/sections', icon: Users },
        { name: 'Collab', path: '/collab', icon: Briefcase },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="glass-intense sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3">
                            <img
                                src="/vibemesh_logo.png"
                                alt="VibeMesh Logo"
                                className="w-10 h-10 rounded-xl"
                            />
                            <span className="text-xl font-bold hidden sm:block">
                                <span className="text-vibe">Vibe</span>
                                <span className="text-connect">Mesh</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navigation.slice(0, 4).map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isActive(item.path)
                                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right side buttons */}
                        <div className="flex items-center space-x-3">
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>
                            <Link
                                to="/profile"
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold"
                            >
                                U
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden glass-intense fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-around px-4 py-3">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex flex-col items-center space-y-1 relative"
                            >
                                {active && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-600 rounded-full"
                                    />
                                )}
                                <Icon
                                    className={`w-6 h-6 ${active
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                />
                                <span
                                    className={`text-xs font-medium ${active
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile bottom padding */}
            <div className="md:hidden h-20" />
        </div>
    );
};

export default Layout;
