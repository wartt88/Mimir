#!/bin/bash

# Démarrage de ollama serve en processus détaché
ollama serve &

# Attendre un court instant pour s'assurer que ollama serve a le temps de démarrer
sleep 5

# Afficher "hello"
ollama create vigogne -f ./Modelfile
ollama run vigogne

while true; do
    sleep 1
done
