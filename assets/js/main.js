const game = { 
    prog: 0, // game ends at 10
    area: "", // "forest", "city" or "dungeon"
    luck: 0, // 0 -> 0.25
    time: "" // "night" or "day"
}

const character = {// initialise 0 values in character generation (5pts)
    strength: 0, // 0 -> 5
    speed: 0, // 0 -> 5
    cunning: 0, // 0 -> 5
    health: 5 // 0 -> 5
}

function addLog(txt) {
    let entryParent = document.getElementById("consoleEl");
    let newEntry = document.createElement("p");
    newEntry.className = "console-entry";
    newEntry.innerHTML = txt;
    entryParent.appendChild(newEntry);
}

// on progress up, let user increment strength, speed, or cunning

// on progress 10, run final scene