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

const bridge = [
    { x: 0, y: 0 }, //head
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }, // tail
];

const tailVisited = { "0,0": 1 };

const recordVisits = (tailCoordinate: Coordinate) => {
    const key = `${tailCoordinate.x},${tailCoordinate.y}`;
    if (tailVisited[key] === undefined) {
        tailVisited[key] = 1;
    } else {
        tailVisited[key] += 1;
    }
};

const lines = fileReader();

const convertLine = (
    direction: string,
    steps: number
): { x: number; y: number } => {
    if (direction === "R") {
        return { x: steps, y: 0 };
    } else if (direction === "L") {
        return { x: -steps, y: 0 };
    } else if (direction === "U") {
        return { x: 0, y: steps };
    } else {
        return { x: 0, y: -steps };
    }
};

const getIncrement = (
    oldCoordinate: Coordinate,
    newCoordinate: Coordinate
): Coordinate => {
    const incrementX = newCoordinate.x - oldCoordinate.x > 0 ? 1 : -1;
    const incrementY = newCoordinate.y - oldCoordinate.y > 0 ? 1 : -1;
    return { x: incrementX, y: incrementY };
};

const getDistance = (
    oldCoordinate: Coordinate,
    newCoordinate: Coordinate
): Coordinate => {
    const dx = Math.abs(newCoordinate.x - oldCoordinate.x);
    const dy = Math.abs(newCoordinate.y - oldCoordinate.y);
    return { x: dx, y: dy };
};

const moveKnot = (currentKnot: Coordinate, newCoordinate: Coordinate) => {
    const delta = getDistance(currentKnot, newCoordinate);
    const increment = getIncrement(currentKnot, newCoordinate);

    if (delta.x >= 1 && delta.y >= 1) {
        currentKnot.x += increment.x;
        currentKnot.y += increment.y;
    } else if (delta.x >= 1) {
        currentKnot.x += increment.x;
    } else if (delta.y >= 1) {
        currentKnot.y += increment.y;
    }
};

for (const line of lines) {
    const command = line.split(" ");
    const steps = parseInt(command[1]);
    const newCoordinate = convertLine(command[0], steps);
    bridge[0].x += newCoordinate.x;
    bridge[0].y += newCoordinate.y;

    for (let i = 1; i < bridge.length; i++) {
        const newCoordinate = bridge[i - 1];
        const currentKnot = bridge[i];
        for (let j = 0; j < steps; j++) {
            const newDistance = getDistance(currentKnot, newCoordinate);
            if (newDistance.x <= 1 && newDistance.y <= 1) break;
            // console.log(
            //     `bridge knot ${i} with coordinates : ${bridge[i].x}, ${
            //         bridge[i].y
            //     } is ${Math.abs(
            //         bridge[i - 1].x - bridge[i].x
            //     )} away by X and ${Math.abs(
            //         bridge[i - 1].y - bridge[i].y
            //     )} away by Y `
            // );
            moveKnot(currentKnot, newCoordinate);
            // console.log(
            //     `moved knot ${i} to ${currentKnot.x}, ${currentKnot.y}`
            // );
            if (i === bridge.length - 1) {
                recordVisits(currentKnot);
            }
        }
    }

    //console.log(bridge);
}

console.log(bridge);

console.log(Object.keys(tailVisited).length);
