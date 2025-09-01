import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";
import { handlePrismaError } from "@/lib/utils";

export const UserService = {
    async getUser(id: number) {
        const result = await prisma.user.findUnique({
            where: { id },
            // include: {},
        });

        if (!result) return null;

        return {
            id: result.id,
            email: result.email,
            isActive: result.isActive,
        };
    },

    async createUser({ email, password }: { email: string; password: string }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const tempUser = { id: 0, email };
            const accessToken = generateToken(tempUser, "access");
            const refreshToken = generateToken(tempUser, "refresh");

            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    refreshToken: refreshToken,
                },
            });

            return {
                accessToken,
                refreshToken,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                },
            };
        } catch (error: unknown) {
            const prismaError = handlePrismaError(error);

            if (prismaError) {
                switch (prismaError.code) {
                    case "P2002":
                        throw new Error("User already exists");
                    default:
                        throw new Error("Database error");
                }
            } else {
                throw new Error("Unexpected error");
            }
        }
    },
};
