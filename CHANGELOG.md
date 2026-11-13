# Journal des versions — Séquenceur Rythmique

Toutes les modifications notables de l'application sont documentées ici.
La version en tête de fichier déclenche automatiquement la création de la release GitHub correspondante.

## v1.8.8 (2026-11-12)

Deux nouveautés validées ensemble : les **groupes de double-croches** et la section **« Autres noms possibles »** de l'analyseur

**Point 1 — Espacement des groupes (variante V2 « paires + croches »)**
- **Vue Partition comme vue Grille** : les **paires de 2 cases** (double-croches) se détachent par un petit espace (5 px), les **groupes de 4 cases** (croches) encore davantage (10 px) — la mesure se lit par groupes, comme sur une partition papier
- Les traits pointillés uniformes entre chaque double-croche (v1.8.7) disparaissent : la hiérarchie vient de l'espacement, les **barres de temps** restent en place
- Les **en-têtes** de temps et de médiator suivent le même espacement ; en **mobile**, espaces réduits (3 px / 6 px) pour que les cases gardent leurs 26 px minimum
- Cohérent dans les **5 thèmes** ; desktop inchangé sinon

**Point 2 — « Autres noms possibles » (analyseur d'accords)**
- La liste des lectures alternatives devient une **liste plate claire** dans un encadré violet : chaque nom est cliquable pour changer de lecture, et **la note après le « / » est toujours votre basse réelle** (aucun « / » quand votre basse est la fondamentale de la lecture)
- **Deux familles ajoutées** : **7sus2** (votre x35333 se nomme enfin **C7sus2** — votre Do devient la fondamentale, fini le renversement « Bb6/9/C » qui ne disait rien de votre basse) et **m(add11)** — chacune avec sa ligne **📐 Formule**
- **Nouvelle règle d'altération** : quand la lecture honorant votre basse laisse exactement une note « à côté », le nom la mentionne — votre x34333 s'appelle **C7sus2(#11)** : le Fa# est la **11e augmentée** (♯11), car Sol la quinte est jouée ; l'avertissement orange et la puce degré (« F# #11 ») emploient le même libellé
- Catalogue vérifié sur **27 doigtés de référence** : seuls les accords concernés changent de nom, les 8 accords du test verrouillé restent identiques

**Rigueur, comme d'habitude**
- Les règles sont exactement celles des maquettes que vous avez essayées (variante V2, liste plate v4) — rien d'autre n'a changé
- Test CI étendu (bloc 18) : x35333 → C7sus2 (exact, sans avertissement), x34333 → C7sus2(#11) avec « F# (#11) » annoncé, espacement réel vérifié en vue grille (5 px / 10 px) et en partition, pointillés uniformes bien supprimés — tout est vert en local

## v1.8.7 (2026-11-10)

Deux améliorations validées ensemble : les **barres de temps** et le **mobile compact**

**Point 2 — Barres de temps (maquette A, votre choix)**
- **Vue Partition** : une barre verticale appuyée traverse les lignes de la mesure **à chaque temps** (bleu en jour, cyan en Studio/Sombre, ambre en Vintage, turquoise en Neon), et les étiquettes **Temps 1…4** sont mises en valeur en pastille
- **Vue Grille** : même barre appuyée au début de chaque temps, et des **traits pointillés pâles** entre chaque double-croche — chaque temps respire, lecture « papier musicologique »
- Les double-croches de la portée sont aussi séparées par le même pointillé léger
- Cohérent dans les **5 thèmes**, desktop inchangé sinon

**Point 3 — Mobile compact (maquette C)**
- Votre retour : « les bandeaux scotchés masquent la mesure, même en paysage ». Corrigé :
- **Transport** sur **une seule ligne qui défile** horizontalement (plus d'empilement en 5 rangées) ; **palette des notes** sur une ligne qui défile (~40 px au lieu d'un tiers d'écran)
- **La mesure respire** : cases au moins **26 px** de large avec défilement horizontal par mesure — environ **11 cases visibles** en portrait (avant : cases écrasées), et environ **26 cases** en paysage (avant : **0** !)
- S'applique aux écrans ≤ 720 px de large **ET** aux écrans plats en hauteur (≤ 500 px : téléphone en paysage). **Desktop strictement inchangé**
- Les signatures 3/4, 6/8 et 12/8 restent correctes : le nombre de colonnes suit toujours la signature

**Rigueur, comme d'habitude**
- Les règles sont exactement celles des maquettes que vous avez essayées — rien d'autre n'a changé (la variante B « bandes alternées » n'est pas retenue, elle reste disponible si vous changez d'avis)
- Test CI étendu (bloc 17) : règles embarquées dans la feuille de style (barres de temps partition + grille, media query mobile) et vérification réelle sur un écran de téléphone (390 px : transport sur une ligne, cases ≥ 26 px) — tout est vert en local

## v1.8.6 (2026-11-10)

La bascule ♯/♭ est enfin **visible partout** — plus besoin de passer par l'analyseur

**Ta demande, réalisée**
- « je ne vois pas comment on fait la bascule entre # et bémol ? il n'y a que le sélecteur présent dans l'analyseur, je ne peux pas choisir dans la bibliothèque ni dans le sélecteur d'accord » : compris et corrigé. La même pilule ♯ / ♭ (même style violet que l'analyseur) apparaît maintenant à **deux endroits supplémentaires** :
  - **Bibliothèque d'accords** : en tête de la barre de navigation, à gauche des sélecteurs fondamentale × type ;
  - **Popover « Modifier l'accord du pas »** : dans l'en-tête, juste à côté du bouton ✕.
- **Un seul réglage global** : cliquez ♭ n'importe où (analyseur, bibliothèque ou popover) → sélecteurs de tonique, titres de fenêtres, diagrammes, renversements, pastilles d'accords fréquents et banque complète basculent **instantanément**, partout en même temps — et le réglage reste mémorisé comme avant
- Au démarrage, les pilules affichent directement l'orthographe mémorisée (♯ ou ♭) — plus aucune surprise
- Mode ♯ (défaut) : strictement rien ne change pour l'affichage existant

**Rigueur, comme d'habitude**
- Les 3 paires de boutons (analyseur, bibliothèque, popover) partagent **une seule fonction** de synchronisation : impossible qu'elles se contredisent
- Test CI étendu (bloc 16) : pilules présentes aux 2 nouveaux emplacements (4 boutons, pilule du popover bien placée avant ✕), clic ♭ **dans la bibliothèque** → réglage mémorisé + pilule du popover synchronisée, clic ♯ **dans le popover** → retour global instantané — tout est vert en local

## v1.8.5 (2026-11-09)

Correctif : plus aucun **doublon** dans la banque complète d'accords en mode ♭

**Ta remarque, corrigée**
- « la liste initiale incluait bien tous les accords avec les # et les bémols. Maintenant si je passe en bémol, j'ai deux fois les accords » : compris — la banque énumérait les deux orthographes (C# **et** Db, qui partagent exactement le même doigté) et la conversion en mode ♭ renommait les deux « Db » → doublons Db, Db, Eb, Eb, Gb, Gb…
- **En mode ♭**, chaque accord n'apparaît plus qu'une fois, en orthographe bémol : C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B — aucune perte possible, les deux orthographes donnent le même son et le même doigté
- **En mode ♯ (défaut)** : la liste reste **exactement celle d'origine** — C# et Db continuent d'y figurer toutes les deux, comme depuis le début
- L'accord courant reste bien **sélectionné** dans la liste, quel que soit le mode ou l'orthographe sous laquelle il a été posé (C# posé en ♯ reste retrouvé après un passage en ♭)

**Rigueur, comme d'habitude**
- Test CI étendu (bloc 15) : en ♯, les 17 orthographes d'origine des majeurs sont intactes et sans doublon ; en ♭, plus aucune valeur dupliquée dans toute la liste, 12 majeurs en orthographe bémol, Gbm présent dans la banque ; l'accord posé (Gbm) reste sélectionné à la réouverture — tout est vert en local

## v1.8.4 (2026-11-09)

La bascule ♯/♭ de la v1.6.2 **quitte l'analyseur** : elle s'applique maintenant à **toute l'application**

**Ta demande, réalisée**
- « On ne retrouve la bascule ♯/♭ que dans l'analyseur, il faut l'étendre à la bibliothèque et aux accords fréquents » : fait. Les boutons ♯ / ♭ de l'analyseur deviennent le réglage global de l'orthographe des accords — un seul réglage pour tout, mémorisé comme avant
- **Bibliothèque d'accords** : le sélecteur de tonique (Db, Eb, Gb, Ab, Bb en mode ♭), le titre de la fenêtre, les noms des diagrammes (Dbm7 — case 4…) et les renversements (Dbm/Gb, basse Gb…) suivent le réglage — et si la bibliothèque est ouverte pendant la bascule, tout se réaffiche instantanément
- **Accords fréquents** (popover d'un pas) : en mode ♭ la pastille F#m s'affiche Gbm et pose réellement un Gbm (le moteur, la tablature et la bibliothèque reconnaissent les deux orthographes depuis longtemps) ; la banque complète propose les mêmes noms convertis, et le titre du popover suit aussi
- Mode ♯ (défaut) : strictement rien ne change — le comportement d'aujourd'hui est conservé à l'identique

**Rigueur, comme d'habitude**
- Le son reste juste dans tous les cas : si un nom converti n'existait pas dans le moteur, c'est l'orthographe canonique qui est appliquée en silence (aucun accord muet possible)
- Test CI étendu (bloc 14) : pastille F#m → Gbm en mode ♭, titre de bibliothèque C#m → Dbm, sélecteur F# → Gb, cartes converties, retour ♯ instantané dans la bibliothèque ouverte, banque du popover proposant bien l'option Gbm — tout est vert en local

## v1.8.3 (2026-11-06)

Le bouton 📚 Biblio. se comporte **exactement comme Tab et Fig.** — et plus aucun bouton noir dans les thèmes sombres

**Ta remarque, corrigée**
- « Je voyais plutôt le même style que les boutons Tab et Fig., en fonction du mode d'affichage » : compris — la couleur ambre de la v1.8.2 s'efface. Le bouton 📚 Biblio. appartient maintenant à la même famille que 🎸 Tab et 📐 Fig. : éteint au repos, **illuminé en bleu quand la bibliothèque est ouverte**, éteint à nouveau à la fermeture (bouton Fermer ou touche Échap) — le même cycle que les toggles d'affichage
- Bonus cohérence : les toggles **éteints** restent maintenant lisibles dans tous les thèmes sombres (Studio, Sombre, Vintage, Neon) — Tab, Fig. et Biblio. éteints partagent le même gris-bleu lisible ; fini le point noir signalé au départ

**Rigueur, comme d'habitude**
- Test CI étendu : le bouton porte bien la classe commune aux toggles (même style que Tab/Fig.), il est éteint au démarrage, illuminé exactement comme Tab quand la bibliothèque s'ouvre (mêmes couleurs calculées), et retourne au repos à la fermeture — tout est vert en local

## v1.8.2 (2026-11-06)

Retouches d'interface : **le tempo sort des réglages** 🥁 et le bouton Bibliothèque quitte le noir 📚

**Vos deux demandes, corrigées**
- « Le bouton de la bibliothèque dans le même style que les autres (actuellement noir) » : bien vu — le bouton 📚 Biblio. de la ligne de partition gardait dans les thèmes sombres (Studio, le thème par défaut) le style « toggle non actif » : fond quasi noir, texte terne. Il adopte désormais la **couleur ambre de la bibliothèque** — la même que le popover d'accord, l'analyseur et la section 5 de l'aide — et reste lisible dans les 5 thèmes : Clair, Studio (défaut), Vintage, Neon et sombre
- « Retrouver le réglage du tempo dans la barre de lecture » : le bloc **🥁 − 120 BPM +** s'installe au centre de la barre de transport, entre ⏳ et le chronomètre : glissez le curseur pour un réglage fin, cliquez **−** / **+** pour ±1 BPM (Maj = ±5, comme au clavier), et la touche **T** reste le Tap Tempo. Le curseur BPM du panneau réglages reste en place, et tout reste **synchronisé dans les deux sens** : curseur transport ↔ réglages, Tap Tempo, raccourcis clavier + / −, chargement d'un projet JSON, réinitialisation

**Rigueur, comme d'habitude**
- Test CI étendu : le bloc 🥁 est présent, le curseur du transport répercute bien 95 BPM sur tous les affichages (label transport, label et curseur des réglages), les boutons − / + fonctionnent, et le bouton Biblio. est bien ambre en thème Studio et en thème clair — tout est vert en local
- Aide mise à jour : bandeau « Guide à jour de la v1.8.2 », nouveau point « Tempo à portée de main » dans la section Barre de Transport

**Et la suite**
- La traduction anglaise (v1.9.0) attend comme convenu ; vos observations sont notées au passage : des éléments restent à traduire autour du manche, dans le bandeau des notes et dans la table des raccourcis — ils rejoindront le dictionnaire

## v1.8.1 (2026-11-06)

Guide d'utilisation : **l'aide rattrape l'application** 📖 — tout ce qui a été construit de la v1.2 à la v1.8 est enfin documenté

**Pourquoi cette version**
- Ta remarque : « il faut mettre à jour le fichier d'aide qui n'a pas été révisé depuis longtemps ». Vérification faite : l'aide s'arrêtait aux fonctions d'origine — ni un mot sur Annuler/Rétablir, la basse automatique, les statistiques, la partition imprimable, la bibliothèque d'accords XL ni l'analyseur inversé

**Quatre nouvelles sections dans l'aide (bouton ❓)**
- 📚 **5. Bibliothèque d'accords** : 44 familles × 12 tonalités (~8 000 diagrammes audités), navigation tonalité → famille, descriptions de familles (mMaj7 « min-Maj », 7 « Maj-Min »), notes et degrés sous chaque corde, zoom au survol, difficultés, « cliquez, écoutez, appliquez »
- 🔍 **6. Analyseur d'accords** : le principe inversé (posez vos doigts, l'app devine), la **priorité à la basse** (x8888x → F9sus4, x3x355 → C13), les lectures alternatives, la 📐 formule, les boutons 🔊 Écouter / 📥 Accord actuel / 🧹 Effacer
- 📜 **7. Mode Partition & Tablature** : les 3 vues (Grille / Partition / Mixte) et l'impression papier-PDF
- 📊 **11. Statistiques de pratique** : temps de jeu des 14 derniers jours, 100 % local, jamais envoyé nulle part

**Mises à jour des sections existantes**
- Section 1 : **Annuler / Rétablir** (boutons ↩️ / ↪️, Ctrl+Z / Ctrl+Y) rejoint les gestes de base
- Section Outils : la **basse automatique** documentée (tonique tenue par mesure, tonique à chaque temps, tonique–quinte alternée, volume dédié, incluse dans l'export WAV) ; l'export JSON précise qu'elle voyage avec le projet
- Table des raccourcis : **Ctrl+Z / Ctrl+Y** ajoutés ; sections renumérotées proprement de 1 à 13 ; bandeau « Guide à jour de la v1.8.1 » en tête de modale

**Rigueur, comme d'habitude**
- Test CI étendu : la modale d'aide doit contenir les 9 marqueurs des nouvelles sections et renumérotations — tout est vert en local

## v1.8.0 (2026-11-06)

Analyseur d'accords : **la priorité à la basse tient aussi en jazz — 20 familles ajoutées à la reconnaissance** 🎺 et chaque famille de la bibliothèque explique maintenant ce qu'elle est

**Ta remarque, corrigée**
- « Il semble que la priorité à la basse ne soit pas toujours respectée dans l'analyseur » : bien vu — le barré x8888x (F, Bb, Eb, G, C) renvoyait « Eb6/9/F » alors que F est à la basse. La cause : la lecture **F9sus4** — parfaitement exacte, fondamentale à la basse — n'existait pas dans les formules de l'analyseur, qui ne connaissait que 26 familles contre 44 à la bibliothèque. Faute de vraie famille, la règle « fondamentale à la basse gagne » ne pouvait pas s'appliquer
- Réparé : l'analyseur connaît désormais **toutes les 44 familles** de la bibliothèque (+ mMaj9 et dim, analyseur seul). Résultat : x8888x → **F9sus4** ; le voicing sans fondamentale x3x355 (C Bb E A) → **C13** ; les voicings rootless de m11, m13, Maj13, 13♭9, 7♭9♭13… sont enfin nommés à leur juste nom
- Le classement reste le même : lecture exacte d'abord, fondamentale à la basse ensuite (+50 pour un renversement), famille la plus fondamentale en dernier critère — mais maintenant avec toutes les familles en lice

**Couverture jazz, vérifiée**
- Audit automatique du vocabulaire jazz courant (43 familles : Maj7/9/13, Maj7♯11, Maj7♯5, m7/m9/m11/m13, m6, m6/9, mMaj7, mMaj9, 6/9, 7/9/13, 13♭9, 9/13, 7♭9, 7♯9, 7♭5, 7♯5, 7♯11, 7♭13, 7♭9♭13, 7sus4, 9sus4, 13sus4, 7♭9sus4, m7♭5, m7♭5(11), dim7, aug…) : **44/44 familles reconnues par l'analyseur et disponibles dans la bibliothèque**
- 10 voicings jazz réels testés case à case (barré F9sus4, C13 sans fondamentale, EmMaj7, Dm11, Cm9, CMaj9, CMaj13, BbMaj7♯11, CmMaj9, Cm11) : tous nommés avec leur fondamentale à la basse
- Choix assumés, comme dans les recueils jazz : le « 11 » se joue et s'écrit 9sus4 (ou basse décalée), le « 7 altéré » se prend en 7♯9 / 7♭9♭13 / 7♯5, le 13♯11 se voix avec 7♯11 — le catalogue ne les duplique pas

**Et chaque famille a son explication**
- Une **ligne descriptive** sous le titre de la page bibliothèque : C mMaj7 affiche « Accord « min-Maj » : triade mineure + 7e majeure — la couleur « James Bond » », C7 affiche « Accord « Maj-Min » : triade majeure + 7e mineure — la dominante qui appelle la tonique » — les **44 familles** ont leur description
- La même explication en **info-bulle** au survol de chaque option du menu (44/44), et l'**analyseur** affiche « 📐 Formule : … » sous le nom identifié (testé avec EmMaj7 posé au manche)

**Rigueur, comme d'habitude**
- Test CI étendu : 44/44 info-bulles, descriptions « min-Maj » / « Maj-Min », EmMaj7 + formule, x8888x → F9sus4, x3x355 → C13, régressions Am / C6/9 / accord sans quinte / C6 / bémols, audit harmonique des 7 993 diagrammes — tout est vert en local

## v1.7.0 (2026-11-06)

Bibliothèque d'accords : **toutes les combinaisons possibles — 44 familles** 🎸 (les accords 6/9 quittent l'analyseur et entrent dans la bibliothèque)

**Ta remarque, corrigée**
- « La bibliothèque ne contient pas les accords 6/9, on ne les trouve que dans l'analyseur » : réparé — la bibliothèque passe de 16 à **44 familles**, avec le même catalogue de diagrammes que le reste de l'application (⭐ Must Know, 🔒 Moveable, positions ouvertes, renversements). Le doigté 6/9 reconnu par l'analyseur ouvre maintenant une vraie page C6/9 (14 diagrammes pour le seul Do, position ouverte x32030 comprise)

**Les 28 nouvelles familles**
- **Sixtes** : 6/9, m6/9 — **Triades** : Sus2, aug, m(add9)
- **Sus étendus** : 9sus4, 7sus4, 13sus4, 7♭9sus4
- **Dominantes altérées** : 7♭9, 7♯9, 7♭5, 7♯5, 7♯11, 7♭13, 7♭9♭13
- **Treizièmes** : 13, 13♭9, 9/13 — **Tensions mineures** : m11, m13, m7♭13, m7♭5(11)
- **Tensions majeures** : Maj13, Maj7♯11, Maj7♯5, Maj9/13 — plus la couleur dim7♭13
- Le menu déroulant de type est désormais **groupé** (Essentiels, Sixtes, Sus étendus, Dominantes altérées, Treizièmes, Tensions mineures, Tensions majeures…) : les 16 familles d'origine restent en tête, dans le même ordre qu'avant

**Rigueur, comme d'habitude**
- Chaque diagramme est vérifié **note à note** : la note jouée doit correspondre exactement au degré annoncé sous la corde — audit automatique sur **7 993 diagrammes** (44 familles × 12 tonalités × leurs sections), **0 défaut**
- Les étiquettes de degrés affichent les vraies tensions : un 7♭9 montre « b9 » (et non « b2 »-ish), un 7♯11 montre « #11 », un 13 montre « 13 » — la fondamentale reste en ambre
- Un accord appliqué au temps sélectionné (✔) sonne juste même pour les nouvelles familles : la position principale vient du catalogue (ex. C6/9 = x32233, C13 = x3x355, Dm11 = x5x563)
- Légende des degrés de l'analyseur complétée (11 = onzième, 13 = treizième)
- Test CI étendu : le 6/9 de l'analyseur doit s'ouvrir dans la bibliothèque, et l'audit harmonique des 44 familles doit passer — tout est vert en local

## v1.6.2 (2026-11-05)

Analyseur d'accords : **la quinte facultative partout + la lecture ♯/♭** 🎯 — et le bouton ⏳ qui montre enfin son état

**Tes trois remarques, corrigées**
- « Un accord sans sa quinte reste le même accord » : tu as raison, et la règle est désormais **générale** — la quinte est facultative dans **toutes** les familles qui en contiennent une (majeur, mineur, 6, m6, sus2, sus4, add9, m(add9), 7sus4, mMaj7, en plus des 7/9/Maj9/m9/6/9 déjà assouplies en v1.6.1). Le doigté Do–Mi–Do (x32x1x) s'affiche « **C** » au lieu de « ? », un La–Do–Si sans Mi reste « Am », un Cadd9 sans Sol reste « Cadd9 ». Seules exceptions, volontaires : le power 5 et les familles à quinte altérée (dim, m7b5, 7b5, 7♯5, aug), dont la quinte (diminuée ou augmentée) fait partie de l'identité
- Nouvelle **bascule ♯/♭** dans le panneau de l'analyseur : le même doigté se lit **D♯** (notation dièses, défaut, cohérente avec la bibliothèque) ou **Eb** (notation bémols) — comme D♯ = Eb, c'est le même accord sous deux orthographes. Le choix est **mémorisé** d'une session à l'autre et s'applique partout : nom principal, renversement, notes sous le manche et lectures alternatives
- Le bouton **⏳ Décompte** restait identique allumé ou éteint dans les thèmes Studio, Vintage et Neon : les surcharges de boutons de ces thèmes écrasaient son état actif (le thème clair, lui, fonctionnait). Corrigé : il s'allume **bleu ciel / ambre / cyan** (selon le thème) quand le décompte est armé, et reste discret sinon — comme dans le thème clair

**Au passage, dans l'analyseur**
- La **fondamentale à la basse l'emporte désormais systématiquement** sur un renversement : l'ancien bonus basse était plus faible que l'écart de priorité entre familles, et le doigté ouvert de C6 (x3221x) était lu « Am/C ». Il s'affiche « **C6** » ; la lecture Am reste proposée d'un clic dans « Aussi possible », où l'on retrouve le renversement « Am/C » et sa mention « Do à la basse »
- Une lecture qui laisse une note de côté (aucune famille exacte ne convient) est signalée « **lecture approchée** » avec la ou les notes en cause, au lieu d'être présentée sans explication
- Test automatique étendu : C sans quinte → « C », doigté ouvert de C6 → « C6 » (et non Am/C), doigté x6888x → « Eb » en notation bémols

Aucun changement du moteur audio, du format des projets (2.3), des raccourcis clavier ni des thèmes.

## v1.6.1 (2026-11-05)

Analyseur d'accords : **le doigté standard du C6/9 reconnu** 🎯 — et sa lecture « Am/C » corrigée

**Le bug signalé**
- Le doigté classique du C6/9 (**x 3 2 2 3 x** — cordes 5-4-3-2, cases 3-2-2-3) était lu « **Am/C** » : l'analyseur exigeait la quinte (Sol) pour la famille 6/9, or ce doigté de référence sonne Do–Mi–La–Ré **sans** Sol — comme tous les doigtés de 6/9 des recueils, où la quinte est volontairement omise
- C'est réparé : la quinte est désormais **facultative** dans la famille 6/9 (comme elle l'était déjà pour les 7, 9, Maj9 et m9), donc « C6/9 » s'affiche en lecture principale, avec ses degrés exacts (C 1 · E 3 · A 6 · D 9)

**Ce qui ne change pas**
- Un vrai Am/C (triade La–Do–Mi avec Do à la basse, sans le Ré) reste lu « Am/C » : la quinte reste obligatoire pour les familles 6 et mineures — seule la 6/9 est assouplie
- Le test automatique de l'intégration continue pose maintenant aussi le doigté x3223x sur le manche de l'analyseur et vérifie que « C6/9 » est reconnu, pour que ce cas ne revienne plus

Aucun changement du moteur audio, du format des projets (2.3), des raccourcis clavier ni des thèmes.

## v1.6.0 (2026-11-05)

Analyseur d'accords : **la recherche inversée** 🔍 — pose tes doigts sur le manche, l'appli devine l'accord

**La nouvelle fenêtre 🔍 Analyseur**
- Le chemin inverse de la bibliothèque : au lieu de partir du nom de l'accord, tu poses tes doigts et l'analyseur nomme l'accord — parfait pour identifier un doigté trouvé dans un tab ou un songbook
- Un manche interactif (6 cordes × 12 cases, sillet en haut, repères de position) : clique sur une **case** pour y poser une note (re-clique pour la retirer), sur **○** pour une corde à vide, sur **×** pour l'étouffer — chaque note posée s'entend immédiatement
- Le nom de l'accord s'affiche en direct, avec le **renversement** quand la basse n'est pas la fondamentale (Am/C, G/B…) et la mention « Do à la basse »
- **Lectures alternatives cliquables** : les ambiguïtés classiques sont assumées et tranchées par la basse — Am7 ↔ C6, Sus4 ↔ Sus2 renversé, les 4 noms équivalents d'un dim7 ; un clic suffit pour changer de lecture, les degrés suivent
- **26 familles reconnues** : les 16 familles de la bibliothèque + sus2, 7sus4, 6/9, m(add9), dim, aug, 7b5, 7#5, 7b9 et le 7#9 « Hendrix » (détecté dès que la tierce et le ♯9 sonnent ensemble)
- Sous le manche : la **note jouée** par corde ; dans le panneau : notes + **degrés** avec la convention v1.5.3 (3m = tierce mineure, 7M = septième majeure, bb7 pour la septième diminuée du dim7, #9 en couleur)
- 🔊 **Écouter** joue les notes exactes posées sur le manche (moteur audio de l'appli), 📚 **Bibliothèque** envoie le résultat vers le catalogue de diagrammes (si la famille y figure), 📥 **Accord actuel** recharge le doigté de l'accord du temps sélectionné, 🧹 **Effacer** remet le manche à zéro
- Points d'entrée : bouton **🔍 Analyseur** dans la barre du manche et bouton 🔍 dans le pied de la bibliothèque d'accords ; fermeture par Échap, clic à l'extérieur ou bouton Fermer
- Test automatique étendu : le test fantôme de l'intégration continue pose un Am sur le manche de l'analyseur et vérifie que l'accord est reconnu

Aucun changement du moteur audio, du format des projets (2.3), des raccourcis clavier ni des thèmes.

## v1.5.3 (2026-11-05)

Bibliothèque d'accords : **8 nouvelles familles + le catalogue de diagrammes de référence** 🎸 — et les défauts que tu as trouvés, corrigés

**Les 8 nouvelles familles d'accords** (le travail de la v1.5.2, livré avec cette version)
- La bibliothèque passe de 8 à **16 familles** : 6, m6, 9, m9, Maj9, m7b5, dim7 et mMaj7 rejoignent Majeur, Mineur, 7, Maj7, m7, sus4, add9 et Power 5 — dans les 12 tonalités
- Les suffixes « C6 », « Am6 », « F♯dim7 », « E5 »… sont reconnus partout (portée, bibliothèque, basse automatique) et reçoivent un voicing principal dédié

**Un catalogue de diagrammes refondu**
- Les sections ⭐ Must Know et 🔒 Moveable affichent désormais **les diagrammes exacts d'une base de référence intégrée** (mêmes doigtés, même case de départ), au lieu de formes CAGED générées théoriquement
- Jusqu'à 6 cases affichées pour les positions aiguës ; 4 842 diagrammes contrôlés (16 familles × 12 tonalités)

**Les défauts que tu as découverts — tous corrigés**
- « Un CMaj9 sans la 9ᵉ, bizarre ? » : tu avais raison — les voicings Drop 2 du Maj9 étaient copiés du Maj7 sans la neuvième. Corrigé (CMaj9 case 5 : Sol-Ré-Mi-Si, degrés 5-9-3-7), idem pour Em9
- Les triades aiguës 9 / Maj9 / m9 oubliaient la septième (un C9 sonnait « add9 ») — corrigées
- Les voicings principaux de la portée étaient faux aussi : CMaj9 et AMaj9 affichaient en réalité des Maj7, Dm9 un Ré mineur — remplacés par les vraies formes
- La carte blues « 6 (forme A) » jouait la sixte sur une corde marquée muette — corrigée
- **Audit renforcé** : la note qui donne son nom à l'accord (la 9ᵉ d'un Maj9, la b7 d'un 9, la sixte d'un 6…) doit désormais sonner — un accord qui ne sonne pas son nom ne peut plus s'afficher nulle part, et l'ancien doigté fautif est formellement rejeté par le test

**Lisibilité des degrés et zoom (tes dernières remarques)**
- La tierce mineure s'écrit désormais **3m** (et non plus b3) et la septième majeure **7M** (et non plus 7) sous chaque corde ; la légende du pied de fenêtre suit, et la fondamentale « 1 » retrouve sa couleur ambre
- **Zoom au survol** 🔍 : passer la souris sur un diagramme l'agrandit en surimpression pour lire confortablement les notes et les degrés — le zoom disparaît dès qu'on sort du diagramme ou qu'on fait défiler (sans effet sur écran tactile, pas de survol)
- La mention de la source externe disparaît de l'interface ; une seule mention discrète subsiste en commentaire du code source, pour créditer l'auteur de la base de diagrammes

Aucun changement du moteur audio, du format des projets (2.3), des raccourcis clavier ni des thèmes.

## v1.5.1 (2026-11-04)

Bibliothèque d'accords : **le grand catalogue** 🎸 — CAGED complet, couleurs blues, jazz dans les 12 tonalités

- La section « Formes barrées » (2 formes) devient **« 🔒 Formes CAGED transposables » avec les 5 formes du système CAGED** : Mi (E), La (A), Sol (G), Do (C) et Ré (D) — chaque forme est décalée automatiquement dans la tonalité courante, sa case affichée en chiffre romain, et les doublons avec la position ouverte sont écartés
- Nouvelle section **« 🎸 Blues & couleurs »** : sur un accord de dominante, la 9ᵉ (formes Mi et La, façon Chuck Berry) et le 7♯9 « Hendrix » ; sur un majeur, les 6ᵉs (rock'n'roll/country) ; sur un m7, la m9 (funk) ; sur un Maj7, la Maj9 (bossa) — jouées **sur l'accord écrit**, sans changer la grille
- La section jazz passe de **6 exemples écrits à la main** à **des voicings générés dans les 12 tonalités** : shell « l'essentiel » et drop 2 pour tous les Maj7, m7 et 7, triades compactes pour les majeurs/mineurs — plus aucune section jazz vide
- **Correction d'un défaut de la v1.5** : le CMaj7 « Drop 2 » affichait en réalité un Mi mineur (les notes jouées étaient Sol-Si-Mi-Sol, sans aucun Do) — le diagramme est corrigé (Sol-Do-Mi-Si)
- **Vérification harmonique automatique** : chaque diagramme de la bibliothèque (positions ouvertes, formes CAGED, couleurs, voicings) est contrôlé note par note avant affichage — un doigté faux ne peut plus apparaître ; les positions injouables (écart trop grand) sont écartées plutôt que mal affichées
- Sur les accords de dominante où la tierce et la ♯9 sont jouées ensemble (7♯9 Hendrix), le degré sous la corde s'affiche **♯9** et non b3
- **Catalogue triplé** : environ 800 diagrammes affichables sur les 96 accords (12 tonalités × 8 familles), contre ~230 en v1.5 ; un accord de dominante offre désormais jusqu'à 12 positions
- Légende du pied de fenêtre enrichie (9 = neuvième, 6 = sixte) ; sous-titre et info-bulles des boutons 📚 mis à jour
- Un audit `auditBibliotheque()` est exposé pour les tests : il contrôle les 96 accords et renvoie les défauts éventuels (0 défaut à la livraison)
- Aucun changement du moteur audio, du format des projets (2.3), des raccourcis clavier, des thèmes ni de la navigation existante

## v1.5 (2026-11-03)

Nouvelle fonctionnalité : **la bibliothèque d'accords** 📚 (le grand catalogue de diagrammes) — et adieu la fenêtre fantôme 👻

- **Un clic sur n'importe quel diagramme d'accord de la portée** ouvre la bibliothèque sur cet accord : toutes ses positions rassemblées au même endroit, avec un rappel d'où on vient (badge « Portée — TEMPS 2 », etc.)
- La bibliothèque présente **4 sections** : 🏠 Position ouverte · 🔒 Formes barrées transposables (formes de Mi et de La, valables dans les 12 tonalités) · 🔄 Renversements (accords slash comme Am/C, G/B) · 🎷 Voicings jazz & compact
- **Chaque diagramme affiche la note jouée et son degré** sous chaque corde (R = fondamentale en ambre, b3 = tierce mineure, 3 = tierce majeure, 5 = quinte, b7 = septième…) — on comprend ce qu'on joue, pas seulement où poser les doigts
- **Chaque position s'écoute** 🔊 : le bouton joue exactement les notes du diagramme affiché, avec le moteur audio habituel de l'appli
- **Chaque position s'applique** ✔ en un clic au temps sélectionné ; la position en cours est marquée « voicing actuel »
- **Navigation libre** : deux sélecteurs (fondamentale × type d'accord, 12 tonalités × 8 familles) génèrent les positions à la demande — même les accords sans position apprise (F♯m7, Cmaj7…) sortent leurs formes barrées correctes automatiquement
- La fenêtre fantôme 👻 est **supprimée** : plus de bouton « 👻 Inv. » ni de pastilles sur les cases d'accords ; à la place, un bouton unique « 📚 Biblio. » au-dessus de la portée, un bouton « 📚 Bibliothèque » dans la barre du manche, et le bouton de la fenêtre d'accord ouvre désormais la bibliothèque
- Sur **mobile**, la bibliothèque passe pleine largeur et la légende se replie ; les **4 thèmes** sont respectés
- Aucun changement du moteur audio, du format des projets (2.3) ni des raccourcis existants

## v1.4.3 (2026-10-30)

Interface : **la palette des notes reste sous la main** 🎚️

- Problème signalé : avec plusieurs mesures, il fallait **descendre jusqu'à la palette de notes puis remonter** en permanence pour choisir une durée — alors que le bandeau de commandes, lui, restait toujours visible en haut
- La palette (Blanche, Noire, Croche, Triolet…) devient un **dock collé en bas de l'écran**, à l'image d'une barre d'outils de logiciel audio : visible en permanence pendant qu'on édite les mesures, en complément du bandeau de commandes qui reste collé en haut
- Dès qu'on arrive **en bas de la page**, le dock se repose à sa place habituelle : le titre d'instruction et les raccourcis clavier redeviennent visibles — rien n'est masqué ni supprimé
- Quand le dock est collé, il se **compacte** : le long titre d'instruction (« 👉 CLIQUEZ puis CHOISISSEZ… ») s'efface au profit des seuls boutons (il reste visible à sa place en bas de page et dans l'Aide)
- **Sur mobile**, le dock se replie sur une seule rangée à faire glisser horizontalement (environ 50 px de haut)
- Au passage, le glisser-déposer de secours (v1.2.5) est **durci pour l'ère du dock** : un défilement de page pendant l'appui sur un bouton du dock ne peut plus laisser le navigateur dans un état intermédiaire qui faisait échouer le dépôt sans explication — le fantôme de secours prend le relais de façon déterministe
- Les 4 thèmes conservent leur identité : le dock reprend les couleurs de la palette du thème actif ; l'impression / l'export PDF ne contient pas le dock (c'est de l'interface, pas de la musique)
- Glisser-déposer depuis le dock et raccourcis clavier (1 à 0, G, L) inchangés ; aucun changement du moteur audio, du rendu de la partition ni du format des projets (2.3)

## v1.4.2 (2026-10-30)

Interface : **portée papier dans tous les thèmes** 📄 + correction du bouclage des mesures

- La partition se lit désormais comme une **feuille de musique imprimée dans les 4 thèmes** (Jour, Studio, Vintage et Neon) : fond blanc, notation en encre sombre — un contraste net pour travailler confortablement, même dans les thèmes sombres où les notes étaient parfois peu lisibles
- Dans Studio, Vintage et Neon, **tout l'intérieur de la feuille** repasse en « papier » : notes, slashes, silences, barres de ligature, hampes, barres de mesure, double barre finale, clef de percussion, chiffrage (4/4…), noms d'accords, diagrammes, tablature (cordes claires, cases à frettes lisibles) et symboles de médiator — les néons et les lueurs disparaissent à l'intérieur de la feuille, tandis que **la décoration autour** (barres, boutons, réglages) garde toute l'identité du thème
- Les couleurs de la feuille sont **identiques au thème Jour** (mêmes lignes de portée, même encre) : on passe d'un thème à l'autre sans réapprendre à lire la partition
- **Correction du bouclage** : avec une seule mesure, la boucle par défaut est M1-M1 — c'est tout le morceau. En ajoutant des mesures, elle **s'étend automatiquement aux nouvelles mesures** (M1-M2, M1-M3…) au lieu de laisser la mesure 1 « bouclée seule » et les nouvelles hors boucle. Une boucle **partielle** (ex. M2-M3 sur 4 mesures) n'est pas modifiée, et le bouton « 🔁 Boucler M1 » d'une mesure permet toujours de la boucler seule volontairement
- Aucun changement du moteur audio, du rendu pendant la lecture, du format des projets (2.3), des statistiques v1.4 ni de l'historique Annuler/Rétablir

## v1.4.1 (2026-10-30)

Interface : **boutons compacts en icônes — lisible sur mobile** 📱

- Barre de transport **à nouveau sur une seule ligne** (même sur un écran 1280 px, où elle débordait auparavant) : ▶ Lecture, ⏹ Stop, ⏳ décompte, 🔄 Reset, 🎲 Aléatoire, 🎸 Manche et 🎓 Entraînement deviennent des **icônes seules** — l'explication complète reste dans l'info-bulle au survol et en aria-label pour les lecteurs d'écran
- Les barres secondaires conservent des **micro-libellés** explicites : Grille / Partition / Mixte, Tab / Fig. / Inv. / PDF, Pastilles / Menus, 1/mes. / 1/temps, Aide, Réglages
- **Sur mobile (390 px)**, les barres de boutons passent d'environ 930 px à 550 px de haut avant la partition : paddings et marges réduits (media query ≤ 720 px), chronomètre plus compact
- Sélecteur de thème raccourci (Studio / Vintage / Neon / Jour) et noms des progressions compactés (ex. « ✨ Pop (Am-F-C-G) »)
- Boutons des mémoires et des exports en icônes (💾 📂 🗑️ 📤 📥 ⬇️ ⬆️ 🎵) avec aria-labels ; le bouton décompte expose son état via aria-pressed (fond bleu = actif)
- Aucun changement fonctionnel : moteur audio, partition, format des projets (2.3), statistiques v1.4 et basse v1.3 inchangés

## v1.4 (2026-10-30)

Nouvelle fonctionnalité : **Statistiques de pratique** 📊

- Nouveau bouton **📊** dans la barre de transport (juste à gauche du chronomètre) : ouvre la fenêtre « Statistiques de pratique » — tout est compté **automatiquement pendant la lecture**, rien à noter, tout se calcule tout seul
- **Temps de jeu** : compté à la seconde pendant la lecture (bouton Lecture / Espace), avec les totaux **du jour**, des **7 derniers jours** et **depuis le début** — une séance qui traverse minuit est répartie sur les deux jours
- **BPM maximum** ⚡ : un tempo entre au palmarès s'il est joué **10 secondes de suite sans pause** ; un toast « 🏆 Nouveau record » célèbre chaque nouveau palmarès ; le Speed Trainer est respecté (dès que le tempo change, le chrono du tempo repart de zéro)
- **Série de jours** 🔥 : le nombre de jours consécutifs avec pratique, record à l'appui — la série ne casse que si un jour entier passe sans jouer
- **Historique des séances** : les 20 dernières séances (date, heure de début, durée, BPM max atteint) ; une reprise de lecture moins de 10 minutes après un arrêt **continue la même séance** ; les prises de moins de 15 secondes ne sont pas listées dans l'historique (leur temps compte quand même dans les totaux)
- **Graphique 14 derniers jours** en barres (dessiné en CSS pur, aucune dépendance), et fenêtre **rafraîchie en direct** pendant la lecture
- **Réinitialisation protégée** : le bouton demande une confirmation en deux clics (sinon retour automatique au bouton normal après 4 s)
- **Sur cet appareil uniquement** : les statistiques survivent à la fermeture du navigateur (sauvegarde espacée toutes les 10 s : au plus ~10 s perdues en cas de fermeture brutale de l'onglet) mais ne font partie ni des projets sauvegardés ou partagés, ni de l'historique Annuler/Rétablir (Ctrl+Z ne les touche pas, et jouer ne crée aucune étape d'annulation), ni des exports
- La barre de transport conserve **exactement sa hauteur d'origine** : le bouton est une icône compacte, dans l'esprit des boutons ↩️/↪️ épurés — l'info-bulle au survol rappelle tout ce que la fenêtre contient, et un libellé d'accessibilité (aria-label) est prévu pour les lecteurs d'écran
- Aucun changement du moteur audio, du rendu de la partition ni du format de sauvegarde des projets (2.3 inchangé)

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
