import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day6/input.txt", { encoding: "utf-8" });
    return string;
};

const string = fileReader();

const partOneWindowSize = 4;
const partTwoWindowSize = 14;

const solution = (windowSize) => {
    for (let i = 0; i < string.length; i++) {
        const currentWindow = string.slice(i, windowSize + i);
        const currentSet = new Set(currentWindow);
        if (currentWindow.length === currentSet.size) {
            return windowSize + i;
        }
    }
};

console.log(solution(partOneWindowSize));
console.log(solution(partTwoWindowSize));
