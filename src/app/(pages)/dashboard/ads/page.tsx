"use client";

import { useAuth } from "@/context/authContext";
import { ProductType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getProductsByUserId, deleteProduct } from "@/services/product";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyAdsPage = () => {
    const router = useRouter();
    const { user, loadingUser } = useAuth();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loadingProduct, setLoadingProduct] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchUserProducts = async () => {
                setLoadingProduct(true);
                const userProducts = await getProductsByUserId(user.id);
                setProducts(userProducts || []);
                setLoadingProduct(false);
            };
            fetchUserProducts();
        }
    }, [user]);

    if (loadingUser) return <p>Loader bruger...</p>;
    if (!user) return <p>Ingen bruger logget ind</p>;

    const handleAdDelete = async (productId: number) => {
        try {
            const result = await deleteProduct(productId);
            if (!result) {
                throw new Error("Kunne ikke slette produkt");
            }
            setProducts(products.filter((product) => product.id !== productId));
        } catch (error) {
            console.error("Fejl ved sletning af annonce:", error);
        }
    };
    return (
        <main className="flex flex-col gap-12">
            {loadingProduct ? (
                <p>Loader produkter...</p>
            ) : (
                products.map((product) => (
                    <article key={product.id} className="flex flex-col gap-2.5">
                        <div className="flex gap-8 border-2 border-dark-green/50 bg-background py-4 px-8">
                            <div className="flex-1 flex flex-col gap-7">
                                <ul className="flex gap-2 flex-col md:flex-row justify-between bg-dark-green p-2 text-white text-2xl font-light">
                                    <li>{product.name}</li>
                                    <li>Pris {formatPrice(product.price)}</li>
                                </ul>
                                <p>{product.description}</p>
                            </div>
                            <Image
                                src={product.image || "/images/placeholder.png"}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-32 aspect-square object-cover"
                            />
                        </div>
                        <ul className="flex justify-end gap-3">
                            <li>
                                <button
                                    onClick={() =>
                                        router.push(`/product?id=${product.id}`)
                                    }
                                >
                                    Gå til annonce
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleAdDelete(product.id)}
                                    className="text-burgundy"
                                >
                                    Fjern annonce
                                </button>
                            </li>
                        </ul>
                    </article>
                ))
            )}
        </main>
    );
};

export default MyAdsPage;
