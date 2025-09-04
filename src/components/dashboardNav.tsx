import Link from "next/link";
import { cn } from "@/lib/utils";

export const DashboardNav = ({
    isOnAdsPage = false,
}: {
    isOnAdsPage?: boolean;
}) => {
    return (
        <ul className="grid grid-cols-2 text-center border-2 border-dark-green mb-20">
            <li
                className={cn(
                    !isOnAdsPage
                        ? "bg-dark-green text-white hover:bg-dark-green/80"
                        : "text-dark-green bg-background hover:bg-muted-background",
                    "transition duration-200"
                )}
            >
                <Link href="/dashboard" className="block py-2 px-4">
                    Min profil
                </Link>
            </li>
            <li
                className={cn(
                    isOnAdsPage
                        ? "bg-dark-green text-white hover:bg-dark-green/80"
                        : "text-dark-green bg-background hover:bg-muted-background",
                    "transition duration-200"
                )}
            >
                <Link href="/dashboard/ads" className="block py-2 px-4">
                    Mine annoncer
                </Link>
            </li>
        </ul>
    );
};
