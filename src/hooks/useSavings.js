import { useState, useEffect } from 'react';
import { savingsService } from '../services/savingsService';

export const useSavings = () => {
    const [savings, setSavings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSavingsPlan = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await savingsService.getSavings(params);
            setSavings(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch savings');
        } finally {
            setLoading(false);
        }
    };

    const createSavingsPlan = async (data) => {
        try {
            const response = await savingsService.createSavingsPlan(data);
            setSavings(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to create savings plan';
        }
    };

    const updateSavingsPlan = async (id, data) => {
        try {
            const response = await savingsService.updateSavingsPlan(id, data);
            setSavings(prev => prev.map(t => t.id === id ? response.data : t));
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to update savings plan';
        }
    };

    const deleteSavingsPlan = async (id) => {
        try {
            await savingsService.deleteSavingsPlan(id);
            setSavings(prev => prev.filter(t => t.id !== id));
            return true;
        } catch (err) {
            throw err.response?.data || 'Failed to delete savings plan';
        }
    };

    useEffect(() => {
        fetchSavingsPlan();
    }, []);

    return {
        savings,
        loading,
        error,
        fetchSavingsPlan,
        createSavingsPlan,
        updateSavingsPlan,
        deleteSavingsPlan,
    };
};