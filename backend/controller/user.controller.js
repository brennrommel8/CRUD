import User from '../model/userModel.js';

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Create user error:', error.message);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'User retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}



