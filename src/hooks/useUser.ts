import { useEffect, useState } from "react";
import { UserService } from "@/services/user";
import { UserType } from "@/lib/types";

export const useUser = (userId: number) => {
    const [user, setUser] = useState<UserType>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await UserService.getUser(userId);
            setUser(userData);
            setLoading(false);
        };

        fetchUser();
    }, [userId]);

    return { user, loading };
};
