const nums = [1, 1, 1, 1, 2, 3, 4, 1, 1, 1, 1, 3, 3, 3];

/**
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = function (nums) {
    if (!nums || nums.length === 1) return false;
    const numsSet = new Set(nums);
    return numsSet.size !== nums.length;
};

// var containsDuplicate = function (nums) {
//     if (!nums || nums.length === 1) return false;
//     let numsMap = new Map();
//     for (const num of nums) {
//         if (numsMap.get(num) !== undefined) return true;
//         numsMap.set(num, 1);
//     }
//     return false;
// };

console.log(containsDuplicate(nums));
