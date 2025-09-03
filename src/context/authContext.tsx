"use client";

import { UserType, AuthContextType } from "@/lib/types";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUser = async () => {
        try {
            const res = await fetch("/api/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch user");
            }

            setUser(data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to logout");
            }

            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loadingUser: loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};
