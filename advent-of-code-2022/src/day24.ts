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
        blizzardsSet.delete(this.stringify());
        this.x += x;
        this.y += y;
        const w = wall.get(this.stringify());
        if (w !== undefined) {
            this.x = this.symbol === "<" || this.symbol === ">" ? x : this.x;
            this.y = this.symbol === "^" || this.symbol === "v" ? y : this.y;
        }
        blizzardsSet.add(this.stringify());
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
const blizzardsSet: Set<string> = new Set();
const blizzards: Blizzard[] = [];

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        const val = lines[y][x];
        if (val === "#") {
            const newWall = new Point(x, y);
            wall.set(newWall.stringify(), newWall);
        } else if (val !== ".") {
            const newBlizzard = new Blizzard(x, y, val);
            blizzardsSet.add(newBlizzard.stringify());
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
            else if (blizzardsSet.has(key)) row += "X";
            else row += ".";
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
