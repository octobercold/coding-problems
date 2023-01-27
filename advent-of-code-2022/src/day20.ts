import { fileReader } from "./utils/fileReader";

const numbers = fileReader(20).map(n => parseInt(n));

class Node {
    constructor(public val: number, public left?: Node, public right?: Node) {}
}

const head = new Node(numbers[0]);
const tail = new Node(numbers.at(-1));
let zeroNode: Node;

head.left = tail;
tail.right = head;

let currentNode = head;

const q = [head];

for (let i = 1; i < numbers.length - 1; i++) {
    const newNode = new Node(numbers[i]);
    if (numbers[i] === 0) zeroNode = newNode;
    q.push(newNode);
    newNode.left = currentNode;
    currentNode.right = newNode;
    currentNode = currentNode.right;
}

q.push(tail);

tail.left = currentNode;
currentNode.right = tail;

function printNode(node: Node) {
    console.log("   ", node.val, "   ");
    console.log(node.left.val, "     ", node.right.val);
}

function removeNode(node: Node) {
    const nodeLeft = node.left;
    const nodeRight = node.right;
    nodeLeft.right = nodeRight;
    nodeRight.left = nodeLeft;
    node.left = null;
    node.right = null;
    return node;
}

function insertNode(node: Node, left: Node, right: Node) {
    node.left = left;
    node.right = right;
    left.right = node;
    right.left = node;
    return true;
}

function moveNode(node: Node) {
    let current = node;
    let steps = node.val % numbers.length;

    while (steps >= 0) {
        if (node.val < 0) {
            current = current.left;
        } else if (node.val > 0) {
            current = current.right;
        }
        steps--;
    }
    console.log("moving to: ");
    printNode(current);

    if (current.left === node) {
        // swapping neighbouts, new place is on the right
        console.log("old neighbour is on the left");
        const ol = node.left;
        const nr = current.right;

        node.left = current;
        current.right = node;

        current.left = ol;
        ol.right = current;

        node.right = nr;
        nr.left = node;
    } else if (current.right === node) {
        console.log("old neighbour is on the right");
        //swapping neighbours
        const or = node.right;
        const nl = current.left;

        node.right = current;
        current.left = node;

        current.right = or;
        nl.right = node;
    } else {
        //swapping two nodes
        const ol = node.left;
        console.log("old left: ");
        printNode(ol);
        const or = node.right;
        console.log("old right: ");
        printNode(or);
        const nl = current.left;
        console.log("new left: ");
        printNode(nl);
        const nr = current.right;
        console.log("new right: ");
        printNode(nr);

        node.left = nl;
        node.right = nr;
        nl.right = node;
        nr.left = node;

        current.left = ol;
        current.right = or;
        ol.right = current;
        ol.left = current;
    }
}

while (q.length > 0) {
    const node = q.shift();
    console.log("before move: ");
    printNode(node);
    moveNode(node);
    console.log("after move: ");
    printNode(node);
    console.log(" ");
}

export const solution = () => {
    //console.log(newNumbers);
};
