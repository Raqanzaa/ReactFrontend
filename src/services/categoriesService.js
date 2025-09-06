import api from './api';

export const categoriesService = {
    // ✅ Corrected URL to match the Django router
    getCategories: () => api.get('/categories/'),
    getCategoryById: (id) => api.get(`/categories/${id}/`),
    createCategories: (data) => api.post('/categories/', data),
    updateCategories: (id, data) => api.put(`/categories/${id}/`, data),
    deleteCategories: (id) => api.delete(`/categories/${id}/`),
};