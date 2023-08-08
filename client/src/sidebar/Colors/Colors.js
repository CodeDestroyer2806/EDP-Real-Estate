import React from 'react'
import Input from '../../components/Input';


export default function Colors({handleChange}) {
    
  return (
    <div>
        <h2 className="sidebar-title color-title">Beds</h2>
        <label className="sidebar-label-container">
          <input type="radio" value="" name="test1" />
          <span className="checkmark all"></span>
          All
        </label>

        <Input handleChange={handleChange}
          value={100000}
          title="0-100000"
          name="test1"
          color="black"
        />

        <Input handleChange={handleChange}
          value={200000}
          title="100000-200000"
          name="test1"
          color="blue"
        />

        <Input handleChange={handleChange}
          value={300000}
          title="200000-300000"
          name="test1"
          color="red"
        />

        <Input handleChange={handleChange}
          value={400000}
          title="$400000+"
          name="test1"
        />

        <label className="sidebar-label-container">
          <input
            type="radio"
            value="white"
            name="test1"
          />
          <span
            className="checkmark"
            style={{ background: "white", border: "2px solid black" }}
          ></span>
          White
        </label>
      </div>
  )
}
