import React from 'react'
import { Link } from 'react-router-dom';

function Caroussel() {
    return (
       <div className="w-full">
        <section className="w-full">
            <div className="py-2 px-0 mx-auto max-w-none">
                <div className="grid p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                    <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
                    <Link to={'/kategoria/6'} href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow w-full">
                             <img src="https://arthobby.hu/shop_ordered/27703/pic/ifj1.png"  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                            <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Ifjúsági regények</h3>
                            </Link>
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50 w-full">
                    <Link to={'/kategoria/16'} href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4 w-full">
                            <img src="https://arthobby.hu/shop_ordered/27703/pic/buffet.png" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                            <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Üzlet, politika</h3>
                            </Link>
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                        <Link to={'/kategoria/13'} href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 w-full">
                                <img src="https://arthobby.hu/shop_ordered/27703/pic/vangogh.png" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                <h3 className="z-10 text-2xl font-medium text-white absolute top-20 left-0 p-4 xs:text-xl md:text-3xl">Művészet</h3>
                                </Link>
                                <Link to={'/kategoria/11'} href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 w-full">
                                <img src="https://arthobby.hu/shop_ordered/27703/pic/kert.png" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                <h3 className="z-10 text-2xl font-medium text-white absolute top-20 left-0 p-2 xs:text-xl md:text-3xl">Kert, szabadidő</h3>
                                </Link>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col w-full">
                    <Link to={'/kategoria/5'}  href="#" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow w-full">
                            <img src="https://arthobby.hu/shop_ordered/27703/pic/gasztro.png " alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                            <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Gasztronómia  </h3>
                            </Link>
                    </div>
                </div>
            </div>
        </section>
       </div>
    )
}

export default Caroussel;
