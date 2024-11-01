function addLog(txt) {
    let entryParent = document.getElementById("consoleLogEl");
    let newEntry = document.createElement("p");
    newEntry.className = "log-entry";
    newEntry.innerHTML = txt;
    entryParent.appendChild(newEntry);
}

export const scenes = [
{title: "Campfire", // purpose: toggles time
    opt1Name: "Move on.",
    opt2Name: "Set up camp.",
    opt3Name: "",
    opt4Name: "",
    preReq: {preGame: {area: "forest"}, preChar: {}, preInv: {}},
    introScript(game, character, inventory) {
        game.time = "night";
        addLog("You come upon a clearing with an unlit campfire.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    },
    opt1Script(game, character, inventory) {
        addLog("You move on.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    },
    opt2Script(game, character, inventory) {
        game.time = game.time === "day" ? "night" : "day";
        if (character.health < 5) {character.health += 1;}
        addLog("You spend some time here to recover your health.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    },
    opt3Script(game, character, inventory) {
        /**/
        return {sceneGame: game, sceneChar: character, sceneInv: inventory}
    },
    opt4Script(game, character, inventory) {
        /**/
        return {sceneGame: game, sceneChar: character, sceneInv: inventory}
    } } ,

{title: "Wishing well", // purpose: improves luck
    opt1Name: "Move on.",
    opt2Name: "Make a wish.",
    opt3Name: "",
    opt4Name: "",
    preReq: {mainGame: {area: "city"}, mainChar: {}, mainInv: {}},
    introScript(game, character, inventory) {
        addLog("The streets open up about a fountain.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    },
    opt1Script(game, character, inventory) {
        addLog("You move on.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    },
    opt2Script(game, character, inventory) {
        game.luck += game.luck >= 4 ? 0 : 1;
        if (character.health < 5) {character.health += 1;}
        addLog("You make a quiet prayer to yourself before moving on.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    },
    opt3Script(game, character, inventory) {
        /**/
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    },
    opt4Script(game, character, inventory) {
        /**/
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};
    } } ,

{title: "City Gates",
    opt1Name: "Move on.",
    opt2Name: "Enter the City.",
    opt3Name: "",
    opt4Name: "",
    preReq: {preGame: {area: "forest"}, preChar: {}, preInv: {}},
    introScript(game, character, inventory) {
        addLog("Eventually, you come upon a gated entrance, flanked by towering stone walls. Bustle and voices spill from the other side and it's perimeter extends beyond your view.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt1Script(game, character, inventory) {
        addLog("You move on.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt2Script(game, character, inventory) {
        game.area = "city";
        addLog("Signalling to the city guard, the gates are openned, as you take your granted passage into the city.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt3Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt4Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};}
},

{title: "City Limits",
    opt1Name: "Move on.",
    opt2Name: "Leave the City.",
    opt3Name: "",
    opt4Name: "",
    preReq: {preGame: {area: "city"}, preChar: {}, preInv: {}},
    introScript(game, character, inventory) {
        addLog("Eventually, you come upon a gated entrance, flanked by towering stone walls. Bustle and voices spill from the other side and it's perimeter extends beyond your view.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt1Script(game, character, inventory) {
        addLog("You move on.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt2Script(game, character, inventory) {
        game.area = "forest";
        addLog("Signalling once again to the guard, the gates are openned and you take your leave from the city.");
        return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt3Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};},
    opt4Script(game, character, inventory) {return {sceneGame: game, sceneChar: character, sceneInv: inventory};}
}


    // place changes scenes (challenge character but increase progress after dungeons)

    // decrease luck scene
]