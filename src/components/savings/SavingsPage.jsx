import React, { useState } from 'react';

const SavingsPage = () => {
    const [savingsPlans, setSavingsPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Savings Plans</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    {showForm ? 'Cancel' : 'Create Plan'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Create Savings Plan</h2>
                    <div className="text-gray-500">
                        Savings plan form will be implemented here
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Your Savings Plans</h2>
                {savingsPlans.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No savings plans created yet.</p>
                        <p className="text-sm">Create a savings plan to achieve your financial goals.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Savings plan items will be listed here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavingsPage;