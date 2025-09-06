import { useState, useEffect, useCallback } from 'react';
import { transactionsService } from '../services/transactionsService';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [byCategory, setByCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactions = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            // The service will append filters as query params (e.g., ?type=EX)
            const response = await transactionsService.getTransactions(filters);
            setTransactions(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    }, []);


    const fetchSummary = useCallback(async () => {
        try {
            const response = await transactionsService.getSummary();
            setSummary(response.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const fetchByCategory = useCallback(async () => {
        try {
            const response = await transactionsService.getByCategory();
            setByCategory(response.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const createTransaction = async (data) => {
        try {
            const response = await transactionsService.createTransaction(data);
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
        fetchSummary();
        fetchByCategory();
    }, [fetchTransactions, fetchSummary, fetchByCategory]);

    return {
        transactions,
        summary,
        byCategory,
        loading,
        error,
        fetchTransactions,
        fetchSummary,
        fetchByCategory,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    };
};
