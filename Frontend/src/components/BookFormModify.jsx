import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function BookFormModify() {
    const navigate = useNavigate();
    const { BookID } = useParams();


    let formObj = {
        title: "",
        author: "",
        publisher: "",
        categoryID: "",
        the_year_of_publishing: "",
        description: "",
        language: "",
        number_of_pages: "",
        cover: "",
        weight: "",
        ISBN: "",
        itemcode: "",
        price: "",
        discounted_price: "",
        book_url: ""
    };

    const [formData, setFormData] = useState(formObj);

    const categories = [
        { "categoryID": 1, "category": "Család és szülők" },
        { "categoryID": 2, "category": "Életmód, egészség" },
        { "categoryID": 3, "category": "Életrajzok, visszaemlékezések" },
        { "categoryID": 4, "category": "Ezotéria" },
        { "categoryID": 5, "category": "Gasztronómia" },
        { "categoryID": 6, "category": "Gyermek és ifjúsági" },
        { "categoryID": 7, "category": "Hangoskönyv" },
        { "categoryID": 8, "category": "Hobbi, szabadidő" },
        { "categoryID": 9, "category": "Irodalom" },
        { "categoryID": 10, "category": "Képregény" },
        { "categoryID": 11, "category": "Kert, ház, otthon" },
        { "categoryID": 12, "category": "Lexikon, enciklopédia" },
        { "categoryID": 13, "category": "Művészet, építészet" },
        { "categoryID": 14, "category": "Napjaink, bulvár, politika" },
        { "categoryID": 15, "category": "Nyelvkönyv, szótár" },
        { "categoryID": 16, "category": "Pénz, gazdaság, üzleti élet" },
        { "categoryID": 17, "category": "Sport, természetjárás" },
        { "categoryID": 18, "category": "Számítástechnika, internet" },
        { "categoryID": 19, "category": "Tankönyvek, segédkönyvek" },
        { "categoryID": 20, "category": "Társadalomtudományok" }
    ];


    useEffect(() => {
        if (BookID) {
            fetch(`http://localhost:3001/books/${BookID}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setFormData(data);
                })
                .catch(err => console.error("Error loading the book data:", err));
        }
    }, [BookID]);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const writeData = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };


    const handleCategoryChange = (event) => {
        const categoryID = event.target.value;
        setFormData(prevState => ({
            ...prevState,
            categoryID
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(BookID);
        console.log(formData);
        const method = BookID ? 'PUT' : 'POST';
        try {
            const response = await fetch(`http://localhost:3001/books/${BookID ? BookID : ''}`, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const json = await response.json();
            
            if (response.ok) {
                toast.success("Sikeres módosítás!"); // Sikeres művelet üzenet
                navigate("/supervisor-admin/konyv-admin");
            } else {
                throw new Error(json.error);
            }
        } catch (error) {
            console.error('Hibás beküldés:', error);
            toast.error(error.message); // Hiba üzenet
        }
    };
    


    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-4xl bg-white p-8">
                <h2 className="text-2xl font-bold text-center mb-10">{BookID ? "Könyv módosítása" : "Új könyv felvitele"}</h2>
                <form onSubmit={onSubmit} className="grid grid-cols-2 gap-6">
                    <div className="mb-2 col-span-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">A könyv címe</label>
                        <input type="text" id="title" placeholder="Könyv címe"
                            required
                            onChange={writeData}
                            value={formData.title}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Szerző</label>
                        <input type="text" id="author" placeholder="Szerző neve"
                            required
                            onChange={writeData}
                            value={formData.author}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Kiadó neve</label>
                        <input type="text" id="publisher" placeholder="Kiadó neve"
                            required
                            onChange={writeData}
                            value={formData.publisher}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kategória</label>
                        <select id="categoryID" value={formData.categoryID} onChange={handleCategoryChange} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                            <option value="">Válassz egy kategóriát</option>
                            {categories.map((category) => (
                                <option key={category.categoryID} value={category.categoryID}>{category.category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Kiadás éve</label>
                        <input type="text" id="the_year_of_publishing" placeholder="Kiadás éve"
                            required
                            onChange={writeData}
                            value={formData.the_year_of_publishing}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Nyelv</label>
                        <input type="text" id="language" placeholder="Nyelv"
                            required
                            onChange={writeData}
                            value={formData.language}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2 col-span-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Részletes leírás</label>
                        <textarea
                            id="description"
                            placeholder="Részletes leírás"
                            required
                            onChange={writeData}
                            value={formData.description}
                            className="w-full h-40 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md resize-none overflow-auto"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Lapok száma</label>
                        <input type="text" id="number_of_pages" placeholder="Lapok száma"
                            required
                            onChange={writeData}
                            value={formData.number_of_pages}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Borító</label>
                        <input type="text" id="cover" placeholder="Borító"
                            required
                            onChange={writeData}
                            value={formData.cover}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Súly</label>
                        <input type="text" id="weight" placeholder="A könyv súlya grammban"
                            required
                            onChange={writeData}
                            value={formData.weight}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">ISBN</label>
                        <input type="text" id="ISBN" placeholder="ISBN szám"
                            required
                            onChange={writeData}
                            value={formData.ISBN}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Kölcsönzési díja</label>
                        <input type="text" id="price" placeholder="Kölcsönzés díja forintban"
                            required
                            onChange={writeData}
                            value={formData.price}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Kölcsönzés kedvezményes díja</label>
                        <input type="text" id="discounted_price" placeholder="Kölcsönzés díja forintban, nem kötelező"
                            onChange={writeData}
                            value={formData.discounted_price}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Könyv borítója</label>
                        <input type="text" id="book_url" placeholder="Könyv képének linkje"
                            required
                            onChange={writeData}
                            value={formData.book_url}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-base font-semibold text-[#07074D]">Itemcode</label>
                        <input type="text" id="itemcode" placeholder="Könyv egyedi azonosítója"
                            onChange={writeData}
                            value={formData.itemcode}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-2 col-span-2">
                        <button type="submit"
                            className="w-full rounded-md bg-teal-500 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form">
                            {BookID ? "Könyv módosítása" : "Új könyv mentése"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookFormModify