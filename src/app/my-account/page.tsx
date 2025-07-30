'use client';
import React from 'react';
import styles from './MyAccount.module.sass';
import { useAuth } from 'app/context/AuthContext';

export default function MyAccountPage() {
    const { user } = useAuth();

    // Si no hay user (por si alguien entra sin loguear)
    if (!user) {
        return (
            <div className={styles.container}>
                <h1>Mi Cuenta</h1>
                <p>No tienes sesión iniciada. <a href="/login">Inicia sesión</a> para ver tus datos.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>My Account</h1>
            <div className={styles.card}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Full Name:</strong> {user.firstname} {user.surname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Plan:</strong>{' '}
                    {user.roles[0].includes('_')
                        ? user.roles[0].split('_')[1]
                        : user.roles[0]}
                </p>
            </div>
        </div>
    );
}