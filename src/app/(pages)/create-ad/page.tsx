"use client";

import { Input } from "@/components/input";
import { validation } from "@/lib/validation";
import { useEffect, useState } from "react";
import { Hr } from "@/components/hr";
import { DonationBanners } from "@/components/donationBanners";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategory";
import { Select } from "@/components/select";
import { CategoryType } from "@/lib/types";
import { createProduct } from "@/services/product";
import { useAuth } from "@/context/authContext";

const createSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
};

const CreateAdPage = () => {
    const router = useRouter();

    const { categories, loading } = useCategories();
    const { user, loadingUser } = useAuth();

    const [selectedCategory, setSelectedCategory] =
        useState<CategoryType | null>(null);

    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<number | null>(null);
    const [description, setDescription] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    useEffect(() => {
        if (!loadingUser && !user) {
            router.push("/login");
        }
    }, [user, loadingUser, router]);

    const handleSelect = (category: CategoryType) => {
        setSelectedCategory(category);
        setCategory(category.id);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const titleError = validation.title(title);
            const descriptionError = validation.description(description);
            const urlError = validation.url(url);
            const priceError = validation.price(price);

            const errors = [
                titleError,
                descriptionError,
                urlError,
                priceError,
            ].filter((error) => error !== true);

            if (errors.length > 0) throw new Error(errors[0]);
            if (!category) throw new Error("Kategori er påkrævet");
            if (!user) throw new Error("User not found");

            const result = await createProduct({
                name: title,
                image: url,
                description,
                price,
                slug: createSlug(title),
                categoryId: category,
                userId: user.id,
            });
            setSuccessMessage("Annonce oprettet!");

            setTimeout(() => {
                router.push(`/product?id=${result.id}`);
            }, 2000);
        } catch (error) {
            setErrorMessage(handleError(error));
        }
    };

    return (
        !loadingUser &&
        user && (
            <main className="flex flex-col items-center">
                <form
                    onSubmit={handleSubmit}
                    onChange={() => {
                        setErrorMessage("");
                    }}
                    className="max-w-[570px] w-full flex flex-col gap-8"
                >
                    <Input
                        title="Titel"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Select
                        selectedCategory={
                            selectedCategory
                                ? {
                                      ...selectedCategory,
                                      image: selectedCategory.image ?? "",
                                  }
                                : null
                        }
                        items={categories}
                        loading={loading}
                        onSelect={handleSelect}
                    />

                    <label htmlFor="description" className="label">
                        Annonce tekst
                        <textarea
                            name="description"
                            placeholder="Din Beskrivelse"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input h-40 resize-none"
                        ></textarea>
                    </label>

                    <Input
                        title="URL til billede"
                        name="url"
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <Input
                        title="Pris"
                        name="price"
                        type="number"
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    <ul className="flex justify-between">
                        <li>
                            {errorMessage && (
                                <p className="text-burgundy text-xl">
                                    {errorMessage}
                                </p>
                            )}
                            {successMessage && (
                                <p className="text-green-tea text-xl">
                                    {successMessage}
                                </p>
                            )}
                        </li>
                        <li>
                            <button
                                type="submit"
                                className="submit-button ml-auto"
                            >
                                Opret
                            </button>
                        </li>
                    </ul>
                </form>

                <Hr className="mt-18" />
                <DonationBanners />
            </main>
        )
    );
};

export default CreateAdPage;
