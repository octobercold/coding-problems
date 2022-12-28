"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day10/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
const lines = fileReader();
class CathodRayTube {
    constructor() {
        this.checkCycle = () => {
            if (this.interestingCycles.some((c) => c === this.currCycle)) {
                this.sum += this.currCycle * this.x;
            }
        };
        this.noop = () => {
            this.q.push(0);
        };
        this.addx = (v) => {
            this.q.push(...[0, v]);
        };
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
}
const cathodRayTube = new CathodRayTube();
for (const line of lines) {
    const [command, v] = line.split(" ");
    if (v !== undefined) {
        cathodRayTube[command](parseInt(v));
    }
    else {
        cathodRayTube[command]();
    }
}
console.log(cathodRayTube.q);
cathodRayTube.elapseQ();
console.log(cathodRayTube.sum);
//# sourceMappingURL=day10.js.map