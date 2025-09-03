"use client";
import { useProducts } from "@/hooks/useProduct";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductItem } from "@/components/productItem";
import { CategoryList } from "@/components/categoryList";

const ProductPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const category = searchParams.get("category") || null;
    const page = Number(searchParams.get("page")) || 1;

    const { products, loadingProduct } = useProducts(category);

    const productsPerPage = 9;

    const totalPages = Math.ceil(products.length / productsPerPage);

    if (loadingProduct) return <p>Henter produkter...</p>;

    const indexOfLastProduct = page * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const goToPage = (newPage: number, category?: string | null) => {
        router.push(`?category=${category || ""}&page=${newPage}`);
    };

    return (
        <>
            <main className="px-30 md:px-30 lg:px-42 relative">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                    {currentProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </section>

                {totalPages > 1 && (
                    <div className="flex justify-end mt-16 gap-10 text-sm">
                        <button
                            disabled={page === 1}
                            onClick={() => goToPage(page - 1)}
                            className="disabled:opacity-50 underline cursor-pointer"
                        >
                            Forrige side
                        </button>

                        <span>
                            Side {page} / {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => goToPage(page + 1)}
                            className="disabled:opacity-50 underline cursor-pointer"
                        >
                            Næste side
                        </button>
                    </div>
                )}
            </main>
            <CategoryList activeCategory={category} goToPage={goToPage} />
        </>
    );
};

export default ProductPage;
