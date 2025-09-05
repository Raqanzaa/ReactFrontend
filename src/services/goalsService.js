import api from './api';

export const goalsService = {
    getGoals: () => api.get('/goals/goals/'),
    getGoal: (id) => api.get(`/goals/goals/${id}/`),
    createGoal: (data) => api.post('/goals/goals/', data),
    updateGoal: (id, data) => api.put(`/goals/goals/${id}/`, data),
    deleteGoal: (id) => api.delete(`/goals/goals/${id}/`),
};