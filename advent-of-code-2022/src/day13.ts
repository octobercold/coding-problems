import { fileReader } from "./utils/fileReader";
const lines = fileReader(13);

const pairs = [];

for (let i = 0; i < lines.length; i += 3) {
    pairs.push([JSON.parse(lines[i]), JSON.parse(lines[i + 1])]);
}

const compare = (left, right) => {
    const length = Math.max(left.length, right.length);
    for (let i = 0; i < length; i++) {
        let newLeft = left[i];
        let newRight = right[i];

        if (newLeft === undefined) {
            return true;
        } else if (newRight === undefined) {
            return false;
        }

        if (typeof newLeft === "number" && typeof newRight === "number") {
            if (newLeft < newRight) {
                return true;
            } else if (newLeft > newRight) {
                return false;
            } else {
                continue;
            }
        }

        newLeft = typeof newLeft === "number" ? [newLeft] : newLeft;
        newRight = typeof newRight === "number" ? [newRight] : newRight;

        const tempResult = compare(newLeft, newRight);
        if (tempResult !== null) return tempResult;
    }
    return null;
};

let sumOfIndices = 0;

for (let i = 0; i < pairs.length; i++) {
    const [left, right] = pairs[i];
    if (compare(left, right) === true) sumOfIndices += i + 1;
}

const divider2 = [[2]],
    divider6 = [[6]];
const pairsWithDividers = [...pairs.flat(), divider2, divider6];

const sortedPairs = pairsWithDividers.sort((a, b) => {
    const res = compare(a, b);
    if (res === true) {
        return -1;
    } else if (res === false) {
        return 1;
    } else {
        return 0;
    }
});

const index2 = sortedPairs.indexOf(divider2) + 1,
    index6 = sortedPairs.indexOf(divider6) + 1;

export const solution = () => {
    console.log(`part 1 solution: ${sumOfIndices}`);
    console.log(`part 2 solution: ${index2 * index6}`);
};
