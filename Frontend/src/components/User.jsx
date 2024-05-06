import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function User(props) {

  const torles = (UserID) => {
    fetch(`http://localhost:3001/admin/users/${UserID}`, {
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
        })
}


  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt=""/>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {props.user.UserID}
            </div>
           
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">
              {props.user.Name}
            </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {props.user.Email}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <div className="text-sm text-gray-900">{props.Zip} {props.City}</div>
        <div className="text-sm text-gray-500">{props.user.ZIP} {props.user.City } {props.user.Address}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      {props.user.IsAdmin ? "Adminisztrátor" : "Vásárló"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <a onClick={() => document.getElementById(`torol${props.user.UserID}`).showModal()} className="ml-2 text-red-600 hover:text-red-900">Töröl</a>
      </td>
      <dialog id={`torol${props.user.UserID}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Törlés</h3>
        <p className="py-4">
          Biztosan törli {props.user.Name} nevű felhasználó adatait?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => torles(props.user.UserID)} className="btn">Ok</button>
            <button className="btn">Mégsem</button>
          </form>
        </div>
      </div>
    </dialog>
    </tr>
  );
}

export default User;
