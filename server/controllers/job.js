import Job from '../models/Job.js';

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

export { createJob, getAllJobs };