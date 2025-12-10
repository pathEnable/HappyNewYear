# Projet Carte de Vœux 2026

Ce projet génère une carte de vœux animée et personnalisable.

## Structure

- `app/voeux/page.jsx` : Page principale de la carte.
- `app/api/collect/route.js` : API pour collecter les emails.
- `components/` : Composants UI (Confettis, Formulaire).
- `app/globals.css` : Styles globaux et thème Tailwind.

## Installation

1.  Ouvrez un terminal dans le dossier `card` :
    ```bash
    cd card
    npm install
    ```

2.  Configurez les variables d'environnement :
    - Copiez `.env.local.example` vers `.env.local`
    - Ajoutez votre URL de Webhook (Make ou Zapier) dans `.env.local`.

3.  Lancez le serveur de développement :
    ```bash
    npm run dev
    ```

4.  Ouvrez [http://localhost:3000/voeux](http://localhost:3000/voeux).

## Déploiement sur Vercel

1.  Poussez ce dossier `card` (ou le projet entier) sur GitHub/GitLab.
2.  Importez le projet dans Vercel.
    - Si le projet est dans un sous-dossier (`card`), configurez le "Root Directory" sur `card` dans les paramètres Vercel.
3.  Ajoutez la variable d'environnement `MAKE_WEBHOOK_URL` dans l'interface Vercel.
4.  Déployez.

## Utilisation

- Lien standard : `/voeux`
- Lien personnalisé : `/voeux?name=Prénom`
