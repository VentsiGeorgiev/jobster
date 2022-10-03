import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    company: {
        type: String
    },
    position: {
        type: String
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time'],
        default: 'all',
    },
    seniority: {
        type: String,
        enum: ['intern', 'junior', 'mid-level', 'senior', 'team-lead'],
        default: 'all',
    },
    skills: {
        type: String,
        enum: ['javascript', 'java', 'c-sharp', 'python'],
        default: 'all',
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