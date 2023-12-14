import express from 'express';
import { Login, logOut, Me, SignUp } from '../controllers/Auth.js';

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.post('/signup', SignUp); // Adding the signup route
router.delete('/logout', logOut);

export default router;
