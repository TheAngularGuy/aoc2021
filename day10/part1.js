const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const list = fileContent.trim().split('\n');

const scores = {')': 3, ']': 57, '}': 1197, '>': 25137};
const openings = ['(', '[', '{', '<'];
const closings = [')', ']', '}', '>'];

function transformOpeningToClosing(opening) {
  return closings[openings.findIndex(el => el === opening)];
}

function start(data) {
  let sum = 0;
  for (const line of data) {
    const chars = line.split('');
    const foundOpenings = [];
    for (const c of chars) {
      // opening
      if (openings.includes(c)) {
        foundOpenings.unshift(c);
        continue;
      }
      // closing
      const opening = foundOpenings.shift();
      if (transformOpeningToClosing(opening) !== c) {
        sum += scores[c];
        break;
      }
    }
  }
  return sum;
}

const output = start(list); // 240123
console.log(output);
