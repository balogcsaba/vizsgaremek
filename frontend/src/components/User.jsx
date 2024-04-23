import React from 'react';

function User({ user }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt=""/>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.userID}
            </div>
           
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">
              {user.name}
            </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {user.email}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <div className="text-sm text-gray-900">{user.zip} {user.city}</div>
        <div className="text-sm text-gray-500">{user.address}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      {user.admin ? "Adminisztrátor" : "Vásárló"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Szerkeszt</a>
        <a href="#" className="ml-2 text-red-600 hover:text-red-900">Töröl</a>
      </td>
    </tr>
  );
}

export default User;
