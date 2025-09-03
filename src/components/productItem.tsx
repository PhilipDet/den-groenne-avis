import { ProductType } from "@/lib/types";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";

export const ProductItem = ({ product }: { product: ProductType }) => {
    return (
        <article className="group cursor-pointer flex flex-col gap-2">
            <Link href={`/product?slug=${product.slug}`}>
                <div className="relative min-w-52 aspect-square">
                    <Image
                        src={product.image || "./images/placeholder.png"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover aspect-square"
                    />
                    <div
                        className={cn(
                            "absolute inset-0 border-4 border-dark-green/50 flex items-end",
                            "opacity-0 transition duration-200 group-hover:opacity-100"
                        )}
                    >
                        <span className="w-full bg-dark-green/50 text-white text-xl py-2 px-3">
                            Pris: {formatPrice(product.price)}
                        </span>
                    </div>
                </div>
                <div>
                    <span className="font-medium">{product.name}</span>
                    <p className="font-light">{product.description}</p>
                </div>
            </Link>
        </article>
    );
};
