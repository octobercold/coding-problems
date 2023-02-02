import { fileReader } from "./utils/fileReader";
const lines = fileReader(22);
let maxL = -Infinity;
lines.forEach(line => (maxL = Math.max(maxL, line.length)));

class Node {
    key: string;
    x: number;
    y: number;
    walkable: boolean;
    constructor(x, y, walkable) {
        this.key = `${x},${y}`;
        this.x = x;
        this.y = y;
        this.walkable = walkable;
    }

    getNeighboursKeys() {
        return [
            [this.x + 1, this.y], // 0 - right;
            [this.x, this.y + 1], // 1 - down
            [this.x - 1, this.y], // 2 - left
            [this.x, this.y - 1], // 3 - up
        ];
    }
}

const map: Map<string, Node> = new Map();
const emptySpace: Set<string> = new Set();

const border = [-Infinity, -Infinity, +Infinity, +Infinity];
let startX = +Infinity;

for (let y = 0; y < lines.length - 2; y++) {
    const items = lines[y].padEnd(maxL, " ").split("");
    console.log("items: ", items);
    for (let x = 0; x < items.length; x++) {
        if (items[x] === " ") {
            emptySpace.add(`${x + 1},${y + 1}`);
            continue;
        }

        let walkable = true;
        if (y === 0) startX = Math.min(startX, x + 1);

        if (items[x] === "#") walkable = false;
        map.set(`${x + 1},${y + 1}`, new Node(x + 1, y + 1, walkable));

        border[0] = Math.max(border[0], x + 1);
        border[1] = Math.max(border[1], y + 1);
        border[2] = Math.min(border[2], x + 1);
        border[3] = Math.min(border[3], y + 1);
    }
}
const directions = lines
    .at(-1)
    .trim()
    .match(/([\d]+)|([RL])/g);

const start = map.get(`${startX},1`);

for (let x = border[2] - 1; x < border[0] + 1; x++) {
    emptySpace.add(`${x},${border[3] - 1}`);
    emptySpace.add(`${x},${border[1] + 1}`);
}
for (let y = border[3] - 1; y < border[1] + 1; y++) {
    emptySpace.add(`${border[2] - 1},${y}`);
    emptySpace.add(`${border[0] + 1},${y}`);
}
console.log("map: ", map);
console.log("directions: ", directions);
console.log("border ", border);
console.log("start: ", start);
console.log("empty space: ", emptySpace);

// The final password is the sum of 1000 times the row, 4 times the column, and the facing.
// Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^)
let facing = 0;
let position = start;
console.log(`start position: ${position.x}, ${position.y}`);

for (const d of directions) {
    console.log("command: ", d);
    if (d === "R") facing = (facing % 4) + 1;
    else if (d === "L") facing = (facing % 4) - 1;
    else {
        let steps = parseInt(d);
        while (steps) {
            let [x, y] = position.getNeighboursKeys()[facing];

            let key = `${x},${y}`;
            let next = map.get(key);

            if (next !== undefined) {
                console.log(`there is next node: ${next.x},${next.y}`);
                // there is node
                if (next.walkable) position = next;
                else break;
            } else {
                // there is no node
                console.log(`there is no next node: ${x},${y}`);

                console.log("empty space has key: ", emptySpace.has(key));
                console.log(
                    `we are going to wrap by ${facing % 2 === 0 ? "x" : "y"}`
                );
                console.log("facing: ", facing);

                if (emptySpace.has(key)) {
                    console.log("we try to wrap");
                    const borderNeighbours = [
                        [border[2], position.y], // 0 - right;
                        [position.x, border[3]], // 1 - down
                        [border[0], position.y], // 2 - left
                        [position.x, border[1]], // 3 - up
                    ];

                    [x, y] = borderNeighbours[facing];
                    console.log(`after wrap coordinates will be: ${x}, ${y}`);
                    key = `${x},${y}`;
                    next = map.get(key);

                    if (next !== undefined) {
                        console.log("there is node with this coordinates");
                        if (next.walkable) {
                            position = next;
                            console.log("it is walkable");
                        } else {
                            console.log("it is not walkable");
                            break;
                        }
                    }
                }
            }

            steps--;
            console.log(`new position: ${position.x}, ${position.y}`);
        }
    }
}

export function solution() {
    return;
}
