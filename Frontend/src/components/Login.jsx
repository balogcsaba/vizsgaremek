import React from 'react';
import { useEffect, useState } from 'react';
import GetUrlParams from './GetUrlParams.jsx';
import {Link, useNavigate} from "react-router-dom";
import MessageBox from './MessageBox.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {

    const regEmail = GetUrlParams("email");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errMessages, setErrMessages] = useState([]);
    const [displayMb, setDisplayMb] = useState(false);
    const buttonsMb = [{
        text:"OK",
        icon:"fa-solid fa-square-check",
        cb:()=>setDisplayMb(false)
    }];

    const navigate = useNavigate();

    const signIn = async ()=> {
        try {
            const response = await fetch("http://localhost:3001/belepes", {
                method:"POST",
                body:JSON.stringify({
                    email:email,
                    pass:pass
                }),
                headers:{"Content-type":"application/json"},
                credentials:"include"
            });

            const json = await response.json();

            console.log("Válasz a szervertől:", json); // Logold a választ

            if(response.ok) {
                const isAdmin = json.isAdmin;
                const email = json.email;
                const UserID = json.userID;
                const url = isAdmin ? "/supervisor-admin" : "/"; //Ha nem kell lehet törölni csak gondoltam ha belépett az illető, akkor navigáljuk annak megfelelően admin vagy más felületre
                localStorage.setItem("isAdmin",isAdmin.toString());
                localStorage.setItem("email",email);
                localStorage.setItem("UserID",UserID);
                navigate(url);
                if (isAdmin){
                toast.success('Sikeres belépés Adminisztrátorként')}
                else 
                toast.success('Sikeres belépés!')
                console.log("Email: ", localStorage.getItem("email"));
                console.log("UserID: ", localStorage.getItem("UserID"));
                console.log("Admin státusz: ", isAdmin); // Boolean logolása
            } else {
                console.log(json);
                setErrMessages(json);
                setDisplayMb(true);
            }
        } catch(err) {
            setErrMessages([err]);
            setDisplayMb(true);
        }
    };



  return (
    <div>
      <div className="flex items-center justify-center p-12" >

    <div className="mx-auto w-full max-w-[550px] bg-white">
    <div>
        <MessageBox
         messages={errMessages} 
         display={displayMb} 
         setDisplay={setDisplayMb}
         buttons={buttonsMb}
         />
      </div>

         
            
            <div className="mb-5">
            {
        regEmail && <div className="mb-3 block text-base font-medium text-[#07074D]">
        {`Sikeresen regisztráltál a következő email címmel: ${regEmail}! Kérlek lépj be a felültre!`}
    </div>
       }
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Email cím
                </label>
                <input type="email" name="email" id="email" placeholder="email cím" onChange={e=>setEmail(e.target.value)} value={email}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Jelszó
                </label>
                <input type="password"  id="password" placeholder="jelszó" onChange={e=>setPass(e.target.value)} value={pass}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
            <Link to={"/elfelejtettjelszo"}>   <p className='text-blue-900'>Elfelejettem a jelszavam</p></Link>
            </div>

            
            

           
            <div>
                <button onClick={signIn}
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Bejelentkezés
                </button>
            </div>
            
        
    </div>
</div>
    </div>
  );
}

export default Login;
 