export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container mx-auto px-4 pt-12 pb-20 flex-1">
            {children}
        </div>
    );
};
