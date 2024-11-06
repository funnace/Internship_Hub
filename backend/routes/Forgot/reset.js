require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const User = require('../../modelSchema/Auth/User')
const Provider = require('../../modelSchema/Auth/Provider')
const JWT_SECRET = process.env.JWT_SECRET
var nodemailer = require("nodemailer");

router.post('/user', async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const data = {
      user: {
        id: oldUser.id //main user id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET, {
      expiresIn: "10m",
    });
    const link = `http://localhost:3000/reset/user/${oldUser._id}/${authToken}`;



      var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jaiswalking4542@gmail.com",
        pass: process.env.pass,
      },
    });

    var mailOptions = {
      from: "Internshiphub <jaiswalking4542@gmail.com>",
      to: `${oldUser.email}`,
      subject: "Password Reset",
      html: `<p>Click <a href="${link}">here</a> to RESET YOUR PASSWORD
  or copy and paste the link in your browser. <br> ${link}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
    return res.status(200).json({ link });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.post('/provider', async (req, res) => {
  try {
    const oldUser = await Provider.findOne({ email: req.body.email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const data = {
      user: {
        id: oldUser.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET, {
      expiresIn: "10m",
    });
    const link = `http://localhost:3000/reset/provider/${oldUser._id}/${authToken}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jaiswalking4542@gmail.com",
        pass: process.env.pass,
      },
    });

    var mailOptions = {
      from: "Internshiphub <jaiswalking4542@gmail.com>",
      to: `${oldUser.email}`,
      subject: "Password Reset",
      html: `<p>Click <a href="${link}">here</a> to RESET YOUR PASSWORD
  or copy and paste the link in your browser. <br> ${link}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
    return res.status(200).json({ link });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.put('/reset/:user/:id/:token', async (req, res) => {
  const { user, id, token } = req.params;

  try {
    let oldUser;
    if (user === 'user') {
      oldUser = await User.findById(id);
    } else if (user === 'provider') {
      oldUser = await Provider.findById(id);
    }

    if (!oldUser) {
      return res.json({ status: 'User Not Exists!!' });
    }

    let verify;
    try {
      verify = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      } else {
        throw err;
      }
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    if (user === 'user') {
      await User.updateOne(
        { _id: id },
        {
          $set: {
            password: secPass,
          },
        }
      );
    } else if (user === 'provider') {
      await Provider.updateOne(
        { _id: id },
        {
          $set: {
            password: secPass,
          },
        }
      );
    }

    const success = true;
    res.json({ success, verify, body: req.body });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;