import { fileReader } from "./utils/fileReader";
const lines = fileReader(24);

class Point {
    constructor(public x: number, public y: number) {}
    stringify() {
        return `${this.x},${this.y}`;
    }
    neighbours() {
        return [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
        ];
    }
}

class Blizzard extends Point {
    private static convert = {
        ">": [1, 0],
        "<": [-1, 0],
        "^": [0, -1],
        v: [0, 1],
    };
    constructor(x: number, y: number, public symbol: string) {
        super(x, y);
    }
    move() {
        const [x, y] = Blizzard.convert[this.symbol];
        const oldSet = blizzardsMap.get(this.stringify());
        oldSet.delete(this);
        if (oldSet.size === 0) blizzardsMap.delete(this.stringify());

        this.x += x;
        this.y += y;
        const w = wall.get(this.stringify());
        if (w !== undefined) {
            if (this.symbol === "<") this.x = lines[0].length - 2;
            else if (this.symbol === ">") this.x = x;
            else if (this.symbol === "^") this.y = lines.length - 2;
            else if (this.symbol === "v") this.y = y;
        }
        const blizzardSet = blizzardsMap.get(this.stringify());
        if (blizzardSet) blizzardSet.add(this);
        else
            blizzardsMap.set(
                this.stringify(),
                (new Set() as Set<Blizzard>).add(this)
            );
        //console.log("new coordinate: ", this.x, this.y);
    }
}

class Me extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }
}

const start = new Me(1, 0);
const end = new Me(lines.at(-1).length - 2, lines.length - 1);

const wall: Map<string, Point> = new Map();
const blizzardsMap: Map<string, Set<Blizzard>> = new Map();
const blizzards: Blizzard[] = [];

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        const val = lines[y][x];
        if (val === "#") {
            const newWall = new Point(x, y);
            wall.set(newWall.stringify(), newWall);
        } else if (val !== ".") {
            const newBlizzard = new Blizzard(x, y, val);
            const blizzardSet: Set<Blizzard> = new Set();
            blizzardSet.add(newBlizzard);
            blizzardsMap.set(newBlizzard.stringify(), blizzardSet);
            blizzards.push(newBlizzard);
        }
    }
}

function drawMap() {
    for (let y = 0; y < lines.length; y++) {
        let row = "";
        for (let x = 0; x < lines[y].length; x++) {
            const key = `${x},${y}`;
            if (wall.has(key)) row += "#";
            else if (blizzardsMap.has(key)) {
                const set = blizzardsMap.get(key);
                if (set.size > 1) row += set.size;
                else row += [...set][0].symbol;
            } else row += ".";
        }
        console.log(row);
    }
}

function tick() {
    blizzards.forEach(b => b.move());
    start;
}

function partOne() {
    // console.log("start: ", start);
    // console.log("end: ", end);
    // console.log("wall: ", wall);
    // console.log("blizzards: ", blizzards);
    // console.log("== Initial State ==\n");
    console.log("== Initial state ==");
    drawMap();
    for (let i = 1; i < 10; i++) {
        tick();
        console.log(`\n== ${i} tick ==\n`);
        drawMap();
    }
}

partOne();

export const solution = () => {
    return;
};
