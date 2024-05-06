import React from 'react';

function Login() {



  return (
    <div>
      <div className="flex items-center justify-center p-12" >

    <div className="mx-auto w-full max-w-[550px] bg-white">
        <form>
            
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Email cím
                </label>
                <input type="email" name="email" id="email" placeholder="email cím" 
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Jelszó
                </label>
                <input type="password"  id="password" placeholder="jelszó"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            

           
            <div>
                <button
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Bejelentkezés
                </button>
            </div>
        </form>
    </div>
</div>
    </div>
  );
}

export default Login;
 