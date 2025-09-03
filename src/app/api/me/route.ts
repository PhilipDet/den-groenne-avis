import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/user";
import { getUserIdFromToken } from "@/lib/auth";
import { handleError } from "@/lib/utils";

export const GET = async (req: NextRequest) => {
    let token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        token = req.cookies.get("accessToken")?.value;
    }

    if (!token) {
        return NextResponse.json({ authenticated: false });
    }

    try {
        const userId = getUserIdFromToken(token);
        if (!userId) {
            throw new Error("Ugyldig token");
        }

        const user = await getUser(userId);
        if (!user) {
            throw new Error("Bruger blev ikke fundet");
        }

        return NextResponse.json({ user });
    } catch (error: unknown) {
        return NextResponse.json(
            { message: handleError(error) },
            { status: 400 }
        );
    }
};
