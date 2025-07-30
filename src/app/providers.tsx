'use client';

import React from 'react';
import { AuthProvider } from 'app/context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  console.log('🔐 Providers (client) mounted');
  return <AuthProvider>{children}</AuthProvider>;
}