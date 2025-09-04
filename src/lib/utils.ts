import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
    if (price === null) return "Ukendt pris";

    return (
        new Intl.NumberFormat("da-DK", {
            style: "decimal",
            maximumFractionDigits: 0,
        }).format(price) + " kr"
    );
};

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const formatDate = (date: string) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const month = new Date(date).getMonth(); // Months are zero-based
    const day = new Date(date).getDate();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `d. ${day}/${months[month]} kl. ${formattedHours}:${formattedMinutes}`;
};

export const handlePrismaError = (
    error: unknown
): Prisma.PrismaClientKnownRequestError | null => {
    return error instanceof Prisma.PrismaClientKnownRequestError ? error : null;
};

export const handleError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return "Der opstod en fejl";
};
