import { fileReader } from "./utils/fileReader";
const lines = fileReader(15);

const BOUNDARY = { min: 0, max: 4000000 };

interface Coordinate {
    x: number;
    y: number;
}

const network: Coordinate[][] = [];
const sensors: Map<string, number> = new Map();

const intersections: Map<string, number> = new Map();

const stringify = (coordinate: Coordinate) => {
    return `${coordinate.x},${coordinate.y}`;
};

const getDistance = (c1: Coordinate, c2: Coordinate): number => {
    const d = Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y) + 1;
    //console.log(`distance: ${d}`);
    return d;
};

const generateCoverage = (
    sensor: Coordinate,
    beacon: Coordinate
): Coordinate[] => {
    const d = getDistance(sensor, beacon);
    return [
        { x: sensor.x, y: sensor.y - d },
        { x: sensor.x - d, y: sensor.y },
        { x: sensor.x + d, y: sensor.y },
        { x: sensor.x, y: sensor.y + d },
    ];
};

const pointInsideBoundary = (c: Coordinate): boolean => {
    //check if the point is inside boundary
    return (
        c.x >= BOUNDARY.min &&
        c.x <= BOUNDARY.max &&
        c.y >= BOUNDARY.min &&
        c.y <= BOUNDARY.max
    );
};

const edges = (arr: Coordinate[]) => {
    const [c1, c2, c3, c4] = arr;
    return [
        [c1, c2],
        [c2, c3],
        [c3, c4],
        [c4, c1],
    ];
};
const findIntersection = (
    c1: Coordinate,
    c2: Coordinate,
    c3: Coordinate,
    c4: Coordinate
): Coordinate | null => {
    /**
     * find intersection in terms of first degree Bezier parameters
     * https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line
     */

    const t =
        ((c1.x - c3.x) * (c3.y - c4.y) - (c1.y - c3.y) * (c3.x - c4.x)) /
        ((c1.x - c2.x) * (c3.y - c4.y) - (c1.y - c2.y) * (c3.x - c4.x));
    const u =
        ((c1.x - c3.x) * (c1.y - c2.y) - (c1.y - c3.y) * (c1.x - c2.x)) /
        ((c1.x - c2.x) * (c3.y - c4.y) - (c1.y - c2.y) * (c3.x - c4.x));
    const x = Math.round(c1.x + t * (c2.x - c1.x));
    const y = Math.round(c1.y + t * (c2.y - c1.y));
    const i = { x: x, y: y };

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1 && pointInsideBoundary(i)) {
        return i;
    } else {
        return null;
    }
};

for (const line of lines) {
    const temp = line.split(":").map((device) => device.split(", y="));
    const sensor: Coordinate = {
        x: parseInt(temp[0][0].split("=").at(-1)),
        y: parseInt(temp[0].at(-1)),
    };
    const beacon: Coordinate = {
        x: parseInt(temp[1][0].split("=").at(-1)),
        y: parseInt(temp[1].at(-1)),
    };
    sensors.set(stringify(sensor), getDistance(sensor, beacon));
    const coverage = generateCoverage(sensor, beacon);
    const newEdges = edges(coverage);
    network.push(...newEdges);
}

for (let i = 0; i < network.length / 2; i++) {
    for (let j = 1; j < network.length / 2; j++) {
        const c1 = network[i][0];
        const c2 = network[i][1];
        const c3 = network[j][0];
        const c4 = network[j][1];
        const intersection = findIntersection(c1, c2, c3, c4);
        if (intersection === null) continue;
        const key = stringify(intersection);
        const val = intersections.get(key);
        if (val !== undefined) {
            intersections.set(key, val + 1);
        } else {
            intersections.set(key, 1);
        }
    }
}
let res: number;
for (const key of intersections.keys()) {
    let exit = true;
    const [x, y] = key.split(",").map((x) => parseInt(x));
    for (const [sensor, distance] of sensors.entries()) {
        const [sx, sy] = sensor.split(",").map((x) => parseInt(x));
        if (getDistance({ x: x, y: y }, { x: sx, y: sy }) - 1 < distance) {
            exit = false;
            break;
        }
        if (exit) res = x * BOUNDARY.max + y;
    }
}

console.log(res);

export const solution = () => {
    //network.forEach((pair) => console.log(pair.sensor, pair.beacon));
};
