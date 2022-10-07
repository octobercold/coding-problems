const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const sortedStringsMap = new Map();
    strs.forEach((str) => {
        let sortedString = str.split("").sort().join("");
        let val = sortedStringsMap.get(sortedString);
        if (val !== undefined) {
            val.push(str);
            sortedStringsMap.set(sortedString, val);
        } else {
            sortedStringsMap.set(sortedString, [str]);
        }
    });
    let res = [];
    sortedStringsMap.forEach((value) => {
        res.push(value);
    });

    return res;
};

console.log(groupAnagrams(strs));
