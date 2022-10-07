const nums = [2, 7, 11, 15],
    target = 9;
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// a+b=target
// {a-target: i}
var twoSum = function (nums, target) {
    const numsMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        let curr = numsMap.get(diff);
        if (curr !== undefined) return [curr, i];
        numsMap.set(nums[i], i);
    }
};

console.log(twoSum(nums, target));
