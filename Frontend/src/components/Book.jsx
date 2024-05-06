import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Book({ book }) {
  // Biztonságosan destrukturáljuk a szükséges könyv tulajdonságokat
  const { BookID, book_url, title, author, price } = book;
  {/*console.log(`BookID innen book: ${BookID}`);*/}

  return (
    <div className="min-h-32 max-w-[450px] dark:bg-gray-900 dark:text-gray-100 border dark:border-0 mx-auto relative rounded-md hover:shadow-xl cursor-pointer duration-200">
      <div className="overflow-hidden p-2 rounded-md">
        {/* Dinamikus alt szöveg a jobb akadálymentesség érdekében */}
        <img alt={`A(z) '${title}' című könyv borítója`} loading="lazy" className="book-image" src={book_url} />
      </div>
      <div className="justify-center px-10 py-4">
        <h3 className="text-lg font-bold text-center">{title}</h3>
        <div className="border-b-2 my-1"></div>
        <h1 className="text-base text-center">Szerző: {author}</h1>
        <p className="text-center text-xs flex justify-center gap-2 my-2">
          <h3 className="text-lg text-center">{price} Ft</h3>
          {/*<span>{book.discounted_price}</span>*/}
        </p>
        <div className="flex justify-center">
          <Link to={`/${BookID}`} className="flex justify-center w-full bg-teal-600 dark:bg-gray-600 text-white py-2 px-20 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
            Megnézem
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Book;
