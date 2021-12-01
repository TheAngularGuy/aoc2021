const fs = require('fs');
const buffer = fs.readFileSync('data_part1.txt');
const fileContent = buffer.toString();

const numbers = fileContent.split('\n').map((el) => +el);

const output =
  numbers
    .reduce((accu, _, i, array) => (i > 0 && array[i] > array[i - 1] ? ++accu : accu), 0);

console.log(output); // 1316
