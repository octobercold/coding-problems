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
        this.noop = () => {
            this.q.push(0);
        };
        this.addx = (v) => {
            this.q.push(...[0, v]);
        };
        this.currCycle = 1;
        this.x = 1;
        this.q = [];
        this.screen = [];
        this.width = 40;
    }
    tick() {
        //console.log(`cycle ${this.currCycle}`);
        this.drawPixel();
        //console.log(`register X is now at: ${this.x}`);
        this.x += this.q.shift();
        this.currCycle++;
    }
    elapseQ() {
        while (this.q.length > 0) {
            this.tick();
        }
    }
    drawPixel() {
        const rowNumber = Math.floor(this.currCycle / this.width);
        const substractAmount = rowNumber * this.width;
        const normalizedCycle = this.currCycle - substractAmount;
        //console.log(`during this cycle pixel is drawn at ${normalizedCycle}`);
        if ([this.x - 1, this.x, this.x + 1].some((px) => px === normalizedCycle - 1)) {
            this.screen.push("#");
        }
        else {
            this.screen.push(".");
        }
    }
    printScreen() {
        let left = 0;
        while (left + this.width <= this.screen.length) {
            const row = this.screen.slice(left, left + this.width).join("");
            console.log(row);
            left += this.width;
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
cathodRayTube.elapseQ();
cathodRayTube.printScreen();
//# sourceMappingURL=day10-2.js.map