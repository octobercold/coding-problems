/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const characterReplacement = (s: string, k: number) => {
    if (s.length - k < 2) return s.length;

    const charMap = new Map();
    let benchmark = k + 1;

    for (let i = 0; i < s.length; i++) {
        const val = charMap.get(s[i]);
        if (val === undefined) {
            charMap.set(s[i], [i]);
        } else {
            val.push(i);
            charMap.set(s[i], val);
        }
    }

    for (const array of charMap.values()) {
        let left = 0,
            right = 1,
            pointer = 0,
            replacementsLeft = k;
        console.log(`CHEKING NEW ARRAY: ${array}`);
        while (right < array.length) {
            console.log(
                `values at [pointer, right]: [${array[pointer]}, ${array[right]}]`
            );
            const delta = array[right] - array[pointer] - 1;
            if (delta <= replacementsLeft) {
                console.log("current values ok, can check next values");
                console.log(
                    `left: ${left}, pointer: ${pointer}, right: ${right}, replacementsLeft: ${replacementsLeft}, delta: ${delta}`
                );

                //try to add left replacements to the left and right
                replacementsLeft -= delta;
                let leftTail = 0,
                    rightTail = 0;
                if (replacementsLeft > 0) {
                    let temp = replacementsLeft;
                    leftTail = Math.min(temp, array[left]);
                    temp -= leftTail;
                    if (replacementsLeft > 0) {
                        rightTail = Math.min(s.length - array[right] - 1, temp);
                    }
                }
                benchmark = Math.max(
                    benchmark,
                    array[right] - array[left] + 1 + leftTail + rightTail
                );
                pointer++;
                right++;
            } else {
                console.log(
                    `reset to default, because delta: ${delta}, replacementsLeft: ${replacementsLeft}`
                );
                left++;
                pointer = left;
                right = left + 1;
                replacementsLeft = k;
            }
        }
    }

    console.log(charMap);

    return Math.max(benchmark);
};

const s = "JSDSSMESSTR",
    k = 2;

console.log(characterReplacement(s, k));
