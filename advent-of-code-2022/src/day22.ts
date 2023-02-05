import { fileReader } from "./utils/fileReader";
const lines = fileReader(22);
const cube = lines.slice(0, -2);

const FACE_SIZE = 50;

function getNeighbours(x: number, y: number): number[][] {
    return [
        [x + 1, y],
        [x, y + 1],
        [x - 1, y],
        [x, y - 1],
    ];
}

// function wrapping(
//     facing: number,
//     nx: number,
//     ny: number,
//     key: string,
//     neighbours: number[][]
// ) {
//     let wrappingKey: string;
//     if (facing === 0 || facing === 2) {
//         neighbours[facing] = [-1, ny];
//         wrappingKey = `-1,${ny}`;
//     } else {
//         neighbours[facing] = [nx, -1];
//         wrappingKey = `${nx},-1`;
//     }

//     const swap = { 0: 2, 1: 3, 2: 0, 3: 1 };

//     if (map.has(wrappingKey)) {
//         const arr = map.get(wrappingKey);
//         arr[swap[facing]] = key;
//         map.set(wrappingKey, arr);
//     } else {
//         const arr = [null, null, null, null];
//         arr[swap[facing]] = key;
//         map.set(wrappingKey, arr);
//     }

//     return neighbours;
// }

// {faceId: {leaving direction: [faceId, arriving direction]}
const wrap = {
    1: { 3: [6, 3], 2: [5, 3] },
    2: { 3: [6, 2], 0: [4, 2], 1: [3, 2] },
    3: { 0: [2, 3], 2: [5, 2] },
    4: { 0: [2, 2], 2: [5, 1] },
    5: { 2: [3, 0], 1: [1, 2], 3: [4, 0] }, //
    6: { 1: [1, 1], 0: [2, 1] },
};

function scanFace(start) {
    const face = new Map();
    const [startX, startY] = start;
    for (let y = startY; y < startY + FACE_SIZE; y++) {
        for (let x = startX; x < startX + FACE_SIZE; x++) {
            face.set(`${x + 1},${y + 1}`, cube[y][x]);
        }
    }
    return;
}

const start = [50 * 1, 50 * 0];
const cubeFaces = [
    scanFace([50 * 1, 50 * 0]), // face 1
    scanFace([50 * 2, 50 * 0]), // face 2
    scanFace([50 * 1, 50 * 1]), // face 3
    scanFace([50 * 0, 50 * 2]), // face 4
    scanFace([50 * 1, 50 * 2]), // face 5
    scanFace([50 * 0, 50 * 3]), // face 6
];

const wall = new Set();

const directions = lines
    .at(-1)
    .trim()
    .match(/([\d]+)|([RL])/g);

console.log(cubeFaces[0]);
// The final password is the sum of 1000 times the row, 4 times the column, and the facing.
// Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^)
// let facing = 0;
// const result = new Map();
// let position = start;
// result.set(position, facing);
// console.log(`start position: `, position);

// function draw(position: string, d, facing) {
//     const convert = [">", "v", "<", "^"];

//     function generateVicinity(position: string) {
//         const [, column, row] = position
//             .match(/^(-?\d+),(-?\d+)/)
//             .map(n => parseInt(n));
//         const trueY = row - 1;
//         const trueX = column - 1;
//         const vicinity = [];
//         for (let y = trueY - 5; y < trueY + 5; y++) {
//             const row = [];
//             for (let x = trueX - 5; x < trueX + 5; x++) {
//                 if (!mapStrings[y]) continue;
//                 if (!mapStrings[y][x]) continue;
//                 let symbol = mapStrings[y][x];
//                 if (symbol === "." && result.has(`${x + 1},${y + 1}`))
//                     symbol = convert[result.get(`${x + 1},${y + 1}`)];
//                 row.push(symbol);
//             }
//             vicinity.push(row);
//         }
//         return vicinity;
//     }

//     console.log("command: ", d);
//     console.log("currrently facing: ", convert[facing]);

//     generateVicinity(position).forEach(row => {
//         console.log(row.join(""));
//     });
//     console.log("\n");
// }

// for (const d of directions) {
//     if (d === "R") {
//         console.log("Change of direction R");
//         facing++;
//     } else if (d === "L") {
//         if (facing === 0) {
//             facing = 3;
//         } else {
//             facing--;
//         }
//         console.log("Change of direction L");
//     } else {
//         facing = Math.abs(facing % 4);
//         let steps = parseInt(d);
//         while (steps) {
//             const next = map.get(position);

//             if (!next[facing]) break;
//             const [, x, y] = next[facing]
//                 .match(/^(-?\d+),(-?\d+)/)
//                 .map(n => parseInt(n));
//             if (x < 0 || y < 0) {
//                 const nextTrue = map.get(next[facing])[facing];
//                 if (wall.has(nextTrue) || !nextTrue) break;
//                 position = nextTrue;
//                 result.set(position, facing);
//                 draw(position, d, facing);
//             } else {
//                 position = next[facing];
//                 result.set(position, facing);
//                 draw(position, d, facing);
//             }
//             steps--;
//         }
//     }
// }
// const [, column, row] = position
//     .match(/^(-?\d+),(-?\d+)/)
//     .map(n => parseInt(n));

// console.log(column, row, facing);

// console.log(1000 * row + 4 * column + facing);

export function solution() {
    return;
}
