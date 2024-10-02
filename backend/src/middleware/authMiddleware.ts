import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/user';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretrandomkey';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; 
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      // Verifique se `user` é do tipo `JwtPayload`
      if (typeof user === 'object' && user !== null) {
        req.user = user as JwtPayload; // Asserção de tipo
        next();
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
};
