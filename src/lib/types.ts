export type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    zipcode: number;
    city: string;
    email: string;
};

export type AuthContextType = {
    user: UserType;
    login: (userData: UserType) => void;
    logout: () => void;
};

export type CategoryType = {
    id: number;
    name: string;
    slug: string;
};

export type ProductType = {
    id: number;
    name: string;
    image: string | null;
    description: string;
    price: number;
    slug: string;
    category: CategoryType;
    user: UserType;
};
