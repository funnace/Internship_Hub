const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize')
const Internship = require('../../modelSchema/Internship/Internship')
const { validationResult } = require('express-validator');

//Route1: get all Intternships
router.get('/fetchallinternships', authorize, async (req, res) => {
    try {
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
          }
        const internships = await Internship.find();
        res.json(internships);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//Route2: Add a new Internship

router.post('/addinternship', authorize, async (req, res) => {

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
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
            jd: req.body.jd
        })

        const savedInternship = await internship.save()

        res.json(savedInternship)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route3 : update internships

router.put('/updateinternship/:id', authorize, async (req, res) => {

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
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

    try {
        let internship = await Internship.findByIdAndUpdate(req.params.id, { $set: newInternship }, { new: true });
        if (!internship) {
            return res.status(404).send("Internship not found");
        }    
        success = true
        res.json({ internship ,success})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/deleteinternship/:id', authorize, async (req, res) => {
    try {

        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
          }

        let internship = await Internship.findByIdAndDelete(req.params.id);
        if (!internship) {
            return res.status(404).send("Internship not found");
        }
        res.json({ "Success": "Internship has been deleted", internship });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchinternship/:id', authorize, async (req, res) => {
    try {
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
          }

        let internship = await Internship.findById(req.params.id)
        if (!internship) { res.status(404).send("Not Found") }
        res.json(internship)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router