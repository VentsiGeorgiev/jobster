import express from 'express';
const router = express.Router();

import { createJob, getAllJobs, getMyJobs, deleteJob } from '../controllers/job.js';
import protect from '../middleware/auth.js';


router.route('/add-job').post(protect, createJob);
router.route('/all-jobs').get(protect, getAllJobs);
router.route('/my-jobs').get(protect, getMyJobs);
router.route('/my-jobs/:id').delete(protect, deleteJob);

export default router;