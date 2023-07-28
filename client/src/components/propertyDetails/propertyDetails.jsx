import React from 'react'
import classes from './propertyDetails.module.css'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'
import { FaSquareFull, FaBed, FaPray, FaClosedCaptioning, FaBath} from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from '@emailjs/browser'

const PropertyDetail = () => {
  const {user} = useSelector((state) => state.auth)
  const [propertyDetail, setPropertyDetail] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const {id} = useParams()
  const formRef = useRef()

  const serviceId = process.env.REACT_APP_SERVICE_ID
  const templateId = process.env.REACT_APP_TEMPLATE_ID
  const publicKey = process.env.REACT_APP_PUBLIC_KEY




  useEffect(() => {
    const fetchDetails = async() => {
      try {
        const data = await request(`/property/find/${id}`, 'GET')
        setPropertyDetail(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false)
    setTitle("")
    setDesc("")
  }

  const handleContactOwner = async(e) => {
    e.preventDefault()

    // todo send email logic
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
  }


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${propertyDetail?.img}`} alt="" />
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${propertyDetail?.title}`}
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndState}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
              <div>State: <span>{`${propertyDetail?.state}`}</span></div>
              <span>Zip Code: {`${propertyDetail?.zipCode}`}</span>
            </div> 
            <div className={classes.priceAndOwner}>
              <span className={classes.price}>Price: ${`${propertyDetail?.price}`}</span>
              <span style={{display: 'flex', alignItems: 'center', gap:'12px'}}>
                Owner <img src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} alt="" />
              </span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetail?.bathrooms}<FaBath/></span>
              <span>{propertyDetail?.beds} <FaBed className={classes.icon}/></span>
              <span>{propertyDetail?.sqmeters} <FaSquareFull className={classes.icon}/></span>
            </div>
          </div>
          <p className={classes.desc}>
            Desc: <span>{`${propertyDetail?.desc}`}</span>
          </p>
          <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
            Contact Owner
          </button>
        </div>
      </div>

      
      {
        showForm && (
          <div className={classes.contactForm} onClick={handleCloseForm}>
            <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>Send Email To Owner</h2>
              <form onSubmit={handleContactOwner} ref={formRef}>
                <input value={user?.email} type="text" placeholder='My email' name='from_email'/>
                <input value={user?.username} type="text" placeholder='My username' name='from_name'/>
                <input value={propertyDetail.currentOwner.email} type="text" placeholder='Owner email' name='to_name'/>
                <input type="text" placeholder='Title' name='from_title'/>
                <input type="text" placeholder='Desc' name='message'/>
                <button>Send</button>
              </form>
              <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
            </div>
            </div>
        )
      }
    </div>
  )
}

export default PropertyDetail