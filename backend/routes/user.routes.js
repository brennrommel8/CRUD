import { Router } from 'express';
import { createUser, getUser, deleteUser, updateUser } from '../controller/user.controller.js';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser); 


export default router;