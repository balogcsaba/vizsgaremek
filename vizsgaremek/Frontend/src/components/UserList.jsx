import React from 'react'
import User from './User';
import { useState, useEffect } from 'react';

function UserList() {
    const [users,setUsers] = useState([]);  // Hozzáadva a books állapot és a setBooks állapot-beállító függvény

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);  // Feltehetőleg itt a 'users' az adatok tömbje
            })
            .catch(err => console.log(err));
    }, []);  // A useEffect csak a komponens első renderelésekor fut le
  return (
    <div>
         <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
    <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azonosító
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Név
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Emailcím
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lakcím
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vásárló / Adminisztátor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Műveletek
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
    
}

export default UserList