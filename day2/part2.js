const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const instructions = fileContent
  .split('\n')
  .map((el) => ({direction: el.split(' ')[0], value: +el.split(' ')[1]}));

const output = instructions.reduce((accu, instruction) => {
  if (instruction.direction === 'forward') {
    accu.y += accu.aim * instruction.value;
    accu.x += instruction.value;
  } else if (instruction.direction === 'up') {
    accu.aim -= instruction.value;
  } else if (instruction.direction === 'down') {
    accu.aim += instruction.value;
  }
  return accu;
}, {x: 0, y: 0, aim: 0});
console.log(output.x * output.y); // 1813664422
