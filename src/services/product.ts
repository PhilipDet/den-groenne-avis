"use server";

import { prisma } from "@/lib/prisma";

export async function getProducts({ random = false }: { random?: boolean }) {
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
}
