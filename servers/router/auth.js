const express = require("express")
const router = express.Router()
const User = require("../models/admin_election_manager")
const bcrypt = require("bcryptjs")
const pageAuth = require("../middleware/pageAuth")

router.post('/register', async (req,res) => {
    const { email, password } = req.body
    const testOn = true 
    try {
        const UserExists = await User.findOne({email:email});

        if(UserExists)
        {
            res.status(400).json({ message: "User Already Exists"});
        }else{
            const user = new User({email, password})
            await user.save();
            res.status(200).json({ message: "Registered Successfully"});
        }


    } catch (error) {
        console.log(error)
    }
})

// Login Route 
router.post("/login",async (req, res) => {
    try {
        const {email, password} = req.body

        const userData = await User.findOne({email: email})

        if(!userData) {
            res.status(400).json({message: "Invalid Data"})
        }else{
            // Getting Generated Tokens 
            const token = await userData.generateAuthToken()
            
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })

            const isMatch = await bcrypt.compare(password, userData.password)
            if(isMatch){
                res.status(200).json({message: "Logged Successfully"})
            }else{
                res.status(400).json({message: "Invalid Credentials"})
            }
        }
    } catch (error) {
        console.log(error);
    }
})

// Profile Page Router
router.get("/profile", pageAuth, (req,res) => {
    res.send(req.rootUser)
    // console.log(req.rootUser);   
})

router.get("/getdata", pageAuth, (req,res) => {
    res.send(req.rootUser)
    res.status(200).send("User Founded this user")
    // console.log(req.rootUser);
})

router.get("/logout", (req,res) => {
    res.clearCookie("jwtoken", {path: '/' })
    // console.log(req.rootUser);
    res.status(200).send("Logout Successfully")
})




module.exports = router