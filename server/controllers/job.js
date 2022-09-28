import Job from '../models/Job.js';
import User from '../models/User.js';

const createJob = async (req, res) => {
    try {

        const {
            company,
            position,
            status,
            jobType,
            jobLocation
        } = req.body;

        if (!company || !position || !status || !jobType || !jobLocation) {
            throw new Error('All fields are required');
        }

        const jobOffer = await Job.create({
            company,
            position,
            status,
            jobType,
            jobLocation,
            createdBy: req.user._id,
        });

        res.status(201).json(jobOffer);

    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error.message });
    }

};

const getAllJobs = async (req, res) => {
    try {

        const allJobs = await Job.find();

        res.status(200).json(allJobs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyJobs = async (req, res) => {
    try {

        const myJobs = await Job.find({ createdBy: req.user._id });
        res.status(200).json(myJobs);

    } catch (error) {
        res.status(400).json({ message: error });
    }
};

const deleteJob = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        const job = await Job.findById(req.params.id);
        if (!job) {
            res.status(401);
            throw new Error('Job not found');
        }

        if (job.createdBy.toString() !== user._id.toString()) {
            res.status(401);
            throw new Error('Not Authorized');
        }

        await job.remove();
        res.status(200).json({ success: true });

    } catch (error) {
        res.json({ message: error });
    }



};

export { createJob, getAllJobs, getMyJobs, deleteJob };