import express from 'express';
import { Login, signup } from '../controllers/auth-controllers';
const router = express.Router();



router.post('/signup', signup);

router.post('/login', Login);


export default router;
