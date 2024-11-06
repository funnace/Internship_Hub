const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApplySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    internshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'internship'
    },
    tenth: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 0,
        max: 100
    },
    twelfth: {
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
        max: 100
    },
    diploma: {
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
        max: 100
    },
    course:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    CGPA:{
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
        max: 10,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Shortlisted', 'Rejected', 'Pending'],
        default: 'Pending'
    }
}, { timestamps: true });

const Apply = mongoose.model('application', ApplySchema);
module.exports = Apply;