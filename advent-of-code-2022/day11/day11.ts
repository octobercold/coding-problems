import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day11/input.txt", { encoding: "utf-8" });
    return string.split("Monkey ");
};

const monkeyStrings = fileReader();

class Monkey {
    timesInspected: number;

    constructor(
        public id: number,
        public items: number[],
        public operation: string,
        public n: number,
        public testN: number,
        public testTrue: number,
        public testFalse: number
    ) {
        this.timesInspected = 0;
    }

    inspectItem(): number {
        if (this.items.length === 0) return null;
        if (this.operation === "*") {
            this.items[0] *= this.n === null ? this.items[0] : this.n;
        } else if (this.operation === "+") {
            this.items[0] += this.n === null ? this.items[0] : this.n;
        }
        this.items[0] = Math.floor(this.items[0] / 3);
        if (this.items[0] % this.testN === 0) {
            return this.testTrue;
        } else {
            return this.testFalse;
        }
    }
    throw(): number {
        const item = this.items.shift();
        return item;
    }
    catch(item: number) {
        this.items.push(item);
    }
}

const monkeys = [];

for (const monkey of monkeyStrings) {
    if (monkey === "") continue;
    const lines = monkey.split("\n");
    let id: number,
        items: number[],
        operation: string,
        n: number,
        testN: number,
        testTrue: number,
        testFalse: number;
    for (const line of lines) {
        if (line === "") continue;
        if (line[0] !== " ") {
            id = parseInt(line[0]);
        } else {
            const [wordyPart, numericalPart] = line.split(":");
            if (wordyPart.includes("items")) {
                items = numericalPart.split(",").map((n) => parseInt(n));
            } else if (wordyPart.includes("Operation")) {
                const temp = numericalPart.split(" ");
                operation = temp.at(-2);
                n = temp.at(-1) === "old" ? null : parseInt(temp.at(-1));
            } else if (wordyPart.includes("Test")) {
                testN = parseInt(numericalPart.split(" ").at(-1));
            } else if (wordyPart.includes("true")) {
                testTrue = parseInt(numericalPart.split(" ").at(-1));
            } else if (wordyPart.includes("false")) {
                testFalse = parseInt(numericalPart.split(" ").at(-1));
            }
        }
    }
    monkeys.push(
        new Monkey(id, items, operation, n, testN, testTrue, testFalse)
    );
}

const playTurn = (monkey: Monkey) => {
    monkey.timesInspected += monkey.items.length;
    while (monkey.items.length > 0) {
        const whereToThrow = monkey.inspectItem();
        if (whereToThrow !== null) {
            const itemToThrow = monkey.throw();
            monkeys[whereToThrow].catch(itemToThrow);
        }
    }
};

const playRound = (monkeys: Monkey[]) => {
    for (const monkey of monkeys) {
        playTurn(monkey);
    }
};

for (let i = 1; i < 21; i++) {
    console.log(`ROUND ${i}`);
    monkeys.forEach((monkey) =>
        console.log(
            `after round ${i}, monkey: ${monkey.id} has items: ${monkey.items} and it inspected ${monkey.timesInspected} items overall`
        )
    );
    playRound(monkeys);
}

const multiplyTopTwo = (arr) => {
    const topTwo = [-Infinity, -Infinity];
    for (let i = 0; i < arr.length; i++) {
        if (topTwo[0] < arr[i]) {
            if (topTwo[1] < arr[i]) {
                topTwo[0] = topTwo[1];
                topTwo[1] = arr[i];
            } else {
                topTwo[0] = arr[i];
            }
        }
    }
    console.log(topTwo[1] * topTwo[0]);
    return topTwo[1] * topTwo[0];
};

multiplyTopTwo(monkeys.map((monkey: Monkey) => monkey.timesInspected));
