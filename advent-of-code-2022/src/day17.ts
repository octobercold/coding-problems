import { fileReader } from "./utils/fileReader";

const jetStream = fileReader(17)[0];
const chamberWidth = 7;

interface Coordinate {
    x: number;
    y: number;
}

const chamber: Set<string> = new Set();

const stringify = (coordinate: Coordinate) => {
    return `${coordinate.x},${coordinate.y}`;
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

function jet(rock: Coordinate[], s: string): boolean {
    if (s === ">") {
        if (rock.filter(c => c.x === chamberWidth - 1).length > 0) {
            console.log("rock moved by jet but nothing happened");
            return false;
        }

        rock.forEach(c => c.x++);

        if (rock.filter(c => chamber.has(stringify(c))).length > 0) {
            rock.forEach(c => c.x--);
            console.log("rock moved by jet but nothing happened");
            return false;
        }
        console.log("rock moved right");
        return true;
    } else {
        if (rock.filter(c => c.x === 0).length > 0) {
            console.log("rock moved by jet but nothing happened");
            return false;
        }

        rock.forEach(c => c.x--);

        if (rock.filter(c => chamber.has(stringify(c))).length > 0) {
            rock.forEach(c => c.x++);
            console.log("rock moved by jet but nothing happened");
            return false;
        }
        console.log("rock moved left");
        return true;
    }
}

function drop(rock: Coordinate[]): boolean {
    rock.forEach(c => c.y--);

    if (rock.filter(c => chamber.has(stringify(c))).length > 0) {
        rock.forEach(c => c.y++);
        console.log("rock can't move down");
        return false;
    }
    console.log(`rock moved down`);
    return true;
}

function fall(rock: Coordinate[], chamberTop: number): number {
    //decrease y why it can fall if can't fall return it's top
    //rock creates -> jet -> fall -> jet -> fall etc
    //last jet is at y+1 after this it stops

    return -1;
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
    for (let y = chamberTop; y >= 0; y--) {
        let chamberRow = `${y} `.padStart(5, " ");
        for (let x = 0; x < chamberWidth; x++) {
            if (chamber.has(stringify({ x: x, y: y }))) chamberRow += `#`;
            else chamberRow += `.`;
        }
        console.log(chamberRow);
    }
}

for (let i = 0; i < chamberWidth; i++) {
    chamber.add(stringify({ x: i, y: 0 }));
}

const rocksCoordinates = convertRocksToCoordinates(rocks);

let chamberTop = 0;
let jetIndex = 0;
let rocksFallen = 0;

function start() {
    while (rocksFallen < 2022) {
        for (const rock of rocksCoordinates) {
            const newRock = putRockInChamber(rock, chamberTop);
            let canDrop = true;
            console.log("rock begins falling");
            newRock.forEach(c => console.log(`${c.x},${c.y}`));

            while (canDrop) {
                jet(newRock, jetStream[jetIndex]);
                jetIndex++;
                if (jetIndex === jetStream.length) jetIndex = 0;
                newRock.forEach(c => console.log(`after jet: ${c.x},${c.y}`));
                canDrop = drop(newRock);
                newRock.forEach(c => console.log(`after drop: ${c.x},${c.y}`));
            }

            console.log("rock can't move, rock coordinates:");
            newRock.forEach(c => (chamberTop = Math.max(chamberTop, c.y)));
            newRock.forEach(c => console.log(`${c.x},${c.y}`));

            newRock.forEach(c => chamber.add(stringify(c)));
            rocksFallen++;
            if (rocksFallen === 2022) return;
        }
    }
}

start();
console.log(rocksFallen);
console.log(chamberTop);

//drawChamber(chamber, chamberTop);

export function solution() {
    //console.log()
}
