/**
** The Gameboard represents the state of the board.
** Each square holds a Cell and we expose a dropToken method
** to add cells to squares.
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
            if (board[i] === "") return 0;
        }
        resetBoard();
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
                resetBoard();
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
                resetBoard();
                return board[i].getValue();
            }
        }
        // Check diagonals
        if (
            board[0].getValue() !== "" &&
            board[0].getValue() === board[4].getValue() &&
            board[4].getValue() === board[8].getValue()
        ) {
            resetBoard();
            return board[0].getValue();
        }

        if (
            board[2].getValue() !== "" &&
            board[2].getValue() === board[4].getValue() &&
            board[4].getValue() === board[6].getValue()
        ) {
            resetBoard();
            return board[2].getValue();
        }

        return null; // No winner
    }
    
    // Method for adding a player's token to the cell.
    const dropToken = (index, playerToken) => {
        // Checks if the cell is empty
        if (board[index].getValue() !== "") {
            console.log("Place already taken!");
            return 0; // Indicates failure
        }

        // Place the player's token in the empty cell.
        board[index].addToken(playerToken);
        return 1; // Indicates success
    };

    // Method for printing a board filled with cell values.
    const printBoard = () => {
        const boardCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log (boardCellValues);
    }
    
    return {
        getBoard,
        dropToken,
        checkBoardFull,
        checkWin,
        printBoard
    }
})();

/**
** A Cell represents one field on the board
** Initial value is an empty string ("")
** X: Player one's token,
** O: Player two's token.
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
** Function for creating player objects.
*/
function Player (name, token) {
    const getName = () => name;
    const getToken = () => token;
    return { getName, getToken };
}

/**
 * Function for controlling the game flow.
 * It exposes playRound and getActivePlayer methods.
 */
const game = (function () {

    // Creating players array and two Player objects.
    const players = [];
    players[0] = Player ("PlayerOne", "X");
    players[1] = Player ("PlayerTwo", "O");

    // Setting PlayerOne as default active player
    let activePlayer = players[0];

    // Method for switching players turn.
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    // Method for checking which player is active one.
    const getActivePlayer = () => activePlayer;

    // Method for printing board.
    const printRound = () => {
        gameboard.printBoard();
    }

    // Method for playing one round. It takes row and column number (starting with 0)
    // and calls gameboards dropToken method. Also prints round and switches players turn.
    const playRound = (index) => {
        console.log (`Adding ${getActivePlayer().getName()}'s token into 
                    [${index}] place.`);

        // Attempt to drop the token and check if it succeeds
        if (!gameboard.dropToken(index, getActivePlayer().getToken())) {
            console.log ("Dropping token failed, try again");
            return;
        }

        // Check for a win
        const winningToken = gameboard.checkWin();
        if (winningToken) {
            const winningPlayer = players.find(player => player.getToken() === winningToken);
            console.log (`${winningPlayer.getName()} wins the game!`);
            printRound();
            return; // End the game
        }

        // Check for a draw
        if (gameboard.checkBoardFull()) {
            console.log ("It is a draw!");
            printRound();
            return; // End the game
        }

        printRound();
        switchPlayerTurn();
    }

    return {
        playRound,
        getActivePlayer 
    };
})();