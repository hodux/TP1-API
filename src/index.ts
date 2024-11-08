import httpsApp from './app';  // Importer l'application configurée

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '0.0.0.0';

// Démarrer le serveur
httpsApp.listen(3000, '0.0.0.0');