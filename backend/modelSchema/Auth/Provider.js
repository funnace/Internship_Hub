const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProviderSchema = new Schema({
    companyname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Provider = mongoose.model('provider',ProviderSchema);
module.exports = Provider