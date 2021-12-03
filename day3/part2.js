const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const numbers = fileContent.split('\n');

function recursiveFilter(oxygenList, carbonList, index = 0) {
  if (oxygenList.length === 1 && carbonList.length === 1) {
    return parseInt(oxygenList[0], 2) * parseInt(carbonList[0], 2);
  }
  if (oxygenList.length > 1) {
    let zero = [];
    let one = [];
    oxygenList.forEach(num => (num[index] === '0') ? zero.push(num) : one.push(num));
    oxygenList = one.length >= zero.length ? one : zero;
  }
  if (carbonList.length > 1) {
    let zero = [];
    let one = [];
    carbonList.forEach(num => (num[index] === '0') ? zero.push(num) : one.push(num));
    carbonList = one.length >= zero.length ? zero : one;
  }
  return recursiveFilter(oxygenList, carbonList, ++index);
}

let output = recursiveFilter(numbers, numbers);
console.log(output); // 3765399

