"use server";

import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const getProduct = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            image: true,
            description: true,
            price: true,

            user: {
                select: {
                    id: true,
                },
            },

            Comment: {
                select: {
                    id: true,
                    comment: true,
                    userId: true,
                    user: {
                        select: {
                            id: true,
                            firstname: true,
                        },
                    },
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

export const createProduct = async ({
    name,
    image,
    description,
    price,
    slug,
    categoryId,
    userId,
}: {
    name: string;
    image: string;
    description: string;
    price: number;
    slug: string;
    categoryId: number;
    userId: number;
}) => {
    try {
        const product = await prisma.product.create({
            data: {
                name,
                image,
                description,
                price,
                slug,
                categoryId,
                userId,
            },
        });

        if (!product) throw new Error("Fejl ved oprettelse af annonce");

        return product;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

export const getProductsByUserId = async (userId: number) => {
    const products = await prisma.product.findMany({
        where: { userId },
        include: {
            category: true,
            user: true,
        },
    });
    if (!products) return null;

    return products.map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price.toNumber(),
        slug: product.slug,
        category: product.category,
    }));
};

export const deleteProduct = async (productId: number) => {
    try {
        await prisma.comment.deleteMany({
            where: { productId },
        });
        await prisma.product.delete({
            where: { id: productId },
        });

        return true;
    } catch (error) {
        throw new Error(handleError(error));
    }
};
