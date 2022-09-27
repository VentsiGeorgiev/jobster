import Job from '../models/Job.js';

const createJob = async (req, res) => {

    try {
        const { company, position, status, jobType, jobLocation } = req.body;

        if (!position || !company || !jobLocation || !status || !jobType) {
            throw new Error('All fields are required');
        }

        const job = {
            company,
            position,
            status,
            jobType,
            jobLocation,
            createdBy: req.user._id,
        };

        const createJob = await Job.create(job);
        res.status(201).json(createJob);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export { createJob };