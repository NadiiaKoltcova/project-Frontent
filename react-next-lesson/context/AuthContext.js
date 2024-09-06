'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {decodeToken, getToken, removeToken, setToken} from "@/services";
import {loginUser} from "@/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setAuthToken(token);
                setUser(decoded);
            } else {
                removeToken();
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            const token = response.data.token;
            setToken(token);
            const decoded = decodeToken(token);
            setAuthToken(token);
            setUser(decoded);
            router.push('/profile');
        } catch (error) {
            throw new Error('Failed to login');
        }
    };

    const logout = () => {
        removeToken();
        setAuthToken(null);
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ authToken, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
