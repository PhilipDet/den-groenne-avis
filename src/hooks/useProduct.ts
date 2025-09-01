"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/product";
import { ProductType } from "@/lib/types";

export const useProducts = (random: boolean = false) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProducts({ random });
            if (productsData) {
                setProducts(productsData);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return { products, loading };
};
