import { isConstructorDeclaration } from "typescript";
import { fileReader } from "./utils/fileReader";
const lines = fileReader(23);

class Point {
    order: string[][];
    constructor(public x: number, public y: number) {
        this.order = [
            ["NW", "N", "NE"],
            ["SW", "S", "SE"],
            ["NW", "W", "SW"],
            ["NE", "E", "SE"],
        ];
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
        this.x = next.x;
        this.y = next.y;
    }

    changeOrder() {
        this.order.push(this.order.shift());
    }
}

let border = [+Infinity, -Infinity, +Infinity, -Infinity];

function updateBorder(elf: Point) {
    border[0] = Math.min(border[0], elf.x);
    border[1] = Math.max(border[1], elf.x);
    border[2] = Math.min(border[2], elf.y);
    border[3] = Math.max(border[3], elf.y);
}

const map: Map<string, Point> = new Map();
const elfs: Point[] = [];

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        const newElf = new Point(x, y);

        if (lines[y][x] === "#") {
            map.set(newElf.stringify(), newElf);
            elfs.push(newElf);
            updateBorder(newElf);
        }
    }
}

function playRound() {
    const proposedMoves: Map<string, Point[]> = new Map();

    for (let i = 0; i < elfs.length; i++) {
        const neighbours = elfs[i].neighbours();
        let next: Point;
        let thereIsNeighbour = false;

        for (const directions of elfs[i].order) {
            const first = neighbours[directions[0]];
            const second = neighbours[directions[1]];
            const third = neighbours[directions[2]];
            if (
                map.has(first.stringify()) ||
                map.has(second.stringify()) ||
                map.has(third.stringify())
            ) {
                thereIsNeighbour = true;
            } else if (!next) {
                next = second;
            }
        }
        if (next && thereIsNeighbour) {
            const val = proposedMoves.get(next.stringify());
            if (val !== undefined) {
                proposedMoves.set(next.stringify(), [...val, elfs[i]]);
            } else {
                proposedMoves.set(next.stringify(), [next, elfs[i]]);
            }
        }
        elfs[i].changeOrder();
    }

    // console.log("<< proposed moves >> \n");
    // for (const [key, value] of proposedMoves) {
    //     if (value.length > 2) {
    //         console.log(value, "will not move");
    //         continue;
    //     }
    //     console.log("proposed cooradinate: ", key);
    //     const [next, elf] = value;
    //     console.log(
    //         "NEXT: x: ",
    //         next.x,
    //         " y: ",
    //         next.y,
    //         " order: ",
    //         next.order
    //     );
    //     console.log("ELF: x: ", elf.x, " y: ", elf.y, " order: ", elf.order);
    // }
    // console.log("\n\n<< end of proposed moves >>\n");
    if (proposedMoves.size === 0) return true;
    for (const [, value] of proposedMoves) {
        if (value.length < 3) {
            const [next, elf] = value;
            map.delete(elf.stringify());
            elf.move(next);
            map.set(elf.stringify(), elf);
            updateBorder(elf);
        }
    }
    return proposedMoves.size;
}

function drawMap() {
    const [xmin, xmax, ymin, ymax] = border;
    for (let y = ymin; y <= ymax; y++) {
        let row = "";
        for (let x = xmin; x <= xmax; x++) {
            if (map.has(`${x},${y}`)) row += "#";
            else row += ".";
        }
        console.log(row);
    }
}

function partOne(rounds = 10) {
    //console.log("== Initial State ==\n");
    //drawMap();
    for (let i = 1; i <= rounds; i++) {
        //console.log("\n\n== End of Round ", i, " ==\n");
        playRound();
        //drawMap();
    }
    border = [+Infinity, -Infinity, +Infinity, -Infinity];
    for (const [, value] of map) {
        updateBorder(value);
    }
    const [xmin, xmax, ymin, ymax] = border;

    return (xmax - xmin + 1) * (ymax - ymin + 1) - elfs.length;
}

function partTwo() {
    let roundsPlayed = 10;
    while (true) {
        const res = playRound();
        roundsPlayed++;
        if (res === true) break;
        //else console.log("number of proposed position: ", res);
    }
    return roundsPlayed;
}

export const solution = () => {
    console.log("Part one solution: ", partOne());
    console.log("part two solution: ", partTwo());
};
