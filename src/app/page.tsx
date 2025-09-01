"use client";

import { PickedProducts } from "@/components/pickedProducts";
import { Hr } from "@/components/hr";

const Home = () => {
    return (
        <main>
            <PickedProducts />
            <Hr className="my-4" />
            {/* Banner here */}
            <Hr className="my-4" />
            {/* Categories here */}
            <Hr className="my-4" />
            {/* Donation banners here */}
        </main>
    );
};

export default Home;
