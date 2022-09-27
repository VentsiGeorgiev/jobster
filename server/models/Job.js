import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    company: {
        type: String
    },
    position: {
        type: String
    },
    status: {
        type: String,
        enum: ['Interview', 'Declined', 'Pending'],
        default: 'Interview',
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Remote', 'Internship'],
        default: 'Full-time',
    },
    jobLocation: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true,
    }
);


export default mongoose.model('Job', JobSchema);