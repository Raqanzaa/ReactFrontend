import React, { useState, useCallback } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import TransactionFilters from './TransactionFilters';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorDisplay from '../../components/ui/ErrorDisplay';

const TransactionsPage = () => {
    const {
        transactions,
        loading,
        error,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState(null);

    const handleFiltersChange = useCallback((newFilters) => {
        const activeFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([, value]) => value !== '')
        );
        fetchTransactions(activeFilters);
    }, [fetchTransactions]);

    const handleAdd = useCallback(() => {
        setTransactionToEdit(null);
        setIsFormOpen(true);
    }, []);

    const handleEdit = useCallback((transaction) => {
        setTransactionToEdit(transaction);
        setIsFormOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsFormOpen(false);
        setTransactionToEdit(null);
    }, []);

    const handleFormSubmit = async (formData) => {
        const action = transactionToEdit
            ? () => updateTransaction(transactionToEdit.id, formData)
            : () => createTransaction(formData);

        await action();
    };

    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                <button
                    onClick={handleAdd}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    + Add Transaction
                </button>
            </div>

            <TransactionFilters onFiltersChange={handleFiltersChange} />

            {loading && transactions.length === 0 && <LoadingSpinner />}
            {error && <ErrorDisplay message={error} />}
            {!loading && !error && (
                <TransactionList
                    transactions={transactions}
                    onEdit={handleEdit}
                    onDelete={deleteTransaction}
                />
            )}

            <Modal 
                isOpen={isFormOpen} 
                onClose={handleCloseModal}
                title={transactionToEdit ? 'Edit Transaction' : 'Add New Transaction'}
            >
                <TransactionForm
                    transactionToEdit={transactionToEdit}
                    onSubmit={handleFormSubmit}
                    onSuccess={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default TransactionsPage;
