import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";
import { Providers } from "./provider";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Hr } from "@/components/hr";

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col items-center">
                <Providers>
                    <Navbar />
                    <LayoutWrapper>
                        <Hr className="mb-6" />
                        {children}
                    </LayoutWrapper>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
