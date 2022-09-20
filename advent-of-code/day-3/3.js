const fileReader = require("../fileReader");

const lines = fileReader();

const binaryDiagnostic = (lines) => {
    let res = {},
        pos = 0;
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

    return res;
};

const findMostCommonValue = (res) => {
    return res["1"] >= res["0"] ? "1" : "0";
};

const findLeastCommonValue = (res) => {
    return res["1"] < res["0"] ? "1" : "0";
};

const powerConsumption = (res) => {
    let gammaRate = "",
        epsilonRate = "";

    for (const pos of Object.keys(res)) {
        gammaRate += findMostCommonValue(res[pos]);
        epsilonRate += findLeastCommonValue(res[pos]);
    }

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const binaryDiagnosticForPosition = (lines, pos) => {
    let res = { 1: 0, 0: 0 };
    for (const line of lines) {
        if (line[pos] === "1") {
            res["1"] += 1;
        } else {
            res["0"] += 1;
        }
    }
    console.log("res: ", res);
    return {
        most: findMostCommonValue(res),
        least: findLeastCommonValue(res),
    };
};

const lifeSupportRating = (lines) => {
    let oxy = lines,
        co2 = lines;
    for (let i = 0; i < lines[0].length; i++) {
        let { most } = binaryDiagnosticForPosition(oxy, i);
        let { least } = binaryDiagnosticForPosition(co2, i);
        if (oxy.length > 1) {
            oxy = oxy.filter((line) => {
                return line[i] === most;
            });
        }
        if (co2.length > 1) {
            co2 = co2.filter((line) => {
                return line[i] === least;
            });
        }
        if (oxy.length <= 1 && co2.length <= 1) break;
    }

    const rating = parseInt(oxy, 2) * parseInt(co2, 2);

    return rating;
};
