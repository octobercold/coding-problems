import { countReset } from "console";
import { fileReader } from "./utils/fileReader";
const lines = fileReader(13);

interface Pair {
    left: number[];
    right: number[];
}

const pairs: Pair[] = [];

for (let i = 0; i < lines.length; i += 3) {
    pairs.push({ left: JSON.parse(lines[i]), right: JSON.parse(lines[i + 1]) });
}

const isRightOrder = (left: number, right: number): boolean | null => {
    if (left > right) return false;
    if (right > left) return true;
    if (left === right) return null;
};

let sumOfIndices = 0;

const deepCompare = (pair: Pair) => {
    console.log(pair);
    if (pair.left === undefined || pair.right === undefined) {
        if (pair.right !== undefined) {
            return true;
        }
        return false;
    }
    const length = Math.max(pair.left.length, pair.right.length);
    console.log(`length: ${length}`);
    let res;
    for (let i = 0; i < length; i++) {
        const left = pair.left[i];
        const right = pair.right[i];

        if (left === undefined || right === undefined) {
            if (right !== undefined) {
                return true;
            }
            return false;
        }
        if (typeof left === "number" && typeof right === "number") {
            res = isRightOrder(left, right);

            if (res === null) {
                continue;
            } else {
                return res;
            }
        }
        const newPairLeft = typeof left === "number" ? [left] : left;
        const newPairRight = typeof right === "number" ? [right] : right;
        const newPair = { left: newPairLeft, right: newPairRight };

        return deepCompare(newPair as Pair);
    }
    return res;
};

for (let i = 0; i < pairs.length; i++) {
    if (deepCompare(pairs[i])) {
        console.log(`correct index: ${i + 1}`);
        sumOfIndices += i + 1;
    }
}

export const solution = () => {
    console.log(`day 1 solution: ${sumOfIndices}`);
};
