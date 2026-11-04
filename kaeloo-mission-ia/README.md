# 🐸 KAELOO — MISSION IA 🤖

> **« Réfléchis, protège-toi et crée avec l'intelligence artificielle ! »**

Application web éducative, interactive et ludique conçue pour les enfants de **7 à 12 ans** afin de mettre en pratique les fondamentaux de l'intelligence artificielle en **20 à 30 minutes** (Séance du **dimanche 8 novembre 2026**).

---

## 🎯Les 7 écrans de la mission

1. **Accueil & Lancement** : Histoire d'introduction au village avec la grenouille curieuse, le chat malicieux et Super IA.
2. **Défi 1 — Humain ou machine ?** : 6 situations interactives pour distinguer les forces humaines (émotions, empathie, jugement, responsabilité) et les capacités des machines (calcul, rapidité, automatisation).
3. **Défi 2 — Choisis le bon outil** : 5 missions pour associer chaque besoin à sa famille d'IA (**IA Texte**, **IA Image**, **IA Audio**, **IA Voix**, **IA Vidéo**) + récapitulatif.
4. **Défi 3 — Les boucliers de sécurité** : 5 boucliers de protection et 8 situations (« Je peux le faire » / « Je dois faire attention ») + rappel visuel des 6 données personnelles à ne jamais partager.
5. **Défi 4 — Le pouvoir des prompts** : Comparaison de deux consignes (Prompt A vs Prompt B) et constructeur interactif de prompts (personnage, action, lieu, ambiance, style + idée libre) avec copie en un clic.
6. **Défi 5 — Crée ta mini-aventure illustrée** : Création d'une bande dessinée en 3 scènes (*Le début*, *Le problème*, *La solution*) avec bibliothèque locale d'illustrations cartoon originales, chargement local facultatif, téléchargement **PNG** et 3 questions de réflexion finale.
7. **Diplôme du Petit Explorateur de l'IA** : Célébration, récapitulatif des 5 compétences et téléchargement du diplôme au format paysage **PNG** (daté du **8 novembre 2026**).
8. **Espace accompagnateur** : Accessible depuis l'accueil et l'en-tête avec les objectifs pédagogiques, conseils d'accompagnement et grille d'observation interactive.

---

## 🔒 Confidentialité & Sécurité

- **Aucune inscription, aucune base de données, aucun backend, aucune clé API.**
- **Aucune collecte de données personnelles.**
- Toute la progression et les images éventuellement chargées restent **uniquement dans la mémoire du navigateur** pendant la session et sont effacées lors du rechargement ou de la fermeture.

---

## 🚀 Installation et utilisation en local

Prérequis : **Node.js 18+** et **npm**.

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Compiler la version de production (dans le dossier dist/)
npm run build

# 4. Tester la version de production localement
npm run preview
```

---

## 🌐 Publication sur GitHub Pages

### 1. Configuration du chemin (`vite.config.ts`)
Le fichier `vite.config.ts` utilise déjà `base: './'` (chemins relatifs). Cela signifie que l'application fonctionne **automatiquement** quelle que soit l'URL ou le nom de votre dépôt GitHub (par exemple `https://<votre-pseudo>.github.io/kaeloo-mission-ia/` ou à la racine d'un domaine personnalisé), sans aucune erreur de routage.

Si vous souhaitez fixer un sous-chemin explicite pour un dépôt nommé `mon-nouveau-depot`, vous pouvez modifier la propriété `base` dans `vite.config.ts` :

```ts
export default defineConfig({
  base: '/mon-nouveau-depot/',
  // ...
});
```

### 2. Déploiement automatique via GitHub Actions
Le fichier `.github/workflows/deploy.yml` est inclus et prêt à l'emploi :
1. Créez un dépôt sur GitHub (ex. `kaeloo-mission-ia`) et poussez le code sur la branche `main` :
   ```bash
   git init -b main
   git add .
   git commit -m "feat: application éducative KAELOO — MISSION IA"
   git remote add origin https://github.com/<VOTRE-COMPTE>/<NOM-DU-DEPOT>.git
   git push -u origin main
   ```
2. Sur GitHub, allez dans **Settings → Pages** et choisissez **Source : GitHub Actions** (ou hébergez directement le dossier compilé `dist/`).
3. À chaque `git push` sur `main`, le site est compilé et publié automatiquement !
