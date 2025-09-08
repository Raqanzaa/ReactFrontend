import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatTransactionDisplay, TransactionIcon } from '../../utils/formatters';

const TransactionRow = ({ transaction }) => {
    const { text, colorClass } = formatTransactionDisplay(transaction);

    return (
        <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
                <span className="text-xl">{TransactionIcon(transaction.type)}</span>
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {transaction.description || "No description"}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                </div>
            </div>
            <span className={`text-sm font-semibold ${colorClass}`}>{text}</span>
        </div>
    );
};

const RecentTransactions = ({ transactions = [] }) => {
    // 2. The incorrect function call is removed from here.
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <Link to="/transactions" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View All
                </Link>
            </div>

            <div className="">
                {transactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No transactions yet</p>
                ) : (
                    // 3. The map now renders the new, clean TransactionRow component.
                    transactions.map((transaction) => (
                        <TransactionRow key={transaction.id} transaction={transaction} />
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;