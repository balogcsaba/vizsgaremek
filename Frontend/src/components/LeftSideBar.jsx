import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookMain from './BookMain';  // Győződj meg róla, hogy a fájlnév és a komponens neve egyezik

function LeftSideBar() {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);

  const handleCategoryClick = async (categoryID) => {
    setSelectCategory(categoryID);
    console.log(`categoryID innen LeftSIdeBar: ${categoryID}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        const data = await response.json();
          setCategories(data);
      } catch (error) {
        console.error('Hiba a kategóriák lekérésekor:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="bg-teal-300 sm:first:col-span-2 py-14 px-11 rounded-lg max-w-lg" style={{marginLeft: '35px' }}>
        <h3 className="mb-4 text-black text-[14px] sm:text-[22px] font-extrabold leading-none">
          Könyv kategóriák
        </h3>
        <ul className="mt-6 sm:mt-10">
          {categories.map((category, index) => (
            <li key={index} className="pt-2 pb-4 mb-2 last:mb-0 border-b border-black border-solid">
              <Link to={`/kategoria/${category.categoryID}`} className="flex items-center justify-between text-black hover:text-white text-lg sm:text-xl font-medium" onClick={() => handleCategoryClick(category.categoryID)}> 
                <span>{category.category}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                 
                </svg>
                
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
      </div>
    </div>
  );
}

export default LeftSideBar;
