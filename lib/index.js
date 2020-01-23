const fs = require('fs');
const path = require('path')

const filePath = path.resolve(__dirname, "..", "native", "index.node");

const data = fs.readFileSync(filePath);

let count = 0;
let inVector = false;
let initialized = 0;
let lengthVarVector = 10;
let integerExpected = 255;
let findedIndex = void 0;

// data.forEach((int, index) => {
//     if (index < 322005) return;
//     if (int === integerExpected && inVector === false) {
//         inVector = true;
//         initialized = index;
//         count = 1;
//     } else if (int === integerExpected && inVector === true) {
//         count++;
//         if (count === lengthVarVector)
//             findedIndex = initialized;
//     } else if (int !== integerExpected) {
//         inVector = false;
//         initialized = 0;
//         count = 0;
//     }
// })


const xa = require('../native').hello();

console.log(xa);