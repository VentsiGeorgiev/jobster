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

export { createJob };