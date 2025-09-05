"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";
import { handlePrismaError } from "@/lib/utils";
import { UserType } from "@/lib/types";

export const getUser = async (id: number) => {
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
};

export const createUser = async ({
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
}) => {
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
                    throw new Error("Email findes allerede");
                default:
                    throw new Error("Databasefejl");
            }
        } else {
            throw new Error("Uventet fejl");
        }
    }
};

export const updateUser = async (userId: number, updatedData: UserType) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstname: updatedData.firstname,
                lastname: updatedData.lastname,
                address: updatedData.address,
                city: updatedData.city,
                zipcode: updatedData.zipcode,
                email: updatedData.email,
                hasNewsletter: updatedData.hasNewsletter,
                hasNotification: updatedData.hasNotification,
            },
        });
        return updatedUser;
    } catch (error) {
        const prismaError = handlePrismaError(error);

        if (prismaError) {
            switch (prismaError.code) {
                case "P2025":
                    throw new Error("Bruger ikke fundet");
                default:
                    throw new Error("Databasefejl");
            }
        } else {
            throw new Error("Uventet fejl");
        }
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        return deletedUser;
    } catch (error) {
        const prismaError = handlePrismaError(error);

        if (prismaError) {
            switch (prismaError.code) {
                case "P2025":
                    throw new Error("Bruger ikke fundet");
                default:
                    throw new Error("Databasefejl");
            }
        } else {
            throw new Error("Uventet fejl");
        }
    }
};
