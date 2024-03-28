# Mimir

## Description
Mimir est une plateforme d'apprentissage éducatif. Elle permet de créer des cours, des exercices et des quiz.
Cet application a été réalisé dans le cadre d'un projet tutoré pour nos études en BUT informatique.

## Auteurs
- Jules HIRTZ
- Yann MIJATOVIC
- Alexandre PERROT
- Théo PINCHON

# Installation du projet
Ceci est une installation complète du projet (web, extracteur, vérificateur ...) <br>
Une [vidéo YouTube](https://www.youtube.com/watch?v=-gFauPwwz3U) a été réalisée si jamais vous ne comprenez pas certaines étapes pour installer le projet

## Prérequis
- Docker (sous Linux)
- ~20 GB disque
- ~4 GB RAM
- Connexion Internet

## Installation standard
1. Cloner le dépôt
2. Configurer le .env

## Variables d'environnements
```yaml
# Serveur MongoDB sous Atlas
MONGO=mongodb+srv://hostname:password@address
# Systeme d'auth, generez un secret aleatoire et mettre le lien de votre site (ip ou nom de domaine)
NEXTAUTH_SECRET=nextauth_secret
NEXTAUTH_URL=https://monsuperlien.com
# Pour la connexion simplifiée (Auth)
# Provider GitHub (créer un compte GitHub, se rendre dans la page Developer et créer son application OAUTH)
# Bien le configurer avec les URL de redirection !!!
GITHUB_ID=id_github
GITHUB_SECRET=secret_github
# Provider Google (créer un compte Google Console et créer son application OAUTH)
# Bien le configurer avec les URL de redirection !!!
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
# Fournisseur email (changer l'adresse email dans le projet avec votre propre Nom de Domaine !!!)
RESEND_API_KEY=resend_api_key
```

## Installation complète (carte graphique NVIDIA obligatoire)
Effectuez toutes les étapes de l'installation standard

**⚠️ Si vous avez une carte graphique NVIDIA**, rendez-vous dans le dossier Mimir/app/apps/ollama
et lire le [README.md](https://github.com/wartt88/Mimir/blob/main/app/apps/ollama/README.md) du dossier pour profiter
de l'IA générative

## Rendre le projet accessible
Si vous voulez rendre le projet externe à travers Internet, vous devez configurer votre routeur et votre PC de manière
à qu'il accepte les connexions sur le port 80 et configurer le .env pour que le NEXTAUTH_URL corresponde à votre
adresse IP ou nom de domaine que vous aurez configuré au préalable

# Lancement
Une fois que tout est prêt, vous pouvez lancer le projet entièrement avec
```bash
sudo docker compose up --build
```

**⚠️ Si vous avez une carte graphique NVIDIA et que vous souhaitez l'utiliser pour profiter de l'IA générative,
vous pouvez lancer avec**
```bash
sudo docker compose -f compose-gpu.yaml up --build
```