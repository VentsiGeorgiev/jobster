import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const NAME_PATTERN = /^[a-zA-Z ]+$/;
const EMAIL_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, 'Name input is required'],
        validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'Name cannot contain any special characters'
        }
    },
    email: {
        type: String,
        required: [true, 'Email input is required'],
        unique: true,
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email input is required'
        }
    },
    password: {
        type: String,
        required: [true, 'Password input is required'],
    },
},
    {
        timestamps: true,
    }
);

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

UserSchema.methods.comparePasswords = async function (pass) {
    const isMatch = await bcrypt.compare(pass, this.password);
    return isMatch;
};


export default mongoose.model('User', UserSchema);
