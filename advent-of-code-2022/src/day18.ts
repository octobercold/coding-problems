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

function areClustered(c1: Block, c2: Block): string | boolean {
    const dx = Math.abs(c2.x - c1.x);
    const dy = Math.abs(c2.y - c1.y);
    const dz = Math.abs(c2.z - c1.z);
    if (dx + dy + dz === 1) return true;
    return false;
}

for (const line of lines) {
    const [x, y, z] = line.split(",").map(c => parseInt(c));
    obsidianBridge.push(new Block(x, y, z));
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

export const solution = () => {
    console.log(`Part one solution: ${partOne()}`);
};
