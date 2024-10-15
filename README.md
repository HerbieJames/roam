#  Roam: a one-page, web-based game.
## Overview
**Live link:** 

### Purpose

### Target Audience

### User Stories
- **As a, ... I can:** ... **...so that:**

### Wireframes

## Considerations
### Technology
#### Data storage:
- **JSON:** Given that the project would need to manage a great deal of static data, between all the possible scenes and threads that could be run, JSON was considered for storing this data. However, it's key drawback is that it is unable to store methods, which are vital to the functionality of both scenes, and threads.
- **Objects in .js files:** Writing all the scenes into one array, each as their own object, has a great deal of practical disadvantages when it comes to writing a large number of scenes. It also would make the main.js code difficult to navigate. However, at this stage in my experience as a junior developer, javascript's ability to store methods in objects does make it a solution to the issue of how scenes and threads should be stored. To keep the main.js code easier to navigate, seperate files are written in and exported from for the initScenes, subScenes and threadIndex arrays.
#### Art:
- **Tiny Glade:** For creating dozens of unique images to display with each scenes, Tiny Glade was considered as a way to accomplish this, chiefly for it's wide host of customization options. However, several drawbacks meant it was impossible to work with. My local environments specifications meant that running the program was extremely slow and unwieldy, and creating scenes with the degree of customization that I would have prefered was not available in the software's demo version.

### Accessibility
- **...:** ...

### Aesthetics
- **...:** ...

## Features
Features in this project have been prioretized using MoSCoW.
### Must-Haves
- **Console:** To emmulate the text-based adventure experience from such computer games, a "console" to output the outcomes of certain decisions, and to narrate scenes is crutial to the page's functionality.
- **ViewPort:** To display artwork and add visual appeal to the scenes and games. This is a must have because it is a large advantage provided within using a web-based format for the application.
### Should-Haves
- **Main Menu:** To be able to incorperate a log-in would not be possible without Django, but a simple system of generating "save codes" could be employed to return to personal progress, and even to share save states with friends.
### Could-Haves
- **Encrypted Save Codes:** Generating a "save code" would be as simple as writing all the key values from the main.js to a string, so that loading a save could be accomplished as simply as reading those key values from it, and setting them in the main.js accordingly. However, given the solution's simplicity, it would be easy for user's to change these values to change any of the game's (for example, character health) and essentially cheat. This would devalue player progress, so incorperating a simple key-based encryption when generating the save codes could disinsentivize this practice.
### Won't-Haves
- **Multiplayer with Room Codes:** Similar to Kahoot!, Django could have been incorperated to facilitae room codes which could be used to create parties of adventurers. Players could have voted on outcomes to scenes, and exchange equiptment as the adventures continued. Incorperation of this feature would have meant a specific attention to how the player characters are interacted with by the rest of the code (i.e. taking damage, recieving items, experiencing stat changes), and would have demanded consideration from the very beginning of the project. At the time as a Junior Developer, this would not have been within the realm of feasibility, as learning the Django to incorperate the technology would not have suited the time frame.

## Deployment
### Going Live

### Testing Results

### Validation


---
***Dependencies:***
