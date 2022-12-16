import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day10/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};

const lines = fileReader();

class CathodRayTube {
    currCycle: number;
    x: number;
    interestingCycles: number[];
    q: number[];
    sum: number;
    constructor() {
        this.currCycle = 1;
        this.x = 1;
        this.interestingCycles = [20, 60, 100, 140, 180, 220];
        this.q = [];
        this.sum = 0;
    }
    tick() {
        // console.log(`timer: ${this.q}`);
        this.checkCycle();
        this.x += this.q.shift();
        this.currCycle++;
    }
    elapseQ() {
        while (this.q.length > 0) {
            this.tick();
        }
    }
    checkCycle = () => {
        if (this.interestingCycles.some((c) => c === this.currCycle)) {
            // console.log(
            //     `During the ${this.currCycle}th cycle, register X has the value ${this.x}`
            // );
            this.sum += this.currCycle * this.x;
        }
    };

    noop = () => {
        this.q.push(0);
    };

    addx = (v: number) => {
        this.q.push(...[0, v]);
    };
}

const cathodRayTube = new CathodRayTube();

for (const line of lines) {
    const [command, v] = line.split(" ");
    if (v !== undefined) {
        cathodRayTube[command](parseInt(v));
    } else {
        cathodRayTube[command]();
    }
}

console.log(cathodRayTube.q);

cathodRayTube.elapseQ();

console.log(cathodRayTube.sum);
