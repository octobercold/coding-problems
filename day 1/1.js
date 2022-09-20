var fs = require("fs");
var path = process.cwd();
var string = fs.readFileSync(path + "/input.txt", { encoding: "utf-8" });
var lines = string.split("\n");

const nums = lines.map((line) => parseInt(line));
console.log(nums);

const countIncreasingDepth = (nums) => {
    const l = nums.length;
    let res = 0;
    for (i = 1; i < l; i++) {
        if (nums[i] > nums[i - 1]) {
            res++;
        }
    }
    return res;
};
console.log(countIncreasingDepth(nums));
