"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/category";
import { CategoryType } from "@/lib/types";

export const useCategories = (random: boolean = false) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories({ random });
            if (categoriesData) {
                setCategories(categoriesData);
            }
            setLoading(false);
        };

        fetchCategories();
    }, []);

    return { categories, loading };
};
