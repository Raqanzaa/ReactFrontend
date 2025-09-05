import api from './api';

export const budgetsService = {
    getBudgets: () => api.get('/budgets/budgets/'),
    getBudget: (id) => api.get(`/budgets/budgets/${id}/`),
    createBudget: (data) => api.post('/budgets/budgets/', data),
    updateBudget: (id, data) => api.put(`/budgets/budgets/${id}/`, data),
    deleteBudget: (id) => api.delete(`/budgets/budgets/${id}/`),
};