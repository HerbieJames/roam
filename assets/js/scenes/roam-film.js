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

    // place changes scenes (challenge character but increase progress after dungeons)

    // decrease luck scene
]