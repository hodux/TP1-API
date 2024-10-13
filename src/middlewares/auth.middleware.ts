import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.ts';

// Middleware pour vérifier le JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    
    const jwtSecret = config.jwtSecret;

    if (!authHeader) {
        return res.status(403).json({ message: 'Accès refusé. Aucun token fourni.' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.body = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
      }
};
