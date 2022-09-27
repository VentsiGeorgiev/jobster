import express from 'express';
const router = express.Router();

import { createJob, getAllJobs } from '../controllers/job.js';
import protect from '../middleware/auth.js';


router.route('/add-job').post(protect, createJob);
router.route('/all-jobs').get(protect, getAllJobs);

export default router;