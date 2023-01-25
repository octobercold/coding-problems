import { fileReader } from "./utils/fileReader";

// Blueprint = [[ore], [ore], [ore,clay], [ore,obsidian]]

function parse(
    line: string
): [number, number, [number, number], [number, number]] {
    if (line === "") return null;
    const matched = line
        .trim()
        .match(
            /^Blueprint [\d]+: Each ore robot costs ([\d]+) ore. Each clay robot costs ([\d]+) ore. Each obsidian robot costs ([\d]+) ore and ([\d]+) clay. Each geode robot costs ([\d]+) ore and ([\d]+) obsidian./
        );
    return [
        parseInt(matched[1]),
        parseInt(matched[2]),
        [parseInt(matched[3]), parseInt(matched[4])],
        [parseInt(matched[5]), parseInt(matched[6])],
    ];
}

const lines = fileReader(19);

function dfs(blueprint, maxSpend, cache, time, workingRobots, resources) {
    if (time === 0) return resources[3];
    const key = [time, ...workingRobots, ...resources];
    if (cache.has(key)) return cache.get(key);
    return 0;
}

let total = 0;

for (let i = 0; i < lines.length; i++) {
    const blueprint = parse(lines[i]);
    const maxSpend = [
        Math.max(blueprint[0], blueprint[1], blueprint[2][0], blueprint[3][0]),
        blueprint[2][1],
        blueprint[3][1],
    ];
    const res = dfs(blueprint, maxSpend, {}, 24, [1, 0, 0, 0], [0, 0, 0, 0]);
    total += (i + 1) * res;
}

console.log(total);

export const solution = () => {
    return;
};
