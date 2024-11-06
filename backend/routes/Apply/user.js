const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize');
const Apply = require('../../modelSchema/Internship/Apply');
const Internship = require('../../modelSchema/Internship/Internship');
const { validationResult } = require('express-validator');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
const upload = require('../../config/multer'); 

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// router.post('/apply/:id', authorize, upload.single('resume'), async (req, res) => {
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log('Validation Errors:', errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const existingApplication = await Apply.findOne({
//             user: req.user.id,
//             internshipId: req.params.id
//         });

//         if (existingApplication) {
//             return res.status(400).json({ success: false, error: "User has already applied for this internship." });
//         }

//         const result = await new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//                 { resource_type: 'raw', format: 'pdf' },
//                 (error, result) => {
//                     if (error) {
//                         console.error('Cloudinary Upload Error:', error);
//                         reject(error);
//                     } else {
//                         console.log('File:', req.file);
//                         console.log('Body:', req.body);
//                         resolve(result);
//                     }
//                 }
//             );
//             stream.end(req.file.buffer);
//         });

//         const application = new Apply({
//             username: req.body.username,
//             tenth: req.body.tenth,
//             internshipId: req.params.id,
//             twelfth: req.body.twelfth,
//             languages: req.body.languages.split(','),
//             filename: result.secure_url,
//             diploma: req.body.diploma,
//             DOB: req.body.DOB,
//             course: req.body.course,
//             specialization: req.body.specialization,
//             CGPA: req.body.CGPA,
//             skills: req.body.skills.split(','),
//             user: req.user.id,
//         });

//         const savedApplication = await application.save();
//         res.json({ success: true, savedApplication });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });


router.post('/apply/:id', authorize, upload.single('resume'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user has already applied for the internship
        const existingApplication = await Apply.findOne({
            user: req.user.id,
            internshipId: req.params.id
        });

        if (existingApplication) {
            return res.status(400).json({ success: false, error: "User has already applied for this internship." });
        }

        // Create a new application
            const application = new Apply({
            username: req.body.username,
            tenth: req.body.tenth,
            internshipId: req.params.id,
            twelfth: req.body.twelfth,
            languages: req.body.languages,
            filename: req.file.filename,
            diploma: req.body.diploma,
            DOB: req.body.DOB,
            course: req.body.course,
            specialization: req.body.specialization,
            CGPA: req.body.CGPA,
            skills: req.body.skills,
            user: req.user.id,
        });

        const savedApplication = await application.save();
        res.json({ success: true, savedApplication });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// GET route for fetching applied applications 
router.get('/fetchapplied', authorize, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const appliedApplications = await Apply.find({ user: req.user.id })
            .populate({
                path: 'internshipId',
                model: Internship,
                select: 'companyname position internshiptype city openings stipend deadline desc jd skills',
                options: { sort: { updatedAt: -1 } } 
            })
            .select('-tenth -twelfth -diploma -languages -skills -DOB -filename -__v -user -username -CGPA -course -specialization')
            .exec();
        
        // Format the data as needed
        const formattedData = appliedApplications.map(application => ({
            _id: application.internshipId._id,
            city: application.internshipId.city,
            companyname: application.internshipId.companyname,
            deadline: application.internshipId.deadline,
            desc: application.internshipId.desc,
            internshiptype: application.internshipId.internshiptype,
            jd: application.internshipId.jd,
            openings: application.internshipId.openings,
            position: application.internshipId.position,
            provider: application.internshipId.provider,
            skills: application.internshipId.skills,
            stipend: application.internshipId.stipend,
            status: application.status,
            __v: application.internshipId.__v
        }));

        res.json(formattedData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchStatus/:id', authorize, async (req, res) => {
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

// router.post('/fetchapplied', authorize, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const appliedApplications = await Apply.find({ user: req.user.id })
//             .populate({
//                 path: 'internshipId',
//                 model: Internship,
//                 select: 'companyname position internshiptype city openings stipend deadline desc jd skills'
//             })
//             .select('-tenth -twelfth -diploma -languages -skills -DOB -filename -__v -username -user -_id -status -createdAt -updatedAt')
//             .exec();
        
//         // Prepare the data to send in the POST request
//         const postData = appliedApplications ;

//         // Send the data to the FastAPI endpoint
//         const response = await axios.post('http://127.0.0.1:8000/api/application/user/fetchapplied', postData);

//         console.log(response.data);
//         res.json(response.data);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// });

module.exports = router;