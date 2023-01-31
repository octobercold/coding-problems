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
    constructor(
        name: string,
        n?: number,
        operator?: string,
        dependsOn?: [Monkey, Monkey]
    ) {
        this.name = name;
        this.n = n;
        this.operator = operator === undefined ? null : operator;
        this.dependsOn = dependsOn === undefined ? [null, null] : dependsOn;
    }

    compute() {
        if (this.n === undefined) {
            const left = this.dependsOn[0];
            if (left.n === undefined) {
                left.compute();
            }
            const right = this.dependsOn[1];
            if (right.n === undefined) {
                right.compute();
            }

            if (this.operator === "+") this.n = left.n + right.n;
            else if (this.operator === "-") this.n = left.n - right.n;
            else if (this.operator === "/") this.n = left.n / right.n;
            else if (this.operator === "*") this.n = left.n * right.n;
        }
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

for (const [, monkey] of monkeyMap.entries()) {
    monkey.print();
}

const root = monkeyMap.get("root");
root.compute();
console.log("che za huyan");

for (const [, monkey] of monkeyMap.entries()) {
    monkey.print();
}

export function solution() {
    return;
}
