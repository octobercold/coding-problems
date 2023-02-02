import { fileReader } from "./utils/fileReader";
const lines = fileReader(22);

class Node {
    key: string;
    x: number;
    y: number;
    walkable: boolean;
    neighbours: { [key: string]: Node };
    constructor(x, y, walkable) {
        this.key = `${x},${y}`;
        this.x = x;
        this.y = y;
        this.walkable = walkable;
        this.neighbours = {};
    }

    getNeighboursKeys() {
        return {
            top: `${this.x + 1},${this.y}`,
            right: `${this.x - 1},${this.y}`,
            bottom: `${this.x},${this.y + 1}`,
            left: `${this.x},${this.y - 1}`,
        };
    }
}

const map: Map<string, Node> = new Map();
const X = { max: -Infinity, min: +Infinity };
const Y = { max: -Infinity, min: +Infinity };
let startX = +Infinity;
//const directionts: [number, string][] = [];

for (let y = 0; y < lines.length - 2; y++) {
    const items = lines[y].split("");
    for (let x = 0; x < items.length; x++) {
        if (items[x] === " ") continue;

        let walkable = true;
        if (y === 0) startX = Math.min(startX, x + 1);
        if (items[x] === "#") walkable = false;
        map.set(`${x + 1},${y + 1}`, new Node(x + 1, y + 1, walkable));

        X.max = Math.max(X.max, x + 1);
        X.min = Math.min(X.min, x + 1);
        Y.max = Math.max(Y.max, y + 1);
        Y.min = Math.min(Y.min, y + 1);
    }
}
const directions = lines
    .at(-1)
    .trim()
    .match(/([\d]+)|([RL])/g);

const start = map.get(`${startX},1`);
console.log(map);
console.log(directions);
console.log(X, Y);
console.log(start);

export function solution() {
    return;
}
