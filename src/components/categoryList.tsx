import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategory";

export const CategoryList = ({
    activeCategory,
    goToPage,
}: {
    activeCategory: string | null;
    goToPage: (newPage: number, category?: string | null) => void;
}) => {
    const { categories, loading } = useCategories();

    const handleCategorySelect = (category: string | null) => {
        if (category === activeCategory) return;
        goToPage(1, category);
    };

    return (
        <ul className="absolute top-45 left-10 flex flex-col">
            <li className="text-xl">Alle kategorier</li>

            {loading ? (
                <li className="ml-4">Henter kategorier...</li>
            ) : (
                <>
                    <li
                        className={cn(
                            activeCategory === null && "font-bold",
                            "ml-4"
                        )}
                    >
                        <button
                            onClick={() => handleCategorySelect(null)}
                            className="cursor-pointer hover:font-medium"
                        >
                            Alle
                        </button>
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={cn(
                                category.slug === activeCategory && "font-bold",
                                "ml-4"
                            )}
                        >
                            <button
                                onClick={() =>
                                    handleCategorySelect(category.slug)
                                }
                                className="cursor-pointer hover:font-medium"
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </>
            )}
        </ul>
    );
};
