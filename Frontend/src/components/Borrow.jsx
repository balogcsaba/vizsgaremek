import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Borrow(props) {

    let formObj = {
        bringedBack: "1"}
       
    const [formData, setFormData] = useState(formObj);

    const torles = (cartID) => {
      fetch(`http://localhost:3001/admin/borrows/cart/${cartID}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          credentials: 'include',
      })
          .then(res => res.text())
          .then(res => {
              toast.success(res); // Sikeres törlés üzenet
              props.update();
          })
          .catch(err => {
              console.log(err);
              toast.error("Hiba történt a törlés során."); // Hiba üzenet
          });
  }
  
  const lezaras = (cartID) => {
      setFormData(formObj);
      fetch(`http://localhost:3001/admin/borrows/cart/${cartID}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
          credentials: 'include',
      })
          .then(res => res.text())
          .then(res => {
              toast.success(res); // Sikeres lezárás üzenet
              props.update();
          })
          .catch(err => {
              console.log(err);
              toast.error("Hiba történt a lezárás során."); // Hiba üzenet
          });
  }

  return (

    <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {props.borrow.cartID}
              </div>
              <div className="text-sm text-gray-500">
              {props.borrow.start_of_borrowment}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900"> {props.borrow.Name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900"> {props.borrow.title}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900"> {props.borrow.end_of_borrowment}  </div>
        </td>
        {props.borrow.bringedBack === 0 && (
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">Kölcsönözve</div>
        </td>
      )}
         {props.borrow.bringedBack === 1 && (
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">Visszahozva, lezárt</div>
        </td>
        
      )}
      {props.borrow.bringedBack === 0 &&
      <td className="px-6 py-4 whitespace-nowrap">
          <button onClick={() => document.getElementById(`vissza${props.borrow.cartID}`).showModal()} className='bg-teal-300 p-4'> Lezárás </button>
        </td>
}
{props.borrow.bringedBack === 1 &&
      <td className="px-6 py-4 whitespace-nowrap">
          
        </td>
}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <a onClick={() => document.getElementById(`torol${props.borrow.cartID}`).showModal()} className="ml-2 text-red-600 hover:text-red-900">Töröl</a>
        </td>
          
        <dialog id={`torol${props.borrow.cartID}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Törlés</h3>
        <p className="py-4">
          Biztosan törli {props.borrow.cartID} azonosítójú kölcsönzést?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => torles(props.borrow.cartID)} className="btn">Ok</button>
            <button className="btn">Mégsem</button>
          </form>
        </div>
      </div>
    </dialog>
    <dialog id={`vissza${props.borrow.cartID}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Törlés</h3>
        <p className="py-4">
          Biztosan lezárod {props.borrow.cartID} azonosítójú kölcsönzést?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => lezaras(props.borrow.cartID)} className="btn">Ok</button>
            <button className="btn">Mégsem</button>
          </form>
        </div>
      </div>
    </dialog>
      </tr>

  )
}

export default Borrow