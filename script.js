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

