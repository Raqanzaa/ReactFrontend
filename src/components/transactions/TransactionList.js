import React from 'react';

const TransactionList = ({ transactions = [] }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getTransactionType = (amount, isTransfer) => {
        if (isTransfer) return 'text-blue-600 bg-blue-100';
        return amount >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
    };

    const getTransactionIcon = (amount, isTransfer) => {
        if (isTransfer) return '🔄';
        return amount >= 0 ? '⬇️' : '⬆️';
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Transactions</h2>
            </div>

            {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No transactions found.</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl">
                                        {getTransactionIcon(transaction.amount, transaction.is_transfer)}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className={`text-sm font-semibold ${getTransactionType(transaction.amount, transaction.is_transfer)} px-2 py-1 rounded-full`}>
                                        {formatCurrency(transaction.amount)}
                                    </span>

                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 text-sm">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;