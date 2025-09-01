"use client";

import { Link } from "lucide-react";

export const Footer = () => {
    const handleNewsletterSignup = () => {
        // Handle newsletter signup logic here
    };

    return (
        <footer className="w-full bg-green-tea text-white py-8 px-16">
            <ul className="flex gap-28">
                <li>
                    <span className="footer-header">Nyhedsbrev</span>
                    <ul className="footer-paragraph">
                        <li>
                            Vil du være med på den grønne front? Tilmeld dig
                            vores nyhedsbrev og få de seneste klima opdateringer
                            direkte i din indbakke
                        </li>
                        <li>
                            <form
                                onSubmit={() => handleNewsletterSignup()}
                                className="flex"
                            >
                                <input
                                    type="text"
                                    placeholder="Indtast din email"
                                    className="border-none bg-white text-2xl py-2 px-4 text-foreground"
                                />
                                <button
                                    type="submit"
                                    className="bg-dark-green text-white px-4"
                                >
                                    Tilmeld
                                </button>
                            </form>
                        </li>
                    </ul>
                </li>
                <li>
                    <span className="footer-header">Kontakt</span>
                    <ul className="footer-paragraph">
                        <li>Redningen 32</li>
                        <li>2210 Vinterby Øster</li>
                        <li>+45 88229422</li>
                        <li>dga@info.dk</li>
                    </ul>
                </li>
                <li>
                    <span className="footer-header">FN's Verdensmål</span>
                    <ul className="footer-paragraph">
                        <li>
                            Vi støtter på organisatorisk plan op om FN´s
                            verdensmål og har derfor besluttet at en del af
                            overskuddet går direkte til verdensmål nr. 13;
                            Klimahandling
                        </li>
                        <Link
                            href="https://www.verdensmaalene.dk/ikoner"
                            target="_blank"
                        >
                            Læs mere om verdensmålene her
                        </Link>
                    </ul>
                </li>
            </ul>
        </footer>
    );
};
