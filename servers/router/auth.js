const express = require("express")
const router = express.Router()
const Admin = require("../models/admin_election_manager")
const bcrypt = require("bcryptjs")
const pageAuth = require("../middleware/pageAuth")

router.post('/admin_register', async (req,res) => {
    const { email, password } = req.body
    const testOn = true 
    try {
        const AdminExists = await Admin.findOne({email:email});

        if(AdminExists)
        {
            res.status(400).json({ message: "Admin Already Exists"});
        }else{
            const Admin = new Admin({email, password})
            await Admin.save();
            res.status(200).json({ message: "Registered Successfully"});
        }


    } catch (error) {
        console.log(error)
    }
})

// Login Route 
router.post("/admin_login",async (req, res) => {
    try {
        const {email, password} = req.body

        const AdminData = await Admin.findOne({email: email})

        if(!AdminData) {
            res.status(400).json({message: "Invalid Data"})
        }else{
            // Getting Generated Tokens 
            const token = await AdminData.generateAuthToken()
            
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })

            const isMatch = await bcrypt.compare(password, AdminData.password)
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
router.get("/admin_profile", pageAuth, (req,res) => {
    res.send(req.rootAdmin)
    // console.log(req.rootAdmin);   
})

router.get("/admin_getdata", pageAuth, (req,res) => {
    res.send(req.rootAdmin)
    res.status(200).send("Admin Founded this Admin")
    // console.log(req.rootAdmin);
})

router.get("/admin_logout", (req,res) => {
    res.clearCookie("jwtoken", {path: '/' })
    // console.log(req.rootAdmin);
    res.status(200).send("Logout Successfully")
})




module.exports = router