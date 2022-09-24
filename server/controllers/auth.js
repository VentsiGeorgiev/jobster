import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User Already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

const login = (req, res) => {
    res.send('Login User');
};

export { register, login };