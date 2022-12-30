import { fileReader } from "./utils/fileReader";
const lines = fileReader(15);

// let firstRow = "   "
// let secondRow="   "
// const left=size.minx % 5
// const right=size.maxx % 5
// secondRow+=left
// for (let i=size.minx;i<=size.maxx;i+=4) {
//     firstRow+=`${i % 10}    `
// }
// const leftTail = " ".repeat(left)
// const rightTail = " ".repeat(right)
// for (let i=size.minx; i<size.maxx;i=+5) {

// }

const INTERESTING_ROW = 11;

interface Coordinate {
    x: number;
    y: number;
}
//beacon is last elem in array
const network: Map<string, [Set<string>, Coordinate]> = new Map();
const globalCoverage: Set<string> = new Set();
const rowCoverage: Set<string> = new Set();
const beacons: Set<string> = new Set();
const sensors: Set<string> = new Set();

const size = {
    minx: Number.MAX_SAFE_INTEGER,
    miny: Number.MAX_SAFE_INTEGER,
    maxx: Number.MIN_SAFE_INTEGER,
    maxy: Number.MIN_SAFE_INTEGER,
};

const updateSize = (x, y) => {
    size.maxx = Math.max(size.maxx, x);
    size.maxy = Math.max(size.maxy, y);
    size.minx = Math.min(size.minx, x);
    size.miny = Math.min(size.miny, y);
};

const getDistance = (c1: Coordinate, c2: Coordinate): number => {
    const d = Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);
    return d;
};

const stringify = (coordinate: Coordinate) => {
    return `${coordinate.x},${coordinate.y}`;
};

const generateCoverage = (
    sensor: Coordinate,
    distance: number,
    y: number
): Set<string> => {
    /**
     * adds points to global coverage
     * returns local coverage for sensor
     */
    const left = sensor.x - distance - 1;
    const right = sensor.x + distance + 1;
    const top = sensor.y - distance - 1;
    const bottom = sensor.y + distance + 1;
    const localCoverage: Set<string> = new Set();

    for (let i = top; i <= bottom; i++) {
        for (let j = left; j <= right; j++) {
            const currentCoordinate = { x: j, y: i };
            const currentDistance = getDistance(sensor, currentCoordinate);
            if (distance >= currentDistance) {
                updateSize(currentCoordinate.x, currentCoordinate.y);
                globalCoverage.add(stringify(currentCoordinate));
                localCoverage.add(stringify(currentCoordinate));
                if (currentCoordinate.y === y) {
                    rowCoverage.add(stringify(currentCoordinate));
                }
            }
        }
    }
    return localCoverage;
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

    sensors.add(stringify(sensor));
    beacons.add(stringify(beacon));
    updateSize(beacon.x, beacon.y);

    const distance = getDistance(sensor, beacon);
    const localCoverage = generateCoverage(sensor, distance, INTERESTING_ROW);

    network.set(stringify(sensor), [localCoverage, beacon]);
}

const drawPoint = (coordinate: Coordinate, sensor?: Coordinate): string => {
    let c: Set<string>;
    let b: Set<string>;
    let s: Set<string>;
    if (sensor !== undefined) {
        if (!network.has(stringify(sensor))) {
            throw new Error("sensor not found");
        }

        c = network.get(stringify(sensor))[0];
        b = new Set(stringify(network.get(stringify(sensor))[1]));
        s = new Set(stringify(sensor));
    } else {
        c = globalCoverage;
        b = beacons;
        s = sensors;
    }
    if (s.has(stringify(coordinate))) {
        return "S";
    } else if (b.has(stringify(coordinate))) {
        return "B";
    } else if (c.has(stringify(coordinate))) {
        return "#";
    } else {
        return ".";
    }
};

const draw = (sensor?: Coordinate) => {
    if (sensor !== undefined) {
        console.log(`COVERAGE FOR SENSOR: ${sensor.x},${sensor.y}`);
    } else {
        console.log(`ENTIRE NETWORK`);
    }
    console.log(
        "minx: " +
            size.minx.toString() +
            " ========================================== maxx: " +
            size.maxx.toString()
    );
    for (let i = size.miny; i < size.maxy; i++) {
        let row = i.toString().padStart(3, " ") + " ";
        for (let j = size.minx; j < size.maxx; j++) {
            const currentCoordinate: Coordinate = { x: j, y: i };
            const str = drawPoint(currentCoordinate, sensor);
            row += str;
        }
        console.log(row);
    }
};

draw();

// console.log(`size: ${JSON.stringify(size)}`);
// console.log(rowCoverage.size);

export const solution = () => {
    //network.forEach((pair) => console.log(pair.sensor, pair.beacon));
};
