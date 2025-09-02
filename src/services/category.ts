"use server";

import { prisma } from "@/lib/prisma";

const categoryImages = [
    "camping",
    "cykler",
    "elektronik",
    "have-og-byg",
    "hobby",
    "toej-og-mode",
];

export async function getCategories(random: boolean = false) {
    let result;
    if (random) {
        result = await prisma.category.findMany({
            orderBy: { id: "asc" },
            where: {
                slug: {
                    in: categoryImages,
                },
            },
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
