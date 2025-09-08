import React from 'react';
import { formatDate, formatTransactionDisplay, TransactionIcon } from '../../utils/formatters';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    const { text, colorClass } = formatTransactionDisplay(transaction);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${transaction.description}"?`)) {
            onDelete(transaction.id);
        }
    };

    return (
        <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <span className="text-2xl">{TransactionIcon(transaction.type)}</span>
                <div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{formatDate(transaction.date)}</span>
                        {transaction.category?.name && <span>•</span>}
                        {transaction.category?.name && (
                            <span className="font-semibold">{transaction.category.name}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <span className={`text-sm font-semibold ${colorClass}`}>
                    {text}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="text-gray-400 hover:text-indigo-600"
                        title="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-red-600"
                        title="Delete"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </li>
    );
};

const TransactionList = ({ transactions = [], onEdit, onDelete }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        {transactions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        ) : (
            <div className="text-center py-8 text-gray-500">
                <p>No transactions to display.</p>
            </div>
        )}
    </div>
);

export default TransactionList;
