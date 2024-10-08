import express, { Request, Response, NextFunction } from 'express';
import productRoutes from './routes/product.route';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import https from 'https';
import { loadCertificate } from './middlewares/certificat.middleware';
import { config } from './config/config';
import session from 'express-session';
import fs from "fs/promises";
import { IProduct } from './interfaces/product.interface';
import { Product } from './models/product.model';
import { randomInt } from 'crypto';
import authRoutes from './routes/auth.route'

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
app.use("/", authRoutes);

app.use(errorMiddleware);

// Fetch les produits fictifs
async function populateProducts() {
  const url = "https://fakestoreapi.com/products/"
  const fileToPopulate = "json/products.json"
  let isFileEmpty = false

  const data = await fs.readFile("json/products.json", "utf-8");
  if (data.length == 0) {
    isFileEmpty = true
  }
  // Mapping pour prendre seulement les données requis
  // Quantity est random pour chaque produit, le fakestoreapi ne contient pas de property pour quantity
  if (isFileEmpty) {
    try {
      const response = await fetch(url);
      const value = await response.json();
      const products: IProduct[] = value.map((item: any) => {
        return new Product(
            item.id,
            item.title,
            item.description,
            item.category,
            randomInt(100),
            item.price
          );
        });

      fs.writeFile(fileToPopulate, JSON.stringify(products, null, 2))
      console.log("Products.json populé!")
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


