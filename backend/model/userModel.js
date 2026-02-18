import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },

    age: {
        required: true,
        type: Number
    },

    email: {
        required: true,
        type: String
    }
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

export default User;