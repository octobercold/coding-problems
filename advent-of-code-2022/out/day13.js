"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solution = void 0;
const fileReader_1 = require("./utils/fileReader");
const lines = (0, fileReader_1.fileReader)(13);
const pairs = [];
for (let i = 0; i < lines.length; i += 3) {
    pairs.push({ left: JSON.parse(lines[i]), right: JSON.parse(lines[i + 1]) });
}
console.log(pairs);
const compare = (left, right) => {
    if (left === undefined) {
        if (right !== undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    if (left > right)
        return false;
    if (right > left)
        return true;
    if (left === right)
        return null;
};
const normalize = (pair) => {
    const left = typeof pair.left === "number" ? [pair.left] : pair.left;
    const right = typeof pair.right === "number" ? [pair.right] : pair.right;
    return { left, right };
};
let counter = 0;
const recursion = (pair) => {
    const { left, right } = normalize(pair);
    if (left.length > 1 || right.length > 1) {
        const length = Math.min(left.length, right.length);
        for (let i = 0; i < length; i++) {
            recursion({ left: left, right: right });
        }
    }
    else {
        return compare(left[0], right[0]);
    }
};
for (const pair of pairs) {
    console.log(recursion(pair));
}
const solution = () => {
    for (let i = 0; i < 5; i++) {
        console.log(`hello ${i}`);
    }
};
exports.solution = solution;
//# sourceMappingURL=day13.js.map