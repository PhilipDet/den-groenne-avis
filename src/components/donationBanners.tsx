import BannerImage2 from "@/public/images/banner_image2.jpg";
import BannerImage3 from "@/public/images/banner_image3.jpg";
import Image from "next/image";

export const DonationBanners = () => {
    return (
        <section className="mt-6 w-full flex gap-10">
            <article className="w-full relative flex gap-2 py-4 px-9">
                <div className="flex flex-col gap-2 z-10">
                    <h3 className="text-2xl text-white">Donation til Dato</h3>
                    <p className="text-lg text-white">
                        Sammen med dig har vi siden starten indsamlet:
                    </p>
                    <span className="text-4xl text-green-tea text-center">
                        452.231,50 kr
                    </span>
                    <span className="text-xs text-white">
                        Tak fordi du handler brugt, med omtanke for klimaet
                    </span>
                </div>
                <Image
                    src={BannerImage2.src}
                    alt="Banner Image 2"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 w-full h-full z-0"
                    quality={60}
                />
            </article>
            <article className="w-full relative flex gap-2 py-4 px-9">
                <div className="flex flex-col gap-2 z-10">
                    <h3 className="text-2xl text-white">Donation i år</h3>
                    <p className="text-lg text-white">
                        Sammen med dig har vi i år indsamlet:
                    </p>
                    <span className="text-4xl text-green-tea text-center">
                        112.452,75 kr
                    </span>
                    <span className="text-xs text-white">
                        Tak fordi du handler brugt, med omtanke for jorden
                    </span>
                </div>
                <Image
                    src={BannerImage3.src}
                    alt="Banner Image 3"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 w-full h-full z-0"
                    quality={60}
                />
            </article>
        </section>
    );
};
