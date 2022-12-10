import * as fs from "fs";
import { BrotliCompress } from "zlib";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day9/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};

const lines = fileReader();

interface Knot {
    x: number;
    y: number;
}

const visitedCoordinates = { "0,0": 1 };

const convert = (direction: string): { x: number; y: number } => {
    if (direction === "R") {
        return { x: 1, y: 0 };
    } else if (direction === "L") {
        return { x: -1, y: 0 };
    } else if (direction === "U") {
        return { x: 0, y: 1 };
    } else {
        return { x: 0, y: -1 };
    }
};

const moveKnot = (currentKnot: Knot, newH: Knot): Knot => {
    //moves passed knot one step towards a new position and returns change in coordinates for the following knot
    console.log(
        `moving ${currentKnot.x},${currentKnot.y} to ${newH.x},${newH.y}`
    );
    const dx = Math.abs(newH.x - currentKnot.y);
    const dy = Math.abs(newH.y - currentKnot.y);
    const incrementX = newH.x - currentKnot.x > 0 ? 1 : -1;
    const incrementY = newH.y - currentKnot.y > 0 ? 1 : -1;
    if (dx <= 1 && dy <= 1) {
        //do not move
        console.log(`current knot is close enough`);
        return currentKnot;
    } else if ((dx > 1 && dy === 1) || (dx === 1 && dy > 1)) {
        //move diagonally
        currentKnot.x += incrementX;
        currentKnot.y += incrementY;
        return currentKnot;
    } else if (dy > dx) {
        //move vertically
        currentKnot.y += incrementY;
        return currentKnot;
    } else if (dy < dx) {
        //move horizontally
        currentKnot.x += incrementX;
        return currentKnot;
    }
    return currentKnot;
};

const bridge = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
];

for (const line of lines) {
    console.log(`looking at command ${line}`);
    const command = line.split(" ");
    const steps = parseInt(command[1]);
    const { x, y } = convert(command[0]);
    let newH = {
        x: (bridge[0].x += x * steps),
        y: (bridge[0].y += y * steps),
    };
    console.log(`new head position: ${newH.x},${newH.y}`);
    bridge[0] = newH;
    for (let i = 1; i < bridge.length; i++) {
        console.log(
            `looking to move knot: ${i} with current coordinates ${bridge[i].x}, ${bridge[i].y}`
        );
        for (let j = 0; j < steps - 1; j++) {
            const newCurrentKnotCoordinate = moveKnot(bridge[i], newH);
            console.log(
                `moved knot ${i} to the new coordinate ${newCurrentKnotCoordinate.x},${newCurrentKnotCoordinate.y}`
            );
        }
        console.log(
            `${bridge[i].x},${bridge[i].y} is going to be a target for the next knot`
        );
        newH = bridge[i];
    }
}

console.log(bridge);
