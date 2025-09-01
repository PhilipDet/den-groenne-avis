import { useProducts } from "@/hooks/useProduct";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const PickedProducts = () => {
    const { products, loading } = useProducts(true);

    return (
        <>
            <h2 className="heading-2">Udvalgte Produkter</h2>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    products.map((product) => (
                        <li
                            key={product.id}
                            className="group relative overflow-hidden min-w-[150px]"
                        >
                            <Image
                                className="w-full aspect-square object-cover"
                                src={
                                    product.image ?? "./product_placeholder.png"
                                }
                                alt={product.name}
                                width={150}
                                height={150}
                            />

                            <span
                                className={cn(
                                    "absolute inset-x-0 bottom-0 px-2 py-2 text-white text-sm text-center bg-green-tea/75",
                                    "translate-y-9 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 z-20"
                                )}
                            >
                                {product.name}
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
};
