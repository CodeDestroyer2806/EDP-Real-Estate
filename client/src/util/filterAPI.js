import { useState } from "react"
import { request } from "./fetchAPI"




//input filtering


export const filterProperty = async(properties) => {
    properties.filter(
        (property) => property.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    
        return properties;
    

}

const handleInputChange = (event) => {
    setQuery(event.target.value);
}

// filtering input items

export const filterProperties = async(properties, query) => {
    let filteredProperties = properties;

    if(query){
        filteredProperties = FilteredProperty
    }

    return filteredProperties
}


export const getAllProperties = async () => {
    const data = await request(`/property/getAll`, 'GET')
    return data
}





