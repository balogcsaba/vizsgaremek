import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Registration() {
  const registrationStyle = {
    marginTop: '20vh', // 20%-kal lejjebb helyezzük el az elemet
  };
  

  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const phoneRegex= /^\+36\d{9}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      alert('A két jelszó nem egyezik meg!');
    } else if (!phoneRegex.test(phone)) {
      alert('A telefonszám formátuma érvénytelen. Kérjük, a +36-os országkóddal kezdődő 9 számjegyet adjon meg.')    
    }
    else {
 // Itt a regisztrációs folyamat folytatódna, ha a jelszavak egyenlőek lennének
 console.log('A regisztráció folytatódik...');
    }
  };

  return (
    <div className="flex items-center justify-center p-12" style={registrationStyle}>
     
      <div className="mx-auto w-full max-w-[550px] bg-white">
      <h2 className='text-2xl truncate text-center mb-10'>Van már fiókód?  
      <Link to={"/belepes"} className='font-bold text-blue-800 m-12'>Kérlek jelentkezz be!
      </Link>
      </h2>
      <form onSubmit={handleSubmit}>        
          
          <div className="mb-5">
            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
              Teljes név
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Teljes név"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
          </div>
          
          <div className="mb-5">
                <label  className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Telefonszám
                </label>
                <input type="text"  id="phone" placeholder="telefonszám"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Email cím
                </label>
                <input type="email"  id="email" placeholder="email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Jelszó
                </label>
                <input type="password"
                    id="password" 
                    placeholder="írd be a jelszavad"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Jelszó
                </label>
                <input type="password"  
                      id="passwordAgain" 
                      placeholder="írd be a jelszavad ismét"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    value={passwordAgain}
                    onChange={(e)=>setPasswordAgain(e.target.value)}/>
            </div>
            <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Számlázási és lakcím
                </label>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text"  id="ZIP" placeholder="irányítószám"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text"  id="city" placeholder="város"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
              
                    <div className="w-full px-3">
                        <div className="mb-5">
                            <input type="text" id="address" placeholder="utca, házszám"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div>
          
          {/* A többi input mező */}
          
          <div>
            <button
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Regisztráció
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
