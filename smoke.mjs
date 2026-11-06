import { chromium } from "playwright";

// Test de démarrage : ouvre l'application dans un navigateur sans écran,
// vérifie que la page se construit et qu'aucune erreur JavaScript bloquante
// n'est émise. Les erreurs de chargement de ressources (favicon, etc.)
// sont ignorées : seul un défaut réel du code fait échouer le test.

const BASE = process.env.APP_URL || "http://127.0.0.1:8080/index.html";
const erreurs = [];
let echec = false;

const navigateur = await chromium.launch();
const page = await navigateur.newPage();

page.on("pageerror", (err) => erreurs.push("pageerror: " + String(err)));
page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("Failed to load resource")) {
        erreurs.push("console: " + msg.text());
    }
});

try {
    await page.goto(BASE, { waitUntil: "load", timeout: 30000 });
} catch (e) {
    console.error("Impossible d'ouvrir la page :", e.message);
    process.exit(1);
}

// La grille de mesures doit avoir été construite au démarrage
await page.waitForFunction(
    () => {
        const c = document.querySelector("#mesuresContainer");
        return c && c.children.length > 0;
    },
    { timeout: 15000 }
).catch(() => {});

const nbEnfants = await page.evaluate(
    () => document.querySelector("#mesuresContainer")?.children.length || 0
);
const boutonLecture = await page.$("#btnPlay");
const titre = await page.title();

// Interaction légère : basculer le panneau de réglages
await page.click("#btnToggleSettings", { timeout: 5000 }).catch(() => {});
await page.waitForTimeout(1000);

// v1.6 : l'analyseur d'accords doit nommer un Am posé au clic sur le manche
try {
    // Le manche (et sa barre d'outils) est masqué par défaut : on l'affiche d'abord
    await page.click("#btnToggleManche", { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(400);
    await page.click("#btnOuvrirAnalyseur", { timeout: 5000 });
    await page.waitForTimeout(300);
    // Am ouvert : La à vide, Ré case 2, Sol case 2, Si case 1, Mi aigu à vide
    await page.click('#anaMancheZone [data-ana="s1"][data-fret="0"]');
    await page.click('#anaMancheZone [data-ana="s2"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s3"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s4"][data-fret="1"]');
    await page.click('#anaMancheZone [data-ana="s5"][data-fret="0"]');
    await page.waitForTimeout(400);
    const nomAnalyse = await page.evaluate(
        () => (document.getElementById("anaNomGrand")?.textContent || "").trim()
    );
    if (!/^Am(\/|$)/.test(nomAnalyse)) {
        console.error("ÉCHEC : l'analyseur affiche « " + nomAnalyse + " » au lieu d'un Am.");
        echec = true;
    } else {
        console.log("Analyseur d'accords OK — Am reconnu (« " + nomAnalyse + " »).");
    }
    // v1.6.1 : le doigté standard C6/9 (x3223x, sans quinte) doit renvoyer C6/9,
    // et non un renversement type Am/C (la quinte est facultative dans cette famille)
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    await page.click('#anaMancheZone [data-ana="s1"][data-fret="3"]');
    await page.click('#anaMancheZone [data-ana="s2"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s3"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s4"][data-fret="3"]');
    await page.waitForTimeout(400);
    const nomC69 = await page.evaluate(
        () => (document.getElementById("anaNomGrand")?.textContent || "").trim()
    );
    if (nomC69 !== "C6/9") {
        console.error("ÉCHEC : le doigté x3223x affiche « " + nomC69 + " » au lieu de C6/9.");
        echec = true;
    } else {
        console.log("Analyseur d'accords OK — doigté x3223x reconnu comme C6/9.");
    }
    // v1.6.2 : un accord sans sa quinte garde son nom — C sans Sol (x32x1x) → C
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    await page.click('#anaMancheZone [data-ana="s1"][data-fret="3"]');
    await page.click('#anaMancheZone [data-ana="s2"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s4"][data-fret="1"]');
    await page.waitForTimeout(400);
    const nomCSansQuinte = await page.evaluate(
        () => (document.getElementById("anaNomGrand")?.textContent || "").trim()
    );
    if (nomCSansQuinte !== "C") {
        console.error("ÉCHEC : le doigté C sans quinte (x32x1x) affiche « " + nomCSansQuinte + " » au lieu de C.");
        echec = true;
    } else {
        console.log("Analyseur d'accords OK — accord sans quinte conservé (« " + nomCSansQuinte + " »).");
    }
    // v1.6.2 : la basse = fondamentale l'emporte — doigté ouvert de C6 (x3221x) → C6
    // (et non plus un renversement de la triade La-Do-Mi)
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    await page.click('#anaMancheZone [data-ana="s1"][data-fret="3"]');
    await page.click('#anaMancheZone [data-ana="s2"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s3"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s4"][data-fret="1"]');
    await page.waitForTimeout(400);
    const nomC6 = await page.evaluate(
        () => (document.getElementById("anaNomGrand")?.textContent || "").trim()
    );
    if (nomC6 !== "C6") {
        console.error("ÉCHEC : le doigté ouvert x3221x affiche « " + nomC6 + " » au lieu de C6.");
        echec = true;
    } else {
        console.log("Analyseur d'accords OK — doigté x3221x reconnu comme C6.");
    }
    // v1.6.2 : bascule de notation ♯/♭ — le doigté de Eb affiche Eb en bémols
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    await page.click('#anaResultatZone #anaOptBemol', { timeout: 5000 });
    await page.waitForTimeout(200);
    await page.click('#anaMancheZone [data-ana="s1"][data-fret="6"]');
    await page.click('#anaMancheZone [data-ana="s2"][data-fret="8"]');
    await page.click('#anaMancheZone [data-ana="s3"][data-fret="8"]');
    await page.click('#anaMancheZone [data-ana="s4"][data-fret="8"]');
    await page.waitForTimeout(400);
    const nomEb = await page.evaluate(
        () => (document.getElementById("anaNomGrand")?.textContent || "").trim()
    );
    if (nomEb !== "Eb") {
        console.error("ÉCHEC : le doigté x6888x affiche « " + nomEb + " » en notation bémols au lieu de Eb.");
        echec = true;
    } else {
        console.log("Analyseur d'accords OK — notation bémols (« " + nomEb + " »).");
    }
    // retour à la notation par défaut (dièses) pour ne pas polluer l'état
    await page.click('#anaResultatZone #anaOptDiese', { timeout: 5000 }).catch(() => {});
    await page.click("#btnFermerAnalyseur", { timeout: 3000 }).catch(() => {});
} catch (e) {
    console.error("ÉCHEC : l'analyseur d'accords n'a pas pu être testé : " + e.message);
    echec = true;
}

// v1.7.0 : le 6/9 reconnu par l'analyseur s'ouvre dans la bibliothèque (44 familles)
try {
    await page.click("#btnOuvrirAnalyseur", { timeout: 5000 });
    await page.waitForTimeout(300);
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    // doigté x3223x = C6/9 (cordes 5, 4, 3, 2)
    await page.click('#anaMancheZone [data-ana="s1"][data-fret="3"]');
    await page.click('#anaMancheZone [data-ana="s2"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s3"][data-fret="2"]');
    await page.click('#anaMancheZone [data-ana="s4"][data-fret="3"]');
    await page.waitForTimeout(400);
    const boutonBiblio = await page.evaluate(() => {
        const b = [...document.querySelectorAll('#anaResultatZone button')]
            .find(x => x.textContent.includes('Bibliothèque'));
        return !!b;
    });
    if (!boutonBiblio) {
        console.error("ÉCHEC : le bouton 📚 Bibliothèque n'apparaît pas pour un C6/9.");
        echec = true;
    } else {
        await page.evaluate(() => window.anaOuvrirBibliotheque());
        await page.waitForTimeout(500);
        const biblio = await page.evaluate(() => {
            const modal = document.getElementById("bibliothequeAccordsModal");
            const sel = document.getElementById("biblioSelType");
            const cartes = document.querySelectorAll("#biblioCorps .biblio-carte").length;
            return {
                visible: !!(modal && modal.style.display === "flex"),
                type: sel ? sel.value : null,
                familles: (typeof BIBLIO_TYPES !== "undefined") ? BIBLIO_TYPES.length : 0,
                cartes
            };
        });
        if (!biblio.visible || biblio.type !== "69" || biblio.cartes < 1) {
            console.error("ÉCHEC : la bibliothèque n'affiche pas le C6/9 (modal=" +
                biblio.visible + ", type=" + biblio.type + ", cartes=" + biblio.cartes + ").");
            echec = true;
        } else {
            console.log("Bibliothèque OK — C6/9 ouvert depuis l'analyseur (« " +
                biblio.type + " », " + biblio.cartes + " diagrammes, " +
                biblio.familles + " familles).");
        }
        await page.evaluate(() => window.fermerBibliothequeAccords && window.fermerBibliothequeAccords());
    }
    await page.click("#btnFermerAnalyseur", { timeout: 3000 }).catch(() => {});
} catch (e) {
    console.error("ÉCHEC : le lien analyseur → bibliothèque (6/9) a échoué : " + e.message);
    echec = true;
}

// v1.7.0 : audit harmonique — tous les diagrammes des 44 familles sont accordés
try {
    const audit = await page.evaluate(() => window.auditBibliotheque());
    if (audit.defauts.length > 0) {
        console.error("ÉCHEC : audit harmonique en défaut sur " + audit.defauts.length +
            " diagramme(s), ex. : " + JSON.stringify(audit.defauts[0]));
        echec = true;
    } else {
        console.log("Audit harmonique OK — " + audit.total + " diagrammes contrôlés, 0 défaut.");
    }
} catch (e) {
    console.error("ÉCHEC : l'audit harmonique n'a pas pu être exécuté : " + e.message);
    echec = true;
}

// v1.8.0 : « Maj-Min » / « min-Maj » — chaque famille porte sa description
try {
    // 1. les 44 options du menu portent une info-bulle (description en français)
    const infoBulles = await page.evaluate(() => {
        const sel = document.getElementById("biblioSelType");
        const opts = [...sel.querySelectorAll("option")];
        return { total: opts.length, avecTitre: opts.filter((o) => (o.getAttribute("title") || "").length > 5).length };
    });
    if (infoBulles.total !== 44 || infoBulles.avecTitre !== 44) {
        console.error("ÉCHEC : info-bulles des familles incomplètes (" + infoBulles.avecTitre + "/" + infoBulles.total + ").");
        echec = true;
    } else {
        console.log("Bibliothèque OK — 44 familles décrites en info-bulle du menu.");
    }
    // 2. la page C mMaj7 explique « min-Maj », la page C7 explique « Maj-Min »
    await page.evaluate(() => window.ouvrirBibliothequeAccords("CmMaj7"));
    await page.waitForTimeout(400);
    const descMinMaj = await page.evaluate(
        () => document.getElementById("biblioDescFamille")?.textContent || ""
    );
    if (!descMinMaj.includes("min-Maj") || !descMinMaj.includes("majeure")) {
        console.error("ÉCHEC : la page C mMaj7 n'explique pas « min-Maj » (reçu : « " + descMinMaj + " »).");
        echec = true;
    } else {
        console.log("Bibliothèque OK — C mMaj7 décrit comme accord « min-Maj ».");
    }
    await page.evaluate(() => window.ouvrirBibliothequeAccords("C7"));
    await page.waitForTimeout(400);
    const descMajMin = await page.evaluate(
        () => document.getElementById("biblioDescFamille")?.textContent || ""
    );
    if (!descMajMin.includes("Maj-Min") || !descMajMin.includes("mineure")) {
        console.error("ÉCHEC : la page C7 n'explique pas « Maj-Min » (reçu : « " + descMajMin + " »).");
        echec = true;
    } else {
        console.log("Bibliothèque OK — C7 décrit comme accord « Maj-Min » (dominante).");
    }
    await page.evaluate(() => window.fermerBibliothequeAccords());
    // 3. l'analyseur nomme le doigté ouvert EmMaj7 (021000) et affiche sa formule
    await page.click("#btnOuvrirAnalyseur", { timeout: 5000 });
    await page.waitForTimeout(300);
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    for (const [s, f] of [[0, 0], [1, 2], [2, 1], [3, 0], [4, 0], [5, 0]]) {
        await page.click('#anaMancheZone [data-ana="s' + s + '"][data-fret="' + f + '"]');
    }
    await page.waitForTimeout(400);
    const resEmMaj7 = await page.evaluate(() => ({
        nom: (document.getElementById("anaNomGrand")?.textContent || "").trim(),
        tout: document.getElementById("anaResultatZone")?.textContent || ""
    }));
    if (resEmMaj7.nom !== "EmMaj7") {
        console.error("ÉCHEC : le doigté 021000 affiche « " + resEmMaj7.nom + " » au lieu de EmMaj7.");
        echec = true;
    } else if (!resEmMaj7.tout.includes("min-Maj")) {
        console.error("ÉCHEC : la formule « min-Maj » n'est pas affichée sous EmMaj7.");
        echec = true;
    } else {
        console.log("Analyseur OK — EmMaj7 reconnu avec sa formule « min-Maj ».");
    }
    // 4. v1.8.0 — priorité à la basse : le barré x8888x (F Bb Eb G C) doit renvoyer
    //    F9sus4 (fondamentale à la basse) et non plus un renversement Eb6/9/F
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    for (const s of [1, 2, 3, 4, 5]) {
        await page.click('#anaMancheZone [data-ana="s' + s + '"][data-fret="8"]');
    }
    await page.waitForTimeout(400);
    const nomF9sus4 = await page.evaluate(
        () => (document.getElementById("anaNomGrand")?.textContent || "").trim()
    );
    if (nomF9sus4 !== "F9sus4") {
        console.error("ÉCHEC : le barré x8888x affiche « " + nomF9sus4 + " » au lieu de F9sus4.");
        echec = true;
    } else {
        console.log("Analyseur OK — x8888x reconnu comme F9sus4 (fondamentale à la basse).");
    }
    // 5. v1.8.0 — voicing jazz sans fondamentale : x3x355 (C Bb E A) → C13
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.waitForTimeout(200);
    await page.click('#anaMancheZone [data-ana="s1"][data-fret="3"]');
    await page.click('#anaMancheZone [data-ana="s3"][data-fret="3"]');
    await page.click('#anaMancheZone [data-ana="s4"][data-fret="5"]');
    await page.click('#anaMancheZone [data-ana="s5"][data-fret="5"]');
    await page.waitForTimeout(400);
    const nomC13 = await page.evaluate(
        () => (document.getElementById("anaNomGrand")?.textContent || "").trim()
    );
    if (nomC13 !== "C13") {
        console.error("ÉCHEC : le voicing x3x355 affiche « " + nomC13 + " » au lieu de C13.");
        echec = true;
    } else {
        console.log("Analyseur OK — voicing jazz x3x355 reconnu comme C13.");
    }
    await page.evaluate(() => window.anaEffacer && window.anaEffacer());
    await page.click("#btnFermerAnalyseur", { timeout: 3000 }).catch(() => {});
} catch (e) {
    console.error("ÉCHEC : descriptions et familles jazz : " + e.message);
    echec = true;
}

// 12. v1.8.1 — l'aide est à jour : les nouvelles fonctions sont documentées
try {
    await page.click("#btnHelp");
    await page.waitForTimeout(300);
    const aideTxt = await page.evaluate(
        () => document.getElementById("modalAide")?.innerText || ""
    );
    const attendus = [
        ["Ctrl+Z", "raccourci Annuler/Rétablir"],
        ["Bibliothèque d'accords — 44 familles", "section bibliothèque d'accords"],
        ["posez vos doigts", "section analyseur d'accords"],
        ["Mode Partition & Tablature", "section partition"],
        ["Statistiques de pratique", "section statistiques"],
        ["Basse automatique", "basse automatique documentée"],
        ["Annuler / Rétablir", "geste Annuler/Rétablir en section 1"],
        ["13. 📦", "sections renumérotées jusqu'à 13"],
        ["Guide à jour de la", "bandeau de mise à jour"],
    ];
    for (const [motif, quoi] of attendus) {
        if (!aideTxt.includes(motif)) {
            console.error("ÉCHEC aide : « " + motif + " » absent (" + quoi + ").");
            echec = true;
        } else {
            console.log("Aide OK — " + quoi + " présente.");
        }
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
} catch (e) {
    console.error("ÉCHEC : test de l'aide : " + e.message);
    echec = true;
}

await navigateur.close();

if (!boutonLecture) {
    console.error("ÉCHEC : le bouton Lecture (#btnPlay) est introuvable.");
    echec = true;
}
if (nbEnfants === 0) {
    console.error("ÉCHEC : la grille de mesures (#mesuresContainer) est vide au démarrage.");
    echec = true;
}
if (erreurs.length > 0) {
    console.error("ÉCHEC : erreurs détectées pendant le démarrage :");
    erreurs.forEach((e) => console.error("  - " + e));
    echec = true;
}

if (echec) process.exit(1);

console.log("Test de démarrage OK — titre : « " + titre + " », " +
    nbEnfants + " bloc(s) rendu(s), aucune erreur bloquante.");
