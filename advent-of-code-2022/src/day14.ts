import { fileReader } from "./utils/fileReader";
const lines = fileReader(14);

interface Coordinate {
    x: number;
    y: number;
}

const rocks: Set<string> = new Set();
const size = {
    xmax: 500,
    xmin: Number.MAX_SAFE_INTEGER,
    ymax: Number.MIN_SAFE_INTEGER,
};

const sandSource: Coordinate = { x: 500, y: 0 };
const sand: Set<string> = new Set();

const stringify = (coordinate: Coordinate) => {
    return `${coordinate.x},${coordinate.y}`;
};

sand.add(stringify(sandSource));

const updateSize = (x: number, y?: number) => {
    size.xmin = Math.min(size.xmin, x);
    size.xmax = Math.max(size.xmax, x);
    size.ymax = Math.max(size.ymax, y);
};

for (const line of lines) {
    const coordinates = line.split(" -> ");
    for (let i = 1; i < coordinates.length; i++) {
        const [x1, y1] = coordinates[i - 1].split(",").map((n) => parseInt(n));
        const [x2, y2] = coordinates[i].split(",").map((n) => parseInt(n));
        const minx = Math.min(x1, x2);
        const maxx = Math.max(x1, x2);
        const maxy = Math.max(y1, y2);
        const miny = Math.min(y1, y2);
        updateSize(x1, y1);
        updateSize(x2, y2);
        for (let i = miny; i <= maxy; i++) {
            for (let j = minx; j <= maxx; j++) {
                const newCoordinate = { x: j, y: i };
                rocks.add(stringify(newCoordinate));
            }
        }
    }
}

const normalize = (coordinate: Coordinate): Coordinate => {
    return { x: coordinate.x + size.xmin, y: coordinate.y };
};

const compare = (coordinate1: Coordinate, coordinate2: Coordinate): boolean => {
    return coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y;
};

const drawPoint = (coordinate: Coordinate): string => {
    if (compare(sandSource, coordinate)) {
        return "+";
    } else if (rocks.has(stringify(coordinate))) {
        return "#";
    } else if (sand.has(stringify(coordinate))) {
        return "○";
    } else {
        return ".";
    }
};

const drawScan = (xmin, xmax, ymax) => {
    for (let i = 0; i <= ymax; i++) {
        let row = "";
        for (let j = 0; j <= xmax - xmin; j++) {
            const coordinate: Coordinate = { x: j, y: i };
            const normalizedCoordinate = normalize(coordinate);
            row += drawPoint(normalizedCoordinate);
        }
        console.log(row);
    }
};

const moveSand = (floor: number): boolean => {
    /**
     * if next point is empty move sand down (i+1)
     * if it is not empty move sand down and left (i+1, j-1)
     * if down and left is empty move sand down and right (i+1,j+1)
     * sand stops when all three are not empty
     * sand starts falling infinitely if y = ymax
     */
    const coordinate: Coordinate = { x: sandSource.x, y: sandSource.y };
    while (coordinate.y < floor) {
        if (
            !rocks.has(stringify({ x: coordinate.x, y: coordinate.y + 1 })) &&
            !sand.has(stringify({ x: coordinate.x, y: coordinate.y + 1 }))
        ) {
            coordinate.y++;
        } else if (
            !rocks.has(
                stringify({ x: coordinate.x - 1, y: coordinate.y + 1 })
            ) &&
            !sand.has(stringify({ x: coordinate.x - 1, y: coordinate.y + 1 }))
        ) {
            coordinate.x--;
            coordinate.y++;
        } else if (
            !rocks.has(
                stringify({ x: coordinate.x + 1, y: coordinate.y + 1 })
            ) &&
            !sand.has(stringify({ x: coordinate.x + 1, y: coordinate.y + 1 }))
        ) {
            coordinate.x++;
            coordinate.y++;
        } else {
            sand.add(stringify(coordinate));
            return true;
        }
    }
    return false;
};

const moveSandTwo = (floor: number): boolean => {
    /**
     * if next point is empty move sand down (i+1)
     * if it is not empty move sand down and left (i+1, j-1)
     * if down and left is empty move sand down and right (i+1,j+1)
     * sand stops when all three are not empty
     * sand starts falling infinitely if y = ymax
     */
    const coordinate: Coordinate = { x: sandSource.x, y: sandSource.y };
    while (coordinate.y < floor) {
        if (
            !rocks.has(stringify({ x: coordinate.x, y: coordinate.y + 1 })) &&
            !sand.has(stringify({ x: coordinate.x, y: coordinate.y + 1 }))
        ) {
            coordinate.y++;
        } else if (
            !rocks.has(
                stringify({ x: coordinate.x - 1, y: coordinate.y + 1 })
            ) &&
            !sand.has(stringify({ x: coordinate.x - 1, y: coordinate.y + 1 }))
        ) {
            coordinate.x--;
            coordinate.y++;
        } else if (
            !rocks.has(
                stringify({ x: coordinate.x + 1, y: coordinate.y + 1 })
            ) &&
            !sand.has(stringify({ x: coordinate.x + 1, y: coordinate.y + 1 }))
        ) {
            coordinate.x++;
            coordinate.y++;
        } else if (
            coordinate.x === sandSource.x &&
            coordinate.y === sandSource.y
        ) {
            return false;
        } else {
            let lastx = coordinate.x;
            sand.add(stringify(coordinate));
            return true;
        }
    }

    sand.add(stringify(coordinate));
    return true;
};

const partOne = () => {
    let isFallingToAbyss = false;
    let sandParticles = 0;

    while (!isFallingToAbyss) {
        const res = moveSand(size.ymax);
        if (!res) isFallingToAbyss = true;
        sandParticles++;
    }
    return sandParticles - 1;
};

const partTwo = () => {
    let sandCanMove = true;
    let sandParticles = 0;

    while (sandCanMove) {
        const res = moveSandTwo(size.ymax + 1);
        if (!res) sandCanMove = false;
        sandParticles++;
    }
    return sandParticles;
};

export const solution = () => {
    // const res = partOne();
    // drawScan(size.xmin, size.xmax, size.ymax);
    // console.log(`part 1 solution: ${res}`);
    const res = partTwo();
    drawScan(size.xmin, size.xmax, size.ymax + 1);
    console.log(`part 2 solution: ${res}`);
};
