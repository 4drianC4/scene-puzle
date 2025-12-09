import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = Router();

router.get('/list', getUsers);
router.get('/read/:id', getUserById);
router.post('/write', createUser);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
