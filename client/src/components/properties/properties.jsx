import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classes from './properties.module.css'
import { request } from '../../util/fetchAPI'
import { idxToState, stateToIdx } from '../../util/idxToState'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import { AiOutlineSearch } from 'react-icons/ai'
import {FaBed, FaSquareFull} from 'react-icons/fa'
import person from '../../assets/person.jpg'



const Properties = () => {
  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) //slice(1) gets rid of ?
  const arrQuery = query.split("&")
  const navigate = useNavigate()


  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })

  }




  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async() => {
      const data = await request(`/property/getAll`, 'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  }, [])

  //parsing query params
  useEffect(() => {
    if(arrQuery && allProperties?.length > 0 && state === null){
      let formattedQuery = {}

      arrQuery.forEach((option, idx) => { 
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = {...formattedQuery, [key]: value}
      // if we are on the last index, assign the formattedQuery object to state
      if(idx === arrQuery.length -1){
        setState(formattedQuery)
        handleSearch(formattedQuery)
      }
      })
    }
  }, [allProperties, arrQuery])

  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, thats why we do the if/else
    if(param?.nativeEvent){
      options = state
    } else {
      options = param
    }


    const filteredProperties = allProperties.filter((property) => {
      //options.priceRange === 1 arrPriceRanges[1] = second element => "100000-200000"
      const priceRange = arrPriceRanges[options.priceRange]
      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      const state = stateToIdx(property.state)
      
      if(property.type === options.type && state === Number(options.state) && property.price >= minPrice && property.price <= maxPrice){
        return property
        

      }
    })

    const queryStr = `type=${options.type}&state=${options.state}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, {replace: true})
    setFilteredProperties(filteredProperties)
  }



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
      <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select Type</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="village">Village</option> 
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option disabled> Select Price Range</option>
             <option value="0">0-100,000</option>
             <option value="1">100,000-200,000</option>
             <option value="2">200,000-300,000</option>
             <option value="3">300,000-400,000</option>
             <option value="4">400,0000-500,000</option> 
            </select>
            <select value={state?.state} name="state" onChange={handleState}>
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
              <button className={classes.searchBtn}>
              <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}/> 
              </button>
          </div> 
        {filteredProperties?.length > 0 ? (
          <>
          <div className={classes.titles}>
            <h5>Selected Properties</h5>
            <h2>Properties you may like</h2>
          </div>
          <div className={classes.properties}>
            {filteredProperties.map((property) => (
              <div key={property._id} className={classes.property}>
                <Link className={classes.imgContainer} to={`/propertyDetail/${property._id}`}>
                  <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                </Link>
                <div className={classes.details}>
                  <div className={classes.priceAndOwner}>
                    <span className={classes.price}>$ {property.price}</span>
                    <img src={person} className={classes.owner} />
                  </div>
                  <div className={classes.moreDetails}>
                    <span>{property.beds} <FaBed className = {classes.icon}/></span>
                    <span>{property.sqmeters} sq. meters <FaSquareFull className={classes.icon}/></span>
                  </div>
                  {property.desc}
                </div>
              </div>
            ))}
          </div>
          </>
        ) : <h2 className={classes.noProperty}>We hace no properties with the specified options</h2>}
      </div>
    </div>
  )
}

export default Properties