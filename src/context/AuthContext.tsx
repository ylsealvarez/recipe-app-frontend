'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CurrentUser {
    username: string;
    firstname: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
    roles: string[];
    // …otros campos
}

interface AuthContextType {
    user: CurrentUser | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<CurrentUser | null>(null);

    // Llama al backend con el token
    const fetchUser = async (token: string) => {
        const res = await fetch('http://localhost:8080/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('JWT inválido');
        return (await res.json()) as CurrentUser;
    };

    // login: guarda token y carga user
    const login = async (token: string) => {
        localStorage.setItem('jwt', token);
        const me = await fetchUser(token);
        setUser(me);
    };

    // logout: limpia todo
    const logout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
    };

    // Al montar, chequeamos si ya había token
    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                try {
                    const me = await fetchUser(token);
                    setUser(me);
                } catch {
                    localStorage.removeItem('jwt');
                }
            }
        };
        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook de conveniencia
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
    return ctx;
};