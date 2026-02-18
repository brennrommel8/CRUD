import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use('/api', userRoutes);


mongoose
    .connect('mongodb://localhost:27017/crud')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
