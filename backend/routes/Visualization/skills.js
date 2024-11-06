const express = require('express');
const router = express.Router();
const Internship = require('../../modelSchema/Internship/Internship')
const authorize = require('../../middleware/authorize')

router.get('/fetchtopskills', authorize , async (req, res) => {
    if (req.user.userType !== 'user') {
        return res.status(403).json({ message: 'Access forbidden. User access required.' });
      }
    try {
        const internships = await Internship.find().select('skills');

        // Create an object to store skills and their counts
        const skillsCount = {};

        // Iterate through each internship and count the occurrences of each skill
        internships.forEach(internship => {
            internship.skills.forEach(skill => {
                // Increment the count for the current skill or initialize it to 1
                skillsCount[skill] = (skillsCount[skill] || 0) + 1;
            });
        });

        // Sort the skills by their counts in descending order
        const sortedSkills = Object.keys(skillsCount).sort((a, b) => skillsCount[b] - skillsCount[a]);

        // Prepare the result array with skills and their counts
        const topSkills = sortedSkills.slice(0, 10);

        // Prepare the result array with skills and their counts
        const result = topSkills.map(skill => ({ skill, count: skillsCount[skill] }));

        res.json(result)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;