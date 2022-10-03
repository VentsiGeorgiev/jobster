import User from '../models/User.js';

const register = async (req, res) => {
    try {
        const { name, email, password, repass } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error('All fields are required');
        }
        if (password.trim().length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        if (password != repass) {
            throw new Error('Passwords don\'t match');
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isCorrectPassword = await user.comparePasswords(password);

        if (!isCorrectPassword) {
            throw new Error('Invalid email or password');
        }

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: user.createJWT(),
            });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

const update = async (req, res) => {

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name;
            const updatedUser = await user.save();

            res.json(updatedUser);

        };

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export { register, login, update };