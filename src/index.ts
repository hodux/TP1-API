import httpApp from './app';  // Importer l'application configurée

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '0.0.0.0';

// Démarrer le serveur
httpApp.listen(3000, '0.0.0.0');