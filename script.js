/**
 * Gameboard Module
 * -----------------
 * Represents the state of the game board.
 * - Manages individual cells as Cell objects.
 * - Provides methods to reset the board, add tokens, check for a winner,
 *   and determine if the board is full.
*/
const gameboard = (function () {
    const board = [];

    // Method to reset the board to its initial state
    const resetBoard = () => {
        // Create 1D array filled with 9 Cells that will represent the board
        for (let i = 0; i < 9; i++) {
            board[i] = Cell();
        }
    };
    
    // Initialize the board
    resetBoard();

    // Method for getting the entire board for rendering.
    const getBoard = () => board;

    // Method for checking if the entire board is filled.
    const checkBoardFull = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i].getValue() === "") return 0;
        }
        return 1;
    }

    // Checks win conditions. Returns winning player's token
    // or null if no winner.
    const checkWin = () => {
        // Check row
        for (let i = 0; i < 9; i += 3) {
            if (
                board[i].getValue() !== "" &&
                board[i].getValue() === board[i + 1].getValue() &&
                board[i + 1].getValue() === board[i + 2].getValue()
            ) {
                return board[i].getValue();
            }
        }

        // Check column
        for (let i = 0; i < 3; i++) {
            if (
                board[i].getValue() !== "" &&
                board[i].getValue() === board[i + 3].getValue() &&
                board[i + 3].getValue() ===board[i + 6].getValue()
            ) {
                return board[i].getValue();
            }
        }
        // Check diagonals
        if (
            board[0].getValue() !== "" &&
            board[0].getValue() === board[4].getValue() &&
            board[4].getValue() === board[8].getValue()
        ) {
            return board[0].getValue();
        }

        if (
            board[2].getValue() !== "" &&
            board[2].getValue() === board[4].getValue() &&
            board[4].getValue() === board[6].getValue()
        ) {
            return board[2].getValue();
        }

        return null; // No winner
    }
    
    // Method for adding a player's token to the cell.
    const dropToken = (index, playerToken) => {
        // Checks if the cell is empty
        if (board[index].getValue() !== "") {
            return 0; // Indicates failure
        }

        // Place the player's token in the empty cell.
        board[index].addToken(playerToken);
        return 1; // Indicates success
    };
    
    return {
        getBoard,
        dropToken,
        checkBoardFull,
        checkWin,
        resetBoard
    }
})();

/**
 * Cell Factory Function
 * ----------------------
 * Represents a single cell on the game board.
 * - Tracks the value of the cell (empty, "X", or "O").
 * - Provides methods to add a token to the cell and retrieve its value.
*/
function Cell () {
    let value = "";

    // Takes player's token to change the value of the cell
    const addToken = (playerToken) => {
        value = playerToken;
    };

    // Returns the value of the cell
    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

/**
 * Player Factory Function
 * ------------------------
 * Creates a Player objects.
 * - Tracks the player's name, token ("X" or "O") and score.
 * - Provides methods to retrieve the player's information and update the score.
*/
function Player (name, token) {
    let score = 0;

    const increaseScore = () => score++;
    const getScore = () => score;
    const getName = () => name;
    const getToken = () => token;
    
    return { 
        getName,
        getToken,
        getScore,
        increaseScore
    };
}

/**
 * Game Controller Module
 * -----------------------
 * Manages the overall game flow.
 * - Handles player turns, tracks the active player, and determines the winner.
 * - Resets the game state and maintains player data across rounds.
 * - Provides methods for creating players, switching turns, and playing a round.
 */
const game = (function () {
    const players = [];
    let activePlayer;
    let startingPlayer = 0;

    // Creating players array and two Player objects.
    const createPlayers = (playerOneName, playerTwoName) => {
        players[0] = Player (playerOneName, "X");
        players[1] = Player (playerTwoName, "O");
        activePlayer = players[0];
    }
    
    // Expose players array
    const getPlayers = () => {
        return players;
    }

    // Method for switching players turn.
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    // Method for getting the active player
    const getActivePlayer = () => activePlayer;

    // Reset method to clear the game state
    const reset = () => {
        gameboard.resetBoard();
        activePlayer = players[startingPlayer];
    }

    // Method for playing one round. It takes row and column number (starting with 0)
    // and calls gameboard's dropToken method. Also prints round and switches players turn.
    const playRound = (index) => {
        // Attempt to drop the token and check if it succeeds
        if (!gameboard.dropToken(index, getActivePlayer().getToken())) {
            return null;
        }

        // Check for a win
        const winningToken = gameboard.checkWin();
        if (winningToken) {
            const winningPlayer = players.find(player => player.getToken() === winningToken);
            winningPlayer.increaseScore();
            startingPlayer = players.indexOf(winningPlayer) === 0 ? 1 : 0;
            return winningPlayer; // End the game
        }

        // Check for a draw
        if (gameboard.checkBoardFull()) {
            return "draw"; // End the game
        }
        switchPlayerTurn();
    }

    return {
        playRound,
        getActivePlayer,
        reset,
        createPlayers,
        getPlayers
    };
})();

/**
 * Display Controller Module
 * --------------------------
 * Handles the user interface and interactions.
 * - Updates the display to reflect the current game state.
 * - Manages event listeners for the game board and control buttons.
 * - Displays game result and resets the game for new rounds.
 */
const displayController = (function () {
    const boardDiv = document.querySelector(".board");
    const playerTurnDiv = document.querySelector(".turn");
    const restartButton = document.querySelector(".restart");
    const startButton = document.querySelector(".start");
    const playerOneScoreDisplay = document.querySelector(".player1score");
    const playerTwoScoreDisplay = document.querySelector(".player2score");
    let gameActive = false;

    // Initial message and start game
    const init = () => {
        playerTurnDiv.textContent = "Press start button to start the game. Optionally enter names."
        startButton.addEventListener("click", startGame);
    }

    // Method for getting player's names
    const getPlayerNames = () => {
        const inputNameOne = document.querySelector("#player1name");
        const inputNameTwo = document.querySelector("#player2name");

        const playerOne = inputNameOne.value || "Player One";
        const playerTwo = inputNameTwo.value || "Player Two";

        inputNameOne.value = "";
        inputNameTwo.value = "";

        game.createPlayers (playerOne, playerTwo);
    }

    // Update player score display
    const playerScoreDisplay = () => {
        const players = game.getPlayers();
        playerOneScoreDisplay.textContent = `${players[0].getName()} score: ${players[0].getScore()}`;
        playerTwoScoreDisplay.textContent = `${players[1].getName()} score: ${players[1].getScore()}`;

    }

    // Method for starting the game
    const startGame = () => {
        startButton.disabled = true;
        getPlayerNames();
        gameActive = true;
        updateScreen();
    }

    // Auto starts new game with same players and score
    const autoStartNewGame = () => {
        game.reset();
        gameActive = true;
        updateScreen();
    }

    // Displays result of a game and starts a new one
    const displayResult = (result) => {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result");
        restartButton.disabled = true;

        if (result === "draw") {
            resultDiv.textContent = "It's a draw!";
        } else {
            resultDiv.textContent = `${result.getName()} wins!`;
        }

        boardDiv.appendChild (resultDiv);

        // Auto reset after timeout
        setTimeout(() => {
            boardDiv.removeChild(resultDiv);
            autoStartNewGame();
        }, 2000);
    }

    // Method for updating the screen
    const updateScreen = () => {
        // clear the screen
        boardDiv.textContent = "";
        restartButton.disabled = false;

        // get newest version of the board and player turn
        const board = gameboard.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.getName()}'s turn...`;

        // Render board squares
        board.forEach ((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");

            // Create data attribute to identify the index of the cell
            cellButton.dataset.index = index;
            cellButton.textContent = cell.getValue();
            cellButton.disabled = !gameActive;
            boardDiv.appendChild(cellButton);
        })

        playerScoreDisplay();
    }

    // Method for adding event listeners to the board
    const clickHandlerBoard = (e) => {
        if (!gameActive) return;

        const selectedIndex = parseInt(e.target.dataset.index, 10);

        // Make sure the cell is clicked and not the gaps in between
        if (isNaN(selectedIndex)) return;

        const result = game.playRound(selectedIndex);
        updateScreen();

        // If there is a result, declare the win or draw and block user from
        // dropping next token.
        if (result) {
            gameActive = false;
            displayResult(result);
            return;
        }
    }

    // Initial render
    init();

    boardDiv.addEventListener ("click", clickHandlerBoard);

    // Handles the restart button action
    restartButton.addEventListener("click", () => {
        startButton.disabled = false;
        playerOneScoreDisplay.textContent = "";
        playerTwoScoreDisplay.textContent = "";
        game.reset();
        init();
    });
})();