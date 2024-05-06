import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
function Checkout() {
  const [formObj, setFormObj] = useState({});

  useEffect(() => {
    const formObjFromLocalStorage = JSON.parse(localStorage.getItem('checkoutData'));
    setFormObj(formObjFromLocalStorage);
  }, []);
  console.log(formObj);

  const handleSendEmail = () => {
    const bookRows = formObj.borrowbooks.map(book => `A rendelés azonosítója: ${book.cartID} Kölcsönzött könyv címe: ${book.title}: Mennyisége: ${book.quantity} darab `).join('\n'); // Könyv sorok előkészítése
    const bookRows1 = formObj.borrowbooks.map(book => `A rendelés azonosítója: ${book.cartID}`).join('\n'); // rendelés azonosító

    const templateParams = {
      to_email: 'hofferaron86@gmail.com', // Címzett email címe
      from_email: 'infokonykolcsonzo@gmail.com', // Feladó email címe
      subject: 'Kölcsönzési értesítő', // Az email tárgya
      cartID: formObj.cartID, // Kosár azonosító
      bookRows1: bookRows1, // rendelés azonosító
      bookRows: bookRows, // Könyv sorok
      date: formObj.timestamp // Dátum
    };
    
    
    emailjs.send('service_mipbx9a', 'template_kdud6eo', templateParams, 't2P0egLC6EXkHDhyE')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  };

  const emptyLocalStorage = ()=>{
    localStorage.clear()
  }

  const end_of_order = ()=>{
    handleSendEmail();
    emptyLocalStorage();

  }
  return (
    <div>

<div>
  <div class="flex h-screen items-center justify-center bg-gray-900 p-5">
    <div class="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10">
      <div>
        <h1 class="mb-2 text-3xl font-bold text-white"><span class="text-green-500">Helló!</span> Köszönjük megrendelésed!</h1>
        <p class="mb-6 text-white">Köszönjük könyv kölcsönzésedet. Ne felejtsd el, hogy a kölcsönzött könyveket a megadott határidőre hozd vissza. A rendelésed részleteiről email küldtünk regisztrált emailcímedre </p>
        <div class="flex justify-center space-x-5">
           <Link to={"/"} ><button onClick={end_of_order} class="flex w-full items-center justify-center gap-1 rounded-2xl bg-rose-500 p-5 py-3 font-semibold text-white hover:bg-rose-700">
            Vissza a főoldalra.
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button></Link>
          
        </div>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" class="md:size-96 size-72 rounded-full " />
      </div>
    </div>
  </div>
</div>

      {/* Itt jöhetnek a checkout részletei 
      <button onClick={handleSendEmail}>Kölcsönzési értesítő küldése</button>*/}
    </div>
  );
}

export default Checkout;
