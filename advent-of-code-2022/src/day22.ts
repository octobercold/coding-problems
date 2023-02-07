import { fileReader } from "./utils/fileReader";
const lines = fileReader(22);
const cube = lines.slice(0, -2);

interface Point {
    x: number;
    y: number;
}

interface Vector {
    x: number;
    y: number;
    z: number;
}

interface Info {
    point: Point;
    i: Vector;
    j: Vector;
    k: Vector;
}

function pointsSum(point1: Point, point2: Point): Point {
    return { x: point1.x + point2.x, y: point1.y + point2.y };
}
function clockwise(point: Point): Point {
    return { x: -point.y, y: point.x };
}
function counterClockwise(point: Point): Point {
    return { x: point.y, y: -point.x };
}
function score(point: Point): number {
    return 1000 * (point.y + 1) + 4 * (point.x + 1);
}

function multiply(v: Vector, k: number): Vector {
    return { x: v.x * k, y: v.y * k, z: v.z * k };
}
function vectorsSum(a: Vector, b: Vector): Vector {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
function vectorsCross(a: Vector, b: Vector): Vector {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x,
    };
}

let topLeft: Point;

function parseTiles(input: string[]): Map<string, {}> {
    const map = new Map();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const cell = input[y][x];
            if (cell !== " ")
                map.set(`${x},${y}`, { x: x, y: y, canWalk: cell === "." });
            if (!topLeft && cell === ".") topLeft = { x: x, y: y };
        }
    }
    return map;
}

function partTwo(faceSize = 50) {
    const tiles = parseTiles(cube);

    const scaleIJ = faceSize - 1;
    const scaleK = faceSize + 1;
    const startingPosition: Vector = { x: -scaleIJ, y: -scaleIJ, z: -scaleK };
    const startingDirection: Vector = { x: -2, y: 0, z: 0 };

    const start: Info = {
        point: topLeft,
        i: { x: 1, y: 0, z: 0 },
        j: { x: 0, y: 1, z: 0 },
        k: { x: 0, y: 0, z: 1 },
    };

    const q = [start];
    const visited: Set<string> = new Set(JSON.stringify(topLeft));
    const points: Map<string, Info> = new Map()

    while (q.length) {
        
    }
}

console.log({ x: 1, y: 2 }.toString());

export function solution() {
    return;
}
