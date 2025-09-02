"use client";

import { MailWarning, Info, UserRound } from "lucide-react";
import Logo from "@/public/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useCategoryContext } from "@/context/categoryContext";

export const Navbar = () => {
    const { categories, loadingCategoryContext } = useCategoryContext();

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = categories.find(
            (category) => category.slug === e.target.value
        );
        if (selectedCategory) {
        }
    };

    return (
        <nav className="w-full bg-background py-6 px-16">
            <ul className="flex items-stretch gap-8">
                <li className="mr-auto">
                    <Image src={Logo} alt="Logo" width={255} height={50} />
                </li>
                <li className="flex items-center">
                    <select
                        name="category"
                        className="h-full w-[200px] border-2 border-green-tea bg-muted-background px-3.5"
                    >
                        {loadingCategoryContext ? (
                            <option>Henter...</option>
                        ) : (
                            <>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.slug}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </li>
                <li className="flex items-center">
                    <Link
                        href="/create-ad"
                        className="h-full flex items-center border-2 border-muted-background bg-green-tea px-3.5"
                    >
                        Opret Annonce
                    </Link>
                </li>
                <li className="flex items-center">
                    <ul className="flex gap-2">
                        <li>
                            <MailWarning />
                        </li>
                        <li>
                            <Info />
                        </li>
                        <li>
                            <Link href="/dashboard">
                                <UserRound />
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};
