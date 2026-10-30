# 🎸 Séquenceur Rythmique

Séquenceur rythmique guitare, métronome et batterie avec horloge Web Audio haute précision.
Application 100 % autonome : un seul fichier, aucune installation, fonctionne hors-ligne.

**▶ Ouvrir l'application en ligne :** <https://fab6792.github.io/sequenceur-rythmique-Z/>

---

## Fonctionnalités principales

- **Séquenceur pas-à-pas** (résolution double-croche) : 1 à 12 mesures, signatures 4/4, 3/4, 6/8, 12/8, boucle A/B, swing, liaison, triolets, ghost notes, vélocité
- **Batterie synthétisée** : 8 motifs studio (rock, funk, blues, reggae, bossa…) + **éditeur de motifs personnalisés** (v1.1) : créez votre propre motif sur grille 3 instruments × 32 pas, avec notes fortes/fantômes, aperçu audio et sauvegarde automatique
- **Basse automatique** (v1.3) : une vraie ligne de basse qui suit la grille d'accords sans aucun réglage — tonique tenue par mesure, tonique par temps ou basse alternée tonique-quinte, avec volume dédié et inclusion dans l'export WAV
- **Statistiques de pratique** (v1.4) : bouton 📊 dans la barre de transport — temps de jeu (jour / 7 jours / total), BPM maximum tenu 10 s consécutives (avec toast de record), série de jours 🔥, graphique des 14 derniers jours et historique des 20 dernières séances, comptés automatiquement pendant la lecture et conservés sur l'appareil
- **Annuler / Rétablir** (v1.2) : Ctrl+Z / Ctrl+Y (ou boutons ↩️/↪️ de la barre de transport) — jusqu'à 50 étapes, portant sur tout : cases, accords, tempo, motifs de batterie, slots, imports
- **Guitare synthétisée** : 4 profils sonores (Folk, Clean, Jazz, Crunch lampe), médiator réglable, fingerpicking P-I-M-A, réverbe studio
- **Métronome avancé** : unités multiples, Gap Click (travail du tempo intérieur), Speed Trainer (accélération progressive), décompte
- **Manche interactif 24 cases** : notation notes ou degrés, banque d'accords, ~50 gammes et modes, mode entraînement (quiz notes, degrés, dictée à l'oreille)
- **Vue Partition / Tablature** avec diagrammes d'accords et impression PDF
- **Exports** : WAV studio, JSON (séquence et banque de 10 slots), impression
- **4 thèmes visuels** + mode sombre, raccourcis clavier complets

## Structure du dépôt

| Élément | Rôle |
|---|---|
| `index.html` | L'application complète (fichier unique, source de vérité) |
| `favicon.ico` | Icône de l'onglet du navigateur |
| `CHANGELOG.md` | Journal des versions (la version en tête déclenche la release) |
| `README.md` | Ce fichier |
| `LICENSE` | Licence MIT |
| `.github/workflows/pipeline.yml` | Le robot d'automatisation (vérification, test, publication, release) |
| `tests/smoke.mjs` | Test de démarrage exécuté par le robot |
| `docs/` | Copie de secours du pipeline (si besoin de la recoller manuellement) |

## ⚙️ Le robot automatique (que se passe-t-il à chaque dépôt ?)

À chaque fois qu'une version est déposée sur la branche `main`, GitHub exécute le pipeline :

1. **Vérification** — contrôle que les fichiers essentiels sont là et que le JavaScript est valide
2. **Test fantôme** — un navigateur sans écran ouvre l'application et vérifie qu'elle démarre sans erreur
3. **Publication** — l'application est mise en ligne sur <https://fab6792.github.io/sequenceur-rythmique-Z/>
4. **Release** — si la version en tête de `CHANGELOG.md` est nouvelle, une release archivée est créée avec le fichier de l'app en pièce jointe

Résultat visible dans l'onglet **Actions** du dépôt (coche verte ✔ = tout va bien).

## 📦 Publier une nouvelle version (méthode navigateur, sans logiciel)

1. Recevoir le dossier de la nouvelle version, le décompresser
2. Ouvrir le dépôt sur github.com → bouton **Add file** → **Upload files**
3. Glisser-déposer le **contenu** du dossier (tous les fichiers et sous-dossiers)
4. Écrire un court message (ex. `v1.2 — Annuler/Rétablir`) → **Commit changes**

⚠️ Deux règles simples :
- Si un fichier doit être **supprimé**, le faire à la main dans le dépôt (ouvrir le fichier → icône corbeille)
- Le **numéro de version en tête de `CHANGELOG.md`** doit être augmenté à chaque nouvelle version — c'est lui qui déclenche la création de la release automatique

## 🗺️ Feuille de route

| Version | Contenu |
|---|---|
| v1.0 | Mise en place du dépôt et du pipeline (application inchangée) |
| v1.1 | ✅ Éditeur de motifs de batterie (grille personnalisée, aperçu, sauvegarde) |
| v1.2 | ✅ Annuler / Rétablir (Ctrl+Z / Ctrl+Y, 50 étapes, portée totale) |
| v1.3 | ✅ Basse automatique suivant la grille d'accords (3 modes, volume dédié) |
| v1.4 | ✅ Statistiques de pratique (temps de jeu, BPM max tenu, série de jours, historique des séances) |
| À venir | Mode application installable (PWA, hors-ligne complet) |

## Licence

Projet sous licence MIT — voir `LICENSE`.
