"use client";

import { AuthProvider } from "@/context/authContext";
import { CategoryProvider } from "@/context/categoryContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <CategoryProvider>{children}</CategoryProvider>
        </AuthProvider>
    );
};
