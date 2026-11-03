// ---------- Seitenwechsel über das Menü ----------

// Zeigt nur den Bereich, dessen Name im Link (#name) steht
function zeigeSeite() {
    const name = location.hash.slice(1) || "galerie";
    document.querySelectorAll(".seite").forEach(function (seite) {
        seite.classList.toggle("aktiv", seite.id === name);
    });
}

// Läuft beim Laden der Seite und bei jedem Klick auf einen Menüpunkt
window.addEventListener("hashchange", zeigeSeite);
zeigeSeite();

// ---------- Vorschau der Galerie ----------

const bilder = Array.from(document.querySelectorAll(".galerie img"));
let aktuell = 0;

const vorschau = document.createElement("div");
vorschau.className = "vorschau";
vorschau.innerHTML = `
    <button class="schliessen" aria-label="Schließen">&times;</button>
    <button class="zurueck" aria-label="Vorheriges Bild">&#10094;</button>
    <img alt="">
    <button class="weiter" aria-label="Nächstes Bild">&#10095;</button>
    <p class="zaehler"></p>
`;
document.body.appendChild(vorschau);

const grossesBild = vorschau.querySelector("img");
const zaehler = vorschau.querySelector(".zaehler");

function zeigeBild(nummer) {
    aktuell = (nummer + bilder.length) % bilder.length;
    const quelle = bilder[aktuell];
    grossesBild.src = quelle.src;
    grossesBild.alt = quelle.alt;
    zaehler.textContent = (aktuell + 1) + " / " + bilder.length;
}

function oeffne(nummer) {
    zeigeBild(nummer);
    vorschau.classList.add("offen");
    document.body.style.overflow = "hidden";
}

function schliesse() {
    vorschau.classList.remove("offen");
    document.body.style.overflow = "";
}

bilder.forEach(function (bild, index) {
    bild.loading = "lazy";
    bild.addEventListener("click", function () {
        oeffne(index);
    });
});

vorschau.querySelector(".schliessen").addEventListener("click", schliesse);
vorschau.querySelector(".zurueck").addEventListener("click", function () {
    zeigeBild(aktuell - 1);
});
vorschau.querySelector(".weiter").addEventListener("click", function () {
    zeigeBild(aktuell + 1);
});

vorschau.addEventListener("click", function (ereignis) {
    if (ereignis.target === vorschau) {
        schliesse();
    }
});

document.addEventListener("keydown", function (ereignis) {
    if (!vorschau.classList.contains("offen")) return;

    if (ereignis.key === "Escape") schliesse();
    if (ereignis.key === "ArrowRight") zeigeBild(aktuell + 1);
    if (ereignis.key === "ArrowLeft") zeigeBild(aktuell - 1);
});