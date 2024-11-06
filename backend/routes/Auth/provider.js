const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const Provider = require('../../modelSchema/Auth/Provider')
const authorize = require('../../middleware/authorize')
const JWT_SECRET =  process.env.JWT_SECRET

// SignUp
router.post('/createuser', [
    body('username').isLength({ min: 3 }),
    body('companyname').isLength({ min: 5 }),
    body('password', "Password must be at least 8 characters long").isLength({ min: 8 }),
    body('email').isEmail(),
    body('pincode',"pincode has 6 numbers").isLength(6),
],async (req, res) => {
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
    let user = await Provider.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success,error: "Sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await Provider.create({
        username: req.body.username,
        companyname: req.body.companyname,  
        password: secPass,
        email: req.body.email,
        city : req.body.city,
        skills: req.body.skills,
        pincode: req.body.pincode,
        state: req.body.state,
    });
    

    const data = {
        user:{
            id: user.id,
            userType: 'provider'
        }
    }

//Authorization Token
const authToken = jwt.sign(data,JWT_SECRET);
    success = true
    userType = 'provider'
    res.json({success,authToken,userType})
}catch (error) {
        console.error(error.messsage);
        res.status(500).send("some error occured")
    }
});

//Route2 : Authenticate a User
router.post('/login', [    
    body('password', "Password cannot be blank").exists(),
    body('email').isEmail()
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body
    let success = false;

    try {
        let user = await Provider.findOne({email});
        if(!user){
            return res.status(400).json({success,error:"User with this email does not exist"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({success,error:"Login with correct credentials"})
        }
        
        const data = {
            user:{
                id: user.id,
                userType: 'provider'
            }
        }
    const authToken = jwt.sign(data,JWT_SECRET);
        success = true
        userType = 'provider'
        res.json({success,authToken,userType})
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error")
    }
})

//Get User Details
router.get('/getuser', authorize,  async (req, res) => {

    try {
      const userId = req.user.id;
      const user = await Provider.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

router.put('/edituser', authorize,  async (req, res) => {

    // const salt = await bcrypt.genSalt(10);
    // const secPass = await bcrypt.hash(req.body.password, salt);

    let newUser = {};
    if (req.body.username) { newUser.username = req.body.username };
    if (req.body.companyname) { newUser.companyname = req.body.companyname };
    if (req.body.pincode) { newUser.pincode = req.body.pincode };
    if (req.body.state) { newUser.state = req.body.state };
    if (req.body.city) { newUser.city = req.body.city };
    // if (req.body.email) { newUser.email = req.body.email };
    // if (req.body.password) { newUser.password = secPass };

    try{
    const userId = req.user.id;
    let user = await Provider.findById(userId)
    if (!user) { res.status(404).send("Not Found") }

    user = await Provider.findByIdAndUpdate(userId, { $set: newUser }, { new: true })
    success = true
    res.json({ user, success})
  
}catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

module.exports = router;