import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

const router = Router();

const newUser = new UserModel(
    1,                       
    'John Doe',               
    'john.doe@example.com',   
    'john_doe',               
    '$2a$12$6IXVSpF/axEflfXJA6MOruFReKlWEbkebqf.xiVleM2VrESpvHcvy',
    'manager'                   
  );

const users: User[] = [newUser]; // Simuler une base de données en mémoire

router.post('/users/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ username: user.username }, 'SECRET_KEY', 
            { expiresIn: '1h' }
        );
        res.json({ accessToken });
    } else {
        res.status(403).send('Nom d’utilisateur ou mot de passe incorrect');
    }
});

export default router;