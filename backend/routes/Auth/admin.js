const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const Admin = require('../../modelSchema/Auth/Admin')
const JWT_SECRET =  process.env.JWT_SECRET

//Route1 : Authenticatication
router.post('/login', [    
    body('password', "Password cannot be blank").exists(),
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {username,password} = req.body
    let success = false;

    try {
        let user = await Admin.findOne({username});
        if(!user){
            return res.status(400).json({success,error:"User with this username does not exist"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({success,error:"Login with correct credentials"})
        }
        
        const data = {
            user:{
                id: user.id,
                userType: 'admin'
            }
        }
    const authToken = jwt.sign(data,JWT_SECRET);
        success = true
        userType = 'admin'
        res.json({success,authToken,userType})
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;