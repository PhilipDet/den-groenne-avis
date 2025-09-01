"use server";

import { prisma } from "@/lib/prisma";

export async function getCategories({ random = false }: { random?: boolean }) {
    let result;
    if (random) {
        result = await prisma.category.findMany({
            orderBy: { id: "asc" },
            take: 5,
        });
    } else {
        result = await prisma.category.findMany();
    }
    if (!result) return null;

    return result.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
    }));
}
