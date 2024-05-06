import React from 'react';
import User from './User';
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [letter, setLetter] = useState("");
    const [inputLetter, setInputLetter] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);  // Új állapot, ami jelzi, hogy történt-e már keresés

    const inputLetterChange = (e) => {
        const input = e.target.value;
        setInputLetter(input.slice(0, 1));
    };
    

    const handleClick = () => {
        setLetter(inputLetter);
        setSearchPerformed(true);  // Keresés történt
        fetch(`http://localhost:3001/admin/users/search/${inputLetter}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(err => {
                console.log(err);
                setUsers([]);  // Hiba esetén vagy ha nincsenek eredmények, üres listát állítunk be
            });
    };

    const handlecClick2 = () => {
        setLetter("");
        setInputLetter("");
        setSearchPerformed(false);  // Keresési állapot törlése
        refreshUsers();
    };

    const refreshUsers = () => {
        fetch("http://localhost:3001/admin/users")
            .then(res => res.json())
            .then(data => {
                console.log("Users refreshed", data);
                setUsers(data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        refreshUsers();
    }, []);

    return (
        <div>
            <h2 className='text-3xl flex justify-center p-12'>Regisztrált felhasználók listája</h2>

            <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
                <input
                    placeholder="Felhasználó kezdőbetűje alapján"
                    className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
                    type="text"
                    value={inputLetter}
                    onChange={inputLetterChange}
                />
                <button
                    type="submit"
                    onClick={handleClick}
                    className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    Keresés
                </button>

                {searchPerformed && (
                    <button
                        onClick={handlecClick2}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow"
                    >
                        Keresés törlése
                    </button>
                )}
            </div>

            {users.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Azonosító
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Név
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Emailcím
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lakcím
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vásárló / Adminisztátor
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Műveletek
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <User key={user.UserID} user={user} onDelete={refreshUsers} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1 className="text-center my-10 text-xl">Nincs ilyen kezdőbetűvel felhasználó.</h1>
            )}
        </div>
    );
}

export default UserList;
