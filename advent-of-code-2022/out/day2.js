"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day2/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
/*
            Opponent:   You:    Score for choice:
Rock        A           X       1
Paper       B           Y       2
Scissors    C           Z       3
Win 6
Loss 0
Draw 3
*/
const lines = fileReader();
const partOne = () => {
    const scores = {
        "A X": 4,
        "A Y": 8,
        "A Z": 3,
        "B X": 1,
        "B Y": 5,
        "B Z": 9,
        "C X": 7,
        "C Y": 2,
        "C Z": 6,
    };
    let score = 0;
    for (const line of lines) {
        score += scores[line];
    }
    return score;
};
/*
X means you need to lose
Y means you need to end the round in a draw
Z means you need to win.
*/
const partTwo = () => {
    const scores = {
        "A X": 3,
        "A Y": 4,
        "A Z": 8,
        "B X": 1,
        "B Y": 5,
        "B Z": 9,
        "C X": 2,
        "C Y": 6,
        "C Z": 7,
    };
    let score = 0;
    for (const line of lines) {
        score += scores[line];
    }
    return score;
};
console.log(`Total score for part 1: ${partOne()}`);
console.log(`Total score for part 2: ${partTwo()}`);
//# sourceMappingURL=day2.js.map