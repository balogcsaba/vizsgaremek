import MainLayout from "./MainLayout";
import Caroussel from "./Caroussel";
import React from 'react';
import { useParams } from "react-router-dom";

function Main() {
  const {categoryID} = useParams();
  console.log("kat: ${categoryID}")

  return (
    <div>
        <Caroussel/>
       
        <MainLayout/>
    </div>
  )
}

export default Main