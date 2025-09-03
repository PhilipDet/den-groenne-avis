"use client";

import { PickedProducts } from "@/components/pickedProducts";
import { Hr } from "@/components/hr";
import { MainBanner } from "@/components/mainBanner";
import { PopularCategories } from "@/components/popularCategories";
import { DonationBanners } from "@/components/donationBanners";

const Home = () => {
    return (
        <main>
            <PickedProducts />
            <Hr className="mt-4 mb-14" />
            <MainBanner />
            <Hr className="mb-4 mt-14" />
            <PopularCategories />
            <Hr className="mt-4" />
            <DonationBanners />
        </main>
    );
};

export default Home;
