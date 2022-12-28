import * as fs from "fs";

export const fileReader = (day: number) => {
    //returns list of strings separated by \n
    const string = fs.readFileSync(`./inputs/day${day}/input.txt`, {
        encoding: "utf-8",
    });
    return string.split("\n");
};
