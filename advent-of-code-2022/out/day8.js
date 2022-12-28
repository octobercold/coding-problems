"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day8/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
const lines = fileReader();
let trees = [];
for (const line of lines) {
    trees.push(line.split(""));
}
trees = trees.map((t) => (t = t.map((tt) => parseInt(tt))));
//console.log(trees);
const partOne = () => {
    const checkTop = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let i = starti - 1; i >= 0; i--) {
            if (treeHeight <= trees[i][startj]) {
                return false;
            }
        }
        return true;
    };
    const checkRight = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let j = startj + 1; j < trees[starti].length; j++) {
            if (treeHeight <= trees[starti][j]) {
                return false;
            }
        }
        return true;
    };
    const checkDown = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let i = starti + 1; i < trees.length; i++) {
            if (treeHeight <= trees[i][startj]) {
                return false;
            }
        }
        return true;
    };
    const checkLeft = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let j = startj - 1; j >= 0; j--) {
            if (treeHeight <= trees[starti][j]) {
                return false;
            }
        }
        return true;
    };
    let numberOfVisibleTrees = 0;
    for (let i = 0; i < trees.length; i++) {
        for (let j = 0; j < trees[i].length; j++) {
            if (i === 0 || i === trees.length) {
                // console.log(
                //     `tree height ${trees[i][j]} at [${i},${j}] is at the top or bottom edge`
                // );
                numberOfVisibleTrees++;
                continue;
            }
            if (j === 0 || j === trees[i].length) {
                // console.log(
                //     `tree height ${trees[i][j]} at [${i},${j}] is at the left or right edge`
                // );
                numberOfVisibleTrees++;
                continue;
            }
            if (checkTop(i, j)) {
                // console.log(
                //     `tree height ${trees[i][j]} at [${i},${j}] is visible from top`
                // );
                numberOfVisibleTrees++;
                continue;
            }
            if (checkRight(i, j)) {
                // console.log(
                //     `tree height ${trees[i][j]} at [${i},${j}] is visible from right`
                // );
                numberOfVisibleTrees++;
                continue;
            }
            if (checkDown(i, j)) {
                // console.log(
                //     `tree height ${trees[i][j]} at [${i},${j}] is visible from bottom`
                // );
                numberOfVisibleTrees++;
                continue;
            }
            if (checkLeft(i, j)) {
                // console.log(
                //     `tree height ${trees[i][j]} at [${i},${j}] is visible from left`
                // );
                numberOfVisibleTrees++;
                continue;
            }
        }
    }
    return numberOfVisibleTrees;
};
const partTwo = () => {
    const checkTop = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let i = starti - 1; i >= 0; i--) {
            if (trees[i][startj] >= treeHeight) {
                return starti - i;
            }
        }
        return starti;
    };
    const checkRight = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let j = startj + 1; j < trees[starti].length; j++) {
            if (trees[starti][j] >= treeHeight) {
                return j - startj;
            }
        }
        return trees[starti].length - 1 - startj;
    };
    const checkDown = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let i = starti + 1; i < trees.length; i++) {
            if (trees[i][startj] >= treeHeight) {
                return i - starti;
            }
        }
        return trees.length - 1 - starti;
    };
    const checkLeft = (starti, startj) => {
        const treeHeight = trees[starti][startj];
        for (let j = startj - 1; j >= 0; j--) {
            if (trees[starti][j] >= treeHeight) {
                return startj - j;
            }
        }
        return startj;
    };
    let scenicScore = 1;
    for (let i = 1; i < trees.length - 1; i++) {
        let topScore = 0, leftScore = 0, bottomScore = 0, rightScore = 0;
        for (let j = 1; j < trees[i].length - 1; j++) {
            topScore = checkTop(i, j);
            // console.log(
            //     `top score for ${trees[i][j]} at [${i},${j}] is ${topScore}`
            // );
            leftScore = checkLeft(i, j);
            // console.log(
            //     `left score for ${trees[i][j]} at [${i},${j}] is ${leftScore}`
            // );
            bottomScore = checkDown(i, j);
            // console.log(
            //     `bottom score for ${trees[i][j]} at [${i},${j}] is ${bottomScore}`
            // );
            rightScore = checkRight(i, j);
            // console.log(
            //     `right score for ${trees[i][j]} at [${i},${j}] is ${rightScore}`
            // );
            // console.log(
            //     `total score for ${i},${j} coordinates ${
            //         topScore * leftScore * bottomScore * rightScore
            //     }`
            // );
            scenicScore = Math.max(scenicScore, topScore * leftScore * bottomScore * rightScore);
            //console.log(`new best score ${scenicScore}`);
        }
    }
    return scenicScore;
};
console.log(`part one solution: ${partOne()}`);
console.log(`part two solution ${partTwo()}`);
//# sourceMappingURL=day8.js.map