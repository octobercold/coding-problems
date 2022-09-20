var fs = require("fs");

const fileReader = () => {
    //returns list of strings separated by \n
    var string = fs.readFileSync("./input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
module.exports = fileReader;
