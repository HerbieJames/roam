import { scenes } from "./scenes/roam-film.js";

const mainGame = { 
    prog: 0, // game ends at 10
    area: "forest", // "forest", "city" or "dungeon"
    luck: 0, // 0 -> 0.25
    time: "day" // "night" or "day"
}

const mainChar = {// initialise 0 values in character generation (5pts)
    strength: 0, // 0 -> 5
    speed: 0, // 0 -> 5
    cunning: 0, // 0 -> 5
    health: 5 // 0 -> 5
}

const mainInv = []

let lastInput = ""

/** Writes message to console element
 * 
 * @param {*} string contents of message to console element.
 */
function addLog(txt) {
    let entryParent = document.getElementById("consoleLogEl");
    let newEntry = document.createElement("p");
    newEntry.className = "log-entry";
    newEntry.innerHTML = txt;
    entryParent.appendChild(newEntry);
}

function takeInput() {
    lastInput = document.getElementById("typeInputEl").value;
    addLog(lastInput);
    console.log("Entered: " + lastInput);
    console.log(typeof(document.getElementById("typeInputEl").value));
    document.getElementById("typeInputEl").value = "";
}

function logObj(obj) {
    for (const property in obj) {
        addLog(property + ": " + obj[property])
    }
}

/**
 * Selects a random scene from an array of scenes that the main state meets the pre-requisite off.
 * @param   {Array}  film  An array of individual scene objects
 * @returns {Object}       A random, valid scene fromt he array
 */
function selectScene(film) {
    // selects scene from scenes
    //      holds randomly from scenes
    //      attempt to validate preReq
    //      if fails, repeats attempt for new hold
    //      if passes, release 
    var heldScene = {};
    var valid = false;
    while (valid === false) {
        heldScene = film[Math.floor(Math.random()*(scenes.length))];
        console.log("heldScene pre-validation: " + heldScene.title)
        valid = true;
        for (const property in heldScene.preReq.preGame) {
            if (heldScene.preReq.preGame[property] != mainGame[property]) {valid = false};
        }
        for (const property in heldScene.preReq.preChar) {
            if (heldScene.preReq.preChar[property] != mainChar[property]) {valid = false};
        }
        for (const property in heldScene.preReq.preInv) {
            if (heldScene.preReq.preInv[property] != mainInv[property]) {valid = false};
        } }

        console.log("Selected Scene: " + heldScene.title)
    return heldScene;
}

console.log("logEl test start")
addLog("--- ROAM ---")
console.log("logEl test end")

// while (mainGame.prog < 10) { game loop
    // select scene
    var scene = selectScene(scenes);

    // run scene intro and store state changes
    var sceneState = scene.introScript(mainGame, mainChar, mainInv);
    // update main states to scene states
    for (const property in mainGame) {
        mainGame[property] = sceneState.sceneGame[property]
    }
    for (const property in mainChar) {
        mainChar[property] = sceneState.sceneChar[property]
    }
    for (const property in mainGame) {
        mainInv[property] = sceneState.sceneInv[property]
    }

    document.getElementById("enterInputEl").addEventListener("click", takeInput());

    document.getElementById("typeInputEl").addEventListener('keypress', function (e) {
        if (e.key === 'Enter') { takeInput() }
    });

    // Activate buttons and await (EventListeners) an option
// }

// on progress up, let user increment strength, speed, or cunning

// on progress 10, run final scene