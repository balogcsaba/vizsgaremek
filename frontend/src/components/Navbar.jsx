import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <div className="flex p-2 justify-between items-center border-b border-gray-300 flex-wrap">
        <div className="flex items-center">
          <img src="https://arthobby.hu/shop_ordered/27703/pic/book-rrental.jpg" className="w-20 h-20"/>
          <h2 className="font-bold text-2xl text-purple-600">Könyvkölcsönző</h2>
        </div>
        <div className="relative flex items-center hidden md:inline-flex">
          <input type="text" placeholder="Search" className="border border-gray-200 rounded-md py-1 px-2"/>
          <svg className="absolute right-2 h-6 w-6 text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center gap-6">
        <Link to="/supervisor-admin"
            className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Rendszer Admin
          </Link>
          <Link to="/"
            className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Főoldal
          </Link>
          <Link to="/belepes"
            className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Belépés
          </Link>
          <Link to="/regisztracio" className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Regisztráció
          </Link>
          <Link to="/cart" className="duration-100 transform hover:scale-125 transition ease-linear px-2 py-2 m-4 inline">Kosár
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
