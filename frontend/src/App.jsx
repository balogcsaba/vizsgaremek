import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom"
import {useState} from 'react'
import MainLayout from "./components/MainLayout"
import Navbar from "./components/Navbar"
import Caroussel from "./components/Caroussel"

import Main from "./components/Main"
import Login from "./components/Login"
import Registration from "./components/Registration"
import LeftSideBar from "./components/LeftSideBar"
import BookMain from "./components/BookMain"
import DetailedBook from "./components/DetailedBook"
import SupervisorAdmin from "./components/SupervisorAdmin"
import UserList from "./components/UserList"
import BookList from "./components/BookList"
import BookFormModify from "./components/BookFormModify"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"



function App() {

  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
      
        <Routes>
         <Route path="/" element={<Main/>} />
         <Route path="/belepes" element={<Login/>} />
         <Route path="/checkout" element={<Checkout/>} />
         <Route path="/newbook" element={<BookFormModify/>} />
         <Route path="/editbook/:BookID" element={<BookFormModify/>} />
         <Route path="/regisztracio" element={<Registration/>} />
         <Route path="/:BookID" element={<DetailedBook/>} />
         <Route path="/supervisor-admin" element={<SupervisorAdmin/>} />
         <Route path="/supervisor-admin/konyv-admin" element={<BookList/>} />
         <Route path="/supervisor-admin/felhasznalo-admin" element={<UserList/>} />
         <Route path="/cart" element={<Cart/>} />
         <Route path="/kategoria/:categoryID" element={<Main />} />
    
        </Routes>
     
      </BrowserRouter>
     
    </div>
  )
}

export default App
