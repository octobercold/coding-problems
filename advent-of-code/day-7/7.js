const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const inputArray = input.split(",");
const crabs = inputArray.map((crab) => parseInt(crab));

const sortedCrabs = crabs.sort((a, b) => a - b);
console.log(sortedCrabs);
console.log(`crabs.length % 2 === 0: ${crabs.length % 2 === 0}`);

const medianCrab =
    crabs.length % 2 === 0
        ? (crabs[crabs.length / 2 - 1] + crabs[crabs.length / 2]) / 2
        : crabs[crabs.length / 2];

console.log(`medianCrab: ${medianCrab}`);
let steps = 0;
for (const crab of crabs) {
    let curr = Math.abs(medianCrab - crab);
    steps += curr;
}

console.log(`steps: ${steps}`);
