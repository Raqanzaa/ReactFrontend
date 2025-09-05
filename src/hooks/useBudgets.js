import { useState, useEffect } from 'react';
import { budgetsService } from '../services/budgetsService';

export const useBudgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBudgets = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await budgetsService.getBudgets(params);
            setBudgets(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch budgets');
        } finally {
            setLoading(false);
        }
    };

    const createBudget = async (data) => {
        try {
            const response = await budgetsService.createBudget(data);
            setBudgets(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to create budget';
        }
    };

    const updateBudget = async (id, data) => {
        try {
            const response = await budgetsService.updateBudget(id, data);
            setBudgets(prev => prev.map(t => t.id === id ? response.data : t));
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to update budget';
        }
    };

    const deleteBudget = async (id) => {
        try {
            await budgetsService.deleteBudget(id);
            setBudgets(prev => prev.filter(t => t.id !== id));
            return true;
        } catch (err) {
            throw err.response?.data || 'Failed to delete budget';
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    return {
        budgets,
        loading,
        error,
        fetchBudgets,
        createBudget,
        updateBudget,
        deleteBudget,
    };
};