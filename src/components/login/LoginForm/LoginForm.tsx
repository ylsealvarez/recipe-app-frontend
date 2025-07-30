"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.sass";
import { useAuth } from "app/context/AuthContext";

export const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const form = event.currentTarget;
            const data = new FormData(form);
            const payload = {
                username: data.get("username") as string,
                password: data.get("password") as string,
            };

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const token = res.headers.get("Authorization");
            if (!token) throw new Error("No se recibió token");
            await login(token);
            router.push("/");
            // por ejemplo con router.push("/dashboard")
            console.log("Login OK, token:", token);
        } catch (e: any) {
            console.error(e);
            setError("Login fallido: " + (e.message || e.toString()));
        }
    };

    return (
        <div className={styles.NewAccountForm}  >
            <h1 className={styles.NewAccountForm__title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.NewAccountForm__form}>
                <input type="text" name="username" placeholder="username" required />
                <input type="password" name="password" placeholder="password" required />
                <input type="submit" name="submit" value="Login" />
                {error && <p className={styles.error}>{error}</p>}
            </form>

        </div>
    );
}