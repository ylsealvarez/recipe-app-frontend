"use client";
import { useState, useEffect } from "react";

export interface CurrentUser {
    username: string;
    firstname: string;
    password: string;
    // …otros campos que necesites
}

export function useCurrentUser(): CurrentUser | null {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("jwt"));

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        console.log("[useCurrentUser] token:", token);
        if (!token) return;

        fetch("http://localhost:8080/api/users/me", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => {
                console.log("[useCurrentUser] status:", res.status);
                if (!res.ok) throw new Error("no auth");
                return res.json() as Promise<CurrentUser>;
            })
            .then(setUser)
            .catch(() => setUser(null));
    }, [token]);
    const refresh = () => setToken(localStorage.getItem("jwt"));
    return user;
}