import { useEffect, useState } from "react";
import { getUser } from "@/services/user";
import { UserType } from "@/lib/types";

export const useUser = (userId: number) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser(userId);
            setUser(userData);
            setLoading(false);
        };

        fetchUser();
    }, [userId]);

    return { user, loading };
};
