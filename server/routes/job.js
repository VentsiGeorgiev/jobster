import express from 'express';
const router = express.Router();

import { createJob, getAllJobs, getMyJobs, deleteJob, updateJob, getJob, getStats, jobApply } from '../controllers/job.js';
import protect from '../middleware/auth.js';


router.route('/add-job').post(protect, createJob);
router.route('/all-jobs').get(protect, getAllJobs);
router.route('/my-jobs').get(protect, getMyJobs);
router.route('/my-jobs/:id')
    .get(protect, getJob)
    .delete(protect, deleteJob)
    .put(protect, updateJob);
router.route('/stats').get(protect, getStats);
router.route('/apply/:id').post(protect, jobApply);

export default router;