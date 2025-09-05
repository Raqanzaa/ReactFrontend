import api from './api';

export const savingsService = {
    // Note: 'savings-plans' is a common convention for multi-word model names
    getSavingsPlans: () => api.get('/savings/savings-plans/'),
    getSavingsPlan: (id) => api.get(`/savings/savings-plans/${id}/`),
    createSavingsPlan: (data) => api.post('/savings/savings-plans/', data),
    updateSavingsPlan: (id, data) => api.put(`/savings/savings-plans/${id}/`, data),
    deleteSavingsPlan: (id) => api.delete(`/savings/savings-plans/${id}/`),
};