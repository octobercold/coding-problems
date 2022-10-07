const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const inputArray = input.split(",");
const crabs = inputArray.map((crab) => parseInt(crab));

const sortedCrabs = crabs.sort((a, b) => a - b);
console.log(sortedCrabs);

let leftDistance = 0,
    rightDistance = 0;

for (let i = 1; i < sortedCrabs.length / 2; i++) {
    let leftCrab = sortedCrabs[i];
    let rightCrab = sortedCrabs[sortedCrabs.length - 1 - i];
    let leftDelta = leftCrab - sortedCrabs[i - 1];
    let rightDelta = sortedCrabs[sortedCrabs.length - i] - rightCrab;
    leftDistance += ((1 + leftDelta) / 2) * leftDelta;
    rightDistance += ((1 + rightDelta) / 2) * rightDelta;
}

console.log(`leftDistance: ${leftDistance}`);
console.log(`rightDistance: ${rightDistance}`);

// let weights = [];
// sortedCrabs.forEach((crab) => {
//     const delta = Math.abs(crab - meanCrab);
//     let weight = ((1 + delta) / 2) * delta;
//     weights.push(weight);
// });

// const averageWeight = weights.reduce((a, b) => a + b) / weights.length;

// console.log(`averageWeight: ${averageWeight}`);

// let weightedCrabs = [];
// for (let i = 0; i < sortedCrabs.length; i++) {
//     let weightedCrab = sortedCrabs[i] * weights[i];
//     weightedCrabs.push(weightedCrab);
// }

// const averageWeightedCrab =
//     weightedCrabs.reduce((a, b) => a + b) / weightedCrabs.length;

// console.log(`averageWeightedCrab: ${averageWeightedCrab}`);

// let bestWeight = Number.MAX_SAFE_INTEGER;
// let bestCrabIndex = null;
// for (let i = 0; i < weights.length; i++) {
//     let newDelta = Math.abs(weights[i] - averageWeight);
//     let oldDelta = Math.abs(bestWeight - averageWeight);
//     if (newDelta < oldDelta) {
//         bestWeight = weights[i];
//         bestCrabIndex = i;
//     }
// }

// console.log(`bestWeight: ${bestWeight}`);
// console.log(`bestCrabIndex: ${bestCrabIndex}`);
