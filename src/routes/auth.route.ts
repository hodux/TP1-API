import { Router } from 'express';
import { AuthService } from '../services/auth.service.ts';
import { logger } from '../utils/logger.ts'

const router = Router();

router.post('/users/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("Donnees manquantes");
    }

    try {
        const token = await AuthService.login(req.body.username, req.body.password);
        
        if (token) {
            return res.json({ token });
        } else {
            return res.status(401).send('Nom d’utilisateur ou mot de passe incorrect');
        }
    } catch (error) {
        logger.error("Login error", error);
        return res.status(500).send("Erreur du serveur");
    }
});


export default router;