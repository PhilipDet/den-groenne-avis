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
    user: UserType | null;
    loadingUser: boolean;
    logout: () => void;
};

export type CategoryContextType = {
    categories: CategoryType[];
    loadingCategoryContext: boolean;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
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
    comments?: CommentType[];
};

export type CommentType = {
    id: number;
    comment: string;
    userId: number;
    productId: number;
    user: UserType;
};
