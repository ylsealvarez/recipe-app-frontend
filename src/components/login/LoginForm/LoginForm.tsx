"use client"
import { useState } from "react";
import styles from "./LoginForm.module.sass";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        try {
            // 2) Hacemos el fetch
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            // 3) Sacamos el JWT de la cabecera
            const token = res.headers.get("Authorization");
            if (!token) {
                throw new Error("No se recibió token en la respuesta");
            }

            // 4) Lo guardamos en localStorage
            localStorage.setItem("jwt", token);

            // 5) Rediriges o actualizas estado de “logueado”
            router.refresh();  
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
                <input type="password" name="password" placeholder="password" required/>
                <input type="submit" name="submit" value="Login" />
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}