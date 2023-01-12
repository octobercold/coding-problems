import { textChangeRangeIsUnchanged } from "typescript";
import { fileReader } from "./utils/fileReader";

const lines = fileReader(18);

interface Coordinate {
    x: number;
    y: number;
    z: number;
}

class Block {
    children: Set<string>;
    surfaceArea: number;
    constructor(public x: number, public y: number, public z: number) {
        this.children = new Set();
        this.surfaceArea = 6;
    }

    addChild(child) {
        this.children.add(stringify(child));
        this.surfaceArea = 6 - this.children.size;
    }
}

const obsidianBridge: Block[] = [];

const blocksAroundDroplet: Map<string, Coordinate[]> = new Map();
//map {vicinity<string>: parent block or blocks}
const vicinities: Map<string, Coordinate[]> = new Map();

function stringify(coordinate: Coordinate) {
    const { x, y, z } = coordinate;
    return `${x},${y},${z}`;
}

// function generateSingleVicinity(droplet: Coordinate) {
//     const { x, y, z } = droplet;
//     const key = stringify(droplet);
//     const val = [];
//     for (let i = x - 1; i <= x + 1; i++) {
//         for (let j = y - 1; j <= y + 1; j++) {
//             for (let k = z - 1; k <= z + 1; k++) {
//                 const newBlock = { x: i, y: j, z: k };
//                 if (vicinities.has) vicinities.set(stringify(newBlock));
//                 val.push(newBlock);
//             }
//         }
//     }
//     blocksAroundDroplet.set(key, val);
//     return;
// }

function areClustered(c1: Block, c2: Block): string | boolean {
    //console.log(`comparing ${c1.x},${c1.y},${c1.z} VS ${c2.x},${c2.y},${c2.z}`);
    const dx = Math.abs(c2.x - c1.x);
    const dy = Math.abs(c2.y - c1.y);
    const dz = Math.abs(c2.z - c1.z);
    //console.log(`deltas: ${dx}, ${dy}, ${dz}`);
    if (dx + dy + dz === 1) return true;
    return false;
}

for (const line of lines) {
    const [x, y, z] = line.split(",");
    obsidianBridge.push(new Block(parseInt(x), parseInt(y), parseInt(z)));
}

for (let i = 0; i < obsidianBridge.length; i++) {
    for (let j = 1; j < obsidianBridge.length; j++) {
        if (areClustered(obsidianBridge[i], obsidianBridge[j])) {
            obsidianBridge[i].addChild(obsidianBridge[j]);
            obsidianBridge[j].addChild(obsidianBridge[i]);
        }
    }
}

let res = 0;

console.log("result:");
obsidianBridge.forEach(block => (res += block.surfaceArea));
console.log(res);
// console.log("children:");
// obsidianBridge.forEach(block => console.log(block.children));
// console.log("surface area:");
// obsidianBridge.forEach(block => console.log(block.surfaceArea));

export const solution = () => {
    return;
};
