// import { createIncrementalCompilerHost } from "typescript";
// import { fileReader } from "./utils/fileReader";

// // class Node {
// //     constructor(public val: number, public left?: Node, public right?: Node) {
// //         this.val = val;
// //         this.left = this.left === undefined ? null : left;
// //         this.right = this.right === undefined ? null : right;
// //     }
// // }

// const numbers = fileReader(20).map(n => parseInt(n));
// const newNumbers = [...numbers];

// let current = 0,
//     next = 1,
//     newIndex = 0;

// console.log(`original: ${numbers}\n`);

// for (let i = 0; i < numbers.length; i++) {
//     console.log("index i am oging to move: ", current);
//     const remainder = newNumbers[current] % numbers.length;

//     if (remainder >= 0) {
//         // moving right
//         // overflow - new index between 0 and current
//         if (current + remainder > numbers.length) {
//             newIndex = current + remainder - numbers.length;
//         } else {
//             // no overflow - new index is between current and array length
//             newIndex = current + remainder;
//         }
//     } else {
//         // moving left
//         // overflow - new index between current and array length
//         if (current + remainder < 0) {
//             newIndex = numbers.length - (current + remainder);
//         } else {
//             // no overflow - new index is between 0 and current
//             newIndex = current + remainder;
//         }
//     }

//     console.log(
//         `${newNumbers[current]} moves between ${newNumbers[newIndex]} and  ${
//             newNumbers[newIndex + 1]
//         }: `
//     );

//     if (newIndex < next) {
//         next--
//     } else {
//         next+
//     }

//     newNumbers.splice(newIndex, 0, newNumbers.splice(current, 1)[0]);
//     console.log(`${newNumbers}\n`);
// }

// export const solution = () => {
//     //console.log(newNumbers);
// };
