const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserContactSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    userType: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    query: {
        type: String,
        required: true
    }
});

const ProviderContactSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provider',
        required: true
    },
    userType: {
        type: String,
        default: 'provider'
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    query: {
        type: String,
        required: true
    }
});

const ProviderContact = mongoose.model('providercontact', ProviderContactSchema);
const UserContact = mongoose.model('usercontact', UserContactSchema);

module.exports = { UserContact, ProviderContact };