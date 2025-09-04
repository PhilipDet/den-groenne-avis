export const Input = ({
    title,
    name,
    onChange,
    type,
    value,
}: {
    title: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    value?: string | number;
}) => {
    return (
        <label htmlFor={name} className="label">
            {title}
            <input
                className="input"
                type={type ? type : "text"}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={
                    name === "email" || name === "address" || name === "city"
                        ? `Din ${title.toLowerCase()}...`
                        : `Dit ${title.toLowerCase()}...`
                }
            />
        </label>
    );
};
