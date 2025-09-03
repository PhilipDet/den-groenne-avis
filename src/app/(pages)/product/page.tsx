"use client";

import { useProduct } from "@/hooks/useProduct";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { formatPrice, cn } from "@/lib/utils";
import { Hr } from "@/components/hr";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { createComment, deleteComment } from "@/services/comment";
import { CommentType } from "@/lib/types";

const ProductPage = () => {
    const searchParams = useSearchParams();
    const productId = Number(searchParams.get("id")) || null;
    if (!productId) return <p>Ingen produkt ID angivet</p>;

    const { user, loadingUser } = useAuth();
    const { product, loading } = useProduct(productId);
    console.log(product);

    const [comments, setComments] = useState<CommentType[]>([]);
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (product?.comments) {
            setComments(product.comments);
        }
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) {
            setErrorMessage("Kommentaren må ikke være tom");
            return;
        }

        if (!user || !product) {
            setErrorMessage("Bruger eller produkt mangler");
            return;
        }

        try {
            const newMessage = {
                comment: message.trim(),
                userId: user.id,
                user: user,
                productId: product.id,
            };

            const result = await createComment(newMessage);

            if (result) {
                setComments((prev) => [...prev, result]);
                setMessage("");
                setSuccessMessage("Kommentar oprettet");
                setErrorMessage(null);
            }
        } catch (error) {
            console.log(error);

            setErrorMessage("Kunne ikke oprette kommentaren");
        }
    };

    const handleCommentDelete = async (commentId: number) => {
        try {
            const result = await deleteComment(commentId);

            if (result) {
                setComments((prev) =>
                    prev.filter((comment) => comment.id !== commentId)
                );
            }
        } catch (error) {
            console.error("Kunne ikke slette kommentaren:", error);
        }
    };

    return (
        <main className="flex flex-col items-center">
            {loading ? (
                <p>Henter...</p>
            ) : (
                <>
                    {product && (
                        <article className="max-w-[570px] w-full flex flex-col gap-4">
                            <Image
                                src={product.image || "/images/placeholder.png"}
                                alt={product.name}
                                width={1200}
                                height={1200}
                            />

                            <div className="flex flex-col gap-2">
                                <h1 className="heading-1">{product.name}</h1>
                                <p className="font-light">
                                    {product.description}
                                </p>
                            </div>

                            <span className="text-xl font-medium">
                                Pris: {formatPrice(product.price)}
                            </span>
                        </article>
                    )}
                </>
            )}{" "}
            {!loadingUser && user && (
                <>
                    <Hr className="mt-16 mb-8" />
                    <section className="max-w-[570px] w-full flex flex-col gap-5">
                        <h2 className="text-3xl text-dark-green text-center">
                            Kontakt sælger
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            onChange={() => {
                                setErrorMessage(null);
                                setSuccessMessage(null);
                            }}
                        >
                            <textarea
                                name="message"
                                placeholder="Skriv en besked til sælger..."
                                className="border-2 border-dark-green/50 w-full p-3.5 resize-none h-36"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>

                            <ul className="flex justify-between">
                                {errorMessage && (
                                    <li>
                                        <p className="text-burgundy">
                                            {errorMessage}
                                        </p>
                                    </li>
                                )}
                                {successMessage && (
                                    <li>
                                        <p className="text-green-tea">
                                            {successMessage}
                                        </p>
                                    </li>
                                )}
                                <li className="ml-auto">
                                    <button className="py-2 px-6 text-white bg-dark-green hover:bg-dark-green/80">
                                        Send
                                    </button>
                                </li>
                            </ul>
                        </form>

                        <div className="flex flex-col gap-8">
                            {comments?.map((comment, index) => (
                                <div
                                    key={comment.id}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div
                                        className={cn(
                                            index % 2 === 0
                                                ? "col-start-1 col-end-2"
                                                : "col-start-2 col-end-3",
                                            "flex flex-col gap-1"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                index % 2 === 1 && "text-end"
                                            )}
                                        >
                                            {comment.user.id ===
                                            product?.user.id
                                                ? `${comment.user.firstname} (sælger)`
                                                : comment.user.firstname}
                                        </span>
                                        <article
                                            className={cn(
                                                "border-2 border-dark-green/50 p-4"
                                            )}
                                        >
                                            <p>{comment.comment}</p>
                                        </article>
                                        {user.id === comment.user.id && (
                                            <button
                                                onClick={() => {
                                                    handleCommentDelete(
                                                        comment.id
                                                    );
                                                }}
                                                className="text-burgundy hover:underline text-end cursor-pointer"
                                            >
                                                Slet kommentar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};

export default ProductPage;
