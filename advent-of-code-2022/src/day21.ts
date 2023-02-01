import { Queue } from "js-sdsl";
import { rootCertificates } from "tls";
import { fileReader } from "./utils/fileReader";

// Blueprint = [[ore], [ore], [ore,clay], [ore,obsidian]]
// robot indeces in blueprint: 0 = ore, 1 = clay, 2 = obsidian, 3 = geode
// full credit to hyper-neutrino ref: https://www.youtube.com/watch?v=H3PSODv4nf0&ab_channel=hyper-neutrino

class Monkey {
    name: string;
    n: number;
    operator: string;
    dependsOn: [Monkey, Monkey];
    default: number;

    constructor(
        name: string,
        n?: number,
        operator?: string,
        dependsOn?: [Monkey, Monkey]
    ) {
        this.name = name;
        this.n = n;
        this.default = n;
        this.operator = operator === undefined ? null : operator;
        this.dependsOn = dependsOn === undefined ? [null, null] : dependsOn;
    }

    compute() {
        const [left, right] = this.dependsOn;
        if (left.dependsOn[0] !== null) {
            left.compute();
        }
        if (right.dependsOn[0] !== null) {
            right.compute();
        }

        if (this.operator === "+") this.n = left.n + right.n;
        else if (this.operator === "-") this.n = left.n - right.n;
        else if (this.operator === "/") this.n = left.n / right.n;
        else if (this.operator === "*") this.n = left.n * right.n;

        return;
    }

    print() {
        if (this.n !== undefined) {
            console.log(`${this.name}: ${this.n}`);
        } else {
            console.log(
                `${this.name}: ${
                    this.dependsOn[0] !== null ? this.dependsOn[0].name : null
                } ${this.operator} ${
                    this.dependsOn[1] !== null ? this.dependsOn[1].name : null
                }`
            );
        }
    }
}

const lines = fileReader(21);

function createMonkeyMap(lines: string[]) {
    const monkeyMap: Map<string, Monkey> = new Map();

    for (const line of lines) {
        let leftMonkey: Monkey, rightMonkey: Monkey, mainMonkey: Monkey;
        const [name, val] = line.split(":");
        if (val.length > 8) {
            const [, left, operator, right] = val
                .trim()
                .match(/^([a-z]+) ([-+*/]) ([a-z]+)/);

            if (monkeyMap.has(left)) {
                leftMonkey = monkeyMap.get(left);
            } else {
                leftMonkey = new Monkey(left);
                monkeyMap.set(left, leftMonkey);
            }

            if (monkeyMap.has(right)) {
                rightMonkey = monkeyMap.get(right);
            } else {
                rightMonkey = new Monkey(right);
                monkeyMap.set(right, rightMonkey);
            }

            if (monkeyMap.has(name)) {
                mainMonkey = monkeyMap.get(name);
                mainMonkey.dependsOn = [leftMonkey, rightMonkey];
                mainMonkey.operator = operator;
            } else {
                mainMonkey = new Monkey(name, undefined, operator, [
                    leftMonkey,
                    rightMonkey,
                ]);
                monkeyMap.set(name, mainMonkey);
            }
        } else {
            const n = parseInt(val.trim());
            if (monkeyMap.has(name)) {
                mainMonkey = monkeyMap.get(name);
                mainMonkey.n = n;
            } else {
                monkeyMap.set(name, new Monkey(name, n));
            }
        }
    }
    return monkeyMap;
}

function partOne() {
    const monkeyMap = createMonkeyMap(lines);
    const root = monkeyMap.get("root");

    root.compute();
    return root.n;
}

function partTwo() {
    //initial state root: mcnw + wqdw

    const monkeyMap = new Map();
    const numbersMap = new Map();
    for (const line of lines) {
        const [l, r] = line.split(":");
        if (r.length > 8) {
            const [, left, operator, right] = r
                .trim()
                .match(/^([a-z]+) ([-+*/]) ([a-z]+)/);
            if (operator === "+") {
                monkeyMap.set(right, [l, "-", left]);
                monkeyMap.set(left, [l, "-", right]);
            } else if (operator === "-") {
                monkeyMap.set(right, [left, "-", l]);
                monkeyMap.set(left, [l, "+", right]);
            } else if (operator === "*") {
                monkeyMap.set(right, [l, "/", left]);
                monkeyMap.set(left, [l, "/", right]);
            } else {
                monkeyMap.set(right, [left, "/", l]);
                monkeyMap.set(left, [l, "*", right]);
            }
        } else {
            numbersMap.set(l, parseInt(r));
        }
    }

    for (const [name, fx] of monkeyMap.entries()) {
        const [left, operation, right] = fx;
        if (numbersMap.has(left)) fx[0] = numbersMap.get(left);
        if (numbersMap.has(right)) fx[2] = numbersMap.get(right);
        console.log(`${name}: ${fx}`);
    }

    //console.log(numbersMap);
}

export function solution() {
    // console.log(`Part one solution: ${partOne()}`);
    console.log(`part two solution: ${partTwo()}`);
}
