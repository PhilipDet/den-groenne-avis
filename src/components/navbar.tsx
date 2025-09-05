"use client";

import { MailWarning, Info, UserRound } from "lucide-react";
import Logo from "@/public/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useCategoryContext } from "@/context/categoryContext";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const { categories, loadingCategoryContext, selectedCategory } =
        useCategoryContext();
    const router = useRouter();

    return (
        <nav className="w-full bg-background py-6 px-16">
            <ul className="flex items-stretch gap-8">
                <li className="mr-auto">
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={255}
                            height={50}
                            quality={80}
                        />
                    </Link>
                </li>
                <li className="flex items-center">
                    <select
                        name="category"
                        className="h-full w-[200px] border-2 border-green-tea bg-muted-background px-3.5"
                        onChange={(e) =>
                            router.push(
                                `/products?category=${
                                    e.target.value || ""
                                }&page=1`
                            )
                        }
                        value={selectedCategory || ""}
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
