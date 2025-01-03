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

let waiting = false;

let lastInput = ""

let scene = {};

function generateChar() {
    mainChar.strength = Math.ceil(Math.random()*5);
    mainChar.speed = Math.ceil(Math.random()*5);
    mainChar.cunning = Math.ceil(Math.random()*5);
    mainChar.health = 5;
    document.getElementById("charSTR").innerHTML = mainChar.strength;
    document.getElementById("charSPE").innerHTML = mainChar.strength;
    document.getElementById("charCUN").innerHTML = mainChar.strength;
    document.getElementById("charHEA").innerHTML = 5;
}

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
    document.getElementById("titleEl").innerHTML = scene.title;
    if (mainGame.area == "forest") {
        document.getElementById("viewportEl").style.backgroundImage = "url(./assets/images/forest.png)";
    } else if (mainGame.area == "city") {
        document.getElementById("viewportEl").style.backgroundImage = "url(./assets/images/city.jpeg)";
    }
    scene.options.forEach(function(entry, index) {
        addLog(index+1+": "+entry.title+"?");
    });

}

function takeInput() {
    lastInput = document.getElementById("typeInputEl").value;
    addLog("> "+lastInput);
    console.log('> "'+lastInput+'" ('+typeof(document.getElementById("typeInputEl").value)+")");
    document.getElementById("typeInputEl").value = "";
    if ((mainGame.prog == 0) && (dullEqual(lastInput, "begin"))) {
        mainGame.prog = 1
        generateChar()
        addLog('- - -');
        runScene();
    } else if (mainGame.prog == 0) {
        addLog('- Begin?');
    } else if ((waiting == true)) {
        console.log("WAITING = " + waiting);
        runScene();
    } else {
        scene.options.forEach(function(entry, index) {
            if (dullEqual(lastInput, entry.title) || dullEqual(lastInput, String(index+1))) {
                var sceneState = entry.script(mainGame, mainChar, mainInv);
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
