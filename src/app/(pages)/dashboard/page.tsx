"use client";

import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input";
import { updateUser, deleteUser } from "@/services/user";
import { UserType } from "@/lib/types";
import { validation } from "@/lib/validation";

const DashboardPage = () => {
    const { user, loadingUser, logout } = useAuth();
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [news, setNews] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (user) {
            setFirstName(user.firstname || "");
            setLastName(user.lastname || "");
            setAddress(user.address || "");
            setCity(user.city || "");
            setZipcode(user.zipcode.toString() || "");
            setEmail(user.email || "");
            setNews(user.hasNewsletter || false);
            setNotification(user.hasNotification || false);
        }
    }, [user, loadingUser, router]);

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        try {
            const emailError = validation.email(email);
            const firstNameError = validation.firstName(firstName);
            const lastNameError = validation.lastName(lastName);
            const addressError = validation.address(address);
            const cityError = validation.city(city);
            const zipcodeError = validation.zipcode(zipcode);

            const errors = [
                emailError,
                firstNameError,
                lastNameError,
                addressError,
                cityError,
                zipcodeError,
            ].filter((error) => error !== true);

            if (errors.length > 0) {
                setErrorMessage(errors[0]);
                return;
            }

            const updatedData: UserType = {
                id: user.id,
                firstname: firstName,
                lastname: lastName,
                address,
                city,
                zipcode: parseInt(zipcode),
                email,
                hasNewsletter: news,
                hasNotification: notification,
            };

            const result = await updateUser(user.id, updatedData);

            if (!result) {
                throw new Error("Kunne ikke opdatere profil");
            }

            alert("Profil opdateret");
        } catch (error) {
            console.error("Fejl ved opdatering af profil:", error);
        }
    };

    const deleteProfile = async () => {
        try {
            if (!user) return;

            const confirmDelete = confirm(
                "Er du sikker på at du vil slette din profil?"
            );

            if (!confirmDelete) return;

            logout();

            const result = await deleteUser(user.id);
            if (!result) {
                throw new Error("Kunne ikke slette profil");
            }
        } catch (error) {
            console.error("Fejl ved sletning af profil:", error);
        }
    };

    return (
        user && (
            <>
                <main>
                    <form
                        onSubmit={updateProfile}
                        className="grid grid-col-1 md:grid-cols-2 gap-10"
                    >
                        <div>
                            <Input
                                title="Fornavn"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                title="Efternavn"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Input
                                title="Adresse"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Input
                                title="By"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <Input
                                title="Postnummer"
                                name="zipcode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                            />
                            <Input
                                title="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-14">
                            <ul className="flex flex-col gap-6">
                                <li>
                                    <label
                                        htmlFor="news"
                                        className="flex items-center gap-5"
                                    >
                                        Jeg ønsker at modtage nyheder om
                                        klima-indsatsen, gode tilbud, ekslusive
                                        deals og lignende promoverings-mails fra
                                        den grønne avis og samarbejds-parnere?
                                        <div className="relative min-w-6 h-6">
                                            <input
                                                type="checkbox"
                                                name="news"
                                                id="news"
                                                checked={news}
                                                onChange={(e) =>
                                                    setNews(e.target.checked)
                                                }
                                                className="peer opacity-0 w-6 h-6 absolute cursor-pointer"
                                            />
                                            <div className="absolute inset-0 bg-background transition-colors border-3 border-dark-green peer-checked:bg-dark-green"></div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <label
                                        htmlFor="notification"
                                        className="flex gap-5"
                                    >
                                        Jeg ønsker at modtage notifikationer i
                                        form af emails når der sker en
                                        opdatering på en af mine annoncer eller
                                        jeg modtager en ny henvendelse?
                                        <div className="relative min-w-6 h-6">
                                            <input
                                                type="checkbox"
                                                name="notification"
                                                id="notification"
                                                checked={notification}
                                                onChange={(e) =>
                                                    setNotification(
                                                        e.target.checked
                                                    )
                                                }
                                                className="peer opacity-0 w-6 h-6 absolute cursor-pointer"
                                            />
                                            <div className="absolute inset-0 bg-background transition-colors border-3 border-dark-green peer-checked:bg-dark-green"></div>
                                        </div>
                                    </label>
                                </li>
                            </ul>

                            <ul className="flex justify-center md:flex-col items-end gap-8">
                                {errorMessage && (
                                    <li>
                                        <p className="text-burgundy text-lg">
                                            {errorMessage}
                                        </p>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={deleteProfile}
                                        className="bg-burgundy text-white text-sm py-3 px-4 w-[140px] cursor-pointer hover:bg-burgundy/80 transition duration-200"
                                    >
                                        Slet profil
                                    </button>
                                </li>
                                <li>
                                    <button className="bg-dark-green text-white text-sm py-3 px-4 w-[140px] cursor-pointer hover:bg-dark-green/80 transition duration-200">
                                        Gem ændringer
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </main>
            </>
        )
    );
};

export default DashboardPage;
