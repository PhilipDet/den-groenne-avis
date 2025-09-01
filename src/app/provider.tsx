"use client";

import { AuthProvider } from "@/context/authContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>;
};
