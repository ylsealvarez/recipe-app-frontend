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
    console.log('🔐 AuthProvider mounted');
    const [user, setUser] = useState<CurrentUser | null>(null);


    // Llama al backend con el token
    const fetchUser = async (token: string) => {
        const res = await fetch('http://localhost:8080/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('JWT invalid');
        const raw = await res.json();

        console.log('🔍 raw.roles from /api/users/me:', raw.roles);

        const rawRoles = Array.isArray(raw.roles) ? raw.roles : [];
        const roles: string[] = rawRoles
            .map((r: unknown) => {
                if (typeof r === 'string') {
                    return r.startsWith('ROLE_') ? r : `ROLE_${r}`;
                }
                if (r && typeof r === 'object' && 'authority' in r) {
                    return (r as { authority: string }).authority;
                }
                if (r && typeof r === 'object' && 'role' in r) {
                    return `ROLE_${(r as { role: string }).role}`;
                }
                return '';
            })
            .filter(Boolean);


        console.log('🔍 normalized roles:', roles);

        // 2) Comprueba el resultado de la normalización

        return {
            username: raw.username,
            firstname: raw.firstname,
            surname: raw.surname,
            email: raw.email,
            phoneNumber: raw.phoneNumber,
            address: raw.address,
            roles,
            // …otros campos si los necesitas
        } as CurrentUser;
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
        console.log('🔐 AuthProvider running init effect');
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
    console.log('🔐 useAuth ->', ctx);
    if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
    return ctx;
};