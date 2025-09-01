import "./globals.css";
import { Providers } from "./provider";

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col items-center">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
