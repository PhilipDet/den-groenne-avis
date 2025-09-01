"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";
import { handlePrismaError } from "@/lib/utils";
import { Lasso } from "lucide-react";

export const UserService = {
    async getUser(id: number) {
        const result = await prisma.user.findUnique({
            where: { id },
            // include: {},
        });

        if (!result) return null;

        return {
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
            address: result.address,
            zipcode: result.zipcode,
            city: result.city,
            email: result.email,
        };
    },

    async createUser({
        email,
        password,
        firstname,
        lastname,
        address,
        city,
        zipcode,
    }: {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        address: string;
        city: string;
        zipcode: number;
    }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const tempUser = { id: 0, email };
            const accessToken = generateToken(tempUser, "access");
            const refreshToken = generateToken(tempUser, "refresh");

            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstname,
                    lastname,
                    address,
                    city,
                    zipcode,
                    refreshToken: refreshToken,
                },
            });

            return {
                accessToken,
                refreshToken,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    address: newUser.address,
                    city: newUser.city,
                    zipcode: newUser.zipcode,
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
