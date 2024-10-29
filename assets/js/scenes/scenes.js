import { game, character, addLog} from "../main"
/* 
game = {
    time: "night" or "day"
    area: "forest" or "dungeon" or "city"
    luck: 0 -> 5
    prog: 0 -> 10
    }
character = {
    strength: 0 -> 5
    speed: 0 -> 5
    cunning: 0 -> 5
    health: 0 -> 5
*/


export const scenes = [
{title: "Campfire", // purpose: toggles time
    opt1Name: "Move on.",
    opt2Name: "Set up camp.",
    opt3Name: "",
    opt4Name: "",
    preReq: {area: "forest"},
    introScript() {
        game.time = "night";
        addLog("You come upon a clearing with an unlit campfire.");
    },
    opt1Script() {
        addLog("You move on.");
    },
    opt2Script() {
        game.time = game.time === "day" ? "night" : "day";
        if (character.health < 5) {character.health += 1;}
        addLog("You spend some time here to recover your health.");
    },
    opt3Script() {/**/},
    opt4Script() {/**/} } ,

{title: "Wishing well", // purpose: improves luck
    opt1Name: "Move on.",
    opt2Name: "Make a wish.",
    opt3Name: "",
    opt4Name: "",
    preReq: {area: "city"},
    introScript() {
        addLog("The streets open up about a fountain.");
    },
    opt1Script() {
        addLog("You move on.");
    },
    opt2Script() {
        game.luck += game.luck >= 4 ? 0 : 1;
        if (character.health < 5) {character.health += 1;}
        addLog("You make a quiet prayer to yourself before moving on.");
    },
    opt3Script() {/**/},
    opt4Script() {/**/} } ,

    // place changes scenes (challenge character but increase progress after dungeons)

    // decrease luck scene
]