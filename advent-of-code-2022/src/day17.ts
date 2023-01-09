import { fileReader } from "./utils/fileReader";

const jetStream = fileReader(17)[0];
const chamberWidth = 7;

interface Coordinate {
    x: number;
    y: number;
}

const stringify = (coordinate: Coordinate) => {
    return coordinate.x.toString() + "," + coordinate.y.toString();
};

const rocks = [
    [[1, 1, 1, 1]],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
    ],
    [[1], [1], [1], [1]],
    [
        [1, 1],
        [1, 1],
    ],
];

function jet(chamber: Set<string>, rock: Coordinate[], s: string): boolean {
    if (s === ">") {
        if (rock.filter(c => c.x === chamberWidth - 1).length > 0) {
            //console.log("rock moved by jet but nothing happened");
            return false;
        }

        rock.forEach(c => c.x++);

        if (rock.filter(c => chamber.has(stringify(c))).length > 0) {
            rock.forEach(c => c.x--);
            //console.log("rock moved by jet but nothing happened");
            return false;
        }
        //console.log("rock moved right");
        return true;
    } else {
        if (rock.filter(c => c.x === 0).length > 0) {
            //console.log("rock moved by jet but nothing happened");
            return false;
        }

        rock.forEach(c => c.x--);

        if (rock.filter(c => chamber.has(stringify(c))).length > 0) {
            rock.forEach(c => c.x++);
            //console.log("rock moved by jet but nothing happened");
            return false;
        }
        //console.log("rock moved left");
        return true;
    }
}

function drop(chamber: Set<string>, rock: Coordinate[]): boolean {
    rock.forEach(c => c.y--);

    if (rock.filter(c => chamber.has(stringify(c))).length > 0) {
        rock.forEach(c => c.y++);
        //console.log("rock can't move down");
        return false;
    }
    //console.log(`rock moved down`);
    return true;
}

function convertRocksToCoordinates(rocks: number[][][]): Coordinate[][] {
    const rocksCoordinates: Coordinate[][] = [];
    for (const rock of rocks) {
        const temp: Coordinate[] = [];
        for (let i = rock.length - 1; i >= 0; i--) {
            for (let j = 0; j < rock[0].length; j++) {
                if (rock[i][j] === 1) {
                    temp.push({ x: j, y: rock.length - 1 - i });
                }
            }
        }
        rocksCoordinates.push(temp);
    }
    return rocksCoordinates;
}

function putRockInChamber(
    rock: Coordinate[],
    chamberTop: number
): Coordinate[] {
    const leftPadding = 2;
    const bottomPadding = 4;

    const res = [];

    for (const coordinate of rock) {
        const c = { ...coordinate };
        c.x += leftPadding;
        c.y += chamberTop + bottomPadding;
        res.push(c);
    }
    return res;
}

function drawChamber(chamber: Set<string>, chamberTop: number) {
    for (let y = chamberTop; y >= chamberTop - 20; y--) {
        let chamberRow = `${y} `.padStart(5, " ");
        for (let x = 0; x < chamberWidth; x++) {
            if (chamber.has(stringify({ x: x, y: y }))) chamberRow += `#`;
            else chamberRow += `.`;
        }
        console.log(chamberRow);
    }
}

function createChamber(chamberTop = 0): Set<string> {
    const chamber: Set<string> = new Set();
    for (let i = 0; i < chamberWidth; i++) {
        chamber.add(stringify({ x: i, y: chamberTop }));
    }
    return chamber;
}

function checkClosedPattern(rock: Coordinate[]) {
    const pattern = [];

    let minY = Infinity;
    let maxY = 0;

    for (const c of rock) {
        minY = Math.min(minY, c.y);
        maxY = Math.max(maxY, c.y);
    }

    for (let y = minY; y <= maxY; y++)
        for (let x = 0; x < chamberWidth; x++)
            if (chamber.has(`${x},${y}`)) pattern.push(`x:${x}`);

    for (let y = minY; y <= maxY; y++) {
        let isInRow = true;
        for (let x = 0; x < chamberWidth; x++) {
            if (!chamber.has(`${x},${y}`)) {
                isInRow = false;
                break;
            }
        }
        if (isInRow) return pattern;
    }
    return false;
}

let i = 0;
function fall(rocksCoordinates: Coordinate[][]) {
    const newRock = putRockInChamber(
        rocksCoordinates[i++ % rocksCoordinates.length],
        chamberTop
    );

    let canDrop = true;
    while (canDrop) {
        jet(chamber, newRock, jetStream[jetIndex]);
        jetIndex++;
        if (jetIndex === jetStream.length) jetIndex = 0;
        canDrop = drop(chamber, newRock);
    }

    newRock.forEach(c => (chamberTop = Math.max(chamberTop, c.y)));
    newRock.forEach(c => chamber.add(stringify(c)));

    return newRock;
}

const rocksCoordinates = convertRocksToCoordinates(rocks);
const chamber = createChamber();
const memory: Map<
    string,
    {
        nextBlock: number;
        upcomingPattern: string;
        chamberTopHistory: number;
        placedHistory: number;
    }
> = new Map();

let chamberTop = 0;
let jetIndex = 0;
let rocksFallen = 0;
let startRocksFallen = 0;
let startPoint = 0;

while (true) {
    const rock = fall(rocksCoordinates);
    rocksFallen++;
    const pattern = checkClosedPattern(rock);
    if (pattern) {
        if (memory.has(pattern.join(" "))) {
            const {
                nextBlock,
                upcomingPattern,
                chamberTopHistory,
                placedHistory,
            } = memory.get(pattern.join(" "));
            if (
                rocksFallen % rocksCoordinates.length === nextBlock &&
                upcomingPattern === jetStream.substring(jetIndex)
            ) {
                startPoint = chamberTopHistory;
                startRocksFallen = placedHistory;
                break;
            }
        }
        memory.set(pattern.join(" "), {
            nextBlock: rocksFallen % rocksCoordinates.length,
            upcomingPattern: jetStream.substring(jetIndex),
            chamberTopHistory: chamberTop,
            placedHistory: rocksFallen,
        });
    }
}

const remaining = 1000000000000 - rocksFallen;
const gainedPer = chamberTop - startPoint;
const reps = Math.floor(remaining / (rocksFallen - startRocksFallen));
const gained = reps * gainedPer;
const remainder = remaining % (rocksFallen - startRocksFallen);

for (let i = 0; i < remainder; i++) {
    fall(rocksCoordinates);
}
console.log(gained + chamberTop);

console.timeEnd("ExecutionTime");

export function solution() {
    //console.log()
}
