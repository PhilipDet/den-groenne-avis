export type UserType = {
    id: number;
    email: string;
    isActive: boolean;
} | null;

export type AuthContextType = {
    user: UserType;
    login: (userData: UserType) => void;
    logout: () => void;
};
