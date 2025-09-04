"use client";

import React, { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboardNav";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isOnAdsPage, setIsOnAdsPage] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/dashboard/ads") {
            setIsOnAdsPage(true);
        }
    }, [pathname]);

    return (
        <>
            <DashboardNav isOnAdsPage={isOnAdsPage} />
            {children}
        </>
    );
};

export default Layout;
