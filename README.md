# TP1-API

## Description
Remise du TP1 : Développement d'une API RESTful pour la gestion d'inventaire. 

### Données de https://fakestoreapi.com utilisées situé [ici](json)

### Collection Postman utilisée pendant les tests situé [ici](postman/TP1%20API.postman_collection.json)

### Swagger situé sur https://localhost:3000/v1/api-docs

## Prérequis
Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/en/) (v12 ou supérieure)
- [npm](https://www.npmjs.com/)

## Installation
1. Clonez le projet :

   ```bash
   git clone git@github.com:hodux/TP1-API.git
   cd TP1-API
   ```

2. Installez les dépendances du projet :

   ```bash
   npm install
   ```

3. Lancez l'application :

   ```bash
   npm run start
   ```

## Configuration
Configuer le fichier `.env` à la racine du projet pour stocker les variables d'environnement, par exemple :

```bash
PORT=3000
JWT_SECRET=my_jwt_secret
NODE_ENV=development
```
