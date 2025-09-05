import { useState, useEffect, useCallback } from 'react';
import { transactionsService } from '../services/transactionsService';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactions = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionsService.getTransactions(params);
            // Handle both paginated and non-paginated responses
            setTransactions(response.data.results || response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    }, []);

    const createTransaction = async (data) => {
        try {
            const response = await transactionsService.createTransaction(data);
            // Optimistic update: add the new item to the top
            setTransactions(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to create transaction';
        }
    };

    const updateTransaction = async (id, data) => {
        try {
            const response = await transactionsService.updateTransaction(id, data);
            setTransactions(prev => prev.map(t => (t.id === id ? response.data : t)));
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to update transaction';
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await transactionsService.deleteTransaction(id);
            setTransactions(prev => prev.filter(t => t.id !== id));
            return true;
        } catch (err) {
            throw err.response?.data || 'Failed to delete transaction';
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return {
        transactions,
        loading,
        error,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    };
};