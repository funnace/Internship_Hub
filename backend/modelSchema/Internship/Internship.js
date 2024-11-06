const mongoose = require('mongoose');
const {Schema} = mongoose;

const InternshipSchema = new Schema({
    companyname: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provider'
    },
    internshiptype: {
        type: String,
        enum: ['Development & IT', 'Marketing & Sales', 'Design & Creative', 'Support & Admin', 'other'],
        required: true
    },
    city: {
        type: [String],
        required: true
    },
    openings: {
        type: Number,
        required: true
    },
    stipend: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
    jd : {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    other: {
        type: String
    }
}, { timestamps: true });

const Internship = mongoose.model('internship', InternshipSchema);
module.exports = Internship;