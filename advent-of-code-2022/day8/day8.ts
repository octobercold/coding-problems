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
//const defaultVisible = (trees.length-1)**2

const visible = (treeHeight, trees, i, j, blocking = 0) => {
    if (i === 0 || j === 0 || i === trees.length - 1 || j === trees.length - 1)
        return false;
    if (
        trees[i - 1][j] >= treeHeight &&
        trees[i][j + 1] >= treeHeight &&
        trees[i + 1][j] >= treeHeight &&
        trees[i][j - 1] >= treeHeight
    ) {
        return true;
    } else {
    }
};

for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[i].length - 1; j++) {}
}
