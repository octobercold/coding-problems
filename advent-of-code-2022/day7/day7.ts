import * as fs from "fs";

const fileReader = () => {
    //returns list of strings separated by \n
    const string = fs.readFileSync("./day7/input.txt", { encoding: "utf-8" });
    return string.split("\n");
};

const lines = fileReader();

class File {
    name: string;
    size: number;
    constructor(name: string, size?: number) {
        this.name = name;
        this.size = size === undefined ? 0 : size;
    }
}

class Dir {
    name: string;
    children: (File | Dir)[];
    size: number;
    parentDir: Dir | null;

    constructor(name: string, parentDir?: Dir | null) {
        this.name = name;
        this.children = [];
        this.size = 0;
        this.parentDir = parentDir === undefined ? null : parentDir;
    }

    addChild(child: File | Dir) {
        this.children.push(child);
        this.size += child.size;
    }
}

class Tree {
    root: Dir | null;
    currentDir: Dir | null;
    constructor() {
        this.root = null;
        this.currentDir = null;
    }

    insertDir(name: string) {
        if (this.root === null) {
            const newDir = new Dir(name);
            this.root = newDir;
            this.currentDir = this.root;
        } else {
            const parentDir = this.currentDir;
            const newDir = new Dir(name, parentDir);
            this.currentDir.addChild(newDir);
        }
    }

    insertFile(name: string, size: number) {
        if (this.root === null) {
            throw "can't insert file without root";
        }
        const newFile = new File(name, size);
        this.currentDir.children.push(newFile);
        this.currentDir.size += size;
        let dir = this.currentDir;
        while (dir.parentDir !== null) {
            dir.parentDir.size += size;
            dir = dir.parentDir;
        }
    }
}

const tree = new Tree();
tree.insertDir("/");
for (const line of lines) {
    if (line[0] !== "$") {
        if (line[0] === "d") {
            const dirName = line.slice(line.indexOf(" ") + 1);
            tree.insertDir(dirName);
        } else {
            const fileSize = parseInt(line.slice(0, line.indexOf(" ")));
            const fileName = line.slice(line.indexOf(" ") + 1);
            tree.insertFile(fileName, fileSize);
        }
    }
}

// for (const node of Object.entries(tree)) {
//     console.log(node);
// }

console.log(tree.root.children);
