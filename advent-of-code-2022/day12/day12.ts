import * as fs from "fs";

// const fileReader = () => {
//     //returns list of strings separated by \n
//     const string = fs.readFileSync("./day12/input.txt", { encoding: "utf-8" });
//     return string.split("\n");
// };

// const lines = fileReader();

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

// const map = [];
// const start = { i: -1, j: -1 };
// const end = { i: -1, j: -1 };

// for (let i = 0; i < lines.length; i++) {
//     const row = [];
//     for (let j = 0; j < lines[i].length; j++) {
//         if (lines[i][j] === "S") {
//             start.i = i;
//             start.j = j;
//             row.push(0);
//         } else if (lines[i][j] === "E") {
//             end.i = i;
//             end.j = j;
//             row.push(25);
//         } else {
//             row.push(lines[i][j].charCodeAt(0) - 97);
//         }
//     }
//     map.push(row);
// }

// console.log(`start: ${start.i}, ${start.j}`);
// console.log(`end: ${end.i}, ${end.j}`);

class Graph {
    walls: Set<string>;
    constructor(public width: number, public height: number) {
        this.walls = new Set();
    }

    inBounds(id: [number, number]): boolean {
        const [x, y] = id;
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    passable(id: [number, number]): boolean {
        return !this.walls.has(`${id[0]},${id[1]}`);
    }

    neighbours(id: [number, number]): [number, number][] {
        const [x, y] = id;
        const neighbours: [number, number][] = [
            [x + 1, y],
            [x - 1, y],
            [x, y - 1],
            [x, y + 1],
        ];
        if ((x + y) % 2 === 0) neighbours.reverse();
        const results = neighbours
            .filter((neighbour) => this.inBounds(neighbour))
            .filter((neighbour) => this.passable(neighbour));
        return results;
    }
}

const from_id_width = (id: number, width: number): [number, number] => {
    return [id % width, Math.floor(id / width)];
};

const drawTile = (
    graph: Graph,
    id: [number, number],
    parents: Map<string, [number, number]>,
    start: [number, number],
    goal: [number, number]
) => {
    let r = " . ";
    const [x1, y1] = id;
    const parent = parents.get(`${id[0]},${id[1]}`);
    if (`${id[0]},${id[1]}` === `${start[0]},${start[1]}`) return (r = " A ");
    if (`${id[0]},${id[1]}` === `${goal[0]},${goal[1]}`) return (r = " Z ");
    if (parent !== undefined && parent !== null) {
        const [x2, y2] = parent;
        if (x2 === x1 + 1) r = " > ";
        if (x2 == x1 - 1) r = " < ";
        if (y2 == y1 + 1) r = " v ";
        if (y2 == y1 - 1) r = " ^ ";
    }
    if (graph.walls.has(`${id[0]},${id[1]}`)) r = "###";
    return r;
};

const drawGrid = (
    graph: Graph,
    parents: Map<string, [number, number]>,
    start: [number, number],
    goal: [number, number]
) => {
    console.log("___".repeat(graph.width));
    for (let y = 0; y < graph.height; y++) {
        let row = "";
        for (let x = 0; x < graph.width; x++) {
            row += drawTile(graph, [x, y], parents, start, goal);
        }
        console.log(row);
        console.log();
    }
    console.log("~~~".repeat(graph.width));
};

const walls = [
    21, 22, 51, 52, 81, 82, 93, 94, 111, 112, 123, 124, 133, 134, 141, 142, 153,
    154, 163, 164, 171, 172, 173, 174, 175, 183, 184, 193, 194, 201, 202, 203,
    204, 205, 213, 214, 223, 224, 243, 244, 253, 254, 273, 274, 283, 284, 303,
    304, 313, 314, 333, 334, 343, 344, 373, 374, 403, 404, 433, 434,
];

const BFS = (graph: Graph, start: [number, number], goal: [number, number]) => {
    const frontier: [number, number][] = [];
    frontier.push(start);
    const cameFrom: Map<string, [number, number] | null> = new Map();
    cameFrom.set(`${start[0]},${start[1]}`, null);

    while (frontier.length > 0) {
        const current: [number, number] = frontier.shift();

        if (`${current[0]},${current[1]}` === `${goal[0]},${goal[1]}`) break;

        for (const next of graph.neighbours(current)) {
            if (!cameFrom.has(`${next[0]},${next[1]}`)) {
                frontier.push(next);
                cameFrom.set(`${next[0]},${next[1]}`, current);
            }
        }
    }
    return cameFrom;
};

const diagramWalls: [number, number][] = walls.map((id) =>
    from_id_width(id, 30)
);
const g = new Graph(30, 15);
diagramWalls.forEach((id) => g.walls.add(`${id[0]},${id[1]}`));

const start: [number, number] = [8, 7];
const goal: [number, number] = [17, 2];
const parents = BFS(g, start, goal);
drawGrid(g, parents, start, goal);
