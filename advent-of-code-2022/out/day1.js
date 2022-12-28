"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day1/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
const lines = fileReader();
const partOne = () => {
    let currSum = 0, bestSum = 0;
    for (let i = 0; i < lines.length; i++) {
        const cal = parseInt(lines[i]);
        if (cal) {
            currSum += cal;
        }
        else {
            if (currSum > bestSum) {
                bestSum = currSum;
            }
            currSum = 0;
        }
    }
    return bestSum;
};
const partTwo = () => {
    let currSum = 0;
    const bestSum = { small: null, medium: null, large: null };
    for (let i = 0; i < lines.length; i++) {
        const cal = parseInt(lines[i]);
        if (cal) {
            currSum += cal;
        }
        else {
            if (currSum >= bestSum.large) {
                bestSum.small = bestSum.medium;
                bestSum.medium = bestSum.large;
                bestSum.large = currSum;
            }
            else if (currSum >= bestSum.medium) {
                bestSum.small = bestSum.medium;
                bestSum.medium = currSum;
            }
            else if (currSum >= bestSum.small) {
                bestSum.small = currSum;
            }
            currSum = 0;
        }
    }
    return bestSum.small + bestSum.medium + bestSum.large;
};
console.log(`Part 1 solution: total calories for the top elf ${partOne()}`);
console.log(`Part 2 solution: total calories for the top 3 elfs ${partTwo()}`);
//# sourceMappingURL=day1.js.map