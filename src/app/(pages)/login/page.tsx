"use client";

import Link from "next/link";
import { Input } from "@/components/input";
import { validation } from "@/lib/validation";
import { useState } from "react";
import { Hr } from "@/components/hr";
import { DonationBanners } from "@/components/donationBanners";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailError = validation.email(email);
        const passwordError = validation.password(password);

        const errors = [emailError, passwordError].filter(
            (error) => error !== true
        );

        if (errors.length > 0) {
            setErrorMessage(errors[0]);
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login mislykkedes");
            }

            setSuccessMessage("Bruger logget ind");

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error: unknown) {
            setErrorMessage(handleError(error));
        }
    };

    return (
        <main className="flex flex-col items-center">
            <form
                onSubmit={handleLogin}
                onChange={() => {
                    setErrorMessage("");
                }}
                className="max-w-[570px] w-full flex flex-col gap-8"
            >
                <Input
                    title="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    title="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <span>
                    Har du ikke allerede en konto? Klik{" "}
                    <Link href="/signup" className="font-bold underline">
                        her
                    </Link>{" "}
                    for at gå til sign up
                </span>

                <ul className="flex justify-between">
                    <li>
                        {errorMessage && (
                            <p className="text-red-500 text-xl">
                                {errorMessage}
                            </p>
                        )}
                        {successMessage && (
                            <p className="text-green-500 text-xl">
                                {successMessage}
                            </p>
                        )}
                    </li>
                    <li>
                        <button type="submit" className="submit-button ml-auto">
                            Opret
                        </button>
                    </li>
                </ul>
            </form>

            <Hr className="mt-18" />
            <DonationBanners />
        </main>
    );
};

export default LoginPage;
