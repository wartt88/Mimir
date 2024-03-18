# Ollama

Ce dossier contient tous les fichiers nécessaire au bon fonctionnement de l'IA générative

### WARNING
Il n'y a pas le modèle présent dans ce dossier car il est trop volumineux, veuillez le télécharger et le renommer exactement comme tel : **vigogne.gguf**

**Modèle:** Vigogne 7B-Q4 <br>
**Lien de téléchargement**: [HuggingFace](https://huggingface.co/TheBloke/Vigogne-2-7B-Instruct-GGUF/blob/main/vigogne-2-7b-instruct.Q4_K_M.gguf)

Une fois que le modèle est téléchargé, veuillez verifier qu'il est bien renommé !

### Lancement
Une fois que tout est prêt, vous pouvez lancer le service avec
```bash
sudo docker build -t ollama . && sudo docker run ollama
```

ou sinon avec un docker-compose
```bash
sudo docker compose up --build
```