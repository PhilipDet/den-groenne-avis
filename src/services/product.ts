"use server";

import { prisma } from "@/lib/prisma";

export const getProduct = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            user: true,
            Comment: {
                include: {
                    user: true,
                },
            },
        },
    });

    if (!product) return null;

    return {
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price.toNumber(),
        slug: product.slug,
        category: product.category,
        user: product.user,
        comments: product.Comment,
    };
};

export const getProducts = async ({
    random = false,
    category,
}: {
    random?: boolean;
    category?: string | null;
}) => {
    let result;
    if (random) {
        const allProducts = await prisma.product.findMany({
            include: {
                category: true,
                user: true,
            },
        });

        result = allProducts.sort(() => Math.random() - 0.5).slice(0, 6);
    } else {
        result = await prisma.product.findMany({
            where: category ? { category: { slug: category } } : {},
            include: {
                category: true,
                user: true,
            },
        });
    }

    if (!result) return null;

    return result.map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price.toNumber(),
        slug: product.slug,
        category: product.category,
        user: product.user,
    }));
};
