import express from 'express';
const router = express.Router();

import { createJob } from '../controllers/job.js';
import protect from '../middleware/auth.js';


router.route('/add-job').post(protect, createJob);

export default router;