const express = require('express');
const router = express.Router();
const Internship = require('../../modelSchema/Internship/Internship')
const axios = require('axios')
const authorize = require('../../middleware/authorize');
const { validationResult } = require('express-validator');
const Apply = require('../../modelSchema/Internship/Apply');
const User = require('../../modelSchema/Auth/User')

//Route1: get all Intternships
router.get('/fetchallinternships', async (req, res) => {
    try {
        const current_date = new Date();
        const internships = await Internship.find({deadline: { $gt: current_date }}).sort({ updatedAt: -1 });
        res.json(internships);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchinternship/:id', authorize, async (req, res) => {
    if (req.user.userType !== 'user') {
        return res.status(403).json({ message: 'Access forbidden. User access required.' });
      }
    try {
        let internship = await Internship.findById(req.params.id)
        if (!internship) { res.status(404).send("Not Found") }
        success = true
        res.json(internship)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// router.post('/fetchallinternships', async (req, res) => {
//     try {
//         // Fetch internships from MongoDB
//         const internships = await Internship.find();

//         // Transform internships data to match the expected structure
//         const transformedInternships = internships.map(internship => ({
//             id: internship._id.toString(),
//             companyname: internship.companyname,
//             position: internship.position,
//             provider: internship.provider,
//             internshiptype: internship.internshiptype,
//             city: internship.city,
//             openings: internship.openings,
//             stipend: internship.stipend,
//             deadline: internship.deadline.toISOString(),
//             desc: internship.desc,
//             jd: internship.jd,
//             skills: internship.skills
//         }));

//         // Send the internships data to the FastAPI endpoint
//         const response = await axios.post('http://127.0.0.1:8000/api/user/fetchallinternships', transformedInternships);

//         console.log(response.data);
//         res.json(response.data);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

router.post('/fetchRecommendations', authorize, async (req, res) => {
    if (req.user.userType !== 'user') {
        return res.status(403).json({ message: 'Access forbidden. User access required.' });
      }
    try {
        // Fetch user data from MongoDB
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password -username -email -state -pincode");

        // Fetch applied applications from MongoDB
        const applieds = await Apply.find({ user: req.user.id })
            .populate({
                path: 'internshipId',
                model: Internship,
                select: '_id companyname position internshiptype city openings stipend deadline desc jd skills'
            })
            .select('skills -_id')
            .exec();

        // Fetch internships from MongoDB
        const internships = await Internship.find({
            _id: { $nin: await Apply.distinct('internshipId', { user: req.user.id }) }
          }).exec();        

        // Prepare the data to send in the POST request
        const postData = {
            user: {
                id: user._id,
                city: user.city,
                skills: user.skills
            },
            applieds: applieds.map(applied => ({
                internshipId: {
                   mongo_id: applied.internshipId._id,
                    companyname: applied.internshipId.companyname,
                    position: applied.internshipId.position,
                    internshiptype: applied.internshipId.internshiptype,
                    city: applied.internshipId.city,
                    openings: applied.internshipId.openings,
                    stipend: applied.internshipId.stipend,
                    deadline: applied.internshipId.deadline,
                    desc: applied.internshipId.desc,
                    jd: applied.internshipId.jd,
                    skills: applied.skills,
                    internshipSkills: applied.internshipId.skills
                }})),
            internships: internships.map(internship => ({
                mongo_id: internship._id,
                companyname: internship.companyname,
                position: internship.position,
                provider: internship.provider,
                internshiptype: internship.internshiptype,
                city: internship.city,
                openings: internship.openings,
                stipend: internship.stipend,
                deadline: internship.deadline,
                desc: internship.desc,
                jd: internship.jd,
                skills: internship.skills }))
        };

        // Send the data to the FastAPI endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/user/fetchRecommendations', postData);

        console.log(response.data);
        res.json(response.data);
        // res.json(postData)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/fetchinternships', authorize, async (req, res) => {
    if (req.user.userType !== 'user') {
        return res.status(403).json({ message: 'Access forbidden. User access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  try {
    // Find all internships that the user hasn't applied to
    const internships = await Internship.find({
      _id: { $nin: await Apply.distinct('internshipId', { user: req.user.id }) }
    }).exec();

    res.json(internships);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;