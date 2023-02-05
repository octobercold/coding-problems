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

// [face0, face1, face2... etc] arrays inside correspond to di1990ection of leaving. If number maintain direction if array change direction
const wrap = [
    [[2], [3], [5, 3], [6, 3]],
    [[4, 2], [3, 2], [1], [6, 2]],
    [[2, 3], [4], [5, 2], [1]],
    [[2, 2], [6], [5, 1], [3]],
    [[6], [1, 2], [3, 0], [4, 0]],
    [[2, 1], [1, 1], [5], [4]],
];

function scanFace(start) {
    const border = {
        x: { min: +Infinity, max: -Infinity },
        y: { min: +Infinity, max: -Infinity },
    };
    const face = new Map();
    const [startX, startY] = start;
    console.log(`${startX},${startY}`);
    for (let y = startY - 1; y < startY - 1 + FACE_SIZE; y++) {
        const row = cube[y].split("");
        for (let x = startX - 1; x < startX - 1 + FACE_SIZE; x++) {
            face.set(`${x + 1},${y + 1}`, row[x]);
            border.x.min = Math.min(border.x.min, x);
            border.y.min = Math.min(border.y.min, y);
            border.x.max = Math.min(border.x.min, x);
            border.y.max = Math.min(border.y.min, y);
        }
    }
    return { border, face };
}

const start = [50 * 1, 1];

console.log("start: ", start);

const cubeFaces = [
    { ...scanFace([50 * 1, 1]) }, // face 1
    { ...scanFace([50 * 2, 1]) }, // face 2
    { ...scanFace([50 * 1, 50 * 1]) }, // face 3
    { ...scanFace([1, 50 * 2]) }, // face 4
    { ...scanFace([50 * 1, 50 * 2]) }, // face 5
    { ...scanFace([1, 50 * 3]) }, // face 6
];

const wall = new Set();

const directions = lines
    .at(-1)
    .trim()
    .match(/([\d]+)|([RL])/g);

// The final password is the sum of 1000 times the row, 4 times the column, and the facing.
// Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^)
const result = new Map();
let facing = 0;
let position = start;
let currentFace = 0;
result.set(`${start[0]},${start[1]}`, facing);

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

for (const d of directions) {
    if (d === "R") {
        if (facing === 3) facing = 0;
        else facing++;
    } else if (d === "L") {
        if (facing === 0) facing = 3;
        else facing--;
    } else {
        let steps = parseInt(d);
        console.log("face: ", cubeFaces[currentFace].face);
        while (steps) {
            const [x, y] = start;
            const face = cubeFaces[currentFace].face;
            const borderX = cubeFaces[currentFace].border.x;
            const borderY = cubeFaces[currentFace].border.y;

            const next = getNeighbours(x, y)[facing];
            const symbol = face.get(`${next[0]},${next[1]}`);
            console.log("next: ", next);
            console.log("next symbol: ", face.get(next));

            if (symbol === "#") break;
            else if (symbol === ".") position = next;
            else {
                if (
                    [...Object.values(borderX)].some(v => v === next[0]) ||
                    [...Object.values(borderY)].some(v => v === next[1])
                ) {
                    const [newFace, newFacing] = wrap[currentFace][facing];
                    if (
                        cubeFaces[newFace].face.get(`${next[0]},${next[1]}`) ===
                        "#"
                    )
                        break;
                    facing = newFacing ? newFacing : facing;
                    currentFace = newFace;
                    position = next;
                }
            }
            result.set(`${position[0]},${position[1]}`, facing);
            steps--;
        }
    }
}
const [column, row] = position;

console.log(column, row, facing);

console.log(1000 * row + 4 * column + facing);

export function solution() {
    return;
}
