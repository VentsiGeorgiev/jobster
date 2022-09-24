import User from '../models/User.js';

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User Already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: user.createJWT(),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
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