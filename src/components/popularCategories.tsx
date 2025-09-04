import { useCategories } from "@/hooks/useCategory";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const PopularCategories = () => {
    const { categories, loading } = useCategories(true);

    return (
        <>
            <h2 className="heading-2">Populære Kategorier</h2>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    categories.map((category) => (
                        <li
                            key={category.id}
                            className="group relative overflow-hidden min-w-[150px]"
                        >
                            <Link href={`/products?category=${category.slug}`}>
                                <Image
                                    className="w-full aspect-square object-cover"
                                    src={
                                        category.slug
                                            ? category.image
                                            : "./images/product_placeholder.png"
                                    }
                                    alt={category.name}
                                    width={300}
                                    height={300}
                                />

                                <span
                                    className={cn(
                                        "cursor-pointer absolute inset-x-0 top-0 px-2 py-2 text-white text-sm text-center bg-green-tea/75",
                                        "-translate-y-10 opacity-100 transition group-hover:translate-y-0 group-hover:opacity-100 z-20"
                                    )}
                                >
                                    {category.name}
                                </span>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
};
