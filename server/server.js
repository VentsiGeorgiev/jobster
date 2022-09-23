import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const PORT = process.env.PORT;

connectDB();
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Jobster' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));