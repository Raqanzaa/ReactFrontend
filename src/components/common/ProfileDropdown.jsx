import React, { useState, useEffect, useRef } from 'react';

const ProfileDropdown = ({ user, onLogout }) => {
    // State to manage whether the dropdown is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Ref to the dropdown container to detect outside clicks
    const dropdownRef = useRef(null);

    // This effect handles clicks outside of the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Add event listener when the dropdown is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Icon/Image Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {user.profile_picture ? (
                    <img
                        className="h-full w-full rounded-full object-cover"
                        src={user.profile_picture}
                        alt="Profile"
                    />
                ) : (
                    <svg
                        className="h-6 w-6 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                >
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm text-gray-700">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user.first_name || user.username}
                        </p>
                    </div>
                    <a
                        href="/profile" // Change this to your profile page route
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                    >
                        See Profile
                    </a>
                    <button
                        onClick={onLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;