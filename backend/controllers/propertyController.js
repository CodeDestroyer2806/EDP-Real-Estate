const verifyToken = require('../middlewares/verifyToken')
const Property = require('../models/Property')
const user = require('../models/User') 
const propertyController = require('express').Router()

// get all
propertyController.get('/getAll', async(req, res) => {
    try {
        const properties = await Property.find({})
        return res.status(200).json(properties)
    }catch(error){
        return res.status(500).json(error.message)
    }
})




// get featured

propertyController.get('/find/featured', async(req, res) => {
    try{
        const featuredProperties = await Property.find({featured: true}).populate("currentOwner", "-password")
        return res.status(200).json(featuredProperties)
    }catch(error){
        return res.status(500).json(error.message)
    }
})

// get all from specific type


propertyController.get('/find', verifyToken, async(req, res) => {
    const type = req.query
    // {type: 'beach'}
    try {
        if(type){
            const properties = await Property.find(type).populate('currentOwner', '-password')
            return res.status(200).json(properties)
        }
        else{
            return res.status(500).json({msg: "no such type"})
        }

    } catch (error){
        return res.status(500).json(error.message)
    }
})



// get counts of types -> ex: {beach: 2, village: 5, mountain: 12}

propertyController.get("/find/types",async(req, res) => {
    try{
        const beachType = await Property.countDocuments({type: 'beach'})
        const villageType = await Property.countDocuments({type: 'village'})
        const mountainType = await Property.countDocuments({type: 'mountain'})
        return res.status(200).json({
            beach: beachType,
            village: villageType,
            mountain: mountainType
        })
    } catch(error){
        return res.status(500).json(error.message)
    }
})

 

// get individual property

propertyController.get("/find/:id", async(req, res) => {
    try{
        const property = await Property.findById(req.params.id).populate("currentOwner", "-password")
        if(!property){
            throw new Error("no such property available with set id")
        }
        else{
            return res.status(200).json(property)
        }
    } catch (error){
        return res.status(500).json(error.message)
    }
})

//create a property

propertyController.post('/', verifyToken, async(req,res) => {
    try{
        //console.log(req.body)
        const newProperty = await Property.create({...req.body, currentOwner: req.user.id})
        
        return res.status(201).json(newProperty)
    } catch (error){
        return res.status(500).json(error.message)
    }
})

//update property

propertyController.put("/:id", async(req, res) => {
    try{
        const property = await Property.findById(req.params.id)
        if(property.currentOwner.toString() != req.user.id.toString()){
            throw new Error("You are not alowed to update other people properties")
        }
        else{
            const updatedProperty = await Property.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )
            return res.status(200).json(updatedProperty)
        }
    } catch (error){
        return res.status(500).json(error.message)
    }
})

//delete property

propertyController.delete("/:id", verifyToken, async(req, res) =>{
    try{
        const property = await Property.findById(req.params.id)
        if(property.currentOwner.toString() !== req.user.id.toString()){
            throw new Error("You are not allowed to delete other people's properties")
        }
        else{
            await property.delete()
            return res.status(200).json({msg: "Successfully deleted property"})
        }
    } catch(error){
        return res.status(500).json(error.message)
    }
})




module.exports = propertyController