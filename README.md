# Mimir

## Description
Mimir est une plateforme d'apprentissage éducatif. Elle permet de créer des cours, des exercices et des quiz. Cet application a été réalisé dans le cadre d'un projet tutoré pour nos études en BUT informatique.

## Auteurs
- Jules HIRTZ
- Yann MIJATOVIC
- Alexandre PERROT
- Théo PINCHON

## Quickstart
Ceci est une installation complète du projet (web, intelligence artificiel, extracteur, ...)

### Prérequis
- Docker (sous Linux idéalement)
- Une carte graphique NVIDIA (recommandé pour accélerer les IA)

### Installation
1. Cloner le dépôt
2. Se rendre dans le dossier Mimir/app/apps/ollama et lire le [README.md](https://github.com/wartt88/Mimir/blob/main/app/apps/ollama/README.md) du dossier
3. Configurer le .env
   
### Rendre le projet accessible
Si vous voulez rendre le projet externe à travers Internet, vous devez configurer votre routeur et votre PC de manière à qu'il accepte les connexions sur le port 80, 5000 et 11434 et configurer le .env pour que le NEXTAUTH_URL corresponde à votre adresse IP ou nom de domaine que vous aurez configuré au préalable

### Lancement
Une fois que tout est prêt, vous pouvez lancer le projet entièrement avec
```bash
sudo docker compose up --build
```

## Seulement le serveur Web
Si vous souhaitez juste démarrer le serveur Web, vous pouvez le faire avec

### ⚠️ Les fonctionnalités type vérificateur de réponse ainsi que génération de réponses ne fonctionneront pas  

### Prérequis
- Node.js (LTS v20)
- npm (v10)
- Docker (si vous lancez avec Docker)
- Configurer le .env (Mimir/app/apps/web/.env)
- Configurer votre routeur et votre PC de manière à qu'il accepte les connexions sur le port 80

### Docker
```bash
cd Mimir/app/apps/web
sudo docker build -t web . && sudo docker run -p 80:3000 web
```

### Standalone
```bash
cd Mimir/app/apps/web
npm install
npm run dev
```
