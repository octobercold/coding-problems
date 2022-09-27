const { ReadableByteStreamController } = require("node:stream/web");
const fileReader = require("../fileReader");

const randomNumbers = [
    91, 17, 64, 45, 8, 13, 47, 19, 52, 68, 63, 76, 82, 44, 28, 56, 37, 2, 78,
    48, 32, 58, 72, 53, 9, 85, 77, 89, 36, 22, 49, 86, 51, 99, 6, 92, 80, 87, 7,
    25, 31, 66, 84, 4, 98, 67, 46, 61, 59, 79, 0, 3, 38, 27, 23, 95, 20, 35, 14,
    30, 26, 33, 42, 93, 12, 57, 11, 54, 50, 75, 90, 41, 88, 96, 40, 81, 24, 94,
    18, 39, 70, 34, 21, 55, 5, 29, 71, 83, 1, 60, 74, 69, 10, 62, 43, 73, 97,
    65, 15, 16,
];

const lines = fileReader();
let board = [];
let boards = [];
lines.forEach((line) => {
    if (line.length === 0 || line === " ") {
        boards.push(board);
        board = [];
    } else {
        board.push(line.trim().split(/\s+/));
    }
});

const strikeInOneBoard = (board, boardIndex, num) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (parseInt(board[i][j]) === num) {
                board[i][j] = -1;
                return { strikedAtI: i, strikedAtJ: j };
            }
        }
    }
    return false;
};

const strikeInAllBoards = (
    boards,
    num,
    boardsIndecesThatWon,
    lastWonNumber,
    lastWonBoard
) => {
    for (let i = 0; i < boards.length; i++) {
        //check if the board already won and skip it if it did
        if (!boardsIndecesThatWon.includes(i)) {
            let strikeResult = strikeInOneBoard(boards[i], i, num);
            if (strikeResult) {
                //check that board if it won
                if (
                    checkHor(boards[i], strikeResult.strikedAtI) ||
                    checkVer(boards[i], strikeResult.strikedAtJ)
                ) {
                    //push index to exclude them from checking or striking at all
                    boardsIndecesThatWon.push(i);
                    lastWonNumber.push(num);
                    lastWonBoard.push(boards[i]);
                    // console.log(`boards indeces that won: ${boardsIndecesThatWon}\n
                    // last won number: ${lastWonNumber}\n
                    // last won board: ${lastWonBoard}\n`);
                }
            }
        }
    }
    return;
};

const checkAllNums = (boards, randomNumbers) => {
    let boardsIndecesThatWon = [];
    let lastWonNumber = [];
    let lastWonBoard = [];
    for (let i = 0; i < randomNumbers.length; i++) {
        strikeInAllBoards(
            boards,
            randomNumbers[i],
            boardsIndecesThatWon,
            lastWonNumber,
            lastWonBoard
        );
    }
    return { lastWonBoard, lastWonNumber };
};

const checkHor = (board, i) => {
    //console.log("checking horizontal line: ", i, " from board: ", board);
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== -1) {
            return false;
        }
    }
    return true;
};

const checkVer = (board, j) => {
    //console.log("checking vertical line: ", j, " from board: ", board);
    for (let i = 0; i < board.length; i++) {
        if (board[i][j] !== -1) {
            return false;
        }
    }
    return true;
};

const countPoints = (board, num) => {
    //console.log("counting points in board: ", board);
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== -1) {
                sum += parseInt(board[i][j]);
                //console.log("sum: ", sum, " + board[i][j]: ", board[i][j]);
            }
        }
    }
    return sum * num;
};

const { lastWonBoard, lastWonNumber } = checkAllNums(boards, randomNumbers);
const res = countPoints(
    lastWonBoard[lastWonBoard.length - 1],
    lastWonNumber[lastWonNumber.length - 1]
);

console.log(res);
