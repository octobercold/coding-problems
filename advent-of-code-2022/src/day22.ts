import { fileReader } from "./utils/fileReader";
const lines = fileReader(22);
const cube = lines.slice(0, -2);
const directions = lines
    .at(-1)
    .trim()
    .match(/([\d]+)|([RL])/g);

class Point {
    constructor(public x: number, public y: number) {}

    pointSum(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }
    clockwise(point: Point): Point {
        return new Point(-this.y, this.x);
    }
    counterClockwise(point: Point): Point {
        return new Point(this.y, -this.x);
    }
    score(): number {
        return 1000 * (this.y + 1) + 4 * (this.x + 1);
    }
}

class Vector {
    constructor(public x: number, public y: number, public z: number) {}

    multiply(k: number): Vector {
        return new Vector(this.x * k, this.y * k, this.z * k);
    }
    vectorSum(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    vectorCross(other: Vector): Vector {
        return new Vector(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }
}

class Info {
    constructor(
        public point: Point,
        public i: Vector,
        public j: Vector,
        public k: Vector
    ) {}
}

let topLeft: Point;

function parseTiles(
    input: string[]
): Map<string, { point: Point; canWalk: boolean }> {
    const map = new Map();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const cell = input[y][x];
            if (cell !== " ") {
                const newPoint = new Point(x, y);
                map.set(JSON.stringify(newPoint), {
                    point: newPoint,
                    canWalk: cell === ".",
                });

                if (!topLeft && cell === ".") topLeft = newPoint;
            }
        }
    }
    return map;
}

function partTwo(faceSize = 50) {
    const tiles = parseTiles(cube);

    const scaleIJ = faceSize - 1;
    const scaleK = faceSize + 1;

    const startingPosition = new Vector(-scaleIJ, -scaleIJ, -scaleK);
    const startingDirection = new Vector(-2, 0, 0);

    const start = new Info(
        topLeft,
        new Vector(1, 0, 0),
        new Vector(0, 1, 0),
        new Vector(0, 0, 1)
    );

    const q = [start];
    const visited: Set<string> = new Set(JSON.stringify(topLeft));
    const points: Map<string, Info> = new Map();

    while (q.length) {
        const info: Info = q.shift();

        for (let x = 0; x < faceSize; x++) {
            for (let y = 0; y < faceSize; y++) {
                const key = info.i
                    .multiply(2 * x - scaleIJ)
                    .vectorSum(info.j.multiply(2 * y - scaleIJ))
                    .vectorSum(info.k.multiply(-scaleK));

                points.set(JSON.stringify(key), {
                    point: info.point.pointSum(new Point(x, y)),
                    i: info.i,
                    j: info.j,
                    k: info.k,
                });
            }
        }

        const neighbours = [
            new Info(
                info.point.pointSum(new Point(-faceSize, 0)),
                info.j.vectorCross(info.i),
                info.j,
                info.j.vectorCross(info.k)
            ),
            new Info(
                info.point.pointSum(new Point(faceSize, 0)),
                info.i.vectorCross(info.j),
                info.j,
                info.k.vectorCross(info.j)
            ),
            new Info(
                info.point.pointSum(new Point(0, -faceSize)),
                info.i,
                info.j.vectorCross(info.i),
                info.k.vectorCross(info.i)
            ),
            new Info(
                info.point.pointSum(new Point(0, faceSize)),
                info.i,
                info.i.vectorCross(info.j),
                info.i.vectorCross(info.k)
            ),
        ];

        neighbours.forEach(next => {
            if (
                tiles.has(JSON.stringify(next.point)) &&
                !visited.has(JSON.stringify(next.point))
            ) {
                q.push(next);
                visited.add(JSON.stringify(next.point));
            }
        });
    }

    let position = startingPosition;
    let direction = startingDirection;

    for (const d of directions) {
        if (d === "R") {
            direction = direction.vectorCross(
                points.get(JSON.stringify(position)).k
            );
        } else if (d === "L") {
            direction = direction.vectorCross(
                points.get(JSON.stringify(position)).k.vectorCross(direction)
            );
        } else {
            const next = position.vectorSum(direction);
        }
    }
}

console.log({ x: 1, y: 2 }.toString());

export function solution() {
    return;
}
