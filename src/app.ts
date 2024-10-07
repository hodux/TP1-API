import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import https from 'https';
import { loadCertificate } from './middlewares/certificat.middleware';
import { config } from './config/config';
import session from 'express-session';
import fs from "fs";

const app = express();
// Middleware de parsing du JSON
app.use(express.json());

// Définir les options de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple API to manage users',
    },
  },
  apis: ['./src/routes/*.route.ts'], // Fichier où les routes de l'API sont définies
};

// Middleware de session avec la clé secrète provenant des variables de configuration
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.isProduction, // Les cookies sécurisés ne sont activés qu'en production
  }
}));

// Générer la documentation à partir des options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Charger les certificats
let certificatOptions = loadCertificate();


// Servir la documentation Swagger via '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express! Connexion sécurisée.');
});

app.use('/', productRoutes);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(errorMiddleware);

// Fetch les produits fictifs
async function populateProducts() {
  const url = "https://fakestoreapi.com/products/"
  const fileToPopulate = "json/products.json"

  let isFileEmpty = false; 
  // Check pour ne pas overwrite
  fs.readFile(fileToPopulate, (err, file) => {
    file.length == 0 ? isFileEmpty = true : isFileEmpty = false
  })

  if (isFileEmpty) {
    try {
      const response = await fetch(url);
      const value = await response.json();
      const jsonString = JSON.stringify(value)
      fs.writeFile(fileToPopulate, jsonString, err => {
        if (err) {
          console.log('Erreur lors de la population', err)
        } else {
            console.log('Population de products.json succès')
        }
      })
    } catch (error) {
      console.log(error) 
    }
  } else {
    console.log("Products.json déja populé")
  }
}
populateProducts();

const httpApp = https.createServer(certificatOptions, app);

export default httpApp;


