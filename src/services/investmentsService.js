import api from './api';

export const investmentsService = {
    getInvestments: () => api.get('/investments/investments/'),
    getInvestment: (id) => api.get(`/investments/investments/${id}/`),
    createInvestment: (data) => api.post('/investments/investments/', data),
    updateInvestment: (id, data) => api.put(`/investments/investments/${id}/`, data),
    deleteInvestment: (id) => api.delete(`/investments/investments/${id}/`),
};