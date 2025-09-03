import BannerImage2 from "@/public/images/banner_image2.jpg";
import BannerImage3 from "@/public/images/banner_image3.jpg";

export const DonationBanners = () => {
    return (
        <section className="mt-6 w-full flex gap-10">
            <article
                className="w-full relative bg-cover bg-center flex flex-col gap-2 py-4 px-9"
                style={{
                    backgroundImage: `url(${BannerImage2.src})`,
                }}
            >
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
            </article>
            <article
                className="w-full relative bg-cover bg-center flex flex-col gap-2 py-4 px-9"
                style={{
                    backgroundImage: `url(${BannerImage3.src})`,
                }}
            >
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
            </article>
        </section>
    );
};
