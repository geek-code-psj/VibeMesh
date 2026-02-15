import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';
import { Mail, Phone, LogOut, Edit } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (auth.currentUser) {
                try {
                    const profile = await getUserProfile(auth.currentUser.uid);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Error loading profile:', error);
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="spinner w-12 h-12 text-primary-600" />
            </div>
        );
    }

    // Fallback data for display
    const user = userProfile || {
        name: auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'User',
        email: auth.currentUser?.email || '',
        year: 1,
        branch: 'N/A',
        interests: [],
        skills: [],
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Profile Header */}
            <Card variant="glass" className="p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {user.year === 1 ? '1st' : user.year === 2 ? '2nd' : user.year === 3 ? '3rd' : '4th'} Year • {user.branch}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => toast.info('Edit profile coming soon!')}
                    >
                        Edit Profile
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <Mail className="w-5 h-5" />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <Phone className="w-5 h-5" />
                        <span>{user.phone || 'Not provided'}</span>
                    </div>
                </div>
            </Card>

            {/* Interests */}
            <Card variant="default" className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Interests</h2>
                {user.interests && user.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {user.interests.map(interest => (
                            <span
                                key={interest}
                                className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No interests added yet. Complete your profile to add interests!</p>
                )}
            </Card>

            {/* Skills */}
            <Card variant="default" className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
                {user.skills && user.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map(skill => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No skills added yet. Complete your profile to add skills!</p>
                )}
            </Card>

            {/* Logout */}
            <Card variant="default" className="p-6">
                <Button
                    variant="danger"
                    onClick={handleLogout}
                    icon={<LogOut className="w-4 h-4" />}
                >
                    Logout
                </Button>
            </Card>
        </div>
    );
};

export default Profile;
