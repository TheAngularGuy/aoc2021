const fs = require('fs');
const buffer = fs.readFileSync('data_part1.txt');
const fileContent = buffer.toString();

const numbers = fileContent.split('\n');

const mostCommonBits = numbers[0].split('').map(() => ({one: 0, zero: 0}));

numbers.forEach(num => num.split('').forEach(
  (bit, index) => ((bit === '0') ? mostCommonBits[index].zero += 1 : mostCommonBits[index].one += 1)
));

const gamma = parseInt(mostCommonBits.map(bit => bit.one > bit.zero ?  '1' : '0').join(''), 2);
const epsilon = parseInt(mostCommonBits.map(bit => bit.one < bit.zero ?  '1' : '0').join(''), 2);
console.log(gamma * epsilon); // 3549854
