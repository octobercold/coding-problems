import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day9/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};

interface Coordinate {
    x: number;
    y: number;
}

class Knot {
    coordinate: Coordinate;
    static DIRECTIONS = {
        U: { x: 0, y: 1 },
        R: { x: 1, y: 0 },
        D: { x: 0, y: -1 },
        L: { x: -1, y: 0 },
    };
    constructor() {
        this.coordinate = {
            x: 0,
            y: 0,
        };
    }

    move(direction: string) {
        const { x, y } = Knot.DIRECTIONS[direction];
        this.coordinate.x += x;
        this.coordinate.y += y;
    }

    getDistance(knot: Knot): Coordinate {
        return {
            x: knot.coordinate.x - this.coordinate.x,
            y: knot.coordinate.y - this.coordinate.y,
        };
    }

    shouldFollow(knot: Knot): boolean {
        const distance = this.getDistance(knot);
        return Math.abs(distance.x) > 1 || Math.abs(distance.y) > 1;
    }

    recordVisits(visited: { [key: string]: number }) {
        const key = `${this.coordinate.x},${this.coordinate.y}`;
        if (visited[key] === undefined) {
            visited[key] = 1;
        } else {
            visited[key] += 1;
        }
    }
}

const lines = fileReader();

const getVisited = (
    lines: string[],
    nKnots: number
): { [key: string]: number } => {
    const visited = { "0,0": 1 };
    const bridge = new Array(nKnots).fill("").map(() => new Knot());
    const head = bridge[0];
    const tail = bridge.at(-1);

    for (const line of lines) {
        const [direction, steps] = line.split(" ");

        for (let i = 0; i < parseInt(steps); i++) {
            head.move(direction);
            console.log(
                `head coordinates: ${head.coordinate.x}, ${head.coordinate.y}`
            );

            for (let j = 1; j < nKnots; j++) {
                const curr = bridge[j];
                const prev = bridge[j - 1];
                const distance = curr.getDistance(prev);
                console.log(
                    `knot ${j} distance from head: ${distance.x}, ${distance.y}`
                );

                if (curr.shouldFollow(prev)) {
                    curr.coordinate.x += Math.sign(distance.x);
                    curr.coordinate.y += Math.sign(distance.y);
                    console.log(
                        `new coordinate for knot ${j}: ${curr.coordinate.x}, ${curr.coordinate.y}`
                    );
                    if (curr === tail) {
                        tail.recordVisits(visited);
                        // console.log(
                        //     `${tail.coordinate.x},${tail.coordinate.y}`
                        // );
                    }
                }
            }
        }
    }
    return visited;
};
const res = getVisited(lines, 10);
//console.log(`day1: ${Object.keys(getVisited(lines, 2)).length}`)
console.log(`part two: ${Object.keys(res).length}`);
