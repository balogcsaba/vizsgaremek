import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import User from './User';


function Navbar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [UserID, setUserID] = useState(null); // UserID állapot hozzáadás


  

  useEffect(() => {
    const adminValue = localStorage.getItem("isAdmin");
    setIsAdmin(adminValue);
    setEmail(localStorage.getItem("email"))
    setUserID(localStorage.getItem("UserID"))
  }, [location])

 
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("UserID");
    localStorage.removeItem("isAdmin");
    navigate("/")
  }


  return (
    <div className="flex p-2 justify-between items-center border-b border-gray-300 flex-wrap">
      <div className="flex items-center">
        <img src="https://arthobby.hu/shop_ordered/27703/pic/book-rrental.jpg" className="w-20 h-20" alt="Logo" />
       <Link to={"/"} ><h2 className="font-bold text-2xl text-teal-500">Könyvkölcsönző</h2></Link>
      </div>
     
      <div className="flex items-center gap-6">

        <Link to="/"
          className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Főoldal
        </Link>
           
        {
          (isAdmin==="1") &&
          <Link to="/supervisor-admin"
            className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Rendszer Admin
          </Link>
        }
   
        { (isAdmin!==1) && (localStorage.getItem('UserID')) &&
        <Link to="/cart"
          className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Kosár
        </Link>
        } 
        
        {(localStorage.getItem('UserID')) &&
          <Link to="/" onClick={handleLogout}
            className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Kilépés
          </Link>
        }
       {

              
          (isAdmin==="0" )  && localStorage.getItem('UserID') &&
        <div>
          <div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Felhasználoó fiók
            {/*<!-- Dropdown arrow -->*/}
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        {/*<!-- Dropdown menu -->*/}
        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
               <Link to={`/adataim/${UserID}`} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Adataim</Link>                 
            </div>
        </div>
    </div>
</div>
        </div>
        }
            {!(localStorage.getItem('UserID')) &&
          <Link to="/belepes"
            className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Belépés
          </Link>
        }
          {!(localStorage.getItem('UserID')) &&
          <Link to="/regisztracio"
            className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Regisztráció
          </Link>
        }
    
      </div>
    </div>
  );
}

export default Navbar;
