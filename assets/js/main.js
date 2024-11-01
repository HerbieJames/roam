import scenes from "./scenes/roam-film.js";

const mainGame = { 
    prog: 0, // game ends at 10
    area: "", // "forest", "city" or "dungeon"
    luck: 0, // 0 -> 0.25
    time: "" // "night" or "day"
}

const mainChar = {// initialise 0 values in character generation (5pts)
    strength: 0, // 0 -> 5
    speed: 0, // 0 -> 5
    cunning: 0, // 0 -> 5
    health: 5 // 0 -> 5
}

const mainInv = []

const scene = {
    title: "emptyScene",
    opt1Name: "Move on.",
    opt2Name: "",
    opt3Name: "",
    opt4Name: "",
    preReq: {preGame: {}, preChar: {}, preInv: {}},
    introScript(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt1Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt2Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt3Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt4Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};}
}

/** Writes message to console element
 * 
 * @param {*} string contents of message to console element.
 */
function addLog(txt) {
    let entryParent = document.getElementById("consoleEl");
    let newEntry = document.createElement("p");
    newEntry.className = "console-entry";
    newEntry.innerHTML = txt;
    entryParent.appendChild(newEntry);
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
    var heldScene;
    while (valid === false) {
        heldScene = film[Math.floor(Math.random()*(scenes.length))];
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
    return heldScene;
}

while (mainGame.prog < 10) { // game loop
    // select scene
    scene = selectScene(scenes);

    // run scene intro and store state changes
    sceneState = scene.introScript(mainGame, mainChar, mainInv);
    // update main states to scene states
    mainGame = sceneState.sceneGame;
    mainChar = sceneState.sceneChar;
    mainInv = sceneState.sceneInv;

    // Activate buttons and await (EventListeners) an option
}

// on progress up, let user increment strength, speed, or cunning

// on progress 10, run final scene