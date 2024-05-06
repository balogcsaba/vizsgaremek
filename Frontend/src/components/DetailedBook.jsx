import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailedBook() {
    const { BookID } = useParams();  // Kinyeri a `bookID` paramétert az URL-ből
    const [selectedBook, setSelectedBook] = useState({}); // Állapot kezdeti értéke null

    useEffect(() => {
        fetch(`http://localhost:3001/books/${BookID}`)
            .then(res => res.json())
            .then(data => setSelectedBook(data))
            .catch(err => {
                console.error("Hiba történt a könyvek lekérésekor:", err); // Hiba kezelése
            });
    }, [BookID]); // Függőségek, hogy az useEffect csak a bookID változásakor fusson le újra

    const handleCart = (selectedBook) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const isProductExist = cart.find(item => item.BookID === selectedBook.BookID);
      if (!isProductExist) {
          localStorage.setItem('cart', JSON.stringify([...cart, { ...selectedBook, quantity: 1 }]));
          alert(`${selectedBook.title} című könyv kosárba került `);
      } else {
          const isCartEmpty = cart.length === 0;
          if (isCartEmpty) {
              localStorage.removeItem('cart'); // Ha a kosár üres, töröljük a localStorage-ból
              setCarts([]); // És frissítjük az állapotot is
          }
          alert(`${selectedBook.title} című könyv már szerepel a kosárban`);
      }
  }


    return (
        <div className="bg-transparent dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        {selectedBook ? (
                            <div>
                                <div className="bg-transparent dark:bg-gray-800 py-8">
                                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <div className="flex flex-col md:flex-row -mx-4">
                                            <div className="md:flex-1 px-4">
                                                <div className="rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                                    <img className="w-full" src={selectedBook.book_url} alt="Product Image" />
                                                </div>
                                                <div className="flex justify-center">
                                                    <span className="text-2xl font-bold text-gray-700 dark:text-gray-300 py-4">Kölcsönzési díj:</span>
                                                    <span className="text-2xl text-gray-600 dark:text-gray-300 py-4 px-2">{selectedBook.price} Ft</span>
                                                </div>
                                                <div className="flex justify-center">
                                                    <div>
                                                        <Link to={"/cart"}>
                                                            <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleCart(selectedBook)}>Kosárba</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:flex-1 px-4">
                                                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{selectedBook.title}</h2>
                                                <h2 className="underline text-2xl font text-gray-800 dark:text-white mb-2">Szerző: {selectedBook.author}</h2>
                                                <p className="underline text-gray-600 dark:text-gray-300 text-sm mb-4">
                                                    {selectedBook.publisher} | {selectedBook.the_year_of_publishing} | {selectedBook.language} nyelvű | {selectedBook.cover} kötésű | {selectedBook.number_of_pages} oldal
                                                </p>
                                                <div className="flex mb-4">
                                                    <div className="mr-4">
                                                        <span className="font-bold text-gray-700 dark:text-gray-300">Kölcsönzési díj:</span>
                                                        <span className="text-gray-600 dark:text-gray-300">{selectedBook.price} Ft</span>
                                                    </div>
                                                    <div className="mr-4">
                                                        <span className="font-bold text-gray-700 dark:text-gray-300">Státusz:</span>
                                                        <span className="text-green-600 dark:text-gray-300"> Kölcsönözhető</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-1xl text-justify font-bold text-gray-800 dark:text-white mb-2">
                                                        {selectedBook.description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            <tr>
                                                                <td className="px-2 py-4 whitespace-nowrap">Kiadó</td>
                                                                <td className="px-20 py-4 whitespace-nowrap">{selectedBook.publisher}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-2 py-4 whitespace-nowrap">Kiadás éve:</td>
                                                                <td className="px-20 py-4 whitespace-nowrap">{selectedBook.the_year_of_publishing}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-2 py-4 whitespace-nowrap">Nyelv</td>
                                                                <td className="px-20 py-4 whitespace-nowrap">{selectedBook.language}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-2 py-4 whitespace-nowrap">Borító</td>
                                                                <td className="px-20 py-4 whitespace-nowrap">{selectedBook.cover}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-2 py-4 whitespace-nowrap">Lapok száma</td>
                                                                <td className="px-20 py-4 whitespace-nowrap">{selectedBook.number_of_pages} oldal</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-2 py-4 whitespace-nowrap">ISBN</td>
                                                                <td className="px-20 py-4 whitespace-nowrap">{selectedBook.ISBN}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-2 py-4 whitespace-nowrap">Árukód</td>
                                                                <td className="px-20 py-4 whitespace-nowrap">{selectedBook.itemcode}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Könyv adatainak betöltése...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedBook;
