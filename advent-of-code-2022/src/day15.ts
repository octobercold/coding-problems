import { CoreTransformationContext } from "typescript";
import { fileReader } from "./utils/fileReader";
const lines = fileReader(15);

const INTERESTING_ROW = 2000000;

interface Coordinate {
    x: number;
    y: number;
}

const rowCoverage: Set<string> = new Set();
const counter: Set<string> = new Set();

const getDistance = (c1: Coordinate, c2: Coordinate): number => {
    const d = Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);
    return d;
};

const stringify = (coordinate: Coordinate) => {
    return `${coordinate.x},${coordinate.y}`;
};

const getCoverage = (
    sensor: Coordinate,
    beacon: Coordinate,
    row: number
): number => {
    const distance = getDistance(sensor, beacon);
    const costOfGettingToRow = Math.abs(row - sensor.y);
    const remainingPoints = distance - costOfGettingToRow;
    rowCoverage.add(stringify({ x: sensor.x, y: row }));

    for (let i = 1; i <= remainingPoints; i++) {
        const leftCoordinate = { x: sensor.x - i, y: row };
        const rightCoordinate = { x: sensor.x + i, y: row };
        rowCoverage.add(stringify(leftCoordinate));
        rowCoverage.add(stringify(rightCoordinate));
    }

    return rowCoverage.size;
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

    if (beacon.y === INTERESTING_ROW) counter.add(stringify(beacon));

    // console.log(`sensor: ${sensor.x}, ${sensor.y}`);
    // console.log(`beacon: ${beacon.x}, ${beacon.y}`);

    if (getDistance(sensor, beacon) > INTERESTING_ROW - sensor.y) {
        getCoverage(sensor, beacon, INTERESTING_ROW);
    }
}

console.log(rowCoverage.size - counter.size);

export const solution = () => {
    //network.forEach((pair) => console.log(pair.sensor, pair.beacon));
};
