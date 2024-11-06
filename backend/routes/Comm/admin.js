const express = require('express');
const router = express.Router();
const { UserFeedback, ProviderFeedback } = require('../../modelSchema/Comm/Feedback')
const { UserContact, ProviderContact } = require('../../modelSchema/Comm/ContactUs');
const authorize = require('../../middleware/authorize');

router.get('/fetchalluserfeedbacks', authorize, async (req, res) => {
    try {
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
          }
        const feedbacks = await UserFeedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchallproviderfeedbacks', authorize, async (req, res) => {
    try {
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
          }
        const feedbacks = await ProviderFeedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchallusercontacts', authorize, async (req, res) => {
    try {
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
          }
           const contacts = await UserContact.find();
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchallprovidercontacts', authorize, async (req, res) => {
    try {
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
        }
        const contacts = await ProviderContact.find();
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router