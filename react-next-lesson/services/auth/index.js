import * as jwtDecode from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }
};

export const removeToken = () => {
    localStorage.removeItem('token');
};
