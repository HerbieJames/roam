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

const charName = "Adventurer"

let waiting = false;

let lastInput = ""

let scene = {};



/** Writes message to console element
 * 
 * @param {String} txt  The Contents of message to console element.
 */
function addLog(txt) {
    let entryParent = document.getElementById("consoleLogEl");
    let newEntry = document.createElement("p");
    newEntry.className = "log-entry";
    newEntry.innerHTML = txt;
    entryParent.appendChild(newEntry);
    entryParent.scrollTo(0, entryParent.scrollHeight);
}

/**
 * Compares to strings without case, space or special character consideration.
 * @param   {String}  a  A string to compare
 * @param   {String}  b  A string to compare
 * @returns {Boolean}    The result of whether their simplified versions are equal
 */
function dullEqual(a,b) {
    var simpleA = a.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    var simpleB = b.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    if (simpleA == simpleB) {return true;}
    else {return false;}

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
        valid = true;
        heldScene = film[Math.floor(Math.random()*(scenes.length))];
        console.log("Validating " + heldScene.title + "...")
        console.log("(Scene Area Pre-req= "+ heldScene.preReq.reqGame.area +")")
        if(scene == heldScene) {valid = false}
        for (const property in heldScene.preReq.reqGame) {
            console.table({"Demand": heldScene.preReq.reqGame[property], "Game": mainGame[property]})
            if (heldScene.preReq.reqGame[property] != mainGame[property]) {
                console.log("Invalid.")
                valid = false};
        }
        for (const property in heldScene.preReq.reqChar) {
            if (heldScene.preReq.reqChar[property] != mainChar[property]) {
                console.log("Invalid.")
                valid = false};
        }
        for (const property in heldScene.preReq.reqInv) {
            if (heldScene.preReq.reqInv[property] != mainInv[property]) {
                console.log("Invalid.")
                valid = false};
        } }
        console.log("Passed validation.")
    return heldScene;
}

function runScene() {
    waiting = false;
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
        addLog(" - "+entry.title+"?");
    });

}

function takeInput() {
    lastInput = document.getElementById("typeInputEl").value;
    addLog("> "+lastInput);
    console.log('> "'+lastInput+'" ('+typeof(document.getElementById("typeInputEl").value)+")");
    document.getElementById("typeInputEl").value = "";
    if ((mainGame.prog == 0) && (dullEqual(lastInput, "begin"))) {
        mainGame.prog = 1
        addLog('- - -');
        runScene();
    } else if (mainGame.prog == 0) {
        addLog('- Begin?');
    } else if ((waiting == true)) {
        console.log("WAITING = " + waiting);
        runScene();
    } else {
        scene.options.forEach(function(entry) {
            if (dullEqual(lastInput, entry.title)) {
                var sceneState = entry.script(mainGame, mainChar, mainInv);
                var opts = document.getElementById("optionsEl");
                while (opts.hasChildNodes()) {
                    opts.removeChild(opts.firstChild);
                  }
                for (const property in mainGame) {mainGame[property] = sceneState.sceneGame[property]}
                for (const property in mainChar) {mainChar[property] = sceneState.sceneChar[property]}
                for (const property in mainGame) {mainInv[property] = sceneState.sceneInv[property]}
                waiting = true;
            }
        });
    }
}

//INITIALISE CONSOLE ELEMENT
addLog("R  O  A  M");
addLog('"Begin" your new adventure...');


//EVENT LISTENERS
document.getElementById("enterInputEl").addEventListener("click", () => {
    console.log(" |")
    console.log("<-")
    takeInput()
});

document.getElementById("typeInputEl").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { 
        console.log(" |")
        console.log("<-")
        takeInput() }
});
