"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day5/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
const lines = fileReader();
const shipDeck = lines.indexOf("") - 2;
const startOfProcedure = lines.indexOf("") + 1;
const stacks = {};
for (let i = shipDeck; i >= 0; i--) {
    //moving up from ship deck
    let stackIndex = 1;
    for (let j = 1; j < lines[i].length; j += 4) {
        //jumping right from stack to stack
        const crateContent = lines[i][j];
        if (crateContent !== " ") {
            if (stacks[stackIndex] !== undefined) {
                stacks[stackIndex].push(crateContent);
            }
            else {
                stacks[stackIndex] = [crateContent];
            }
        }
        stackIndex++;
    }
}
const decipherProcedureCall = (procedureCall) => {
    const fromIndex = procedureCall.indexOf("from");
    const toIndex = procedureCall.indexOf("to");
    const quantityToMove = parseInt(procedureCall.slice(4, fromIndex));
    const moveFrom = parseInt(procedureCall.slice(fromIndex + 4, toIndex));
    const moveTo = parseInt(procedureCall.slice(toIndex + 2));
    return {
        quantityToMove: quantityToMove,
        moveFrom: moveFrom,
        moveTo: moveTo,
    };
};
const crateMover900Operation = (quantityToMove, moveFrom, moveTo) => {
    while (quantityToMove > 0) {
        const crate = stacks[moveFrom].pop();
        stacks[moveTo].push(crate);
        quantityToMove--;
    }
};
const crateMover9001Operation = (quantityToMove, moveFrom, moveTo) => {
    const crane = [];
    while (quantityToMove > 0) {
        const crate = stacks[moveFrom].pop();
        crane.push(crate);
        quantityToMove--;
    }
    while (crane.length > 0) {
        const crate = crane.pop();
        stacks[moveTo].push(crate);
    }
};
const partOne = () => {
    for (let i = startOfProcedure; i < lines.length; i++) {
        const procedureCall = lines[i];
        const { quantityToMove, moveFrom, moveTo } = decipherProcedureCall(procedureCall);
        crateMover900Operation(quantityToMove, moveFrom, moveTo);
    }
    let result = "";
    for (const stack of Object.values(stacks)) {
        result += stack[stack.length - 1];
    }
    return result;
};
const partTwo = () => {
    for (let i = startOfProcedure; i < lines.length; i++) {
        const procedureCall = lines[i];
        const { quantityToMove, moveFrom, moveTo } = decipherProcedureCall(procedureCall);
        crateMover9001Operation(quantityToMove, moveFrom, moveTo);
    }
    let result = "";
    for (const stack of Object.values(stacks)) {
        result += stack[stack.length - 1];
    }
    return result;
};
console.log(partTwo());
//# sourceMappingURL=day5.js.map