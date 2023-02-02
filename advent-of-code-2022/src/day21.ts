import { fileReader } from "./utils/fileReader";

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
    const monkeyMap = createMonkeyMap(lines);

    const findFirstBeforeHumn = (monkey: Monkey) => {
        if (monkey.dependsOn[0] === null && monkey.dependsOn[1] === null)
            return false;
        const [left, right] = monkey.dependsOn;
        if (left.name === "humn") return true;
        if (right.name === "humn") return true;

        return findFirstBeforeHumn(left) || findFirstBeforeHumn(right);
    };

    const root = monkeyMap.get("root");
    const [left, right] = root.dependsOn;
    let target: number, humanAffectedOperand: Monkey;

    if (!findFirstBeforeHumn(left)) {
        left.compute();
        target = left.n;
        humanAffectedOperand = right;
    } else {
        right.compute();
        target = right.n;
        humanAffectedOperand = left;
    }

    const humn = monkeyMap.get("humn");
    humn.n = 0;
    humanAffectedOperand.compute();
    let y1 = humanAffectedOperand.n;

    humn.n = 1;
    humanAffectedOperand.compute();
    const y2 = humanAffectedOperand.n;

    const coef = y1 < y2 ? 1 : -1;
    let increment = 100000000000000;
    let currNum = 0;
    let wasUnderTarget = true;

    while (y1 !== target) {
        if (y1 > target) {
            if (wasUnderTarget) increment /= 10;
            wasUnderTarget = false;
            currNum -= increment * coef;
        }
        if (y1 < target) {
            if (!wasUnderTarget) increment /= 10;
            wasUnderTarget = true;
            currNum += increment * coef;
        }

        humn.n = currNum;
        humanAffectedOperand.compute();
        y1 = humanAffectedOperand.n;
    }
    return humn.n;
}

export function solution() {
    console.log(`Part one solution: ${partOne()}`);
    console.log(`part two solution: ${partTwo()}`);
}
