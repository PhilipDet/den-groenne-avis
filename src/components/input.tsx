export const Input = ({
    title,
    name,
    onChange,
}: {
    title: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <label htmlFor={name} className="label">
            {title}
            <input
                className="input"
                type={name === "password" ? "password" : "text"}
                name={name}
                onChange={onChange}
                placeholder={
                    name === "email" || name === "address" || name === "city"
                        ? `Din ${title.toLowerCase()}...`
                        : `Dit ${title.toLowerCase()}...`
                }
            />
        </label>
    );
};
