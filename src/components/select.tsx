import { CategoryType } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

export const Select = ({
    selectedCategory,
    items,
    loading,
    onSelect,
}: {
    selectedCategory: Category | null;
    items: CategoryType[];
    loading: boolean;
    onSelect: (category: CategoryType) => void;
}) => {
    const [showSelect, setShowSelect] = useState<boolean>(false);

    return (
        <label className="label">
            Kategori
            <div className="w-full flex flex-col">
                <button onClick={() => setShowSelect(!showSelect)}>
                    <ul className="flex justify-between items-center border-3 border-dark-green/50 bg-dark-background cursor-pointer py-4 px-5">
                        <li>
                            <span
                                className={cn(
                                    selectedCategory
                                        ? "text-foreground"
                                        : "text-muted-foreground",
                                    "capitalize"
                                )}
                            >
                                {selectedCategory
                                    ? `${selectedCategory.name}`
                                    : "Hvilken kategori tilhører dit produkt..."}
                            </span>
                        </li>
                        <li>
                            {showSelect ? (
                                <ChevronUp className="bg-[#D9D9D9] p-1" />
                            ) : (
                                <ChevronDown className="bg-[#D9D9D9] p-1" />
                            )}
                        </li>
                    </ul>
                </button>
                {showSelect && (
                    <div className="flex flex-col border-3 border-dark-green/50 bg-dark-background mt-2 max-h-60 overflow-y-auto">
                        {loading ? (
                            <p>Henter...</p>
                        ) : (
                            items.map((item) => (
                                <button
                                    onClick={() => {
                                        onSelect(item);
                                        setShowSelect(false);
                                    }}
                                    key={item.id}
                                    className="hover:bg-muted-background py-3 px-4 text-start cursor-pointer"
                                >
                                    <span>{item.name}</span>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
        </label>
    );
};
