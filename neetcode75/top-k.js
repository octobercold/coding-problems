const nums = [1, 1, 1, 1, 3],
    k = 1;

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const numsMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        let val = numsMap.get(nums[i]);
        numsMap.set(nums[i], val === undefined ? 1 : val + 1);
    }
    const topKFrequencies = [...numsMap.keys()].sort(
        (a, b) => numsMap.get(b) - numsMap.get(a)
    );

    return topKFrequencies.splice(0, k);
};

console.log(topKFrequent(nums, k));
