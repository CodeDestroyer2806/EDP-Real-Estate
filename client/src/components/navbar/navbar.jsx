import React from 'react'
import classes from './navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import {BsDisplay, BsHouseDoor} from 'react-icons/bs' 
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { AiOutlineAccountBook, AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { request } from '../../util/fetchAPI'
import { logout, register} from '../../redux/authSlice'
import {GiHamburgerMenu} from 'react-icons/gi'





const Navbar = () => {
    const [state, setState] = useState({})
    const [photo, setPhoto] = useState("")
    const [floorPlan1, setFloorPlan1] = useState("")
    const [floorPlan2, setFloorPlan2] = useState("")
    const [showForm, setShowForm] = useState(false)
    const {user, token} = useSelector((state) => state.auth)
    const [showMobileNav, setShowMobileNav] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const handleLogout = () => {
        dispatch(logout())
        navigate("/signin ")
    }


    const handleState = (e) => {
        setState(prev => {
            return{...prev, [e.target.name]: e.target.value}            
        })
    }


    const handleCloseForm = () => {
        setShowForm(false)
        setPhoto(null)
        setFloorPlan1(null)
        setFloorPlan2(null)
        setState({})
    }


    const handleListProperty = async(e) => {
        e.preventDefault()
        let filename = null
        let filenameFloorPlan1 = null
        let filenameFloorPlan2 = null
        if(photo){
            const formData = new FormData()
            filename = crypto.randomUUID() + photo.name
            formData.append('filename', filename)
            formData.append('image', photo)
            await request('/upload/image', "POST", {}, formData, true)
        }
        if(floorPlan1){
            const formData = new FormData()
            filenameFloorPlan1 = crypto.randomUUID() + photo.name
            formData.append('filename', filenameFloorPlan1)
            formData.append('image', floorPlan1)
            await request('/upload/image', "POST", {}, formData, true)
        }
        if(floorPlan2){
            const formData = new FormData()
            filenameFloorPlan2 = crypto.randomUUID() + photo.name
            formData.append('filename', filenameFloorPlan2)
            formData.append('image', floorPlan2)
            await request('/upload/image', "POST", {}, formData, true)
        }
        else{    
            return
        }


        try {
            const options = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            await request('/property', 'POST', options, {...state, img: filename, floorPlan1: filenameFloorPlan1, floorPlan2: filenameFloorPlan2})
            handleCloseForm()
        } catch (error) {
            console.log(error)
        }
    }

    
    



  return (
    <div className={classes.container }>
        <div className={classes.wrapper}>
            <Link to="/" className={classes.left}>
                EDP Real Estate <BsHouseDoor/>
            </Link>
            <ul className={classes.center}>
                <li className={classes.listItem}>Home</li>
                <li className={classes.listItem}>About</li>
                <li className={classes.listItem}>Featured</li>
                <li className={classes.listItem}>Contacts</li>
            </ul>
            <div className={classes.right}>
                {
                    !user ?
                    <>
                        <Link to='/signup'>Sign Up</Link>
                        <Link to='/signin'>Sign in</Link>
                    </>
                    : 
                    <>
                    <span>Hello {user.username}</span>
                    <span onClick ={handleLogout} className={classes.logoutBtn}>Logout</span>
                    <Link onClick={() => setShowForm(true)} className={classes.list}>List your Property</Link>
                    </>
                }
            </div>
        </div>
            {
                showForm && (
                    <div className={classes.listPropertyForm} onClick={handleCloseForm}>
                        <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                            <h2>List Property</h2>
                            <form onSubmit={handleListProperty}>
                                <input type="text" placeholder='Title...' name="title"  onChange={handleState}/>
                                <input type="text" placeholder='Type...' name="type"  onChange={handleState}/>
                                <input type="text" placeholder='Desc...' name="desc"  onChange={handleState}/>
                                <input type="text" placeholder='State...' name="state"  onChange={handleState}/>
                                <input type="text" placeholder='City...' name="city"  onChange={handleState}/>
                                <input type="number" placeholder='Zip Code...' name="zipCode"  onChange={handleState}/>
                                <input type="number" placeholder='Price...' name="price"  onChange={handleState}/>
                                <input type="number" placeholder='Sq. Meters' name="sqmeters"  onChange={handleState}/>
                                <input type="number" placeholder='Beds...' name="beds" step={1} min={2}  onChange={handleState}/>
                                <input type="number" placeholder='bathrooms...' name="bathrooms" min={1} step={1}  onChange={handleState}/>
                                <div style={{display: "flex", alignItems: "center", gap: '12px', width: '50%'}}>
                                    <label htmlFor="photo">Property Picture <AiOutlineFileImage/></label>
                                    <input type="file"
                                     id="photo" 
                                     style={{display: "none"}} 
                                     onChange={(e) => setPhoto(e.target.files[0])}
                                    />
                                    {photo && <p>{photo.name}</p>}
                                </div>
                                <div style={{display: "flex", alignItems: "center", gap: '12px', width: '50%'}}>
                                    <label htmlFor="floorPlan1">Floor Plan 1<AiOutlineFileImage/></label>
                                    <input type="file"
                                     id="floorPlan1" 
                                     style={{display: "none"}} 
                                     onChange={(e) => setFloorPlan1(e.target.files[0])}
                                    />
                                    {floorPlan1 && <p>{floorPlan1.name}</p>}
                                </div>
                                <div style={{display: "flex", alignItems: "center", gap: '12px', width: '50%'}}>
                                    <label htmlFor="floorPlan2">Floor Plan2<AiOutlineFileImage/></label>
                                    <input type="file"
                                     id="floorPlan2" 
                                     style={{display: "none"}} 
                                     onChange={(e) => setFloorPlan2(e.target.files[0])}
                                    />
                                    {floorPlan2 && <p>{floorPlan2.name}</p>}
                                </div>
                                <button>List Property</button>
                            </form>
                            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
                        </div>
                    </div>
                )
            }
            {
                <div className={classes.mobileNav}>
                    {showMobileNav && 
                    <div className={classes.navigation}>
                         <Link to="/" className={classes.left}>
                EDP Real Estate <BsHouseDoor/>
            </Link>
            <AiOutlineClose onClick={() => setShowMobileNav(false)} className={classes.mobileCloseIcon} />
            <ul className={classes.center}>
                <li className={classes.listItem}>Home</li>
                <li className={classes.listItem}>About</li>
                <li className={classes.listItem}>Featured</li>
                <li className={classes.listItem}>Contacts</li>
            </ul>
            <div className={classes.right}>
                {
                    !user ?
                    <>
                        <Link to='/signup'>Sign Up</Link>
                        <Link to='/signin'>Sign in</Link>
                    </>
                    : 
                    <>
                    <span>Hello {user.username}</span>
                    <span onClick ={handleLogout} className={classes.logoutBtn}>Logout</span>
                    <Link onClick={() => setShowForm(true)} className={classes.list}>List your Property</Link>
                    </>
                }
            </div>
            {
                showForm && showMobileNav && (
                    <div className={classes.listPropertyForm} onClick={handleCloseForm}>
                        <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                            <h2>List Property</h2>
                            <form onSubmit={handleListProperty}>
                                <input type="text" placeholder='Title...' name="title"  onChange={handleState}/>
                                <input type="text" placeholder='Type...' name="type"  onChange={handleState}/>
                                <input type="text" placeholder='Desc...' name="desc"  onChange={handleState}/>
                                <input type="text" placeholder='State...' name="state"  onChange={handleState}/>
                                <input type="text" placeholder='City...' name="city"  onChange={handleState}/>
                                <input type="number" placeholder='Zip Code...' name="zipcode"  onChange={handleState}/>
                                <input type="number" placeholder='Price...' name="price"  onChange={handleState}/>
                                <input type="number" placeholder='Sq. Meters' name="sqmeters"  onChange={handleState}/>
                                <input type="number" placeholder='Beds...' name="beds" step={1} min={2}  onChange={handleState}/>
                                <input type="number" placeholder='bathrooms...' name="bathroom"  onChange={handleState}/>
                                <div style={{display: "flex", alignItems: "center", gap: '12px', width: '50%'}}>
                                    <label htmlFor="photo">Property Picture <AiOutlineFileImage/></label>
                                    <input type="file"
                                     id="photo" 
                                     style={{display: "none"}} 
                                     onChange={(e) => setPhoto(e.target.files[0])}
                                    />
                                    {photo && <p>{photo.name}</p>}
                                </div>
                                <div style={{display: "flex", alignItems: "center", gap: '12px', width: '50%'}}>
                                    <label htmlFor="floorplan1">Floor Plan 1<AiOutlineFileImage/></label>
                                    <input type="file"
                                     id="floorplan1" 
                                     style={{display: "none"}} 
                                     onChange={(e) => setFloorPlan1(e.target.files[0])}
                                    />
                                    {photo && <p>{photo.name}</p>}
                                </div>
                                <div style={{display: "flex", alignItems: "center", gap: '12px', width: '50%'}}>
                                    <label htmlFor="floorplan2">Floor Plan2<AiOutlineFileImage/></label>
                                    <input type="file"
                                     id="floorplan2" 
                                     style={{display: "none"}} 
                                     onChange={(e) => setFloorPlan2(e.target.files[0])}
                                    />
                                    {photo && <p>{photo.name}</p>}
                                </div>
                                <button>List Property</button>
                            </form>
                            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
                        </div>
                    </div>
                )
            }
            </div>
            }
            {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav(prev => !prev)} className={classes.hamburgerIcon}/>}
            </div>
            }
    </div>
        
  )
}

export default Navbar