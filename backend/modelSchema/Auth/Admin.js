const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model('admin',AdminSchema);
module.exports = Admin