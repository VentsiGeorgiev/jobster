import express from 'express';
const router = express.Router();

import { register, login, update } from '../controllers/auth.js';
import protect from '../middleware/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update').put(protect, update);

export default router;