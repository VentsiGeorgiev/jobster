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
        enum: ['interview', 'declined', 'pending']
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship']
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