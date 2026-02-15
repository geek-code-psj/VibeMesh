import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase.config';

// Pages (will be created)
import Home from './pages/Home';
import VibeWall from './pages/VibeWall';
import Sections from './pages/Sections';
import SectionDetail from './pages/SectionDetail';
import CollabBoard from './pages/CollabBoard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Layout from './components/layout/Layout';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner w-12 h-12 text-primary-600" />
            </div>
        );
    }

    return (
        <Router>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />

            <Routes>
                {/* Public routes */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/login" />} />

                {/* Main routes - accessible to guests and logged-in users */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/vibe-wall" element={<VibeWall />} />
                    <Route path="/sections" element={<Sections />} />
                    <Route path="/sections/:sectionId" element={<SectionDetail />} />
                    <Route path="/collab" element={<CollabBoard />} />
                    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
