import Category from "./Category/Category"
import Colors from "./Colors/Colors"
import Price from "./Price/Price"
import "./Sidebar.css";
import React, { useEffect } from 'react'
import { useState } from "react";

    function Sidebar({onDataChange}) {
        const [priceData, setPriceData] = useState(null)

        useEffect(() => {
            onDataChange(priceData)
        }, [priceData])



        

        const hanldeDataFromPrice = (dataFromPrice) => {
            onDataChange(dataFromPrice)
            setPriceData(dataFromPrice) 
            console.log(dataFromPrice)
        }


  return (
    <section className="sidebar">
    <div className="logo-contianer">
        <h1>LOGO</h1>
    </div>

    <Category/>
    <Price dataFromPrice={hanldeDataFromPrice}/>
    <Colors />
    </section>
  )
}

export default Sidebar;


