export const validation = {
    email: (value: string) =>
        /\S+@\S+\.\S+/.test(value) || "Ugyldig emailadresse",
    password: (value: string) =>
        (value.length >= 6 && /[!@#$%^&*]/.test(value)) ||
        "Adgangskode skal være mindst 6 tegn + 1 specialtegn",
    firstName: (value: string) => value.length > 0 || "Fornavn er påkrævet",
    lastName: (value: string) => value.length > 0 || "Efternavn er påkrævet",
    address: (value: string) => value.length > 0 || "Adresse er påkrævet",
    city: (value: string) => value.length > 0 || "By er påkrævet",
    zipcode: (value: string) => /^\d{3,4}$/.test(value) || "Ugyldig postnummer",

    title: (value: string) => value.length > 0 || "Titel er påkrævet",
    description: (value: string) =>
        value.length > 0 || "Beskrivelse er påkrævet",
    url: (value: string) => /\S+\.\S+/.test(value) || "Ugyldig URL",
    price: (value: number) => value >= 0 || "Pris skal være 0 eller højere",
};
