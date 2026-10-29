# Journal des versions — Séquenceur Rythmique

Toutes les modifications notables de l'application sont documentées ici.
La version en tête de fichier déclenche automatiquement la création de la release GitHub correspondante.

## v1.3 (2026-10-30)

Nouvelle fonctionnalité : **Basse automatique suivant la grille d'accords** 🎸

- Nouvelle ligne « 🎸 Basse Automatique » dans les réglages, juste sous le Motif de Batterie : une **vraie ligne de basse synthétisée** accompagne le jeu en suivant **automatiquement les accords posés sur la grille** — aucun réglage note par note, la fondamentale (tonique) est déduite de chaque accord
- **3 modes de jeu au choix** :
  - **𝅗𝅥 Tonique tenue par mesure** : la fondamentale sonne au 1ᵉʳ temps de chaque mesure et se soutient jusqu'à la suivante — un ancrage harmonique posé, idéal pour travailler un rythme
  - **𝅘𝅥 Tonique à chaque temps** : la fondamentale marque tous les temps — un guide rythmique permanent, même sur une grille pleine de silences
  - **🤠 Tonique – Quinte alternée** : la classique basse alternée (tonique sur un temps, quinte sur le suivant) — un véritable accompagnement folk/country
- **Volume dédié** : un 5ᵉ curseur « Basse » rejoint le mixeur (Guitare, Basse, Batterie, Clic, Réverbe)
- La basse est **indépendante du rythme joué** : elle suit la grille d'accords et les temps, pas les cases — elle continue de guider même quand la grille est vide de notes
- **Aperçu immédiat** : changer un accord (mesure, temps ou pastille) fait instantanément entendre la basse correspondante sous l'accord de guitare
- Son grave réaliste (plage C2 → B2, comme le bas du manche d'une basse) : synthèse triangle + sinus avec filtre passe-bas chaud et enveloppe « pincée »
- La basse est incluse dans l'**export WAV**, respecte le tempo et le swing, est coupée net à l'arrêt de la lecture et lors des changements à la volée, sans jamais superposer de notes
- Elle **survit à la fermeture du navigateur** (auto-save) et **voyage dans les projets sauvegardés** (format 2.3 — les anciens fichiers restent 100 % compatibles)
- Le mode de basse est couvert par l'historique **Annuler/Rétablir** (Ctrl+Z)

Interface : **boutons Annuler / Rétablir épurés** ↩️↪️

- Les deux boutons de la barre de transport ne conservent désormais que leurs **icônes flèche** — les textes « Annuler » et « Rétablir » disparaissent au profit d'une barre plus compacte
- L'info-bulle au survol rappelle toujours l'action, le raccourci clavier et le nombre d'étapes en mémoire ; des libellés d'accessibilité (aria-label) sont ajoutés pour les lecteurs d'écran
- Aucun changement de comportement : Ctrl+Z / Ctrl+Y fonctionnent exactement comme avant

## v1.2.5 (2026-10-29)

Correction : **le glisser-déposer devient insensible au défilement de la page** 🖱️

- Un cas délicat du navigateur pouvait faire échouer un glisser-déposer : si la page défile entre le moment où l'on **appuie** sur un motif de la palette (molette effleurée par accident, pavé tactile sensible, case cible hors écran) et le début du glissement, le navigateur **abandonne silencieusement** le démarrage du déplacement — plus rien ne suit le curseur et le dépôt ne se fait pas, sans aucun message d'erreur
- Désormais, un **mécanisme de secours intégré** prend automatiquement le relais dans ce cas : un **fantôme du bouton** de la palette suit le curseur, la case survolée s'illumine en orange (même retour visuel que d'habitude), et le dépôt s'effectue normalement — y compris son annulation par **Ctrl+Z**
- Ce secours est **invisible quand tout se passe bien** : dès que le glisser-déposer standard du navigateur démarre (cas habituel), il s'efface et le comportement est strictement identique aux versions précédentes
- Un simple **clic** sur un motif de la palette reste un clic (aucun fantôme ne peut apparaître par erreur), et la touche **Échap** permet d'abandonner un glisser de secours en cours
- Fiabilisation au passage : le dépôt dans les vues Partition et Mixte reconnaît désormais la case visée **par ses coordonnées** en complément de l'élément survolé — plus robuste si un élément de décor s'interpose
- Aucun changement du moteur audio, du rendu de la partition (triolet v1.2.4 inchangé) ni du format de sauvegarde

## v1.2.4 (2026-10-29)

Amélioration : **le triolet est maintenant dessiné comme sur une vraie partition** 🎼

- Jusqu'ici, le triolet apparaissait dans la portée comme une simple note surmontée d'un petit « 3 » peu lisible
- Désormais, le triolet est noté selon la convention musicale : **les 3 notes sont reliées par une ligature continue** qui traverse tout le temps, et le chiffre **« 3 » en italique est placé au-dessus du groupe**, bien visible
- La ligature du triolet se place à la même hauteur que les barres de ligature des temps voisins, et les 3 têtes de notes restent alignées sur la ligne de portée comme les autres figures ; le dessin s'adapte à la largeur réelle du temps (aucun étirement)
- Correction importante au passage : **en thème Studio, toutes les notes de la portée étaient bleu nuit sur le fond sombre** — crochets, demi-ligatures, triolet et têtes de notes étaient presque invisibles (c'est ce qui rendait la distinction croche / double croche si difficile à voir). Elles sont maintenant **blanches comme les barres de ligature** du thème
- Le dessin du triolet suit le thème actif (Studio en blanc, Vintage en doré, Neon en cyan), et le rendu vaut pour les vues **Partition** et **Mixte**
- L'ancien petit « 3 » sous la note (v1.2.3) disparaît au profit de cette notation complète
- Aucun changement du moteur audio (le triolet sonne toujours 3 frappes régulières), ni du format de sauvegarde

## v1.2.3 (2026-10-29)

Corrections : **thème Vintage / Neon — la double barre des doubles croches était invisible** 🎨

- Sur les thèmes **Vintage** et **Neon**, la 2ᵉ barre de ligature d'un groupe de doubles croches gardait une couleur bleu nuit codée en dur, invisible sur le fond sombre : le groupe de doubles croches paraissait identique à un groupe de croches (le thème Studio, par défaut, n'était pas concerné)
- La 2ᵉ barre hérite désormais automatiquement de la couleur de la barre du thème actif (dorée en Vintage, cyan en Neon) — le réglage est valable pour tous les thèmes actuels et futurs
- **Le triolet est maintenant marqué d'un « 3 »** sous la note dans la portée de la partition : auparavant il se dessinait comme une noire ordinaire, impossible à reconnaître
- Les correctifs v1.2.2 (crochets des notes isolées, demi-ligatures) s'appliquaient déjà sur ces thèmes : seule la double barre et le triolet faisaient défaut
- Aucun changement du moteur audio ni du format de sauvegarde

## v1.2.2 (2026-10-29)

Correction : **Croche et double croche maintenant bien distinctes** 🎼

- Dans la portée de la partition, les deux notes étaient dessinées avec le même symbole : impossible de les distinguer
- **Double croche seule dans son temps** : elle reçoit désormais ses **2 crochets** caractéristiques (la croche n'en a qu'un)
- **Double croche dans un groupe mixte** (ex : double-double-croche, syncopette, shuffle) : elle reçoit une **demi-ligature** (petit second trait horizontal sur la hampe, orienté vers la double croche voisine), comme dans une vraie partition — le groupe 100 % double croches garde sa double barre complète
- Bonus au passage : la croche pointée isolée affiche maintenant son crochet (elle ressemblait à une noire pointée)
- Les notes fantômes (×), silences, accents et le reste du rendu sont inchangés
- Aucun changement du moteur audio ni du format de sauvegarde

## v1.2.1 (2026-10-28)

Correction : **Glisser-déposer disponible dans toutes les vues** 🖱️

- Jusqu'ici, déposer un motif de la palette (Noire, Croche, Triolet…) sur une case ne fonctionnait qu'en vue « Grille Séquenceur »
- Désormais, le glisser-déposer fonctionne aussi dans les vues **Partition** (vue par défaut) et **Mixte** : déposez un motif directement sur la portée rythmique ou sur la tablature
- Retour visuel : la case survolée s'illumine en orange pendant le glissement, pour voir exactement où la note va atterrir
- L'info-bulle des cases de partition mentionne désormais le glisser-déposer
- Compatibilité Annuler / Rétablir (v1.2) : un dépôt accidentel s'annule avec Ctrl+Z comme n'importe quelle autre action
- Aucun changement du moteur audio ni du format de sauvegarde

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
