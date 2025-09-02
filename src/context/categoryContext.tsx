"use client";

import { CategoryContextType } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategory";

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const searchParams = useSearchParams();
    const { categories, loading } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [loadingCategoryContext, setLoadingCategoryContext] = useState(true);

    useEffect(() => {
        const category = searchParams.get("category");

        if (category) {
            setSelectedCategory(category);
        } else {
            setSelectedCategory(null);
        }

        setLoadingCategoryContext(false);
    }, [searchParams]);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                loadingCategoryContext: loading && loadingCategoryContext,
                selectedCategory,
                setSelectedCategory,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used inside CategoryProvider");
    }
    return context;
};
