import { fileReader } from "./utils/fileReader";

// Blueprint = [[ore], [ore], [ore,clay], [ore,obsidian]]
// robot indeces in blueprint: 0 = ore, 1 = clay, 2 = obsidian, 3 = geode
// full credit to hyper-neutrino ref: https://www.youtube.com/watch?v=H3PSODv4nf0&ab_channel=hyper-neutrino

interface Resources {
    ore: number;
    clay: number;
    obsidian: number;
    geode: number;
}

function parse(line: string) {
    if (line === "") return null;
    const matched = line
        .trim()
        .match(
            /^Blueprint [\d]+: Each ore robot costs ([\d]+) ore. Each clay robot costs ([\d]+) ore. Each obsidian robot costs ([\d]+) ore and ([\d]+) clay. Each geode robot costs ([\d]+) ore and ([\d]+) obsidian./
        )
        .map(m => parseInt(m));

    return {
        ore: { ore: matched[1] },
        clay: { ore: matched[2] },
        obsidian: { ore: matched[3], clay: matched[4] },
        geode: { ore: matched[5], obsidian: matched[6] },
        maxSpend: {
            ore: Math.max(matched[1], matched[2], matched[3], matched[5]),
            clay: matched[4],
            obsidian: matched[6],
        },
    };
}

const lines = fileReader(19);

const dfs = (
    blueprint: { [key: string]: { [key: string]: number } },
    cache: Map<string, number>,
    time: number,
    workingRobots: Resources,
    resources: Resources
) => {
    if (time === 0) return resources.geode;

    const key = JSON.stringify([
        time,
        ...Object.entries(workingRobots),
        ...Object.entries(resources),
    ]);

    if (cache.has(key)) return cache.get(key);

    let geodes = resources.geode + workingRobots.geode * time;

    //iterate through factory blueprint
    for (const [robot, costs] of Object.entries(blueprint)) {
        // blueprint includes maxSpend optimisation that is skipped
        if (robot === "maxSpend") continue;

        // we always want to build geode robots so skip this
        if (robot != "geode") {
            // if robots produce more of the resource than it is possible to spend skip
            if (workingRobots[robot] >= blueprint.maxSpend[robot]) continue;
        }

        // time required for resource accummulation for the current robot to be built
        let wait = 0;

        // flag that stays true if all resources have been checked
        let canBuild = true;

        // check all costs
        for (const [resource, cost] of Object.entries(costs)) {
            // if there are 0 robots of one of the required resource switch flag and exit
            if (workingRobots[resource] === 0) {
                canBuild = false;
                break;
            }

            // look for the max time required to build robot, i.e. amount required less amount available divided
            wait = Math.max(
                wait,
                Math.ceil(
                    (cost - resources[resource]) / workingRobots[resource]
                )
            );
        }

        if (canBuild) {
            const remainingTime = time - wait - 1;
            if (remainingTime <= 0) continue;

            // make copies of working robots and resources
            const workingRobots_ = { ...workingRobots };
            const resources_ = { ...resources };

            // add resources
            for (const [robot, n] of Object.entries(workingRobots_)) {
                resources_[robot] += (wait + 1) * n;
            }

            // spend resources
            for (const [resource, cost] of Object.entries(costs)) {
                resources_[resource] -= cost;
            }

            workingRobots_[robot]++;

            for (const [resource, max] of Object.entries(blueprint.maxSpend)) {
                resources_[resource] = Math.min(
                    resources_[resource],
                    max * remainingTime
                );
            }
            geodes = Math.max(
                geodes,
                dfs(blueprint, cache, remainingTime, workingRobots_, resources_)
            );
        }
    }

    cache.set(key, geodes);

    return geodes;
};

let partOne = 0;
let partTwo = 1;

for (let i = 0; i < lines.length; i++) {
    const blueprint = parse(lines[i]);
    if (i < 3) {
        const res2 = dfs(
            blueprint,
            new Map(),
            32,
            { ore: 1, clay: 0, obsidian: 0, geode: 0 },
            { ore: 0, clay: 0, obsidian: 0, geode: 0 }
        );
        partTwo *= res2;
    }
    const res1 = dfs(
        blueprint,
        new Map(),
        24,
        { ore: 1, clay: 0, obsidian: 0, geode: 0 },
        { ore: 0, clay: 0, obsidian: 0, geode: 0 }
    );
    partOne += (i + 1) * res1;
}

export const solution = () => {
    console.log(`Part one solution: ${partOne}`);
    console.log(`Part two solution: ${partTwo}`);
};
