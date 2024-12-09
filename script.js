/**
** The Gameboard represents the state of the board.
** Each square holds a Cell and we expose a dropToken method
** to add cells to squares.
*/
const gameboard = (function () {
    const board = [];

    // Create 3x3 2d array that will represent the board
    // and fill it with empty cells.
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    // Method for getting the entire board for rendering.
    const getBoard = () => board;

    // Method for checking if tha entire board is filled.
    const checkBoardFull = () => {
         for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].getValue() === "") {
                    return 0;
                }
            }
        }
        return 1;
    }

    // Checks win conditions. Returns winning players token
    // or null if no winner.
    const checkWin = () => {
        for (let i = 0; i < 3; i++) {
            // Check row
            if (
                board[i][0].getValue() !== "" &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][1].getValue() === board[i][2].getValue()
            ) {
                return board[i][0].getValue();
            }

            // Check column
            if (
                board[0][i].getValue() !== "" &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[1][i].getValue() === board[2][i].getValue()
            ) {
                return board[0][i].getValue();
            }
        }

        // Check diagonals
        if (
            board[0][0].getValue() !== "" &&
            board[0][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][2].getValue()
        ) {
            return board[0][0].getValue();
        }

        if (
            board[2][0].getValue() !== "" &&
            board[2][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[0][2].getValue()
        ) {
            return board[2][0].getValue();
        }

        return null; // No winner
    }
    
    // Method for adding a player's token to the cell.
    const dropToken = (row, column, playerToken) => {
        // Checks if the cell is empty
        if (board[row][column].getValue() !== "") {
            console.log("Place already taken!");
            return 0; // Indicates failure
        }

        // Place the player's token in the empty cell.
        board[row][column].addToken(playerToken);
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
    const playRound = (row, column) => {
        console.log (`Adding ${getActivePlayer().getName()}'s token into 
                    [${row}][${column}] place.`);

        // Attempt to drop the token and check if it succeeds
        if (!gameboard.dropToken(row, column, getActivePlayer().getToken())) {
            console.log ("Dropping token failed, try again");
            return;
        }

        printRound();
        switchPlayerTurn();
    }

    return {
        playRound,
        getActivePlayer 
    };
})();