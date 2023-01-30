import { fileReader } from "./utils/fileReader";

const numbers = fileReader(20).map(n => parseInt(n));

class Node {
    val: number;
    left: Node;
    right: Node;
    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class DoublyLinkedList {
    head: Node;
    tail: Node;
    zero: Node;
    size: number;
    constructor(val) {
        this.head = new Node(val);
        this.tail = this.head;
        this.zero = null;
        this.size = 1;
    }

    prepend(node: Node) {
        this.head.left = node;
        node.right = this.head;
        node.left = null;
        this.head = node;

        this.size++;

        if (node.val === 0) {
            this.zero = node;
        }
    }

    append(node: Node) {
        this.tail.right = node;
        node.left = this.tail;
        node.right = null;
        this.tail = node;

        this.size++;

        if (node.val === 0) {
            this.zero = node;
        }
    }

    insertBefore(newNode: Node, oldNode: Node) {
        if (oldNode === this.head) {
            this.append(newNode);
        } else {
            // oldNode.left - oldNode - oldNode.right
            // oldNode.left - newNode - oldNode - oldNode.right
            oldNode.left.right = newNode;
            newNode.left = oldNode.left;
            newNode.right = oldNode;
            oldNode.left = newNode;
        }
        this.size++;
    }

    insertAfter(newNode: Node, oldNode: Node) {
        if (oldNode === this.tail) {
            this.prepend(newNode);
        } else {
            // oldNode.left - oldNode - oldNode.right
            // oldNode.left - oldNode - newNode - oldNode.right
            oldNode.right.left = newNode;
            newNode.right = oldNode.right;
            newNode.left = oldNode;
            oldNode.right = newNode;
        }
        this.size++;
    }

    deleteNode(node: Node) {
        if (node === this.head) {
            this.head = node.right;
            this.head.left = null;
        } else if (node === this.tail) {
            this.tail = node.left;
            this.tail.right = null;
        } else {
            node.left.right = node.right;
            node.right.left = node.left;
            node.left = null;
            node.right = null;
        }

        this.size--;
        return node;
    }

    stepLeft(node: Node) {
        if (node === this.head) return this.tail;
        else return node.left;
    }

    stepRight(node: Node) {
        if (node === this.tail) return this.head;
        else return node.right;
    }

    print() {
        let curr = this.head;
        let str = "";
        while (curr) {
            str += `${curr.val} <-> `;
            curr = curr.right;
        }
        console.log(str);
    }
}

const list = new DoublyLinkedList(numbers[0]);
const q = [list.head];

for (let i = 1; i < numbers.length; i++) {
    const newNode = new Node(numbers[i]);
    q.push(newNode);
    list.append(newNode);
}

while (q.length > 0) {
    const node = q.shift();

    //console.log(node.val, " will move, current arrangement: ");
    //list.print();

    if (node.val === 0) continue;

    let curr: Node;
    let steps = node.val % (numbers.length - 1);

    if (node.val < 0) {
        curr = list.stepLeft(node);
        steps++;

        list.deleteNode(node);

        if (node.val === -1) {
            list.insertBefore(node, curr);
        } else {
            while (steps < 0) {
                curr = list.stepLeft(curr);
                steps++;
            }
            list.insertBefore(node, curr);
        }
    } else {
        curr = list.stepRight(node);
        steps--;

        list.deleteNode(node);

        if (node.val === 1) {
            list.insertAfter(node, curr);
        } else {
            while (steps > 0) {
                curr = list.stepRight(curr);
                steps--;
            }
            list.insertAfter(node, curr);
        }
    }
}

console.log("Final arrangement: ");
list.print();
//console.log(list.zero);
const n1 = 1000 % numbers.length;
const n2 = 2000 % numbers.length;
const n3 = 3000 % numbers.length;
let counter = 0;
//console.log(`n1: ${n1}, n2: ${n2}, n3: ${n3}, counter: ${counter}`);

let res = list.zero;
let sum = 0;
while (counter < Math.max(n1, n2, n3)) {
    res = list.stepRight(res);
    counter++;
    //console.log(`${counter}th number from 0: ${res.val}`);
    if (counter === n3 || counter === n2 || counter === n1) {
        sum += res.val;

        //console.log("new sum: ", sum);
    }
}
console.log("result: ", sum);

export const solution = () => {
    //console.log(newNumbers);
};
