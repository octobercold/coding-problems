"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day7/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};
const lines = fileReader();
class File {
    constructor(name, size) {
        this.name = name;
        this.size = size === undefined ? 0 : size;
    }
}
class Dir {
    constructor(name, parentDir) {
        this.name = name;
        this.children = [];
        this.size = 0;
        this.parentDir = parentDir === undefined ? null : parentDir;
    }
    addChild(child) {
        this.children.push(child);
        this.size += child.size;
    }
}
class Tree {
    constructor() {
        this.root = null;
        this.currentDir = null;
        this.sumOfSmallDirs = 0;
        this.candidatesForDeletion = [];
    }
    insertDir(name) {
        if (this.root === null) {
            const newDir = new Dir(name);
            this.root = newDir;
            console.log(`insert dir ${newDir.name} as root`);
        }
        else {
            const parentDir = this.currentDir;
            const newDir = new Dir(name, parentDir);
            this.currentDir.addChild(newDir);
            console.log(`insert dir ${newDir.name} to dir ${this.currentDir.name}`);
        }
    }
    insertFile(name, size) {
        if (this.root === null) {
            throw "can't insert file without root";
        }
        const newFile = new File(name, size);
        this.currentDir.children.push(newFile);
        const tempSize = this.currentDir.size;
        this.currentDir.size += size;
        console.log(`insert file ${newFile.name} with size: ${newFile.size} to dir ${this.currentDir.name}`);
        console.log(`dir ${this.currentDir.name} size changed from ${tempSize} to ${this.currentDir.size}`);
        let dir = this.currentDir;
        console.log(`update all parent dir sizes`);
        while (dir.parentDir !== null) {
            const tempSize2 = dir.parentDir.size;
            dir.parentDir.size += size;
            console.log(`update ${dir.parentDir.name} size from ${tempSize2} to ${dir.parentDir.size}`);
            dir = dir.parentDir;
        }
    }
    cd(name) {
        if (this.currentDir === null) {
            this.currentDir = this.root;
            console.log(`enter root ${this.currentDir.name}`);
        }
        else if (name === "..") {
            this.currentDir = this.currentDir.parentDir;
            console.log(`enter parent directory ${this.currentDir.name}`);
        }
        else {
            this.currentDir = this.currentDir.children.filter((item) => item.name === name)[0];
            console.log(`enter dir ${this.currentDir.name}`);
        }
    }
    preorderPrint(node, level = 0) {
        if (!node)
            return;
        if (node instanceof File) {
            console.log(`${"  ".repeat(level)} - ${node.name} (file, size=${node.size})`);
        }
        else {
            console.log(`${"  ".repeat(level)} - ${node.name} (dir size=${node.size})`);
            if (node.size < 100000) {
                this.sumOfSmallDirs += node.size;
            }
            if (node.size >= this.root.size - 40000000) {
                this.candidatesForDeletion.push(node.size);
            }
            for (const child of node.children) {
                this.preorderPrint(child, level + 1);
            }
        }
    }
}
const tree = new Tree();
tree.insertDir("/");
for (const line of lines) {
    if (line[0] === "$") {
        if (line[2] === "c") {
            const dirName = line.slice(line.indexOf("d") + 2);
            tree.cd(dirName);
        }
    }
    else {
        if (line[0] === "d") {
            const dirName = line.slice(line.indexOf(" ") + 1);
            tree.insertDir(dirName);
        }
        else {
            const fileSize = parseInt(line.slice(0, line.indexOf(" ")));
            const fileName = line.slice(line.indexOf(" ") + 1);
            tree.insertFile(fileName, fileSize);
        }
    }
}
tree.preorderPrint(tree.root);
console.log(tree.sumOfSmallDirs);
console.log(`${tree.root.size - 40000000} required for installation`);
console.log(Math.min(...tree.candidatesForDeletion));
//# sourceMappingURL=day7.js.map