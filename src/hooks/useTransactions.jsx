// hooks/useTransactions.js

import { useReducer, useCallback, useEffect } from 'react';
import { transactionsService } from '../services/transactionsService';

// Reducer function to manage all state transitions
const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, transactions: action.payload };
        case 'SET_AGGREGATES': // For summary and byCategory
            return { ...state, loading: false, summary: action.payload.summary, byCategory: action.payload.byCategory };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'MANIPULATE_STATE': // Used for optimistic updates
            return { ...state, transactions: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const initialState = {
    transactions: [],
    summary: null,
    byCategory: [],
    loading: true, // Start with loading true
    error: null,
};

export const useTransactions = () => {
    const [state, dispatch] = useReducer(transactionsReducer, initialState);

    const fetchTransactions = useCallback(async (filters = {}) => {
        dispatch({ type: 'FETCH_START' });
        try {
            const response = await transactionsService.getTransactions(filters);
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to fetch transactions';
            dispatch({ type: 'FETCH_ERROR', payload: errorMsg });
        }
    }, []);

    // Fetch summary and category data together
    const fetchAggregates = useCallback(async () => {
        try {
            // Run requests in parallel for speed
            const [summaryRes, byCategoryRes] = await Promise.all([
                transactionsService.getSummary(),
                transactionsService.getByCategory(),
            ]);
            dispatch({ type: 'SET_AGGREGATES', payload: { summary: summaryRes.data, byCategory: byCategoryRes.data } });
        } catch (err) {
            console.error("Failed to fetch aggregate data", err);
            // Optionally dispatch an error for this too
        }
    }, []);

    // Refactored CRUD functions with rollback on error
    const createTransaction = async (data) => {
        try {
            const newTransaction = await transactionsService.createTransaction(data);
            // Add to state after successful creation
            dispatch({ type: 'MANIPULATE_STATE', payload: [newTransaction.data, ...state.transactions] });
            return newTransaction.data;
        } catch (err) {
            console.error('Create transaction failed:', err);
            throw err.response?.data || 'Failed to create transaction';
        }
    };

    const updateTransaction = async (id, data) => {
        const originalTransactions = state.transactions; // 1. Save original state
        const updatedTransactions = originalTransactions.map(t => (t.id === id ? { ...t, ...data } : t));
        dispatch({ type: 'MANIPULATE_STATE', payload: updatedTransactions }); // 2. Optimistic update

        try {
            const response = await transactionsService.updateTransaction(id, data);
            // The API response might have more up-to-date data (e.g., timestamps)
            const finalTransactions = originalTransactions.map(t => (t.id === id ? response.data : t));
            dispatch({ type: 'MANIPULATE_STATE', payload: finalTransactions });
            return response.data;
        } catch (err) {
            dispatch({ type: 'MANIPULATE_STATE', payload: originalTransactions }); // 3. Rollback on error
            console.error('Update transaction failed:', err);
            throw err.response?.data || 'Failed to update transaction';
        }
    };

    const deleteTransaction = async (id) => {
        const originalTransactions = state.transactions; // 1. Save original state
        const filteredTransactions = originalTransactions.filter(t => t.id !== id);
        dispatch({ type: 'MANIPULATE_STATE', payload: filteredTransactions }); // 2. Optimistic update

        try {
            await transactionsService.deleteTransaction(id);
            return true;
        } catch (err) {
            dispatch({ type: 'MANIPULATE_STATE', payload: originalTransactions }); // 3. Rollback on error
            console.error('Delete transaction failed:', err);
            throw err.response?.data || 'Failed to delete transaction';
        }
    };
    
    // Initial data fetch
    useEffect(() => {
        fetchTransactions();
        fetchAggregates();
    }, [fetchTransactions, fetchAggregates]);


    return {
        ...state,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    };
};