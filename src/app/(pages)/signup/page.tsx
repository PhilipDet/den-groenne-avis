"use client";

import Link from "next/link";
import { Input } from "@/components/input";
import { validation } from "@/lib/validation";
import { useEffect, useState } from "react";
import { Hr } from "@/components/hr";
import { DonationBanners } from "@/components/donationBanners";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const SignupPage = () => {
    const router = useRouter();
    const { user, loadingUser, fetchUser } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    useEffect(() => {
        if (!loadingUser && user) {
            router.push("/dashboard");
        }
    }, [user, loadingUser, router]);

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailError = validation.email(email);
        const passwordError = validation.password(password);
        const firstNameError = validation.firstName(firstName);
        const lastNameError = validation.lastName(lastName);
        const addressError = validation.address(address);
        const cityError = validation.city(city);
        const zipcodeError = validation.zipcode(zipcode);

        const errors = [
            emailError,
            passwordError,
            firstNameError,
            lastNameError,
            addressError,
            cityError,
            zipcodeError,
        ].filter((error) => error !== true);

        if (errors.length > 0) {
            setErrorMessage(errors[0]);
            return;
        }

        if (!terms) {
            setErrorMessage("Acceptere betingelserne");
            return;
        }

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstname: firstName,
                    lastname: lastName,
                    address,
                    city,
                    zipcode: Number(zipcode),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Brugeroprettelse mislykkedes");
            }

            setSuccessMessage("Bruger oprettet");

            await fetchUser();
        } catch (error: unknown) {
            setErrorMessage(handleError(error));
        }
    };

    return (
        !user &&
        !loadingUser && (
            <main className="flex flex-col items-center">
                <form
                    onSubmit={handleSignup}
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
                        type="password"
                    />
                    <Input
                        title="Fornavn"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                        title="Efternavn"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input
                        title="Adresse"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Input
                        title="By"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <Input
                        title="Postnummer"
                        name="zipcode"
                        onChange={(e) => setZipcode(e.target.value)}
                    />

                    <span>
                        Har du allerede en konto hos os? Klik{" "}
                        <Link href="/login" className="font-bold underline">
                            her
                        </Link>{" "}
                        for at vende tilbage til login
                    </span>

                    <ul className="flex justify-between">
                        <li>
                            <label
                                htmlFor="terms"
                                className="flex items-center gap-5"
                            >
                                <div className="relative min-w-6 h-6">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        id="terms"
                                        checked={terms}
                                        onChange={(e) =>
                                            setTerms(e.target.checked)
                                        }
                                        className="peer opacity-0 w-6 h-6 absolute cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-background transition-colors border-3 border-dark-green peer-checked:bg-dark-green"></div>
                                </div>
                                Jeg har læst og forstået de gældende betingelser
                                for oprettelse af kundekonto og brug af denne
                                side
                            </label>
                        </li>

                        <li>
                            <button type="submit" className="submit-button">
                                Opret
                            </button>
                        </li>
                    </ul>

                    {errorMessage && (
                        <p className="text-burgundy text-xl">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-tea text-xl">
                            {successMessage}
                        </p>
                    )}
                </form>

                <Hr className="mt-12" />
                <DonationBanners />
            </main>
        )
    );
};

export default SignupPage;
