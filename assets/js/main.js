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

let scene = {};

let waiting = false;

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
    entryParent.scrollTo(0, entryParent.scrollHeight);
}

/** Changes scene options list
 * 
 * @param {*} string contents of message to console element.
 */
function showOpts(txt, type) {
    let entryParent = document.getElementById("optionsEl");
    let newEntry = document.createElement("i");
    newEntry.className = type;
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
    var heldScene = {};
    var valid = false;
    while (valid === false) {
        heldScene = film[Math.floor(Math.random()*(scenes.length))];
        console.log("heldScene pre-validation: " + heldScene.title)
        valid = true;
        for (const property in heldScene.preReq.reqGame) {
            if (heldScene.preReq.reqGame[property] != mainGame[property]) {valid = false};
        }
        for (const property in heldScene.preReq.reqChar) {
            if (heldScene.preReq.reqChar[property] != mainChar[property]) {valid = false};
        }
        for (const property in heldScene.preReq.reqInv) {
            if (heldScene.preReq.reqInv[property] != mainInv[property]) {valid = false};
        } }

        console.log("SELECTED: " + heldScene.title)
    return heldScene;
}

function runScene() {
    //SELECT SCENE
    scene = selectScene(scenes)
    //RUN SCENE SCRIPT AND CAPTURE SCENE STATES
    var sceneState = scene.script(mainGame, mainChar, mainInv);
    //SET MAIN STATES TO SCENE STATES
    for (const property in mainGame) {mainGame[property] = sceneState.sceneGame[property]}
    for (const property in mainChar) {mainChar[property] = sceneState.sceneChar[property]}
    for (const property in mainGame) {mainInv[property] = sceneState.sceneInv[property]}
    //UPDATE HTMLs
    scene.options.forEach(function(entry) {
        console.log("OPTION: " + entry.title);
        showOpts('"'+entry.title+'"', "scene-option")
    });

}

function takeInput() {
    lastInput = document.getElementById("typeInputEl").value;
    addLog(lastInput);
    console.log("Entered: " + lastInput);
    console.log(typeof(document.getElementById("typeInputEl").value));
    document.getElementById("typeInputEl").value = "";
    if ((mainGame.prog == 0) && (lastInput == "Begin")) {
        console.log("BEGIN AT INPUT VALUE: " + lastInput);
        mainGame.prog = 1
        addLog('- - -');
        addLog('ADVENTURE BEGINS');
        runScene();
    } else if (mainGame.prog == 0) {
        addLog('Type "Begin" to start the game.');
    } else if ((waiting = true) && (lastInput == "Next")) {
        console.log("NEXT AT INPUT VALUE: " + lastInput);
        runScene();
    } else {
        scene.options.forEach(function(entry) {
            if (lastInput == entry.title) {
                var sceneState = entry.script(mainGame, mainChar, mainInv);
                var opts = document.getElementById("optionsEl");
                while (opts.hasChildNodes()) {
                    opts.removeChild(opts.firstChild);
                  }
                addLog('- Type "Next" to continue');
                for (const property in mainGame) {mainGame[property] = sceneState.sceneGame[property]}
                for (const property in mainChar) {mainChar[property] = sceneState.sceneChar[property]}
                for (const property in mainGame) {mainInv[property] = sceneState.sceneInv[property]}
                waiting = true;
            }
        });
    }
}

//INITIALISE CONSOLE ELEMENT
console.log("logEl test start");
addLog("R  O  A  M");
addLog('"Begin" your new adventure...');
console.log("logEl test end");

//EVENT LISTENERS
document.getElementById("enterInputEl").addEventListener("click", () => {
    console.log("Enter Registered")
    takeInput()
});

document.getElementById("typeInputEl").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { 
        console.log("Enter Registered")
        takeInput() }
});
