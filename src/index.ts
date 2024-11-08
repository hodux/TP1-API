import httpApp from './app'; // Importer l'application configurée

const PORT = process.env.PORT || 3000;

// Démarrer le serveur
httpApp.listen(3000, '0.0.0.0');