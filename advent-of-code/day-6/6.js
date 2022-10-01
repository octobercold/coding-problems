const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const inputArray = input.split(",");

const fishSchool = new Map();
for (let i = 0; i < 9; i++) {
    fishSchool.set(i, 0);
}

inputArray.forEach((fishTimer) => {
    const val = fishSchool.get(parseInt(fishTimer));
    fishSchool.set(parseInt(fishTimer), val + 1);
});

const grow = (fishSchoolMap) => {
    const tempZero = fishSchoolMap.get(0);
    for (let i = 0; i < 8; i++) {
        const val = fishSchoolMap.get(i + 1);
        fishSchoolMap.set(i, val);
    }
    let val = fishSchoolMap.get(6);
    fishSchoolMap.set(8, tempZero);
    fishSchoolMap.set(6, tempZero + val);
};

const numberAfterDays = (fishSchoolMap, days) => {
    const copy = new Map(fishSchoolMap);
    for (let i = 0; i < days; i++) {
        grow(copy);
    }
    //console.log(copy.values());
    return [...copy.values()].reduce((a, b) => a + b);
};

const res1 = numberAfterDays(fishSchool, 80);
const res2 = numberAfterDays(fishSchool, 256);

console.log(res1, res2);
