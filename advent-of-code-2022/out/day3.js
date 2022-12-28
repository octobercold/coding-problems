"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day3/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
const lines = fileReader();
const priorities = new Map();
for (let i = 0; i < 26; i++) {
    priorities.set(String.fromCharCode(97 + i), i + 1);
    priorities.set(String.fromCharCode(65 + i), i + 27);
}
const partOne = () => {
    let prioritiesSum = 0;
    for (const line of lines) {
        const leftSet = new Set(line.slice(0, line.length / 2));
        const rightSet = new Set(line.slice(line.length / 2, line.length));
        for (const char of leftSet) {
            if (rightSet.has(char)) {
                prioritiesSum += priorities.get(char);
                break;
            }
        }
    }
    return prioritiesSum;
};
const partTwo = () => {
    let prioritiesSum = 0;
    for (let i = 0; i < lines.length - 2; i += 3) {
        //console.log(`showing line ${i}, line ${i+1}, line ${i+2}`)
        const set1 = new Set(lines[i]);
        const set2 = new Set(lines[i + 1]);
        const set3 = new Set(lines[i + 2]);
        for (const char of set1) {
            if (set2.has(char) && set3.has(char)) {
                prioritiesSum += priorities.get(char);
                break;
            }
        }
    }
    return prioritiesSum;
};
console.log(partTwo());
//# sourceMappingURL=day3.js.map