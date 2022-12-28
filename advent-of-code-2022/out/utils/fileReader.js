"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileReader = void 0;
const fs = require("fs");
const fileReader = (day) => {
    //returns list of strings separated by \n
    const string = fs.readFileSync(`./inputs/day${day}/input.txt`, {
        encoding: "utf-8",
    });
    return string.split("\n");
};
exports.fileReader = fileReader;
//# sourceMappingURL=fileReader.js.map