import api from './api';

export const transactionsService = {
    // Categories
    getCategories: () => api.get('/transactions/categories/'),
    createCategory: (data) => api.post('/transactions/categories/', data),
    updateCategory: (id, data) => api.put(`/transactions/categories/${id}/`, data),
    deleteCategory: (id) => api.delete(`/transactions/categories/${id}/`),

    // Accounts
    getAccounts: () => api.get('/transactions/accounts/'),
    createAccount: (data) => api.post('/transactions/accounts/', data),
    updateAccount: (id, data) => api.put(`/transactions/accounts/${id}/`, data),
    deleteAccount: (id) => api.delete(`/transactions/accounts/${id}/`),

    // Transactions
    getTransactions: (params) => api.get('/transactions/transactions/', { params }),
    createTransaction: (data) => api.post('/transactions/transactions/', data),
    updateTransaction: (id, data) => api.put(`/transactions/transactions/${id}/`, data),
    deleteTransaction: (id) => api.delete(`/transactions/transactions/${id}/`),

    // Reports
    getMonthlySummary: () => api.get('/transactions/monthly-summary/'),
    getCategorySpending: () => api.get('/transactions/category-spending/'),
};