import * as fs from "fs";

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

console.log(trees);

const checkTop = (starti: number, startj: number): boolean => {
    const treeHeight = trees[starti][startj];
    for (let i = starti - 1; i >= 0; i--) {
        if (treeHeight <= trees[i][startj]) {
            return true;
        }
    }
    return false;
};

const checkRight = (starti: number, startj: number): boolean => {
    const treeHeight = trees[starti][startj];
    for (let j = startj + 1; j < trees[starti].length; j++) {
        if (treeHeight <= trees[starti][j]) {
            return true;
        }
    }
    return false;
};

const checkDown = (starti: number, startj: number): boolean => {
    const treeHeight = trees[starti][startj];
    for (let i = starti + 1; i < trees.length; i++) {
        if (treeHeight <= trees[i][startj]) {
            return true;
        }
    }
    return false;
};

const checkLeft = (starti: number, startj: number): boolean => {
    const treeHeight = trees[starti][startj];
    for (let j = startj - 1; j >= 0; j--) {
        if (treeHeight <= trees[starti][j]) {
            return true;
        }
    }
    return false;
};

let numberOfVisibleTrees = 0;

for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
        if (i === 0 || i === trees.length) {
            console.log(
                `tree height ${trees[i][j]} at [${i},${j}] is at the top or bottom edge`
            );
            numberOfVisibleTrees++;
            continue;
        }
        if (j === 0 || j === trees[i].length) {
            console.log(
                `tree height ${trees[i][j]} at [${i},${j}] is at the left or right edge`
            );
            numberOfVisibleTrees++;
            continue;
        }
        if (!checkTop(i, j)) {
            console.log(
                `tree height ${trees[i][j]} at [${i},${j}] is visible from top`
            );
            numberOfVisibleTrees++;
            continue;
        }
        if (!checkRight(i, j)) {
            console.log(
                `tree height ${trees[i][j]} at [${i},${j}] is visible from right`
            );
            numberOfVisibleTrees++;
            continue;
        }
        if (!checkDown(i, j)) {
            console.log(
                `tree height ${trees[i][j]} at [${i},${j}] is visible from bottom`
            );
            numberOfVisibleTrees++;
            continue;
        }
        if (!checkLeft(i, j)) {
            console.log(
                `tree height ${trees[i][j]} at [${i},${j}] is visible from left`
            );
            numberOfVisibleTrees++;
            continue;
        }
    }
}

console.log(numberOfVisibleTrees);
