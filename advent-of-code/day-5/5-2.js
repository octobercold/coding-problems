// Not the most elegant solution but it allows to easily adjust to many variations of this task

const fileReader = require("../fileReader");

const lines = fileReader();
let coordinatePairs = [];
lines.forEach((line) => {
    coordinatePairs.push(line.split(" -> "));
});
let coordinates = [];
coordinatePairs.forEach((pair) => {
    let start = pair[0].split(",");
    let end = pair[1].split(",");
    coordinates.push([start, end]);
});

const findHotSpots = (coordinates) => {
    let res = new Map(),
        counter = 0,
        step = 1;

    const checkCoordinate = (x, y) => {
        let val = res.get(`${x},${y}`);
        if (val === undefined) {
            res.set(`${x},${y}`, 1);
        } else {
            res.set(`${x},${y}`, val + 1);
        }
        if (res.get(`${x},${y}`) === 2) counter++;
    };

    for (const line of coordinates) {
        let x1 = parseInt(line[0][0]);
        let y1 = parseInt(line[0][1]);
        let x2 = parseInt(line[1][0]);
        let y2 = parseInt(line[1][1]);

        //assume there only horizontal, vertical and lines with the slope=(1;-1)
        let deltaX = x2 - x1,
            deltaY = y2 - y1,
            incrementX = 0,
            incrementY = 0;

        //console.log("--------- checking line: ", line, " -------------------");
        if (Math.abs(deltaX) === 0) {
            //console.log("vertical line");
            incrementX = 0;
            incrementY = 1;
        } else if (Math.abs(deltaY) === 0) {
            //console.log("horizontal line");
            incrementX = 1;
            incrementY = 0;
        } else if (Math.abs(deltaX) / Math.abs(deltaY) === 1) {
            //console.log("diagonal at 45 degrees");
            if (deltaX > 0 && deltaY > 0) {
                //console.log("up right");
                incrementX = 1;
                incrementY = 1;
            } else if (deltaX > 0 && deltaY < 0) {
                //console.log("down right");
                incrementX = 1;
                incrementY = -1;
            } else if (deltaX < 0 && deltaY > 0) {
                //console.log("up left");
                incrementX = -1;
                incrementY = 1;
            } else if (deltaX < 0 && deltaY < 0) {
                //console.log("down left");
                incrementX = -1;
                incrementY = -1;
            }
        } else {
            //console.log("invalid line");
            continue;
        }

        if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                checkCoordinate(x1, y);
            }
        } else if (y1 === y2) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                checkCoordinate(x, y1);
            }
        } else {
            while (x1 !== x2 && y1 !== y2) {
                checkCoordinate(x1, y1);
                x1 = x1 + step * incrementX;
                y1 = y1 + step * incrementY;
            }
            checkCoordinate(x2, y2);
        }

        //console.log("current result: ", res);
        //console.log("------------end of line process--------------");
    }
    return counter;
};

console.log(findHotSpots(coordinates));

const drawSeabed = (coordinates) => {
    //use to log result of applying all lines on a seabed
    //for trubleshooting
    res = findHotSpots(coordinates);
    let sizeX = 0;
    let sizeY = 0;
    //console.log(res);

    for (const key of res.keys()) {
        let coord = key.split(",");
        let x = coord[0];
        let y = coord[1];
        sizeX = Math.max(sizeX, parseInt(x));
        sizeY = Math.max(sizeY, parseInt(y));
    }

    const size = Math.max(sizeX, sizeY);
    let matrix = new Array(size + 1).fill([]);
    for (let i = 0; i < matrix.length; i++) {
        const newArray = new Array(size + 1).fill(0);
        matrix[i] = newArray;
    }

    for (const key of res.keys()) {
        let val = res.get(key);
        let splitKey = key.split(",");
        let x = parseInt(splitKey[0]);
        let y = parseInt(splitKey[1]);
        matrix[y][x] = val;
    }

    matrix.forEach((row) => console.log(row.toString()));
};

//drawSeabed(coordinates);
