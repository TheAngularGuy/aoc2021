const fs = require('fs');
const buffer = fs.readFileSync('data_part1.txt');
const fileContent = buffer.toString();

const instructions = fileContent
  .split('\n')
  .map((el) => ({direction: el.split(' ')[0], value: +el.split(' ')[1]}));

const output = instructions.reduce((accu, instruction) => {
  if (instruction.direction === 'forward') {
    accu.x += instruction.value;
  } else if (instruction.direction === 'up') {
    accu.y -= instruction.value;
  } else if (instruction.direction === 'down') {
    accu.y += instruction.value;
  }
  return accu;
}, {x: 0, y: 0});
console.log(output.x * output.y); // 1962940
