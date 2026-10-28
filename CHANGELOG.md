# Journal des versions — Séquenceur Rythmique

Toutes les modifications notables de l'application sont documentées ici.
La version en tête de fichier déclenche automatiquement la création de la release GitHub correspondante.

## v1.2 (2026-10-27)

Nouvelle fonctionnalité : **Annuler / Rétablir (Undo / Redo)** ↩️↪️

- Deux nouveaux boutons dans la barre de transport : **↩️ Annuler** et **↪️ Rétablir** (juste avant Reset), avec état grisé quand il n'y a rien à annuler/rétablir
- Raccourcis clavier universels : **Ctrl+Z** annule, **Ctrl+Y** ou **Ctrl+Shift+Z** rétablit (⌘ sur Mac) — sans interférer avec la saisie dans les champs texte
- Portée complète : cases et types de notes, accords, tempo, swing, boucles, presets, motif de batterie personnalisé (v1.1), chargement de slot, import JSON, réinitialisation — tout est annulable
- Jusqu'à **50 étapes** en mémoire ; les actions en rafale (glisser une note, appliquer un preset ou une progression) comptent comme **une seule étape** d'annulation
- Détection automatique et silencieuse : aucune action supplémentaire n'est demandée à l'utilisateur, l'historique se construit tout seul pendant qu'on joue
- L'état annulé/rétabli est immédiatement re-sauvegardé par l'auto-save : l'annulation survit à la fermeture du navigateur
- Amélioration furtive : l'annulation d'un motif de batterie personnalisé créé dans l'éditeur (v1.1) efface aussi correctement ce motif (gestion du cas « vide » dans les projets sauvegardés)

## v1.1 (2026-10-27)

Nouvelle fonctionnalité : **Éditeur de motifs de batterie** 🥁

- Nouveau bouton **✏️** à côté du menu « Motif de Batterie » : ouvre un éditeur visuel complet
- Grille de 3 instruments (Grosse Caisse, Caisse Claire, Charleston) × 32 pas, avec repères de temps et repères de croches pour ne pas se perdre
- Un seul clic par case : **note forte** → **note fantôme** (frappe légère) → **silence** — chaque frappe est jouée immédiatement pour un retour sonore naturel
- Bouton **▶ Écouter l'aperçu** : écoute en boucle du motif en cours d'édition, au tempo et avec le swing réglés dans l'application, avec curseur de pas lumineux
- Bouton **📥 Copier le motif actuel** : part d'un preset existant (Rock, Funk, Reggae…) et modifiez-le à votre façon
- Bouton **💾 Enregistrer & utiliser** : le motif devient l'entrée « ✨ Mon motif personnalisé » du menu de batterie et est joué par la lecture et l'export WAV
- Sauvegarde automatique dans le navigateur : le motif personnalisé survit à la fermeture de l'application
- Le motif personnalisé est inclus dans les projets sauvegardés et les exports JSON : il peut être partagé
- Compatible avec toutes les signatures (4/4, 3/4, 6/8, 12/8) : la grille s'adapte à la mesure en cours
- Fenêtre fermable par Échap, clic extérieur ou ✕ ; badge de version « v1.1 » visible dans l'en-tête de l'application

## v1.0 (2026-10-27)

Première version publiée sur GitHub — baseline officielle de l'application.

- Application complète reprise à l'identique du fichier standalone V51 (aucune modification du code)
- Mise en place du dépôt GitHub avec pipeline automatique complet :
  - Vérification des fichiers essentiels et de la syntaxe JavaScript à chaque dépôt
  - Test de démarrage de l'application dans un navigateur fantôme (Playwright)
  - Publication automatique en ligne sur GitHub Pages
  - Création automatique de la release téléchargeable dès qu'une nouvelle version est annoncée dans ce journal
- Documentation (README), licence MIT, icône de navigateur, test de démarrage automatisé
