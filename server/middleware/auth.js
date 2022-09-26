import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {

                // Get Token from header
                token = req.headers.authorization.split(' ')[1];
                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user from token
                req.user = await User.findById(decoded.id).select('-password');

                next();

            } catch (error) {
                res.status(401);
                throw new Error('Not Authorized');
            }
        }

        if (!token) {
            res.status(401);
            throw new Error('Not Authorized');
        }
    } catch (error) {
        res.status(401);
        res.json({ message: error.message });
    }

};

export default protect;