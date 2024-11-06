require('dotenv').config();
const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
const path = require('path');
// const cloudinary = require('cloudinary').v2;

connectToMongo();

const app = express()
const port = process.env.PORT
const uploadsPath = path.join(__dirname, '../uploads');

app.use(cors())
app.use(express.json())

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsPath));

//Available Routes

//Auth
app.use('/api/auth/admin', require('./routes/Auth/admin'))
app.use('/api/auth/provider', require('./routes/Auth/provider'))
app.use('/api/auth/user', require('./routes/Auth/user'))

//Internship
app.use('/api/provider', require('./routes/Internship/provider'))
app.use('/api/user', require('./routes/Internship/user'))
app.use('/api/admin', require('./routes/Internship/admin'))

//Communication
app.use('/api/comm', require('./routes/Comm/user'))
app.use('/api/comm/admin', require('./routes/Comm/admin'))

//Apply
app.use('/api/application/user', require('./routes/Apply/user'))
app.use('/api/application/provider', require('./routes/Apply/provider'))

//Visulaization
app.use('/api/visualization/user', require('./routes/Visualization/skills'))

//Forgot
app.use('/api/forgot', require('./routes/Forgot/reset'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})