const fileReader = require("../fileReader");

const lines = fileReader();

const binaryDiagnostic = (lines) => {
    let res = {},
        pos = 0,
        gammaRate = "",
        epsilonRate = "";
    for (const line of lines) {
        for (const position of line) {
            if (res[pos] === undefined) {
                res[pos] = {};
            }
            if (res[pos][position] === undefined) {
                res[pos][position] = 1;
            } else {
                res[pos][position]++;
            }
            pos++;
        }
        pos = 0;
    }

    for (const value of Object.values(res)) {
        console.log(value);
        if (value["0"] > value["1"]) {
            gammaRate += "0";
            epsilonRate += "1";
        } else {
            gammaRate += "1";
            epsilonRate += "0";
        }
        console.log("gammaRate: ", gammaRate);
        console.log("epsilonRate: ", epsilonRate);
    }

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

console.log(binaryDiagnostic(lines));
