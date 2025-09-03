"use client";

import { useEffect, useState } from "react";
import { getProducts, getProduct } from "@/services/product";
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

    return { products, loadingProduct: loading };
};
