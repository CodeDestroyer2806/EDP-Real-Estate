import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <h2>About the App</h2>
          <p>Enter description here</p>
        </div>
        <div className={classes.column}>
          <h2>Contacts</h2>
          <span>Phone: Enter Number Here</span>
          <span>Enter other links and sources of contact in this area!</span>
        </div>
        <div className={classes.column}>
          <h2>Location</h2>
          <span>Continent</span>
          <span>Country</span>
          <span>Base headquarters</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer