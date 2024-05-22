# Road Connect Game

Road Connect Game is a multi-level, interactive game developed using Cocos Creator. The game features a start scene, level selection, and several engaging levels with different challenges.

## Installation

1. **Clone the repository:**
	git clone git@github.com:dikshant3221/roadConnect.git
 

2. **Navigate to the project directory:**
    cd RoadConnect

3. **Install dependencies:**

    Ensure you have Cocos Creator installed. You can download it from [Cocos Creator](https://www.cocos.com/en/creator).

4. **Open the project in Cocos Creator:**

    Open Cocos Creator, and then open the `RoadConnect` directory as a project.

## Usage

1. **Start the game:**

    Open Cocos Creator, and run the project using the play button in the editor.

2. **Navigate through scenes:**

    - Start at the Start Scene
    - Select a level from the Level Selection Scene
    - Play through the different levels
	
### Running Locally

1. **Open Cocos Creator and build the project:**
    - Open the project in Cocos Creator.
    - Go to the `Project` menu and select `Build...`.
    - Select `Web Mobile` or `Web Desktop` as the platform.
    - Click `Build`.

2. **Serve the project locally:**

    **Using Node.js:**
    ```
    npm install -g http-server
    cd build/web-mobile
    http-server
    ```
    Open your mobile browser and navigate to `http://localhost:8080`.


## Game Structure

The game consists of multiple scenes and components, each handling different aspects of the game functionality.

### Code Overview

- Key scripts and components are located in the `assets/scripts` directory.
- The main scenes and their functionality are defined in the respective TypeScript files.

### Scenes

1. **StartScene**
    - Displays the start screen with a play button.
    - Animates labels and transitions to the level selection scene.

2. **LevelSelectionScene**
    - Allows players to choose from different levels.
    - Draws background and UI components.

3. **LevelsScene**
    - Individual levels with unique challenges.
    - Each level transitions to the next upon completion.
	- On Last level completion redirect user to same level selction screen.

### Components

1. **StartScene**
    - Handles UI interactions and animations on the start screen.
    - Transitions to the Level Selection scene on button click.

2. **TextAnimator**
    - Animates text labels within a scene.
    - Moves the text label from one position to another.

3. **RotateButton**
    - Manages button rotation interactions within a level.
    - Ensures buttons are rotated to their final positions before proceeding.

4. **LevelSelectionScene**
    - Manages level selection interactions.
    - Draws background graphics and handles button clicks to load levels.
	
###Contributing
	-Fork the repository.
	-Create a new branch (git checkout -b feature-branch).
	-Make your changes.
	-Commit your changes (git commit -m 'Add some feature').
	-Push to the branch (git push origin feature-branch).
	-Open a pull request.
	
###License
This project is licensed under the MIT License.