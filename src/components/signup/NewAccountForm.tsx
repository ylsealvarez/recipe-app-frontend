"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NewAccountForm.module.sass";

export const NewAccountForm = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);
        setLoading(true);

        const form = event.currentTarget;
        const data = new FormData(form);

        const body = {
            username: data.get("username") as string,
            firstname: data.get("firstname") as string,
            surname: data.get("surname") as string,
            email: data.get("email") as string,
            address: data.get("address") as string,
            phoneNumber: data.get("phone") as string,
            password: data.get("password") as string,
        };

        try {
            const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                // Registro OK → redirige al login
                router.push("/login");
            } else if (res.status === 400) {
                const { message } = await res.json();
                setErrors([message]);
            } else {
                // Otros errores
                const text = await res.text();
                setErrors([`Error ${res.status}: ${text}`]);
            }
        } catch (e: any) {
            setErrors([e.message || "Error de red"]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.NewAccountForm}  >
            <h1 className={styles.NewAccountForm__title}>New Account</h1>
            <form className={styles.NewAccountForm__form} onSubmit={handleSubmit} noValidate>
                <input type="text" name="firstname" placeholder="firstname" disabled={loading} required />
                <input type="text" name="surname" placeholder="lastname" disabled={loading} required />
                <input type="text" name="username" placeholder="choose your username" disabled={loading} required />
                <input type="email" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" disabled={loading} required />
                <input type="text" name="address" placeholder="address" disabled={loading} />
                <input type="tel" name="phone" placeholder="phone number" pattern="^[0-9]*$" disabled={loading} />
                <input type="password" name="password" placeholder="password" disabled={loading} required />
                <input type="password" name="password_confirmation" placeholder="re-type password" disabled={loading} required />
                <input type="submit" name="submit" value={loading ? "Joining…" : "Join Now"} disabled={loading} />
            </form>
            {errors.length > 0 &&
                <div className={styles.NewAccountForm__errors}>
                    {errors.map((error, index) => {
                        return <p key={index} className={styles.NewAccountForm__error}>{error}</p>
                    })}
                </div>
            }
        </div>
    );
}