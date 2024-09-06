import api from "@/axios";

export const fetchUserProfile = (token) =>
    api.get('/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const loginUser = (credentials) =>
    api.post('/auth/login', credentials);

export default api;
