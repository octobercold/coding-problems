const s = "anagram",
    t = "nagaram";

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (!s || !t || s.length !== t.length) return false;
    const charMap = new Map();
    for (let i = 0; i < s.length; i++) {
        charMap.set(
            s[i],
            charMap.get(s[i]) === undefined ? 1 : charMap.get(s[i]) + 1
        );

        charMap.set(
            t[i],
            charMap.get(t[i]) === undefined ? -1 : charMap.get(t[i]) - 1
        );
    }
    const arr = [...charMap.values()];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) return false;
    }

    return true;
};

console.log(isAnagram(s, t));
