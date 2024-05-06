import React, { useState, useEffect } from 'react';
import Borrow from './Borrow';
import { Link } from 'react-router-dom';

function BorrowList() {
    const [borrows, setBorrows] = useState([]);
    const [letter, setLetter] = useState(""); 
    const [lastCartID, setLastCartID] = useState(null);
    const [search, setSearch] = useState(false)
   
    useEffect(() => {
        loadBorrows();
    }, []);

    const loadBorrows = () => {
        fetch("http://localhost:3001/admin/borrowedbooks")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBorrows(data);
                } else {
                    console.error('Received non-array data:', data);
                    setBorrows([]);  // Beállít egy üres tömböt, ha a válasz nem tömb
                }
            })
            .catch(err => {
                console.log(err);
                setBorrows([]);  // Hiba esetén is üres tömböt állít be
            });
    };

    const updateBorrows = () => {
        loadBorrows();  // Frissíti a kölcsönzéseket
    };

    const inputLetterChange = (e) => {
        const input = e.target.value;
        setLetter(input.slice(0, 6));
    }

    const handleClick = () => {
        setSearch(true);
        fetch(`http://localhost:3001/admin/borrows/cart/${letter}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBorrows(data);
                } else {
                    console.error('Received non-array data:', data);
                    setBorrows([]);  // Beállít egy üres tömböt, ha a válasz nem tömb
                }
            })
            .catch(err => {
                console.log(err);
                setBorrows([]);  // Hiba esetén is üres tömböt állít be
            });
    }

    const handlecClick2 = () => {
        setLetter("");
        setLastCartID(null);
        setSearch(false);
        updateBorrows();
    }

    return (
        <div>
            <h2 className='text-3xl flex justify-center p-12'>Kölcsönözések listája</h2>
            <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
                <input
                    placeholder="Keresés rendelés azonosítója alapján"
                    className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
                    type="text"
                    name="query"
                    id="query"
                    value={letter}
                    onChange={inputLetterChange}
                />
                { !search &&
                <button onClick={handleClick} className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Keresés
                </button>
                }
                { search &&
                <button onClick={handlecClick2} className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Keresés törlése
                </button>
}
            </div>

            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kölcsönzés azonosítója és dátuma
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kölcsönző neve
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kölcsönző elérhetősége
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kölcsönzés lejárati ideje
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kölcsönzés státusza
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Lezárás
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kölcsönzés törlése
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(borrows) && borrows.map((borrow) => (
                        <Borrow key={borrow.CartID} borrow={borrow} update={updateBorrows} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BorrowList;
