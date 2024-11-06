const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize')
const { UserContact, ProviderContact } = require('../../modelSchema/Comm/ContactUs');
const { UserFeedback, ProviderFeedback } = require('../../modelSchema/Comm/Feedback');
const { body, validationResult } = require('express-validator');

router.post('/userfdback', authorize, [
    body('fdback',"feedback cannot be less than 10 letters").isLength({min : 10})
], async (req, res) => {

    if (req.user.userType !== 'user') {
        return res.status(403).json({ message: 'Access forbidden. User access required.' });
      }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    const userfdback = await UserFeedback.create({
            username: req.body.username ,
            feedbacktype: req.body.feedbacktype ,
            user: req.user.id ,
            title: req.body.title ,
            fdback: req.body.fdback ,
        })

        const savedFeedback = await userfdback.save()
        success =true
        res.json({success,savedFeedback})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/providerfdback', authorize, [
    body('fdback',"feedback cannot be less than 10 letters").isLength({min : 10})
], async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    const providerfdback = await ProviderFeedback.create({
            username: req.body.username ,
            feedbacktype: req.body.feedbacktype ,
            user: req.user.id ,
            title: req.body.title ,
            fdback: req.body.fdback ,
        })

        const savedFeedback = await providerfdback.save()
        success =true
        res.json({success,savedFeedback})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/usercontact', authorize, [
    body('query',"query cannot be less than 10 letters").isLength({min : 10})
], async (req, res) => {
    if (req.user.userType !== 'user') {
        return res.status(403).json({ message: 'Access forbidden. User access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    const usercontact = await UserContact.create({
            username: req.body.username ,
            email: req.body.email ,
            phone: req.body.phone ,
            user: req.user.id ,
            query: req.body.query ,
        })

        const savedContact = await usercontact.save()
        success =true
        res.json({success,savedContact})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/providercontact', authorize, [
    body('query',"query cannot be less than 10 letters").isLength({min : 10})
], async (req, res) => {
    if (req.user.userType !== 'provider') {
        return res.status(403).json({ message: 'Access forbidden. Provider access required.' });
      }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    const providercontact = await ProviderContact.create({
            username: req.body.username ,
            email: req.body.email ,
            phone: req.body.phone ,
            user: req.user.id ,
            query: req.body.query ,
        })

        const savedContact = await providercontact.save()
        success =true
        res.json({success,savedContact})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchalluserfeedbacks', async (req, res) => {
    try {
        const feedbacks = await UserFeedback.find({feedbacktype : 'Review'}).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchallproviderfeedbacks', async (req, res) => {
    try {
        const feedbacks = await ProviderFeedback.find({feedbacktype : 'Review'}).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router