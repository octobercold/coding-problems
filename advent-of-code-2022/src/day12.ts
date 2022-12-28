import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day12/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};

const lines = fileReader();

/*
S = 83
E = 69
a = 97
z = 122

[
  [0, 0,  1, 16, 15, 14, 13, 12],
  [0, 1,  2, 17, 24, 23, 23, 11],
  [0, 2,  2, 18, 25, 25, 23, 10],
  [0, 2,  2, 19, 20, 21, 22,  9],
  [0, 1,  3,  4,  5,  6,  7,  8]
]
*/

interface Coordinate {
    x: number;
    y: number;
}

const map: number[][] = [];

const starts: Coordinate[] = [];
let S: Coordinate, E: Coordinate;

for (let i = 0; i < lines.length; i++) {
    const row = [];
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "S") {
            S = { x: j, y: i };
            row.push(0);
        } else if (lines[i][j] === "E") {
            E = { x: j, y: i };
            row.push(25);
        } else {
            row.push(lines[i][j].charCodeAt(0) - 97);
        }
        if (lines[i][j] === "a") starts.push({ x: j, y: i });
    }
    map.push(row);
}

const toId = (x: number, y: number): string => `${x},${y}`;

function getNeighbors(x: number, y: number): { x: number; y: number }[] {
    return [
        { x: x, y: y - 1 },
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x, y: y + 1 },
    ].filter((coord) => typeof map[coord.y]?.[coord.x] !== "undefined");
}

function buildFrontier(fromX: number, fromY: number): Map<string, string> {
    const frontier: Coordinate[] = [];
    frontier.push({ x: fromX, y: fromY });

    const cameFrom: Map<string, string | null> = new Map();
    cameFrom.set(toId(fromX, fromY), null);
    while (frontier.length > 0) {
        const current = frontier.shift();
        const currentVal = map[current.y][current.x];

        const neighbors = getNeighbors(current.x, current.y);
        for (const next of neighbors) {
            const nextCell = map[next.y][next.x];
            const nextId = toId(next.x, next.y);

            if (nextCell - currentVal > 1 || cameFrom.has(nextId)) {
                continue;
            }

            const currentId = toId(current.x, current.y);
            frontier.push(next);
            cameFrom.set(nextId, currentId);
        }
    }

    return cameFrom;
}

function getShortestPath(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
): string[] {
    const from = toId(fromX, fromY);
    const cameFrom = buildFrontier(fromX, fromY);
    let current = toId(toX, toY);

    const path: string[] = [];
    while (current !== undefined && current !== from) {
        path.push(current);
        current = cameFrom.get(current);
    }

    if (current === undefined) {
        return [];
    }

    path.reverse();

    return path;
}

const path = getShortestPath(S.x, S.y, E.x, E.y);
console.log("Part one:", path.length);

let minPathLength = Number.MAX_VALUE;
for (const start of starts) {
    const path = getShortestPath(start.x, start.y, E.x, E.y);
    if (path.length) {
        minPathLength = Math.min(minPathLength, path.length);
    }
}

console.log("Part two:", minPathLength);
