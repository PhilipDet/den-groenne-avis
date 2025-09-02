"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/product";
import { ProductType } from "@/lib/types";

export const useProducts = (
    category: string | null = null,
    random: boolean = false
) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const productsData = await getProducts({
                category,
                random,
            });
            if (productsData) {
                setProducts(productsData);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [category, random]);

    return { products, loading };
};
