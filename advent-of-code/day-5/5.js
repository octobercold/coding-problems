const { ReadableByteStreamController } = require("node:stream/web");
const fileReader = require("../fileReader");

const lines = fileReader();
let coordinatePairs = [];
lines.forEach((line) => {
    coordinatePairs.push(line.split(" -> "));
});
let coordinates = [];
coordinatePairs.forEach((pair) => {
    let start = pair[0].split(",");
    let end = pair[1].split(",");
    coordinates.push([start, end]);
});

// class GraphNode {
//     constructor(x, y, left, up, right, down) {
//         this.x = x;
//         this.y = y;
//         this.left = left ? left : undefined;
//         this.up = up ? up : undefined;
//         this.right = right ? right : undefined;
//         this.down = down ? down : undefined;
//     }
// }

console.log(coordinates);

const findHotSpots = (coordinates) => {
    let res = new Map(),
        counter = 0;

    for (const line of coordinates) {
        let x1 = parseInt(line[0][0]);
        let y1 = parseInt(line[0][1]);
        let x2 = parseInt(line[1][0]);
        let y2 = parseInt(line[1][1]);

        if (x1 === x2 || y1 === y2) {
            //console.log("found valid line");
            //horizontal line
            //e.g. [[ '944', '647' ], [ '944', '206' ]]
            //vertical line
            //e.g. [[ '853', '720' ], [ '940', '720' ]]
            for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
                for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
                    let val = res.get(`${j},${i}`);
                    console.log("val: ", val);
                    if (val === undefined) {
                        console.log(`setting [${j},${i}] key to 1`);
                        res.set(`${j},${i}`, 1);
                    } else {
                        console.log(`setting [${j},${i}] key to ${val + 1}`);
                        res.set(`${j},${i}`, val + 1);
                    }
                    console.log(
                        `${j}, ${i} coordinate was seen ${res.get(
                            `${j},${i}`
                        )} times`
                    );
                    if (res.get(`${j},${i}`) === 2) counter++;
                }
            }
        }
    }
    return counter;
};

console.log(findHotSpots(coordinates));
