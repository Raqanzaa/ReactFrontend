import React from 'react';
import { Link } from 'react-router-dom';

const BudgetProgress = ({ budgets = [] }) => {
    const calculateProgress = (budget) => {
        // This is a simplified calculation - you'd need actual spending data
        const spent = Math.random() * budget.amount; // Replace with actual data
        const percentage = (spent / budget.amount) * 100;
        return { spent, percentage };
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getProgressColor = (percentage) => {
        if (percentage < 60) return 'bg-green-500';
        if (percentage < 85) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Budget Progress</h2>
                <Link
                    to="/budgets"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {budgets.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No budgets set up yet</p>
                ) : (
                    budgets.slice(0, 3).map((budget) => {
                        const { spent, percentage } = calculateProgress(budget);
                        return (
                            <div key={budget.id}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-900">{budget.name}</span>
                                    <span className="text-xs text-gray-500">
                                        {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${getProgressColor(percentage)}`}
                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {percentage.toFixed(1)}% spent
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BudgetProgress;