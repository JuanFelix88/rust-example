const fs = require('fs');
const path = require('path')

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const filePath = path.resolve(__dirname, "..", "native", "index.node");

const data = fs.readFileSync(filePath);

const dataBinding = new Uint8Array([1,2,3,4,5, 7]);

const lengthFull = data.length + dataBinding.length;

console.log(data.length - 1)

const newData = new Uint8Array([...data, ...dataBinding])

fs.writeFileSync(filePath, newData);
console.time('rust');
const xa = require('../native').hello();
console.timeEnd('rust');

console.log(xa);