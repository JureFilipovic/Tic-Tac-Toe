# Tic-Tac-Toe

## Description
This is a simple implementation of the classic Tic-Tac-Toe game built using JavaScript, HTML, and CSS. It supports two-player gameplay, tracks player scores, and provides a smooth user experience with automated game resets. While it is not explicitly designed with responsive CSS techniques, the game is functional and looks good on both desktop and mobile devices.

---

## Features
- **Two-player gameplay:** Allows two players to compete against each other.
- **Score tracking:** Keeps track of each player's score across multiple rounds.
- **Dynamic UI updates:** Updates the game board and player information dynamically without page reloads.
- **Win/draw detection:** Detects and announces wins and draws with a smooth transition to the next round.
- **Name customization:** Players can optionally input their names before starting.
- **Auto-reset functionality:** Automatically resets the game after displaying the result of a round.
- **Mobile-friendly:** The game works well on mobile devices and adjusts adequately without requiring specific responsive design techniques.

---

## How to Play
1. Open the application in a web browser.
2. (Optional) Enter player names in the input fields provided.
3. Press the **Start** button to begin the game.
4. Players take turns clicking on the cells of the game board to place their token ('X' or 'O').
5. The game ends when a player forms a line (row, column, or diagonal) or when the board is full (draw).
6. The result is displayed, and the game automatically resets for the next round.
7. To reset scores and player names, press the **Restart** button.

You can also play the game online here: [Tic-Tac-Toe on GitHub Pages](https://jurefilipovic.github.io/Tic-Tac-Toe/)

---

## File Structure
```
├── index.html          # Main HTML file
├── style.css           # CSS file for styling the application
├── script.js           # JavaScript file containing game logic
```

---

## How It Works
### Modules and Components
1. **Gameboard Module**:
   - Manages the game board as a 3x3 grid.
   - Handles operations like resetting the board, adding tokens, and checking for wins or draws.

2. **Cell Factory Function**:
   - Represents individual cells on the board.
   - Tracks the value of the cell ('X', 'O', or empty).

3. **Player Factory Function**:
   - Creates Player objects with name, token, and score properties.
   - Provides methods for retrieving and updating player data.

4. **Game Controller Module**:
   - Orchestrates the game flow by managing turns, detecting results, and maintaining player data.
   - Alternates the starting player after each round.

5. **Display Controller Module**:
   - Manages the user interface, including the game board, player turn display, and results.
   - Handles interactions like cell clicks and button events.

---

## Installation and Usage
1. Clone this repository or download the source files.
   ```
   git clone <repository-url>
   ```
2. Open the `index.html` file in a web browser.
3. Enjoy the game!

---

## Customization
- **Styling:** Modify `style.css` to change the appearance of the game.
- **Logic:** Enhance `app.js` to introduce new features like AI for single-player mode or additional game rules.

---

## Credits
This project was built as a learning exercise to practice JavaScript module patterns, DOM manipulation, and game development concepts. Special thanks to the GitHub Pages platform for easy deployment.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

