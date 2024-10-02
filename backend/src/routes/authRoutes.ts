import express, { Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    await register(req, res)
});

router.post('/login', async (req: Request, res: Response) => {
    await login(req, res)
});

export default router;
