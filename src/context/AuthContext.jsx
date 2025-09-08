// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserOnAuth = async () => {
            if (accessToken) {
                setLoading(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                try {
                    const response = await axios.get('http://localhost:8000/api/auth/profile/');
                    setUser(response.data);
                } catch (error) {
                    console.error('Token is invalid, logging out.', error);
                    logout();
                } finally {
                    setLoading(false);
                }
            } else {
                delete axios.defaults.headers.common['Authorization'];
                setUser(null);
                setLoading(false);
            }
        };

        fetchUserOnAuth();
    }, [accessToken]);

    const loginWithTokens = (newAccessToken, newRefreshToken) => {
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        setAccessToken(newAccessToken);
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', { email, password });
            const { access, refresh } = response.data;
            loginWithTokens(access, refresh); // Use the centralized function
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Login failed'
            };
        }
    };

    // Register function, also updated
    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', userData);
            const { access, refresh } = response.data;
            loginWithTokens(access, refresh); // Log in the user immediately after registration
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken(null); // This will trigger the useEffect to clear the user state
    };

    const value = {
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
        loginWithTokens // Expose the new function
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Don't render children until the initial loading is complete */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily consume the context
export const useAuth = () => {
    return useContext(AuthContext);
};