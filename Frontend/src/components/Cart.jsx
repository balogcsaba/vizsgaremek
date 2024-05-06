import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0); // Hozzáadott állapot a könyvek összes darabszámának
  const [totalBooksPrice, setTotalBooksPrice] = useState(0); // Hozzáadott állapot a könyvek összes árának
  const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [email, setEmail] = useState('');
  const [UserID, setUserID] = useState('');

  {/*localStorage.setItem('cart', JSON.stringify([]));*/ } //ezzel űrítem a kosarat amíg nincs user-hez kötve;  

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotal(total);
    setUserID(localStorage.getItem('UserID') || '');

  }, [carts]); //A kosárban lévő összes könyv árának beállítása

  useEffect(() => {
    const totalBooksCount = carts.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    setTotalBooks(totalBooksCount); // A kosárban lévő összes könyv darabszámának beállítása

  }, [carts]);

  /*const handleInc = (BookID) => {
    const updatedCart = carts.map(item => {
      if(item.BookID === BookID) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCarts(updatedCart);
  };*/

  /*const handleDec = (BookID) => {
    const updatedCart = carts.map(item => {
      if(item.BookID === BookID) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    setCarts(updatedCart);
  };*/

  const removeProduct = (BookID) => {
    const updatedCart = carts.filter(item => item.BookID !== BookID);
    setCarts(updatedCart);
  };


  const handleCheckout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const dateKezdo = new Date();
    const dateVege = new Date(dateKezdo);  // Létrehoz egy új Date objektumot a kezdő dátum alapján
    dateVege.setDate(dateKezdo.getDate() + 30);  // Hozzáad 30 napot a kezdő dátumhoz
    const dateKezdoString = dateKezdo.toISOString().slice(0, 10);//levágom a Date-ből 0tól 10ig marad
    const dateVegeString = dateVege.toISOString().slice(0, 10);//levágom a Date-ből 0tól 10ig marad

    const cartID = Math.floor(100000 + Math.random() * 900000); //  CartID létrehozása
    const borowsbooks = carts.map(item => ({
      UserID: UserID,
      BookID: item.BookID,
      cartID: cartID,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      /* total_price: (item.price * item.quantity).toFixed(2) csak akkor, ha kimomentelt rész vissazkerülne*/
      start_of_borrowment: dateKezdoString,
      end_of_borrowment: dateVegeString
    })); // Könyvek tömb létrehozása és feltöltése


    const formObj = {
      borrowbooks: borowsbooks /* itt az összes könyv ami a kosárba van bekerül a formObj-be */
    };
    localStorage.setItem('checkoutData', JSON.stringify(formObj));
    localStorage.setItem('dateKezdoString', dateKezdoString);
    localStorage.setItem('dateVegeString', dateVegeString);
    console.log(formObj)
    navigate('/checkout');
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCarts([]);
  };

  if (carts.length === 0) {
    return (
      <div className="container mx-auto mt-10">
        <h1 className=' h-[55vh] flex justify-center items-center text-4xl'>A kosár üres</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="w-3/4 shadow-md my-10 flex-wrap">
        <div className=" bg-white px-10 py-1">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Kosár</h1>
            <button onClick={handleClearCart} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Kosár ürítése</button>

          </div>
          <div className="flex flex-wrap mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {
            carts.map(cart => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={cart.BookID}>
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={cart.book_url} alt={cart.title} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cart.title}</span>
                    <span className="text-red-500 text-xs capitalize">{cart.author}</span>
                    <div className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer" onClick={() => removeProduct(cart.BookID)}>Eltávolít</div>
                  </div>
                </div>
                {/*itt lehetne növelni illetve csökkenteni a kosár értékét a ki kommentelt function-okkal*/}
                {/*<div className="flex justify-center w-1/5">
                  <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={() => handleDec(cart.BookID)}>
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                  <input className="mx-2 border text-center w-8" type="text" value={cart.quantity} readOnly />
                  <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(cart.BookID)} viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>*/}
                <span className="text-center w-1/5 font-semibold text-sm">1 darab</span>

                <span className="text-center w-1/5 font-semibold text-sm">${cart.price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${(cart.price * cart.quantity).toFixed(2)}</span>
              </div>
            ))
          }

          <Link to={'/'} className="flex font-semibold text-gray-900 text-sm mt-10">

            <svg className="fill-current mr-2 text-gray-900 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            <h2> Vásárlás folytatása</h2>
          </Link>
        </div>

        <div id="summary" className="w-2/4 px-8 py-10 container">
          <h1 className="font-semibold text-2xl border-b pb-8">Összesítő</h1>
          <div className="flex flex-wrap justify-between mt-10">
            <span className="font-semibold text-sm">Összesen {totalBooks} darab könyv</span>
            <span className="font-semibold text-sm">{total.toFixed(2)} Ft</span>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm">
              <span>Összesen fizetendő</span>
              <span>{total.toFixed(2)} Ft</span>
            </div>
            <div>
             { UserID &&
             <Link
                to={"/checkout"}
                onClick={handleCheckout}
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 p-2 text-sm text-white uppercase w-full"
              >
                tovább a kölcsönzés befejezéséhez
              </Link>
              }
              
              { !UserID &&
                <Link to={"/belepes"}><h6 className='text-pink-600'>Rendelés leadásához kérem jelentkezzen be! </h6></Link> 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
