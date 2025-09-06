import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const { loginWithTokens, user, loading } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access');
        const refreshToken = urlParams.get('refresh');

        if (accessToken && refreshToken) {
            loginWithTokens(accessToken, refreshToken);
        } else {
            navigate('/login?error=oauth_failed', { replace: true });
        }
    }, [loginWithTokens, navigate]);

    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, loading, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Completing authentication...</p>
            </div>
        </div>
    );
};

export default OAuthCallback;