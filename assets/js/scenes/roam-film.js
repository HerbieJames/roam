function addLog(txt) {
    let entryParent = document.getElementById("consoleLogEl");
    let newEntry = document.createElement("p");
    newEntry.className = "log-entry";
    newEntry.innerHTML = txt;
    entryParent.appendChild(newEntry);
}

export const scenes = [
    //CAMPFIRE
    {title: "Campfire",
        preReq: {reqGame: {area: "forest"}, reqChar: {}, reqInv: {}},
        script(game, character, inventory) {
            game.time = "night";
            addLog("You come upon a clearing with an unlit campfire.");
            return {sceneGame: game, sceneChar: character, sceneInv: inventory};
        },
        options: [
            //MOVE ON
            {title: "Move on.", 
                script(game, character, inventory) {
                    addLog("You move on.");
                    return {sceneGame: game, sceneChar: character, sceneInv: inventory};
                },
                preReq: {reqGame: {}, reqChar: {}, reqInv: {}}
            },
            //SET UP CAMP
            {title: "Set up camp.", 
                script(game, character, inventory) {
                    game.time = game.time === "day" ? "night" : "day";
                    if (character.health < 5) {character.health += 1;}
                    addLog("You spend some time here to recover your health.");
                    return {sceneGame: game, sceneChar: character, sceneInv: inventory};
                },
                preReq: {reqGame: {}, reqChar: {}, reqInv: {}}
            }
        ]
    },
    //WISHING WELL
    {title: "Wishing Well",
        preReq: {mainGame: {area: "city"}, mainChar: {}, mainInv: {}},
        script(game, character, inventory) {
            addLog("The streets open up about a fountain.");
            return {sceneGame: game, sceneChar: character, sceneInv: inventory};
        },
        options: [
            //MOVE ON
            {title: "Move on.", 
                script(game, character, inventory) {
                    addLog("You move on.");
                    return {sceneGame: game, sceneChar: character, sceneInv: inventory};
                },
                preReq: {mainGame: {}, mainChar: {}, mainInv: {}}
            },
            //MAKE A WISH
            {title: "Make a wish.", 
                script(game, character, inventory) {
                    console.log("LUCK: " + game.luck);
                    game.luck += game.luck >= 4 ? 0 : 1;
                    console.log("LUCK: " + game.luck);
                    if (character.health < 5) {character.health += 1;}
                    addLog("You make a quiet prayer to yourself before moving on.");
                    return {sceneGame: game, sceneChar: character, sceneInv: inventory};
                },
                preReq: {mainGame: {}, mainChar: {}, mainInv: {}}
            }
        ]
    },
    //CITY GATES
    {title: "City Gates",
        preReq: {reqGame: {area: "forest"}, reqChar: {}, reqInv: {}},
        script(game, character, inventory) {
            addLog("Eventually, you come upon a gated entrance, flanked by towering stone walls. Bustle and voices spill from the other side and it's perimeter extends beyond your view.");
            return {sceneGame: game, sceneChar: character, sceneInv: inventory};
        },
        options: [
            //MOVE ON
            {title: "Move on.", 
                script(game, character, inventory) {
                    addLog("You move on.");
                    return {sceneGame: game, sceneChar: character, sceneInv: inventory};
                },
                preReq: {mainGame: {}, mainChar: {}, mainInv: {}}
            },
            //ENTER THE CITY
            {title: "Enter the city.", 
                script(game, character, inventory) {
                    game.area = "city";
                    addLog("Signalling to the city guard, the gates are openned, as you take your granted passage into the city.");
                    return {sceneGame: game, sceneChar: character, sceneInv: inventory};
                },
                preReq: {mainGame: {}, mainChar: {}, mainInv: {}}
            }
        ]
    }
]