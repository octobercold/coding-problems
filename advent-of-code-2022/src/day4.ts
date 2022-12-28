import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day4/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};

const lines = fileReader();

const parseLine = (line) => {
    const pairs = line.split(",");
    const ranges = [];
    for (const pair of pairs) {
        ranges.push(pair.split("-"));
    }
    const range1 = ranges[0];
    const range2 = ranges[1];
    const start1 = parseInt(range1[0]);
    const end1 = parseInt(range1[1]);
    const start2 = parseInt(range2[0]);
    const end2 = parseInt(range2[1]);
    return { start1: start1, start2: start2, end1: end1, end2: end2 };
};

const partOne = () => {
    let nOverlapping = 0;
    for (const line of lines) {
        const { start1, start2, end1, end2 } = parseLine(line);
        if (start1 >= start2 && end1 <= end2) {
            nOverlapping += 1;
        } else if (start2 >= start1 && end2 <= end1) {
            nOverlapping += 1;
        }
    }
    return nOverlapping;
};

const partTwo = () => {
    let nOverlapping = 0;
    for (const line of lines) {
        const { start1, start2, end1, end2 } = parseLine(line);
        if (start1 >= start2 && end1 <= end2) {
            nOverlapping += 1;
        } else if (start2 >= start1 && end2 <= end1) {
            nOverlapping += 1;
        } else if (start1 >= start2 && start1 <= end2) {
            nOverlapping += 1;
        } else if (end1 >= start2 && end1 <= end2) {
            nOverlapping += 1;
        }
    }

    return nOverlapping;
};

console.log(partOne());
console.log(partTwo());
