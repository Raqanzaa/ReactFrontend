import api from './api'; // axios instance

export const transactionsService = {
    getTransactions: (params) => api.get('/transactions/', { params }),
    createTransaction: (data) => api.post('/transactions/', data),
    updateTransaction: (id, data) => api.put(`/transactions/${id}/`, data),
    deleteTransaction: (id) => api.delete(`/transactions/${id}/`),
    getSummary: () => api.get('/transactions/summary/'),
    getByCategory: () => api.get('/transactions/by_category/'),
};
