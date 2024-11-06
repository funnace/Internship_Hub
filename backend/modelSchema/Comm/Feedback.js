const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserFeedbackSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provider',
        required: true
    },
    userType: {
        type: String,
        default: 'User'
    },
    feedbacktype: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fdback: {
        type: String,
    required: true
    }
}, { timestamps: true });

const ProviderFeedbackSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provider',
        required: true
    },
    userType: {
        type: String,
        default: 'Provider'
    },
    feedbacktype: {
        type: String,
        enum: ["Review", "Complaint", "Suggestion", "Question", "Other"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fdback: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProviderFeedback = mongoose.model('providerfeedback',ProviderFeedbackSchema);
const UserFeedback = mongoose.model('userfeedback',UserFeedbackSchema);
module.exports = { UserFeedback, ProviderFeedback }