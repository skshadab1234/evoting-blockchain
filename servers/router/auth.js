const express = require("express")
const router = express.Router()
const Admin = require("../models/admin_election_manager")
const Candidate = require('../models/CandidateSchema')
const voter = require("../models/voter")
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
            const isMatch = await bcrypt.compare(password, AdminData.password)
            if(isMatch){
                // Getting Generated Tokens 
                const token = await AdminData.generateAuthToken()
                
                res.cookie("evotingLoginToken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                })
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

// Add Candidate to Schema
router.post('/add_candidate', async (req,res) => {
    // Creating a new candidate
    try {
        const {name, party, platform, slogan, image} = req.body.values 
        // console.log(name, party, platform, slogan) 
        const newCandidate = new Candidate({name, party, platform, slogan, image})
        
        newCandidate.save((error) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Candidate saved successfully!');
              res.status(200).send({status:200, message:'done'})
            }
          });

    
    } catch (error) {
        console.log(error)
    }    
})

// Update Candidate
router.post('/update_candidate', async (req,res) => {
    // Creating a new candidate
    try {
       const { selectedKey } = req.body
       const {name,party, platform, slogan, image} = req.body.values
        // console.log(name,party)
       Candidate.findByIdAndUpdate(selectedKey, { name, party, platform, slogan, image}, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Candidate updated successfully!');
          res.status(200).send({status:200, message:'done'})
        }
      });
    } catch (error) {
        console.log(error)
    }    
})

router.post('/delete_candidate', async (req,res) => {
    // Creating a new candidate
    try {
      const { selectedKey } = req.body
      Candidate.deleteOne({_id:selectedKey}, (err) => {
        if(!err) {
            res.status(200).send({status:200, message: 'done'})
        }
      })
    } catch (error) {
        console.log(error)
    }    
})

// get all candidates list 
router.get('/getAllCandidate', (req, res) => {
    try {
        Candidate.find({}, function (err, candidates) {
          if (err) throw err;
          res.status(200).send(candidates);
        });
      } catch (error) {
        res.status(400).send(error);
      }  
})

// Get All Admin Data
router.get("/admin_all", (req,res) => {
    try {
        Admin.find({}, function (err, users) {
          if (err) throw err;
          res.status(200).send(users);
        });
      } catch (error) {
        res.status(400).send(error);
      }  
})

router.get("/admin_getdata", pageAuth, (req,res) => {
    res.send(req.rootAdmin)
    res.status(200).send("Admin Founded this Admin")
    // console.log(req.rootAdmin);
})

router.get("/admin_logout", (req,res) => {
    res.cookie('evotingLoginToken', '', { expires: new Date(1) });
    res.send('Cookie cleared');
})

// get all candidates list 
router.get('/getAllVoter', (req, res) => {
    try {
        voter.find({}, function (err, voters) {
          if (err) throw err;
          res.status(200).send(voters);
        });
      } catch (error) {
        res.status(400).send(error);
      }  
})


// Voter Registration 
router.post('/add_voter', async (req,res) => {
    const { firstName, lastName, email, dateOfBirth, address, city, state, zipCode, phoneNumber, isVerified } = req.body.values
    
   try {
        const VoterExists = await voter.findOne({email:email});

        if(VoterExists)
        {
            res.status(400).json({ status:400, message: "Voter Already Exists"});
        }else{
            const voter = new voter({firstName, lastName, email, dateOfBirth, address, city, state, zipCode, phoneNumber, isVerified})
            voter.save(error => {
                if(error) {
                    console.log("Error")
                }else{
                    console.log('Voter Added Successfully')
                    res.send({status:200, message:'done'})
                }
              })
        } 
    } catch (error) {
        console.log(error) 
    } 

    // const Voter = new voter({
    //     voterId: "V-123456789",
    //     firstName: "John",
    //     lastName: "Doe",
    //     email: "johndoe@example.com",
    //     password: "$2b$10$wq3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q",
    //     votingRights: ["5f3610e2a2337b05abd47a22","5f3610e2a2337b05abd47a23"],
    //     votesCast: ["5f3610e2a2337b05abd47a24"],
    //     dateOfBirth: "1990-01-01T00:00:00.000Z",
    //     address: "123 Main St.",
    //     city: "New York",
    //     state: "NY",
    //     zipCode: "10001",
    //     phoneNumber: "+1-212-555-1212",
    //     isVerified: true
    //   })

   

})
module.exports = router