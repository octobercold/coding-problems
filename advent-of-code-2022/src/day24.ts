import { fileReader } from "./utils/fileReader";
import { mapScanner } from "./utils/mapScanner";
import { Point } from "./utils/Point";

const blizzardBasin = fileReader(24);

const X = { min: 1, max: blizzardBasin[0].length - 2 };
const Y = { min: 1, max: blizzardBasin.length - 2 };

const allPoints = mapScanner(blizzardBasin);
const start = new Point(1, 0, "E");
const goal = new Point(
    blizzardBasin.at(-1).length - 2,
    blizzardBasin.length - 1,
    "G"
);

const blizzards = allPoints.filter(point => {
    return point.val !== "#" && point.val !== ".";
});
const blizzardsMap: Map<string, Set<Point>> = new Map();
blizzards.forEach(b => {
    blizzardsMap.set(b.key(), (new Set() as Set<Point>).add(b));
});

function drawBasin() {
    for (let y = 0; y < blizzardBasin.length; y++) {
        let row = "";
        for (let x = 0; x < blizzardBasin[y].length; x++) {
            const key = `${x},${y}`;
            if (blizzardBasin[y][x] === "#") row += "#";
            else if (blizzardsMap.has(key)) {
                const blizzardsSet = blizzardsMap.get(key);
                row +=
                    blizzardsSet.size > 1
                        ? blizzardsSet.size
                        : blizzardsSet.values().next().value.val;
            } else row += ".";
        }
        console.log(row);
    }
}

function tick() {
    blizzards.forEach(b => {
        const set = blizzardsMap.get(b.key());
        if (set.size > 1) {
            set.delete(b);
        } else {
            blizzardsMap.delete(b.key());
        }

        b.move(true, { x: X, y: Y });

        if (blizzardsMap.has(b.key())) {
            blizzardsMap.get(b.key()).add(b);
        } else {
            const newSet: Set<Point> = new Set();
            newSet.add(b);
            blizzardsMap.set(b.key(), newSet);
        }
    });
}

// console.log("=== INITIAL STATE ===\n");
// drawBasin();
// for (let i = 1; i <= 10; i++) {
//     tick();
//     console.log(`\n\n=== MINUTE ${i} ===\n`);
//     drawBasin();
// }

export const solution = () => {
    return;
};
