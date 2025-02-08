/*********************************************************
 * appExe.js
 * Gère les comportements spécifiques aux "EXE" (classe .iconExe).
 * Copy pour separer le Fantomge qui fait peur du reste
 *********************************************************/

/*********************************************************
 * “Catalogue” des exe et de leurs fonctions. 
 *********************************************************/

const exeLogicS = {
    exeSpookyScaryGhost: startAnimation,
};

/*********************************************************
 * Attacher le double-clic sur .iconExe, qui a data-exe="..."
 *********************************************************/
document.querySelectorAll(".iconExe").forEach((exeIconS) => {
    exeIconS.addEventListener("dblclick", () => {
        const exeId = exeIconS.getAttribute("data-exe");
        const fn = exeLogicS[exeId];
        if (typeof fn === "function") {
            fn();
        } else {
            //console.log("Pas de logique définie pour :", exeId);
        }
    });
});

/*********************************************************
 * Logic SpookyScaryGhost (Sylvain le fantôme effrayant)
 * => Version Catmull-Rom (aucun segment linéaire)
 *********************************************************/

/* ------------------------
 *  ÉNUMÉRATION DES ÉTATS
 * ------------------------ */
const STATES = {
    MOVING: 'MOVING',
    OBSERVING: 'OBSERVING',
    RESTING: 'RESTING'
};

/* -------------------------------------
 *  VARIABLES GLOBALES / DE CONTEXTE
 * ------------------------------------- */

// Référence à la div fantôme
let element = null;
// État courant
let currentState = STATES.MOVING;
// ID d'animationFrame
let requestId = null;
// Temps précédent pour deltaTime
let prevTimestamp = 0;

// === Vitesse et échantillonnage ===
let pathSamples = [];       // liste de points {x, y, dist}
let totalDistance = 0;      // distance cumulée
let distanceTraveled = 0;   // distance déjà parcourue
const NB_POINTS_RANDOM = 3; // 3 waypoints aléatoires (à adapter)
let speed = 40;             // 40 px/s => lent / moyen (ajuste pour + lent/rapide)

// Position précédente & orientation
let prevPos = { x: 0, y: 0 };
let lastOrientation = 1; // 1 = orientation "par défaut", -1 = flip (à adapter à ton sprite)

// === OBSERVING ===
let observeDuration = 2000;
let observeStartTime = 0;
let observeFlipIntervalId = null;

// === RESTING ===
let restEndTime = 0;

/* --------------------------------------------------
 *   FONCTIONS UTILITAIRES
 * -------------------------------------------------- */

/** Renvoie un nombre aléatoire entre min et max */
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/** Choisit aléatoirement OBSERVING ou RESTING */
function pickNextStateRandom() {
    return (Math.random() < 0.5) ? STATES.OBSERVING : STATES.RESTING;
}

/** 
 * Calcule un point (x, y) aléatoire 
 * en laissant une marge de 50px 
 */
function calculateNextDestination() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const x = randomBetween(50, w - 50);
    const y = randomBetween(50, h - 50);
    return { x, y };
}

/* --------------------------------------------------
 *   GÉNÉRATION DE POINTS + SPLINE CATMULL-ROM
 * -------------------------------------------------- */

/**
 * 1) generateRandomWaypoints(start, end, nbPoints)
 *    Crée un tableau [start, p1, p2, ..., pN, end]
 */
function generateRandomWaypoints(start, end, nbPoints) {
    const points = [start];
    for (let i = 0; i < nbPoints; i++) {
        points.push(calculateNextDestination());
    }
    points.push(end);
    return points;
}

/**
 * 2) catmullRom(p0, p1, p2, p3, t, tension=0.5)
 *    Retourne la position (x, y) à t, segment Catmull-Rom 
 *    entre p1 et p2, en s'aidant de p0, p3 pour la tangente.
 *    tension=0.5 => cardinal spline standard
 */
function catmullRom(p0, p1, p2, p3, t, tension = 0.5) {
    // Catmull-Rom standard : 
    //     P(t) = 0.5 * (2 * p1 + (-p0 + p2)*t + (2p0 -5p1 + 4p2 - p3)*t^2 + (-p0 + 3p1 -3p2 + p3)*t^3)
    // On peut contrôler la raideur via tension (typiquement 0.5)

    const t2 = t * t;
    const t3 = t2 * t;

    const a0 = -tension * p0 + (2 - tension) * p1 + (tension - 2) * p2 + tension * p3;
    const a1 = 2 * tension * p0 + (tension - 3) * p1 + (3 - 2 * tension) * p2 - tension * p3;
    const a2 = -tension * p0 + tension * p2;
    const a3 = p1;

    // Cf. "CatmullRom with tension" => formules un peu variables selon la convention
    // Par simplification, on va utiliser la version "Cardinal" : tension=0 => Catmull-Rom
    // On va faire un mix "classique" (0.5 = Catmull "standard").

    // En réalité, c'est plus fiable d'utiliser la formule "classique" :
    //   P(t) = 0.5 * (2P1 + (P2 - P0) * t + (2P0 -5P1 + 4P2 - P3)* t^2 + (-P0 + 3P1- 3P2 + P3)* t^3)
    // Pour la lisibilité, je l'écris directement ci-dessous.

    // (Pour plus de clarté, on va faire la version standard "tension=0.5" codée en dur.)

    // => Mieux : on fait la version "classique" Catmull-Rom (tension=0.5):
    //   p(t) = 0.5 * ( (2 * p1) 
    //                  + (-p0 + p2) * t
    //                  + (2p0 -5p1 +4p2 - p3)* t^2
    //                  + (-p0 +3p1 -3p2 + p3)* t^3 )

    // Pour ne pas mélanger, j'écris la fonction explicitement:

    // => Mais on doit passer p0, p1, p2, p3 en x séparés, y séparés.

    // Je te propose ci-dessous la version "simplifiée" par composant :

    // version "catmullRomPoint" :

    return { x: 0, y: 0 }; // on va la faire un peu plus bas :)
}

/**
 * catmullRomPoint(px0, px1, px2, px3, t)
 * version standard tension=0.5
 */
function catmullRomPoint(p0, p1, p2, p3, t) {
    // Catmull-Rom standard: 0.5 * (2*p1 + (p2 - p0)*t + (2*p0 -5*p1 +4*p2 - p3)*t^2 + (-p0 +3*p1 -3*p2 + p3)*t^3)
    const t2 = t * t;
    const t3 = t2 * t;

    return 0.5 * (
        2 * p1
        + (-p0 + p2) * t
        + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
        + (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    );
}

/**
 * sampleCatmullRom(points, stepsPerSegment=20)
 * - Reçoit un tableau de points [P0, P1, P2, ... Pn].
 * - Échantillonne la Catmull-Rom sur chaque segment (P(i), P(i+1)),
 *   en utilisant P(i-1) et P(i+2) comme tangentes (sauf bords).
 * - Retourne un tableau {x, y, dist} cumulée.
 */
function sampleCatmullRom(points, stepsPerSegment = 20) {
    /**
     * Pour n points, on a (n-1) segments. 
     * Sur chaque segment i, la Catmull-Rom a besoin de P(i-1) et P(i+2).
     * On gère les bords en "extrapolant" ou en clampant (typiquement, on duplique).
     */
    const samples = [];
    let cumulativeDist = 0;

    function distance2D(ax, ay, bx, by) {
        const dx = bx - ax;
        const dy = by - ay;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Duplication en bordure (pour p-1 quand i=0, p(n+1) quand i=n-1)
    // Approche simple : p(-1) = P0, p(n+1)= Pn
    const n = points.length;
    if (n < 2) {
        return samples; // pas assez de points
    }

    let prevX, prevY;
    let firstPoint = true;

    for (let i = 0; i < n - 1; i++) {
        // Segment entre points[i] et points[i+1]
        const p0 = (i === 0) ? points[0] : points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = (i === n - 2) ? points[n - 1] : points[i + 2];

        // Correction bords => si i=0, p0 = p1; si i=n-2, p3 = p2
        const P0 = (i === 0) ? p1 : p0;
        const P3 = (i === (n - 2)) ? p2 : p3;

        for (let step = 0; step <= stepsPerSegment; step++) {
            const t = step / stepsPerSegment;

            const x = catmullRomPoint(P0.x, p1.x, p2.x, P3.x, t);
            const y = catmullRomPoint(P0.y, p1.y, p2.y, P3.y, t);

            if (firstPoint) {
                samples.push({ x, y, dist: 0 });
                prevX = x;
                prevY = y;
                firstPoint = false;
            } else {
                const d = distance2D(prevX, prevY, x, y);
                cumulativeDist += d;
                samples.push({ x, y, dist: cumulativeDist });
                prevX = x;
                prevY = y;
            }
        }
    }

    return samples;
}

/* --------------------------------------------------
 *   FSM : MOVING / OBSERVING / RESTING
 * -------------------------------------------------- */

/** MOVING **/

function startMoving() {
    // Le point de départ = prevPos
    const startPos = prevPos;
    // Le point d'arrivée aléatoire
    const endPos = calculateNextDestination();

    // 1) Générer la liste de points (start, p1, p2, etc., end)
    const controlPoints = generateRandomWaypoints(startPos, endPos, NB_POINTS_RANDOM);

    // 2) Échantillonner la spline Catmull-Rom
    pathSamples = sampleCatmullRom(controlPoints, 30); // steps=30 => plus lisse

    // 3) Calcule la distance totale
    if (pathSamples.length > 0) {
        totalDistance = pathSamples[pathSamples.length - 1].dist;
    } else {
        totalDistance = 0;
    }

    distanceTraveled = 0;

    currentState = STATES.MOVING;
}

function updateMovement(deltaTime) {
    if (!pathSamples || pathSamples.length === 0) {
        startMoving();
        return;
    }

    // Avance la distance
    const distToTravelNow = speed * (deltaTime / 1000);
    distanceTraveled += distToTravelNow;

    // Fin de la trajectoire ?
    if (distanceTraveled >= totalDistance) {
        const lastSample = pathSamples[pathSamples.length - 1];
        applyTransform(lastSample.x, lastSample.y, lastOrientation);
        prevPos = { x: lastSample.x, y: lastSample.y };

        // On choisit : OBSERVING ou RESTING
        const nextState = pickNextStateRandom();
        if (nextState === STATES.OBSERVING) {
            startObserving();
        } else {
            startResting();
        }
        return;
    }

    // Sinon, on cherche l'échantillon correspondant
    let i = 0;
    while (i < pathSamples.length && pathSamples[i].dist <= distanceTraveled) {
        i++;
    }
    if (i === 0) {
        // tout début
        const s0 = pathSamples[0];
        applyTransform(s0.x, s0.y, lastOrientation);
        prevPos = { x: s0.x, y: s0.y };
        return;
    }
    if (i >= pathSamples.length) {
        i = pathSamples.length - 1;
    }

    const s1 = pathSamples[i - 1];
    const s2 = pathSamples[i];
    const distRange = s2.dist - s1.dist;
    const frac = (distanceTraveled - s1.dist) / distRange;

    const x = s1.x + (s2.x - s1.x) * frac;
    const y = s1.y + (s2.y - s1.y) * frac;

    // Orientation
    updateOrientation(x, y);

    // Applique la transform
    applyTransform(x, y, lastOrientation);

    // Mémorise
    prevPos = { x, y };
}

/* --- Orientation & Transform --- */

/** 
 * updateOrientation(x, y)
 * => définit lastOrientation en fonction du dx
 * => évite le flip si dx est trop faible
 */
function updateOrientation(x, y) {
    const dx = x - prevPos.x;
    if (Math.abs(dx) < 0.2) {
        // Évite le flip constant
        return;
    }
    // Suppose qu'on regarde à gauche par défaut (1).
    // Si on va à droite => -1
    lastOrientation = (dx > 0) ? -1 : 1;
}

/**
 * applyTransform(x, y, orientation)
 * => translate3d + scaleX dans la même propriété
 */
function applyTransform(x, y, orientation) {
    element.style.transform = `translate3d(${x}px, ${y}px, 0) scaleX(${orientation})`;
}

/* --- OBSERVING --- */
function startObserving() {
    currentState = STATES.OBSERVING;
    observeStartTime = performance.now();

    observeFlipIntervalId = setInterval(() => {
        // alterne l'orientation
        lastOrientation = (lastOrientation === 1) ? -1 : 1;
        const { x, y } = prevPos;
        applyTransform(x, y, lastOrientation);
    }, 500);
}

function updateObserving(time) {
    const elapsed = time - observeStartTime;
    if (elapsed >= observeDuration) {
        clearInterval(observeFlipIntervalId);
        observeFlipIntervalId = null;
        startMoving();
    }
}

/* --- RESTING --- */
function startResting() {
    currentState = STATES.RESTING;
    const restTime = randomBetween(1000, 3000); // 1-3s
    restEndTime = performance.now() + restTime;
}

function updateResting(time) {
    if (time >= restEndTime) {
        startMoving();
    }
}

/* -------------------------------------------------
 *   BOUCLE D'ANIMATION (requestAnimationFrame)
 * ------------------------------------------------- */
function update(timestamp) {
    if (!prevTimestamp) {
        prevTimestamp = timestamp;
    }
    const deltaTime = timestamp - prevTimestamp;
    prevTimestamp = timestamp;

    switch (currentState) {
        case STATES.MOVING:
            updateMovement(deltaTime);
            break;
        case STATES.OBSERVING:
            updateObserving(timestamp);
            break;
        case STATES.RESTING:
            updateResting(timestamp);
            break;
    }

    requestId = requestAnimationFrame(update);
}

/* -----------------------------------
 *  FONCTION DE DÉMARRAGE GLOBALE
 * ----------------------------------- */
function startAnimation() {
    element = document.getElementById('SpookyScaryGhost');
    if (!element) {
        console.error("Element #SpookyScaryGhost introuvable !");
        return;
    }

    // On empêche la sélection & clic
    element.style.userSelect = "none";
    element.style.pointerEvents = "none";

    // Position absolue
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';

    // Cachons le span, si tu veux
    const sylvainSpan = element.querySelector("span");
    if (sylvainSpan) {
        sylvainSpan.style.display = 'none';
    }

    // Position de départ : centre
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    // Applique la transform initiale
    lastOrientation = 1; // gauche par défaut
    applyTransform(startX, startY, lastOrientation);

    prevPos = { x: startX, y: startY };

    // Lance le 1er état
    startMoving();

    // Lance la boucle
    requestId = requestAnimationFrame(update);
}

