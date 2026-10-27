import { chromium } from "playwright";

// Test de démarrage : ouvre l'application dans un navigateur sans écran,
// vérifie que la page se construit et qu'aucune erreur JavaScript bloquante
// n'est émise. Les erreurs de chargement de ressources (favicon, etc.)
// sont ignorées : seul un défaut réel du code fait échouer le test.

const BASE = process.env.APP_URL || "http://127.0.0.1:8080/index.html";
const erreurs = [];

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

await navigateur.close();

let echec = false;

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
