import React from 'react'

function Caroussel() {
    return (
        <div>
            <div className="bg-white dark:bg-gray-800 h-30 h-30 py-3 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-3xl px-2 md:px-2">
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
                    <a href="#" className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80 md:col-span-1 ml-10"> {/* ml-10-re változtatva */}

                            <img src="https://pixy.org/src2/577/thumbs350/5775764.jpg" />
                            <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                            </div>
                            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">VR</span>
                        </a>
                        <a href="#"
                            className="group relative flex h-10 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                            <img src="https://cdn.nextbigideaclub.com/wp-content/uploads/2024/01/05160148/marchnomsfeatured.jpg" loading="lazy" alt="Photo by Magicle" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                            </div>

                            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Tech</span>
                        </a>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Caroussel