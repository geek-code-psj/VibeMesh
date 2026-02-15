import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Welcome back!');
                navigate('/');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                toast.success('Account created! Complete your profile.');
                navigate('/onboarding');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestMode = () => {
        toast.success('Welcome, Guest! Explore Campus Connect');
        navigate('/');
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-4">
            <div className="glass-intense max-w-md w-full rounded-2xl shadow-2xl p-8">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campus Connect</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">SATI Edition</p>
                </div>

                {/* Toggle */}
                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 rounded-md font-medium transition-colors ${isLogin
                            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 rounded-md font-medium transition-colors ${!isLogin
                            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="you@sati.ac.in"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full mt-6"
                        isLoading={loading}
                    >
                        {isLogin ? 'Log In' : 'Create Account'}
                    </Button>
                </form>

                {/* Guest Mode */}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleGuestMode}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
