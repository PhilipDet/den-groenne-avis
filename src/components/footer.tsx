"use client";

import { subscribeToNewsletter } from "@/services/newsletter";
import Link from "next/link";
import { useState } from "react";
import { validation } from "@/lib/validation";

export const Footer = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleNewsletterSignup = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const emailError: boolean | string = validation.email(email);

        if (typeof emailError === "string") {
            setErrorMessage(emailError);
            setSuccessMessage("");
            return;
        }

        const result = await subscribeToNewsletter(email);

        if (!result) {
            setErrorMessage(result);
            setSuccessMessage("");
        } else {
            setSuccessMessage("Du er nu tilmeldt nyhedsbrevet!");
            setErrorMessage("");
        }
    };

    return (
        <footer className="w-full bg-green-tea text-white py-8 px-16">
            <ul className="flex gap-28">
                <li className="footer-container">
                    <span className="footer-header">Nyhedsbrev</span>
                    <ul className="footer-paragraph flex flex-col gap-2">
                        <li>
                            Vil du være med på den grønne front? Tilmeld dig
                            vores nyhedsbrev og få de seneste klima opdateringer
                            direkte i din indbakke
                        </li>
                        <li>
                            <form
                                onSubmit={(e) => handleNewsletterSignup(e)}
                                className="flex"
                                onChange={() => setErrorMessage("")}
                            >
                                <input
                                    type="text"
                                    placeholder="Indtast din email"
                                    className="border-none bg-white text-2xl py-2 px-4 text-foreground"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="cursor-pointer bg-dark-green text-white px-4"
                                >
                                    Tilmeld
                                </button>
                            </form>
                            {errorMessage && (
                                <p className="text-burgundy">{errorMessage}</p>
                            )}
                            {successMessage && (
                                <p className="text-black">{successMessage}</p>
                            )}
                        </li>
                    </ul>
                </li>
                <li className="footer-container">
                    <span className="footer-header">Kontakt</span>
                    <ul className="footer-paragraph min-w-32">
                        <li>Redningen 32</li>
                        <li>2210 Vinterby Øster</li>
                        <li>+45 88229422</li>
                        <li>dga@info.dk</li>
                    </ul>
                </li>
                <li className="footer-container">
                    <span className="footer-header">FN&apos;s Verdensmål</span>
                    <ul className="footer-paragraph flex flex-col gap-5">
                        <li>
                            Vi støtter på organisatorisk plan op om FN&apos;s
                            verdensmål og har derfor besluttet at en del af
                            overskuddet går direkte til verdensmål nr. 13;
                            Klimahandling
                        </li>
                        <li className="text-white hover:underline">
                            <Link
                                href="https://www.verdensmaalene.dk/ikoner"
                                target="_blank"
                            >
                                Læs mere om verdensmålene her
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </footer>
    );
};
