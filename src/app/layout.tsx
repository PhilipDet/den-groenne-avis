import { Navbar } from "@/components/navbar";
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
                        <Hr className="mb-6 mt-12" />
                        {children}
                    </LayoutWrapper>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
