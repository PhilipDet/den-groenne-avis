"use server";

import { prisma } from "@/lib/prisma";

export const createComment = async ({
    comment,
    userId,
    productId,
}: {
    comment: string;
    userId: number;
    productId: number;
}) => {
    const result = await prisma.comment.create({
        data: {
            comment: comment,
            userId: userId,
            productId: productId,
        },
        include: {
            user: true,
        },
    });

    if (!result) return null;

    return result;
};

export const deleteComment = async (commentId: number) => {
    const result = await prisma.comment.delete({
        where: {
            id: commentId,
        },
    });

    if (!result) return null;

    return result;
};
