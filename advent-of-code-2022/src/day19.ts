import { fileReader } from "./utils/fileReader";

interface Robot {
    type: string;
    oreCost: number;
    secondaryCost: number;
    secondaryResource: string;
}

function parse(line: string): Robot {
    if (line === "") return null;
    const matched = line
        .trim()
        .match(
            /^Each ([a-z]+) robot costs ([\d]+) ore\.?(?: and )?([\d]+)? ?([a-z]+)?\.?/
        );
    console.log("m: ", matched[1]);
    return {
        type: matched[1],
        oreCost: parseInt(matched[2]),
        secondaryCost: parseInt(matched[3]),
        secondaryResource: matched[4],
    };
}

const factory: Robot[][] = [];

const lines = fileReader(19);

for (const line of lines) {
    const [, robots] = line.split(":");
    const r = robots.split(".", 4).map(robot => parse(robot));
    factory.push(r);
}
const newFactory = [];

for (const blueprint of factory) {
    const newBlueprint = {};
    blueprint.forEach(robot => {
        newBlueprint[robot.type] = { ...robot };
    });
    newFactory.push(newBlueprint);
}

console.log("newFactory: ", newFactory);

const resources = { ore: 0, clay: 0, obsidian: 0, geode: 0 };
const currentBlueprint = newFactory[0];
const workingRobots = [currentBlueprint.ore];

// let time = 0;

// while (time < 25) {
//     workingRobots.forEach(r => bank[r.type]++);
//     if (bank.ore >= )
//     time++;
// }

export const solution = () => {
    return;
};
