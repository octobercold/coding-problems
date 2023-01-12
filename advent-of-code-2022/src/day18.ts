import { fileReader } from "./utils/fileReader";

const lines = fileReader(18);

class Block {
    children: Set<Block>;
    surfaceArea: number;
    constructor(public x: number, public y: number, public z: number) {
        this.children = new Set();
        this.surfaceArea = 6;
    }
    addChild(child: Block) {
        this.children.add(child);
        this.surfaceArea = 6 - this.children.size;
    }
}

const obsidianBridge: Block[] = [];
const obsidianSet: Set<string> = new Set();

function areClustered(c1: Block, c2: Block): string | boolean {
    const dx = Math.abs(c2.x - c1.x);
    const dy = Math.abs(c2.y - c1.y);
    const dz = Math.abs(c2.z - c1.z);
    if (dx + dy + dz === 1) return true;
    return false;
}

let min = Infinity,
    max = -Infinity;

for (const line of lines) {
    const [x, y, z] = line.split(",").map(c => parseInt(c));
    min = Math.min(min, x, y, z);
    max = Math.max(max, x, y, z);
    obsidianBridge.push(new Block(x, y, z));
    obsidianSet.add(`${x},${y},${z}`);
}

function partOne() {
    for (let i = 0; i < obsidianBridge.length; i++) {
        for (let j = 1; j < obsidianBridge.length; j++) {
            if (areClustered(obsidianBridge[i], obsidianBridge[j])) {
                obsidianBridge[i].addChild(obsidianBridge[j]);
                obsidianBridge[j].addChild(obsidianBridge[i]);
            }
        }
    }

    return obsidianBridge.reduce((a, c) => a + c.surfaceArea, 0);
}

function partTwo() {
    let surfaceArea = 0;
    const q: [number, number, number][] = [[0, 0, 0]];
    const visited: Set<string> = new Set();

    while (q.length > 0) {
        const [x, y, z] = q.shift();
        const key = `${x},${y},${z}`;
        if (
            x > max + 1 ||
            y > max + 1 ||
            z > max + 1 ||
            x < min - 1 ||
            y < min - 1 ||
            z < min - 1
        )
            continue;
        if (obsidianSet.has(key)) continue;
        if (visited.has(key)) continue;

        [
            [x + 1, y, z],
            [x - 1, y, z],
            [x, y + 1, z],
            [x, y - 1, z],
            [x, y, z + 1],
            [x, y, z - 1],
        ].forEach(b => {
            surfaceArea += +obsidianSet.has(`${b[0]},${b[1]},${b[2]}`);
            q.push(b as [number, number, number]);
        });

        visited.add(key);
    }

    return surfaceArea;
}

export const solution = () => {
    console.log(`Part one solution: ${partOne()}`);
    console.log(`Part two solution: ${partTwo()}`);
};
