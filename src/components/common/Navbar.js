import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navbar = [
        { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
        { name: 'Transactions', href: '/transactions', icon: '💳' },
        { name: 'Budgets', href: '/budgets', icon: '📊' },
        { name: 'Goals', href: '/goals', icon: '🎯' },
        { name: 'Savings', href: '/savings', icon: '💰' },
        { name: 'Investments', href: '/investments', icon: '📈' },
    ];

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
                            MoneyManager
                        </Link>
                        <div className="hidden md:flex space-x-4">
                            {navbar.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.href
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Hello, {user?.first_name || user?.username}</span>
                        <button
                            onClick={logout}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;