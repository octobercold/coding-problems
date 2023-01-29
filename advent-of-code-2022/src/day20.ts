import { cursorTo } from "readline";
import { NewLineKind } from "typescript";
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
        this.head = node;

        this.size++;

        if (node.val === 0) {
            this.zero = node;
        }

        //this.print();
    }

    append(node: Node) {
        this.tail.right = node;
        node.left = this.tail;
        this.tail = node;

        this.size++;

        if (node.val === 0) {
            this.zero = node;
        }
        //this.print();
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
        // console.log(
        //     "insert node: ",
        //     newNode.val,
        //     " before node: ",
        //     oldNode.val
        // );
        // this.print();
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

        // console.log("insert node: ", newNode.val, " after node: ", oldNode.val);
        //this.print();
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

        //console.log("delete node: ", node.val);
        return node;
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
//console.log(q);

//console.log("Initial arrangement: ");
//list.print();

while (q.length > 0) {
    list.print();
    let curr = q.shift();
    const temp = curr;
    list.deleteNode(curr);
    let steps = curr.val % (numbers.length - 1);

    if (steps === 0) {
        continue;
    } else if (steps > 0) {
        if (steps === 1) {
            list.insertAfter(curr, temp.right);
        } else {
            while (steps > 0) {
                if (curr === list.tail) curr = list.head;
                else curr = curr.right;
                steps--;
            }
            list.insertAfter(temp, curr);
        }
    } else if (steps < 0) {
        if (steps === -1) {
            list.insertBefore(curr, curr.left);
        } else {
            while (steps < 0) {
                if (curr === list.head) curr = list.tail;
                else curr = curr.left;
                steps++;
            }
            list.insertBefore(temp, curr);
        }
    }
}

console.log("Final arrangement: ");
list.print();
//console.log(list.zero);
const n1 = 1000 % numbers.length;
const n2 = 2000 % numbers.length;
let n3 = 3000 % numbers.length;

let res = list.zero;
let sum = 0;
while (n3 > 0) {
    //console.log("val: ", res.val);
    if (n3 === n2 || n3 === n1) {
        sum += res.val;
    }
    if (res === list.tail) res = list.head;
    else res = res.right;
    res = res.right;
    n3--;
}
sum += res.val;
console.log("result: ", sum);

export const solution = () => {
    //console.log(newNumbers);
};
