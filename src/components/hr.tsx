import { cn } from "@/lib/utils";

export const Hr = ({ className }: { className?: string }) => {
    return (
        <hr className={cn("w-full border-t-4 border-dark-green", className)} />
    );
};
