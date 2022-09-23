import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const PORT = process.env.PORT;
import auth from './routes/auth.js';
import errorHandler from './middleware/error.js';

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.json({ message: 'Jobster' });
});

// Routes
app.use('/api/v1/auth', auth);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));