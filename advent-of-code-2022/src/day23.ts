import { NewLineKind } from "typescript";
import { fileReader } from "./utils/fileReader";
const lines = fileReader(23);

class Point {
    static convert = {
        N: ["NW", "N", "NE"],
        S: ["SW", "S", "SE"],
        W: ["NW", "W", "SW"],
        E: ["NE", "E", "SE"],
    };
    order: string[];
    constructor(public x: number, public y: number, public val?: string) {
        this.order = ["N", "S", "W", "E"];
        this.val === undefined ? null : val;
    }

    stringify() {
        return `${this.x},${this.y}`;
    }

    neighbours(): { [key: string]: Point } {
        return {
            NW: new Point(this.x - 1, this.y - 1),
            N: new Point(this.x, this.y - 1),
            NE: new Point(this.x + 1, this.y - 1),
            W: new Point(this.x - 1, this.y),
            E: new Point(this.x + 1, this.y),
            SW: new Point(this.x - 1, this.y + 1),
            S: new Point(this.x, this.y + 1),
            SE: new Point(this.x + 1, this.y + 1),
        };
    }

    move(next: Point) {
        next.val = "#";
        map.set(next.stringify(), next);
        this.val = ".";
    }
}

const map: Map<string, Point> = new Map();
const elfs: Point[] = [];

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        const newPoint = new Point(x, y, lines[y][x]);
        map.set(newPoint.stringify(), newPoint);
        if (lines[y][x] === "#") elfs.push(newPoint);
    }
}

function playRound() {
    for (let i = 0; i < elfs.length; i++) {
        const neighbours = elfs[i].neighbours();
        let next: string;
        let thereIsNeighbour = false;
        for (const direction of elfs[i].order) {
            if (
                map.get(Point.convert[direction][0].stringify()).val === "#" ||
                map.get(Point.convert[direction][1].stringify()).val === "#" ||
                map.get(Point.convert[direction][2].stringify()).val === "#"
            )
                thereIsNeighbour = true;
            else next = direction;
        }
        if (next && thereIsNeighbour) {
            elfs[i].move(neighbours[next]);
            elfs[i] = neighbours[next];
        }
    }
}

function solution() {
    return;
}
