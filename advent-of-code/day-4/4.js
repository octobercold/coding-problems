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

const strikeNumber = (board, num) => {
    console.log("checking board: ", board, " looking for num: ", num);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (parseInt(board[i][j]) === num) {
                board[i][j] = -1;
                console.log("found num :", num, " at i: ", i, " j: ", j);
                if (checkHor(board, i) || checkVer(board, j)) {
                    return { board: board, num: num };
                }
                console.log("no winning lines");
            }
        }
    }
    return false;
};

const checkHor = (board, i) => {
    console.log("checking horizontal line: ", i, " from board: ", board);
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== -1) {
            return false;
        }
    }
    return true;
};

const checkVer = (board, j) => {
    console.log("checking vertical line: ", j, " from board: ", board);
    for (let i = 0; j < board.length; i++) {
        if (board[i][j] !== -1) {
            return false;
        }
    }
    return true;
};

const countPoints = (board, num) => {
    console.log("counting points in board: ", board);
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== -1) {
                sum += parseInt(board[i][j]);
                console.log("sum: ", sum, " + board[i][j]: ", board[i][j]);
            }
        }
    }
    return sum * num;
};

const checkAllBoards = (boards, num) => {
    console.log("checking all boards for num: ", num);
    for (board of boards) {
        let strikeResult = strikeNumber(board, num);
        if (strikeResult) {
            let res = countPoints(strikeResult.board, strikeResult.num);
            return res;
        }
    }
    return false;
};

const playGame = (randomNumbers, boards) => {
    for (const num of randomNumbers) {
        let temp = checkAllBoards(boards, num);
        if (temp) {
            return temp;
        }
    }
    return "no winning board";
};

console.log(playGame(randomNumbers, boards));
