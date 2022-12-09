import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day9/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};

const lines = fileReader();

const visitedCoordinates = { "0,0": 1 };
const h = { x: 0, y: 0 };
const t = { x: 0, y: 0 };

const convert = (
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

const recordCoordinate = (x: number, y: number) => {
    if (visitedCoordinates[`${x},${y}`] !== undefined) {
        visitedCoordinates[`${x},${y}`]++;
    } else {
        visitedCoordinates[`${x},${y}`] = 1;
    }
    console.log(`recorded coordinate ${x} ${y}`);
};

for (const line of lines) {
    const command = line.split(" ");
    const steps = parseInt(command[1]);
    const { x, y } = convert(command[0], steps);
    h.x += x;
    h.y += y;
    const dx = Math.abs(h.x - t.x);
    const dy = Math.abs(h.y - t.y);
    const incrementX = h.x - t.x > 0 ? 1 : -1;
    const incrementY = h.y - t.y > 0 ? 1 : -1;
    console.log(`new head position: ${h.x} ${h.y}`);
    if (dx > 0 && dy > 0) {
        //potentially need to move diagonally
        if ((dx > 1 && dy === 1) || (dx === 1 && dy > 1)) {
            //move y and x first
            t.x += incrementX;
            t.y += incrementY;
            recordCoordinate(t.x, t.y);
        }
    }
    if (dy > dx) {
        //move vertically
        while (Math.abs(h.y - t.y) > 1) {
            t.y += incrementY;
            recordCoordinate(t.x, t.y);
        }
    } else if (dy < dx) {
        //move horizontally
        while (Math.abs(h.x - t.x) > 1) {
            t.x += incrementX;
            recordCoordinate(t.x, t.y);
        }
    }
}

console.log(Object.keys(visitedCoordinates).length);
