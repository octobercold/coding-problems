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

const map = [];
const start = { i: -1, j: -1 };
const end = { i: -1, j: -1 };

for (let i = 0; i < lines.length; i++) {
    const row = [];
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "S") {
            start.i = i;
            start.j = j;
            row.push(0);
        } else if (lines[i][j] === "E") {
            end.i = i;
            end.j = j;
            row.push(25);
        } else {
            row.push(lines[i][j].charCodeAt(0) - 97);
        }
    }
    map.push(row);
}

console.log(`start: ${start.i}, ${start.j}`);
console.log(`end: ${end.i}, ${end.j}`);

const maze = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

interface Coordinate {
    i: number;
    j: number;
}

class Node {
    g: number;
    h: number;
    f: number;

    constructor(public position: Coordinate, public parent?: Node) {
        this.position = position;
        this.parent = parent === undefined ? null : parent;
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }
}

const astar = (map: number[][], start: Coordinate, end: Coordinate) => {
    const startNode = new Node(start);
    const endNode = new Node(end);

    const openList = [startNode];
    const closedList: Node[] = [];

    while (openList.length > 0) {
        console.log(`open list: ${openList}`);
        console.log(`closed list: ${closedList}`);
        let currentNode = openList[0];
        const currenVal = map[currentNode.position.i][currentNode.position.j];
        let currentIndex = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }
        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        if (currentNode === endNode) {
            const path = [];
            let current = currentNode;
            while (currentNode !== undefined) {
                path.push(current.position);
                current = current.parent;
            }
            return path.reverse();
        }

        const children: Node[] = [];

        const neighboursPositions: Coordinate[] = [
            { i: 1, j: 0 },
            { i: 0, j: 1 },
            { i: -1, j: 0 },
            { i: 0, j: -1 },
        ];
        for (const position of neighboursPositions) {
            const nodePosition: Coordinate = {
                i: currentNode.position.i + position.i,
                j: currentNode.position.j + position.j,
            };
            if (
                nodePosition.i > map.length - 1 ||
                nodePosition.i < 0 ||
                nodePosition.j > map[0].length - 1 ||
                nodePosition.j < 0
            ) {
                continue;
            }

            // if (map[nodePosition.i][nodePosition.j] - 1 > currenVal) {
            //     continue;
            // }
            if (map[nodePosition.i][nodePosition.j] != 0) continue;
            const newNode = new Node(nodePosition, currentNode);
            children.push(newNode);
        }

        for (const child of children) {
            for (const closedChild of closedList) {
                if (child === closedChild) continue;
                child.g = currentNode.g + 1;
                child.h =
                    (child.position.i - endNode.position.i) ** 2 +
                    (child.position.j - endNode.position.j) ** 2;
                child.f = child.g + child.h;
            }
            for (const openNode of openList) {
                if (child === openNode && child.g > openNode.g) continue;
                openList.push(child);
            }
        }
    }
};

const path = astar(maze, { i: 0, j: 0 }, { i: 7, j: 6 });
console.log(path);
