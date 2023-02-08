import { fileReader } from "./utils/fileReader";
const lines = fileReader(22);
const cube = lines.slice(0, -2);

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

function parseTiles(input: string[]): Map<string, {}> {
    const map = new Map();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const cell = input[y][x];
            if (cell !== " ")
                map.set(`${x},${y}`, { x: x, y: y, canWalk: cell === "." });
            if (!topLeft && cell === ".") topLeft = new Point(x, y);
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
                const key = vectorSum(
                    vectorSum(
                        multiply(info.i, 2 * x - scaleIJ),
                        multiply(info.j, 2 * y - scaleIJ)
                    ),
                    multiply(info.k, -scaleK)
                );
                points.set(JSON.stringify(key), {
                    point: pointSum(info.point, { x: x, y: y }),
                    i: info.i,
                    j: info.j,
                    k: info.k,
                });
            }
        }

        const neighbours = [{}];
    }
}

console.log({ x: 1, y: 2 }.toString());

export function solution() {
    return;
}
