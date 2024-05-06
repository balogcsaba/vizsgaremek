import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgottenPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // Email küldési logika, ami megkapja a verificationCode-ot paraméterként
    const handleSendEmail = (verificationCode) => {
        const templateParams = {
            to_email: email,
            from_email: 'infokonykolcsonzo@gmail.com',
            subject: 'Ellenőrző kód küldése',
            ellenorzokod: verificationCode,
        };

        emailjs.send('service_mipbx9a', 'template_z4cxcwt', templateParams, 't2P0egLC6EXkHDhyE')
            .then((response) => {
                console.log('Email sent successfully:', response);
                toast.success('Sikeres email küldés!')
            })
            .catch((error) => {
                console.error('Hiba az email küldés során:', error);
                toast.error(error.message)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Ellenőrző kód generálása
        localStorage.setItem("verificationCode", verificationCode);
        localStorage.setItem("email", email);
        console.log(`verificationCode: ${verificationCode} email: ${email}`);
        handleSendEmail(verificationCode); // Az ellenőrző kód átadása a handleSendEmail függvénynek
        navigate("/jelszomodositas");
    };

    return (
        <div class="min-h-screen bg-gray-100 flex items-center justify-center">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h1 class="text-center text-2xl font-bold mb-6">Elfelejtett jelszó visszaállítása</h1>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="email">
                            Email cím
                        </label>
                        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="regisztrációnál használt email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                        Hitelesítő kód küldése
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgottenPassword;
