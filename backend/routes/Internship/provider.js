const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize')
const Internship = require('../../modelSchema/Internship/Internship')
const Apply = require('../../modelSchema/Internship/Apply')
const { validationResult } = require('express-validator');

//Route1: get all Intternships http://localhost:5000/api/provider/fetchallinternships
router.get('/fetchallinternships', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    try {
        const internships = await Internship.find({ provider: req.user.id })
        res.json(internships)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchinternships', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    try {
        const current_date = new Date();
        const internships = await Internship.find({ provider: req.user.id, deadline: { $gt: current_date } })
        res.json(internships)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchexpiredinternships', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    try {
        const current_date = new Date();
        const internships = await Internship.find({ provider: req.user.id, deadline: { $lt: current_date } })
        res.json(internships)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route2: Add a new Internship /api/provider/addinternship

router.post('/addinternship', authorize,
async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    const internship = await Internship.create({
            companyname: req.body.companyname ,
            position: req.body.position ,
            provider: req.user.id ,
            internshiptype: req.body.internshiptype ,
            city: req.body.city ,
            stipend: req.body.stipend,
            deadline: req.body.deadline,
            openings: req.body.openings,
            desc: req.body.desc,
            skills: req.body.skills,
            jd: req.body.jd,
            other: req.body.other
        })

        const savedInternship = await internship.save()
        success =true
        res.json({success,savedInternship})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route3 : update internships

router.put('/updateinternship/:id', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    let newInternship = {};
    if (req.body.openings) { newInternship.openings = req.body.openings };
    if (req.body.companyname) { newInternship.companyname = req.body.companyname };
    if (req.body.position) { newInternship.position = req.body.position };
    if (req.body.jd) { newInternship.jd = req.body.jd };
    if (req.body.desc) { newInternship.desc = req.body.desc };
    if (req.body.internshiptype) { newInternship.internshiptype = req.body.internshiptype };
    if (req.body.city) { newInternship.city = req.body.city };
    if (req.body.deadline) { newInternship.deadline = req.body.deadline };
    if (req.body.stipend) { newInternship.stipend = req.body.stipend };
    if (req.body.skills) { newInternship.skills = req.body.skills };
    if (req.body.other) { newInternship.other = req.body.other };

    let internship = await Internship.findById(req.params.id)
    if (!internship) { res.status(404).send("Not Found") }

    if (internship.provider.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    internship = await Internship.findByIdAndUpdate(req.params.id, { $set: newInternship }, { new: true })
    success = true
    res.json({ internship, success})
})

//Route4 : delete internships

router.delete('/deleteinternship/:id', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    try {
        let internship = await Internship.findById(req.params.id)
        if (!internship) { res.status(404).send("Not Found") }

        if (internship.provider.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        internship = await Internship.findByIdAndDelete(req.params.id)
        await Apply.deleteMany({ internshipId: req.params.id });

        res.json({ "Success": "Internship and related applications have been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchinternship/:id', authorize, async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    try {
        let internship = await Internship.findById(req.params.id)
        if (!internship) { res.status(404).send("Not Found") }

        if (internship.provider.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        success = true
        res.json(internship)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router