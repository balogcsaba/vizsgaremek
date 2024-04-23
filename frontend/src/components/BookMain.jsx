import React, { useState, useEffect } from "react";
import Book from "./Book";
import { useParams, useNavigate } from "react-router-dom";
import '../../style.css';

function BookMain() {
  const [books, setBooks] = useState([]);
  const { categoryID } = useParams();
  console.log(`BookMain category = ${categoryID}`);
  

  useEffect(() => {
    // Dinamikus URL kialakítása a categoryID alapján
    //const url = categoryID ? `http://localhost:3001/books/category/${categoryID}` : "http://localhost:3001/books";//
    const url= "http://localhost:3001/books";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
      })
      .catch(err => console.log(err));
  }, []); // A useEffect most már a categoryID változásaira reagál
  console.log(books);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-1 custom-padding">
      {books.map((book, i) => (
        <Book key={i} book={book} />
      ))}
    </div>
  );
}

export default BookMain;
