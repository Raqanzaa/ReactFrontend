import { useState, useEffect } from 'react';
import { investmentsService } from '../services/investmentsService';

export const useInvestments = () => {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInvestments = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await investmentsService.getInvestments(params);
            setInvestments(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch investments');
        } finally {
            setLoading(false);
        }
    };

    const createInvestment = async (data) => {
        try {
            const response = await investmentsService.createInvestment(data);
            setInvestments(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to create investment';
        }
    };

    const updateInvestment = async (id, data) => {
        try {
            const response = await investmentsService.updateInvestment(id, data);
            setInvestments(prev => prev.map(t => t.id === id ? response.data : t));
            return response.data;
        } catch (err) {
            throw err.response?.data || 'Failed to update investment';
        }
    };

    const deleteInvestment = async (id) => {
        try {
            await investmentsService.deleteInvestment(id);
            setInvestments(prev => prev.filter(t => t.id !== id));
            return true;
        } catch (err) {
            throw err.response?.data || 'Failed to delete investment';
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    return {
        investments,
        loading,
        error,
        fetchInvestments,
        createInvestment,
        updateInvestment,
        deleteInvestment,
    };
};