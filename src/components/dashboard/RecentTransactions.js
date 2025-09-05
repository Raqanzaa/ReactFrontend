import React from 'react';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions = [] }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getTransactionIcon = (amount, isTransfer) => {
        if (isTransfer) return '🔄';
        return amount >= 0 ? '⬇️' : '⬆️';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <Link
                    to="/transactions"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    View All
                </Link>
            </div>

            <div className="space-y-3">
                {transactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No transactions yet</p>
                ) : (
                    transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">
                                    {getTransactionIcon(transaction.amount, transaction.is_transfer)}
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                    <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                                </div>
                            </div>
                            <span className={`text-sm font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {formatCurrency(transaction.amount)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;