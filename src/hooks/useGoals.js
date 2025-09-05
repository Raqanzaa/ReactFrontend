import { useState, useEffect } from 'react';
import { goalsService } from '../services/goalsService';

export const useGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGoals = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await goalsService.getGoals(params);
            setGoals(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch goals');
        } finally {
            setLoading(false);
        }
    };

    const createGoal = async (data) => {
        try {
            const response = await goalsService.createGoal(data);
            setGoals(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to create goal';
        }
    };

    const updateGoal = async (id, data) => {
        try {
            const response = await goalsService.updateGoal(id, data);
            setGoals(prev => prev.map(t => t.id === id ? response.data : t));
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to update goal';
        }
    };

    const deleteGoal = async (id) => {
        try {
            await goalsService.deleteGoal(id);
            setGoals(prev => prev.filter(t => t.id !== id));
            return true;
        } catch (err) {
            throw err.response?.data || 'Failed to delete goal';
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return {
        goals,
        loading,
        error,
        fetchGoals,
        createGoal,
        updateGoal,
        deleteGoal,
    };
};