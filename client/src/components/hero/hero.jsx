import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai' 
import classes from "./hero.module.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Hero = () => {
  const [type, setType] = useState("beach")
  const [state, setState] = useState("0")
  const [priceRange , setPriceRange] = useState("0")
  const navigate = useNavigate()


  const handleSearch = () => {
    // navigagte to properties
    navigate(`/properties?type=${type}&state=${state}&priceRange=${priceRange}`)
  }


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Find your dream place!</h2>
        <h5>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select Type</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="village">Village</option> 
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled> Select Price Range</option>
             <option value="0">0-100,000</option>
             <option value="1">100,000-200,000</option>
             <option value="2">200,000-300,000</option>
             <option value="3">300,000-400,000</option>
             <option value="4">400,0000-500,000</option> 
            </select>
            <select onChange={(e) => setState(e.target.value)}>
              <option disabled> Select State</option>
              <option value="0">Alabama</option>
              <option value="1">Alaska</option>
              <option value="2">Arizona</option>
              <option value="3">Arkansas</option>
              <option value="4">California</option>
              <option value="5">Colarado</option>
              <option value="6">Connecticut</option>
              <option value="7">Delware</option>
              <option value="8">Florida</option>
              <option value="9">Georgia</option>
              <option value="10">Hawaii</option>
              <option value="11">Idaho</option>
              <option value="12">Illinois</option>
              <option value="13">Indiana</option>
              <option value="14">Iowa</option>
              <option value="15">Kansas</option>
              <option value="16">Kentucky</option>
              <option value="17">Louisiana</option>
              <option value="18">Maine</option>
              <option value="19">Maryland</option>
              <option value="20">Massachusetts</option>
              <option value="21">Michigan</option>
              <option value="22">Minnesota</option>
              <option value="23">Mississippi</option>
              <option value="24">Missouri</option>
              <option value="25">Montana</option>
              <option value="26">Nebraska</option>
              <option value="27">Nevada</option>
              <option value="28">New Hampshire</option>
              <option value="29">New Jersey</option>
              <option value="30">New Mexico</option>
              <option value="31">New York</option>
              <option value="32">North Carolina</option>
              <option value="33">North Dakota</option>
              <option value="34">Ohio</option>
              <option value="35">Oklahoma</option>
              <option value="36">Oregon</option>
              <option value="37">Pennslyvania</option>
              <option value="38">Rhode Island</option>
              <option value="39">South Carolina</option>
              <option value="40">South Dakota</option>
              <option value="41">Tennessee</option>
              <option value="42">Texas</option>
              <option value="43">Utah</option>
              <option value="44">Vermont</option>
              <option value="45">Virginia</option>
              <option value="46">Washington</option>
              <option value="47">West Virginia</option>
              <option value="48">Wisconsin</option>
              <option value="49">Wyoming</option>    
              </select>
              <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}/> 
          </div> 
      </div>
    </div>
  )
}

export default Hero