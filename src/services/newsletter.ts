"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/utils";

export const subscribeToNewsletter = async (email: string) => {
    try {
        const result = await prisma.newsletterEmail.create({
            data: { email },
        });

        return result;
    } catch (error: unknown) {
        const prismaError = handlePrismaError(error);

        if (prismaError) {
            switch (prismaError.code) {
                case "P2002":
                    throw new Error(
                        "Emailen er allerede tilmeldt nyhedsbrevet"
                    );
                default:
                    throw new Error("Databasefejl");
            }
        } else {
            throw new Error("Uventet fejl");
        }
    }
};
