import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from './MessageBox.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Registration() {
  const registrationStyle = {
    marginTop: '20vh', // 20%-kal lejjebb helyezzük el az elemet
  };
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [errMessages, setErrMessages] = useState([]);
  const [displayMb, setDisplayMb] = useState(false);
  const buttonsMb = [{
    text:"OK",
    icon:"fa-solid fa-square-check",
    cb:()=>setDisplayMb(false)
  }];

  const navigate = useNavigate(); //ha kell!!!!!!


  // const phoneRegex= /^\+36\d{9}$/;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== passwordAgain) {
//       alert('A két jelszó nem egyezik meg!');
//     } else if (!phoneRegex.test(phone)) {
//       alert('A telefonszám formátuma érvénytelen. Kérjük, a +36-os országkóddal kezdődő 9 számjegyet adjon meg.')    
//     }
//     else {
//  // Itt a regisztrációs folyamat folytatódna, ha a jelszavak egyenlőek lennének
//  console.log('A regisztráció folytatódik...');
//     }

const register = async () => {
  const regObj = {
      fullName: fullName,
      phone: phone,
      email: email,
      pass: pass,
      passAgain: passAgain,
      zip: zip,
      city: city,
      address: address
  };

  try {
      const response = await fetch("http://localhost:3001/regisztracio", {
          method: "POST",
          body: JSON.stringify(regObj),
          headers: { "Content-type": "application/json" }
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
          toast.success("Sikeres regisztráció");
          navigate(`/belepes`);
      } else {
          json.forEach((msg) => toast.error(msg)); // Hibás regisztrációs üzenetek megjelenítése
      }
  } catch (err) {
      toast.error("Hiba történt a regisztráció során.");
      console.error(err);
  }
};


  return (
    
    
    <div className="flex items-center justify-center p-12" style={registrationStyle}>
      
      <div>
        <MessageBox
         messages={errMessages} 
         display={displayMb} 
         setDisplay={setDisplayMb}
         buttons={buttonsMb}
         />
      </div>
     
      <div className="mx-auto w-full max-w-[550px] bg-white">
      <h2 className='text-2xl truncate text-center mb-10'>Van már fiókód?  
      <Link to={"/belepes"} className='font-bold text-blue-800 m-12'>Kérlek jelentkezz be!
      </Link>
      </h2>
          
          
          <div className="mb-5">
            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
              Teljes név
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Teljes név"
                  onChange={e=>setFullName(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
          </div>
          
          <div className="mb-5">
                <label  className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Telefonszám
                </label>
                <input type="text"  id="phone" placeholder="telefonszám" onChange={e=>parseInt(setPhone(e.target.value))}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Email cím
                </label>
                <input type="email"  id="email" placeholder="email" onChange={e=>setEmail(e.target.value)}
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
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Jelszó újra
                </label>
                <input type="password"  
                      id="passwordAgain" 
                      placeholder="írd be a jelszavad ismét"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    value={passAgain}
                    onChange={(e)=>setPassAgain(e.target.value)}/>
            </div>
            <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Számlázási és lakcím
                </label>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text"  id="ZIP" placeholder="irányítószám" onChange={e=>setZip(e.target.value)}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text"  id="city" placeholder="város" onChange={e=>setCity(e.target.value)}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
              
                    <div className="w-full px-3">
                        <div className="mb-5">
                            <input type="text" id="address" placeholder="utca, házszám" onChange={e=>setAddress(e.target.value)}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div>
          
          {/* A többi input mező */}
          
          <div>
            <button onClick={register}
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Regisztráció
            </button>
          </div>
      
        
      </div>
    </div>
  );
}

export default Registration;
