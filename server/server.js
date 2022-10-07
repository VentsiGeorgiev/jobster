import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const PORT = process.env.PORT;
import auth from './routes/auth.js';
import job from './routes/job.js';
import errorHandler from './middleware/error.js';
import notFoundMiddleware from './middleware/notFound.js';
import cors from './middleware/cors.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/job', job);

if (process.env.NODE_ENV === 'production') {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.json({ message: 'Jobster' });
    });
}



app.use(notFoundMiddleware);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));