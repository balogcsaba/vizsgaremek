import React, { useState, useEffect } from 'react';
import BookAdmin from './BookAdmin';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);  // Hozzáadva a books állapot és a setBooks állapot-beállító függvény

    useEffect(() => {
        fetch("http://localhost:3001/books")
            .then(res => res.json())
            .then(data => {
                setBooks(data);  // Feltehetőleg itt a 'books' az adatok tömbje
            })
            .catch(err => console.log(err));
    }, []);  // A useEffect csak a komponens első renderelésekor fut le
console.log(books)
    return (
        <div>
            <h2 className='text-3xl flex justify-center p-12'>Kölcsönözhető könyvek listája</h2>

            <div class="relative w-full max-w-xl mx-auto bg-white rounded-full">
                <input placeholder="könyv címe, vagy szerző alapján,majd kitaláljuk" class="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200" type="text" name="query" id="query" />
                <button type="submit" class="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <svg class="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Keresés
                </button>
              
            </div>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row p-4">
    <Link to={"/newbook"}
        className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm font-bold bg-green-300 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
        Új könyv felvitele
        <span className="ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
            </svg>
        </span>
    </Link>

    <a href=""
        class="flex items-center justify-center w-full px-4 py-4 text-sm font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-green-300 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1">
        See Features
    </a>
</div>
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Könyv címe
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Szerző
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kölcsönözhető
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                        <BookAdmin key={book.id} book={book} />  // 'book' objektum átadása helyesen
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
