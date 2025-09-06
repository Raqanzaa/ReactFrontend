import { useState, useEffect, useCallback } from 'react';
import { categoriesService } from '../services/categoriesService';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoriesService.getCategories();
            setCategories(response.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, error, fetchCategories };
};
