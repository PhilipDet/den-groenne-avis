import BannerImage1 from "@/public/images/banner_image1.jpg";
import Image from "next/image";

export const MainBanner = () => {
    return (
        <article className="relative flex flex-col items-center gap-10 text-center text-white pt-12 pb-20">
            <div className="absolute inset-0 bg-black/25 z-10 h-full"></div>
            <Image
                className="absolute inset-0 w-full h-full object-cover"
                src={BannerImage1.src}
                alt="Main Image"
                layout="fill"
                objectFit="cover"
                quality={70}
            />
            <h1 className="text-5xl text-shadow-lg z-20">Den Grønne Avis</h1>
            <p className="max-w-[510px] text-2xl text-shadow-lg z-20">
                Vi går forest i kampen om klimaet ved at give 2 kr. til
                klima-venlige formål, hver gang du handler brugt på Den Grønne
                Avis
            </p>
        </article>
    );
};
