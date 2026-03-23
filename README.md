# Blog API Backend – INF222

## Description

Ce projet est une API backend développée avec Node.js et Express dans le cadre du TAF1 du cours INF222 (Développement Backend).

Cette API permet la gestion des articles d’un blog simple via différentes opérations CRUD (Create, Read, Update, Delete).

Elle utilise SQLite comme base de données locale pour la documentation des endpoints.

---

## Technologies utilisées

- Node.js
- Express.js
- SQLite
- Swagger (documentation API)
- Body-parser
- CORS

---

## Installation du projet


### 1.Installer les dependances
npm install
### 2. Lancer le serveur
node server.js
### 3.le serveur demarre sur
http://localhost:3000
### 4. Structure du projet:
blog-api/
│
server.js
blog.db
package.json

Endpoints disponibles

POST/api/articles

