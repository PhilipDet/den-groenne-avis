"use server";

import { prisma } from "@/lib/prisma";

export async function getCategories(random: boolean = false) {
    if (random) {
        const result = await prisma.category.findMany({
            orderBy: { id: "asc" },
            take: 6,
            select: {
                id: true,
                name: true,
                slug: true,
                image: true,
            },
        });

        if (!result) return null;

        return result.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            image: category.image,
        }));
    } else {
        const result = await prisma.category.findMany({
            orderBy: { id: "asc" },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });

        if (!result) return null;
        return result.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
        }));
    }
}
