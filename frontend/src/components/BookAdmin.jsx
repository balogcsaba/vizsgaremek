import React from 'react'
import { Link } from 'react-router-dom';

function BookAdmin(props) {
  return(
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-15 w-15" src={props.book.book_url} alt=""/>
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
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          kölcsönözve / bent 
          {/* ezt majd 2 változóba kell tenn*/}
        </span>
      </td>
 
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link to={`/editbook/${props.book.BookID}`}  className="text-indigo-600 hover:text-indigo-900">Szerkeszt</Link>
        <a href="#" className="ml-2 text-red-600 hover:text-red-900">Töröl</a>
      </td>
    </tr>
  );
}

export default BookAdmin