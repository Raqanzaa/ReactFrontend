import React from 'react';
import { Link } from 'react-router-dom';

const GoalsProgress = ({ goals = [] }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const calculateDaysLeft = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Financial Goals</h2>
                <Link
                    to="/goals"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.length === 0 ? (
                    <div className="col-span-2">
                        <p className="text-gray-500 text-center py-4">No goals set yet</p>
                    </div>
                ) : (
                    goals.slice(0, 4).map((goal) => {
                        const progress = (goal.current_amount / goal.target_amount) * 100;
                        const daysLeft = calculateDaysLeft(goal.deadline);

                        return (
                            <div key={goal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium text-gray-900">{goal.name}</h3>
                                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                        {goal.goal_type}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-medium">{progress.toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full bg-indigo-500"
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-600">Target:</span>
                                        <p className="font-medium">{formatCurrency(goal.target_amount)}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Saved:</span>
                                        <p className="font-medium">{formatCurrency(goal.current_amount)}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Deadline:</span>
                                        <p className="font-medium">{formatDate(goal.deadline)}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Days left:</span>
                                        <p className="font-medium">{daysLeft}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default GoalsProgress;