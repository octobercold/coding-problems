const fileReader = require("../fileReader");

const nums = fileReader().map((line) => parseInt(line));
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

const countIncreasingWindowDepth = (nums) => {
    const l = nums.length;
    let res = 0,
        curr = 0,
        next = 0;
    for (i = 2; i < l; i++) {
        if (!nums[i + 1]) break;
        curr = nums[i] + nums[i - 1] + nums[i - 2];
        next = nums[i + 1] + nums[i] + nums[i - 1];
        if (next > curr) {
            res++;
        }
    }
    return res;
};
