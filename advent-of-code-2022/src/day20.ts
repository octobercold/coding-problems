import { fileReader } from "./utils/fileReader";

const numbers = fileReader(20).map(n => parseInt(n));

// coef for part two
const bigPrime = 811589153;

class Node {
    val: number;
    bigVal: number;
    left: Node;
    right: Node;
    constructor(val: number) {
        this.val = val;
        this.bigVal = val * bigPrime;
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
            this.append(newNode);
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
        }
        node.left = null;
        node.right = null;

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

    print(key: "val" | "bigVal") {
        let curr = this.head;
        let str = "";
        while (curr) {
            str += `${curr[key]} <-> `;
            curr = curr.right;
        }
        console.log(str);
    }
}

function mix(list: DoublyLinkedList, key: "val" | "bigVal", q: Node[]) {
    for (let i = 0; i < q.length; i++) {
        const node = q[i];

        if (node[key] === 0) continue;

        let curr: Node;

        // length - 1 because one node is taken out of the list before moving
        let steps = node[key] % (numbers.length - 1);

        if (node[key] < 0) {
            curr = list.stepLeft(node);
            steps++;

            list.deleteNode(node);

            if (steps === 0) {
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

            if (node[key] === 0) {
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
}

function findSum(list: DoublyLinkedList, key: "val" | "bigVal"): number {
    const n1 = 1000 % numbers.length;
    const n2 = 2000 % numbers.length;
    const n3 = 3000 % numbers.length;
    let counter = 0;

    let res = list.zero;
    let sum = 0;

    while (counter < Math.max(n1, n2, n3)) {
        res = list.stepRight(res);
        counter++;
        if (counter === n3 || counter === n2 || counter === n1) {
            sum += res[key];
        }
    }
    return sum;
}

function partOne() {
    const list = new DoublyLinkedList(numbers[0]);
    const q = [list.head];

    for (let i = 1; i < numbers.length; i++) {
        const newNode = new Node(numbers[i]);
        q.push(newNode);
        list.append(newNode);
    }

    mix(list, "val", q);
    const res = findSum(list, "val");
    return res;
}

function partTwo() {
    const times = 10;
    const decKey = 811589153;
    const nums = numbers.map(v => v * decKey);
    const list = numbers.map((v, i) => ({ num: v * decKey, id: i }));

    for (let j = 0; j < times; j++) {
        for (let i = 0; i < nums.length; i++) {
            const id = list.findIndex(x => x.id === i);
            list.splice(id, 1);
            list.splice((nums[i] + id) % list.length, 0, {
                num: nums[i],
                id: i,
            });
        }
    }

    const idZero = list.findIndex(x => x.num === 0);
    const res = [1000, 2000, 3000].reduce(
        (prev, curr) => prev + list[(curr + idZero) % list.length].num,
        0
    );
    return res;
}

export const solution = () => {
    console.log(`Part one solution: ${partOne()}`);
    console.log(`part two solution: ${partTwo()}`);
};
