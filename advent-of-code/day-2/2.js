const fileReader = require("../fileReader");
const commands = [];
const lines = fileReader().map((line) => {
    let [direction, step] = line.split(" ");
    commands.push([direction, parseInt(step)]);
});

const followCommands = (commands) => {
    let d = 0,
        x = 0;
    for (const [direction, step] of commands) {
        if (direction === "forward") {
            x += step;
        } else if (direction === "up") {
            d -= step;
        } else {
            //down
            d += step;
        }
    }
    return d * x;
};
