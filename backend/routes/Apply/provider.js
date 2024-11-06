const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize')
const Apply = require('../../modelSchema/Internship/Apply')
const Internship = require('../../modelSchema/Internship/Internship')
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

router.get('/fetchapplicants/:id', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const Applicants = await Apply.find({
            internshipId: req.params.id,
        });
        res.json(Applicants)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// router.delete('/:internshipId/:userId', authorize, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
    
//     try {
//         let application = await Apply.findOne({
//             internshipId: req.params.internshipId,
//             user : req.params.userId
//         });
        
//         if (!application) {
//             return res.status(404).send("Application Not Found");
//         }
        
//         const internship = await Internship.findOne({
//             _id: req.params.internshipId,
//             provider: req.user.id
//         });
        
//         if (!internship) {
//             return res.status(401).send("Unauthorized: Internship not owned by provider");
//         }

//         //For Deleting the resume from uploads
//         // const filePath = path.join(__dirname, '../../../uploads', application.filename);
//         // fs.unlinkSync(filePath)

//         application = await Apply.findOneAndDelete({
//             internshipId: req.params.internshipId,
//             user : req.params.userId
//         });
        
//         res.json({ "Success": "Application has been deleted" , application});
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

router.put('/:status/:internshipId/:userId', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let application = await Apply.findOne({
            internshipId: req.params.internshipId,
            user : req.params.userId
        });
        
        if (!application) {
            return res.status(404).send("Application Not Found");
        }
        
        const internship = await Internship.findOne({
            _id: req.params.internshipId,
            provider: req.user.id
        });
        
        if (!internship) {
            return res.status(401).send("Unauthorized: Internship not owned by provider");
        }

        application = await Apply.findOneAndUpdate(
            {internshipId: req.params.internshipId,
                user : req.params.userId},
            { $set: { 'status': req.params.status } },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }

        res.json({ "Success": "Status has been updated" , application});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})  

router.get('/fetchPending/:id', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const Applicants = await Apply.find({
            internshipId: req.params.id,
            status : { $in: "Pending" } 
        });
        res.json(Applicants)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchShortlisted/:id', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const Applicants = await Apply.find({
            internshipId: req.params.id,
            status : { $in: "Shortlisted" } 
        });
        res.json(Applicants)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router