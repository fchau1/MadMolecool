
"use client"

import {AuthProvider} from "@propelauth/react";

export default function AuthWrapper({children}) {
    return (
        <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL}>
            {children}
        </AuthProvider>
    )
}
