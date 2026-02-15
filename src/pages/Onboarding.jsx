import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { ChevronRight, Check } from 'lucide-react';

const INTERESTS = [
    'Hackathons', 'Startups', 'Projects', 'Design', 'Content Creation',
    'Placements', 'Internships', 'Sports', 'Music', 'Photography', 'Gaming', 'Coding'
];

const SKILLS = [
    'Web Development', 'App Development', 'ML/AI', 'UI/UX Design', 'Video Editing',
    'Graphic Design', 'Content Writing', 'Management', 'Hardware/IoT', 'Data Science'
];

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        year: '',
        branch: '',
        interests: [],
        skills: [],
    });
    const navigate = useNavigate();

    const branches = ['CSE', 'IT', 'EC', 'ME', 'CE', 'EE'];

    const toggleSelection = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handleComplete = async () => {
        try {
            const user = auth.currentUser;
            await setDoc(doc(db, 'users', user.uid), {
                ...formData,
                email: user.email,
                name: user.displayName || user.email.split('@')[0],
                onboardingComplete: true,
                createdAt: new Date(),
            });

            toast.success('Profile complete! Welcome to Campus Connect 🎉');
            navigate('/');
        } catch (error) {
            toast.error('Error saving profile: ' + error.message);
        }
    };

    const canProceed = () => {
        if (step === 1) return formData.year && formData.branch;
        if (step === 2) return formData.interests.length >= 3;
        if (step === 3) return formData.skills.length >= 1;
        return false;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
            <div className="glass-intense max-w-2xl w-full rounded-2xl shadow-2xl p-8">
                {/* Progress bar */}
                <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= i
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                                }`}>
                                {step > i ? <Check className="w-5 h-5" /> : i}
                            </div>
                            {i < 3 && (
                                <div className={`flex-1 h-1 mx-2 rounded ${step > i ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-700'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Campus Connect!</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Let's set up your profile</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Select Your Year
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map(year => (
                                        <button
                                            key={year}
                                            onClick={() => setFormData(prev => ({ ...prev, year }))}
                                            className={`py-3 rounded-lg font-medium transition-all ${formData.year === year
                                                    ? 'bg-primary-600 text-white shadow-lg'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                                }`}
                                        >
                                            {year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Select Your Branch
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {branches.map(branch => (
                                        <button
                                            key={branch}
                                            onClick={() => setFormData(prev => ({ ...prev, branch }))}
                                            className={`py-3 rounded-lg font-medium transition-all ${formData.branch === branch
                                                    ? 'bg-primary-600 text-white shadow-lg'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                                }`}
                                        >
                                            {branch}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Interests */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What interests you?</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Pick at least 3 interests</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {INTERESTS.map(interest => (
                                <button
                                    key={interest}
                                    onClick={() => toggleSelection('interests', interest)}
                                    className={`py-3 px-4 rounded-lg font-medium transition-all ${formData.interests.includes(interest)
                                            ? 'bg-primary-600 text-white shadow-lg'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                        }`}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Skills */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What are your skills?</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Pick at least 1 skill</p>

                        <div className="grid grid-cols-2 gap-3">
                            {SKILLS.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => toggleSelection('skills', skill)}
                                    className={`py-3 px-4 rounded-lg font-medium transition-all ${formData.skills.includes(skill)
                                            ? 'bg-primary-600 text-white shadow-lg'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                        }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {step > 1 ? (
                        <Button variant="outline" onClick={() => setStep(step - 1)}>
                            Back
                        </Button>
                    ) : <div />}

                    {step < 3 ? (
                        <Button
                            variant="primary"
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed()}
                            icon={<ChevronRight className="w-5 h-5" />}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleComplete}
                            disabled={!canProceed()}
                        >
                            Complete Profile
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
