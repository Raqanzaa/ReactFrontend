import React, { useState, useEffect } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import TransactionFilters from './TransactionFilters';

const TransactionsPage = () => {
    const { transactions, loading, error, fetchTransactions } = useTransactions();
    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchTransactions(filters);
    }, [filters, fetchTransactions]);

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    {showForm ? 'Cancel' : 'Add Transaction'}
                </button>
            </div>

            <TransactionFilters onFiltersChange={handleFiltersChange} />

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
                    <TransactionForm
                        onSuccess={() => {
                            setShowForm(false);
                            fetchTransactions();
                        }}
                    />
                </div>
            )}

            <TransactionList transactions={transactions} />
        </div>
    );
};

export default TransactionsPage;