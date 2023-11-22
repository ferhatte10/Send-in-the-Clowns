# Application Webcam avec Nez Rouge

## Description
Ce projet a été réalisé dans le cadre du cours de Flux Multimédia et Technologies Web encadré par [**V.Barreaud**]()

Ce projet consiste en une application JavaScript qui capte le flux vidéo d'une webcam, y ajoute un nez rouge sur le visage de la personne filmée ainsi que les traits du visage détectés par la librairie ml5.js. Les images transformées sont ensuite diffusées en temps réel via WebSocket.

Il s'agit d'une application client-serveur réalisée en node.js. Le serveur est chargé de diffuser les images transformées via WebSocket. Le client est chargé de capturer le flux vidéo de la webcam, de récuperer les positions des traits du visage et de les envoyer au serveur via WebSocket. Le client reçoit ensuite les images ainsi que les positions et les affiche dans le navigateur.

Il exeste deux ongles dans l'application : un onglet pour streamer le flux vidéo brut de la webcam et un onglet pour afficher le flux vidéo transformé avec le nez rouge.

## Fonctionnalités
- Capture du flux vidéo d'une webcam.
- Reconnaissance des traits du visage à l'aide de la librairie ml5.js.
- Superposition d'un nez rouge sur le visage détecté.
- Diffusion des images transformées en temps réel via WebSocket.

## Prérequis
- Navigateur moderne avec support de l'API getUserMedia.
- Node.js pour exécuter le serveur WebSocket.

## Installation
- Installez les dépendances Node.js :

```shell
npm install
```

## Démarrage
- Lancez le serveur : 

```shell
npm run dev
```

## Utilisation
- Assurez-vous que votre webcam fonctionne correctement.
1. Ouvrez dans votre navigateur l'URL suivante : http://localhost:8002 ou http://localhost:8000
2. Pour streamer le flux vidéo brut de la webcam, cliquez ensuite sur le bouton **"Start Stream"** (une popup s'ouvrira) puis autorisez l'accès à votre webcam.
3. Pour voir le flux vidéo transformé avec le nez rouge, cliquez sur le bouton **"View Stream"** (une autre popup s'ouvrira avec le flux modifié).

## Auteur
- [**Ferhat SAIDOUN**]()
- [**Zakaria RAJI**]()
