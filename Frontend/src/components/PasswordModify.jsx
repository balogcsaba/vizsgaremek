import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordModify() {
    const email = localStorage.getItem("email");
    const ellenorzokod = localStorage.getItem("verificationCode");
    const [inputCode, setInputCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [codeVerified, setCodeVerified] = useState(false);
    const [modified, setModified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // További logika itt, ha szükséges
    }, [codeVerified]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ellenorzokod === inputCode) {
            setCodeVerified(true);
            toast.success("A kód helyes, kérem adja meg az új jelszavát."); // Sikeres kódüzenet
        } else {
            setCodeVerified(false);
            toast.error("Hibás kód."); // Hibás kódüzenet
        }
    };

    let formObj = {
        "email": email,
        "pass": password
    };

    const [formData, setFormData] = useState(formObj);

    const writeFormData = (e) => {
        const key = e.target.id === "password" ? "pass" : e.target.id;
        setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };


    
    const kuldes = async () => {
        try {
            const response = await fetch("http://localhost:3001/resetpass", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            const valasz = await response.json();
            console.log("Válasz a szervertől:", valasz);
    
            if (response.ok) {
                setModified(true);
                setCodeVerified(false);
                toast.success("Módosítás sikeres volt!"); // Sikeres módosítás üzenet
            } else {
                // Ezt az ágat használjuk, ha a válasz 200-as státuszkódot nem tartalmaz
                toast.error(`Hiba történt: ${valasz.message}`); // Hibás módosítás üzenet, szerver válasza alapján
            }
        } catch (error) {
            console.error('Beküldési hiba:', error);
            toast.error(`Hiba történt a módosítás során: ${error.message}`); // Az error.message tartalmazza a hibát, ha a válasz nem JSON formátumú
        }
    };
    
    

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log(formData.pass, passwordAgain);
        if (formData.pass.length < 6) {
            alert("A jelszónak minimum 6 karakter hosszúnak kell lennie");
            return;
        }
        if (formData.pass !== passwordAgain) {
            alert("A két jelszó nem egyezik meg!");
            return;
        }
        kuldes();
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                    {(!codeVerified) && (!modified) &&
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Megadott email címedre ({email}) küldünk egy hitelesítő kódot, amelyet kérlek az alábbi mezőbe írj be.
                                </label>
                                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ellenorzokod" type="text" placeholder="ellenőrző kód" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                                Kód ellenőrzése
                            </button>
                        </form>
                    }
                    {(codeVerified) && (!modified) &&
                        <section>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="mb-4">
                                    <h1 className='text-xl text-center'>A kód helyes, kérem adja meg az új jelszavát</h1>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Jelszó
                                    </label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Jelszó" required value={formData.pass} onChange={writeFormData} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Jelszó ismét
                                    </label>
                                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passwordAgain" type="password" placeholder="Jelszó" required value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                                    Jelszó módosítása
                                </button>
                            </form>
                        </section>
                    }
                    { modified &&
                        <section>
                            <div className="mb-4">
                                <h1 className='text-3xl text-center'>Módosítás sikeres volt!</h1>
                            </div>
                            <Link to={"/"}>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                                    Ok
                                </button>
                            </Link>
                        </section>
                    }
                </div>
            </div>
        </div>
    );
}

export default PasswordModify;
