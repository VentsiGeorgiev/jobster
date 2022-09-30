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
        const { status, jobType, sort } = req.query;
        const queryObject = {};

        if (status && status !== 'all') {
            queryObject.status = status;
        }
        if (jobType && jobType !== 'all') {
            queryObject.jobType = jobType;
        }

        let result = Job.find(queryObject);

        if (sort == 'latest') {
            result = result.sort('-createdAt');
        }
        if (sort == 'oldest') {
            result = result.sort('createdAt');
        }

        const jobs = await result;
        res.status(200).json(jobs);

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

const updateJob = async (req, res) => {
    const userId = req.user._id;
    const jobId = req.params.id;
    try {
        // Check for user
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Check for job
        const job = await Job.findById(jobId);
        if (!job) {
            throw new Error('Job not found');
        }

        // Check for job owner
        const isOwner = user._id.toString() === job.createdBy.toString();
        if (!isOwner) {
            throw new Error('Not authorized');
        }

        // // Update
        // const { company, position, status, jobType, jobLocation } = req.body;
        // job.company = company;
        // job.position = position;
        // job.status = status;
        // job.jobType = jobType;
        // job.jobLocation = jobLocation;

        // const updatedJob = await job.save();
        // res.status(200).json(updatedJob);

        // Update
        const { company, position, status, jobType, jobLocation } = req.body;
        const currentJob = {
            company,
            position,
            status,
            jobType,
            jobLocation,
        };
        Job.findByIdAndUpdate(jobId, currentJob, { new: true }, (err, docs) => {
            if (err) {
                throw new Error(err);
            } else {
                res.json(docs);
            }
        });


    } catch (error) {
        res.json({ message: error });
    }



};

const getJob = async (req, res) => {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    res.send(job);

};

export { createJob, getAllJobs, getMyJobs, deleteJob, updateJob, getJob };