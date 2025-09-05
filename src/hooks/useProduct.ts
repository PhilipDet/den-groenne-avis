"use client";

import { useEffect, useState } from "react";
import {
    getProducts,
    getProduct,
    getProductsByUserId,
} from "@/services/product";
import { ProductType } from "@/lib/types";

export const useProduct = (id: number) => {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const productData = await getProduct(id);
            if (productData) {
                setProduct(productData);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    return { product, loading };
};

export const useProducts = (
    category: string | null = null,
    random: boolean = false,
    userId: number | null = null
) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            if (userId) {
                const productData = await getProductsByUserId(userId);
                if (productData) {
                    setProducts(productData);
                }
            } else {
                const productsData = await getProducts({
                    category,
                    random,
                });
                if (productsData) {
                    setProducts(productsData);
                }
            }
            setLoading(false);
        };

        fetchProducts();
    }, [category, random, userId]);

    return { products, loadingProduct: loading };
};
