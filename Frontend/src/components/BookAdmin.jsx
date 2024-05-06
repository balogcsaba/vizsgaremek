import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function BookAdmin(props) {

  const torles = (BookID) => {
    fetch(`http://localhost:3001/books/${BookID}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
    })
      .then(res => res.text())
      .then(res => {
        toast.success(res); // Sikeres törlés üzenet
        props.onDelete();
      })
      .catch(err => {
        console.log(err);
        toast.error("Hiba történt a törlés során."); // Hiba üzenet
      });
  }

  return (


    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-15 w-15" src={props.book.book_url} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {props.book.title}
            </div>
            <div className="text-sm text-gray-500">
              {props.book.number_of_pages} oldal
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{props.book.author}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link to={`/editbook/${props.book.BookID}`} className="text-indigo-600 hover:text-indigo-900">Szerkeszt</Link>
        <a onClick={() => document.getElementById(`torol${props.book.BookID}`).showModal()} className="ml-2 text-red-600 hover:text-red-900">Töröl</a>
      </td>
      <dialog id={`torol${props.book.BookID}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Törlés</h3>
          <p className="py-4">
            Biztosan törli {props.book.title} című könyv adatait?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={() => torles(props.book.BookID)} className="btn">Ok</button>
              <button className="btn">Mégsem</button>
            </form>
          </div>
        </div>
      </dialog>
    </tr>

  )
}

export default BookAdmin