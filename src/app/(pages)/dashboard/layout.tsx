"use client";

import React, { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboardNav";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user, loadingUser } = useAuth();
    const [isOnAdsPage, setIsOnAdsPage] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!loadingUser && !user) {
            router.push("/login");
        }
    }, [loadingUser, user, router]);

    useEffect(() => {
        if (pathname === "/dashboard/ads") {
            setIsOnAdsPage(true);
        } else {
            setIsOnAdsPage(false);
        }
    }, [pathname]);

    return (
        <>
            {user && (
                <>
                    <DashboardNav isOnAdsPage={isOnAdsPage} />
                    {children}
                </>
            )}
        </>
    );
};

export default Layout;
