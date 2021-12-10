const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const list = fileContent.trim().split('\n');

const scores = {')': 1, ']': 2, '}': 3, '>': 4};
const openings = ['(', '[', '{', '<'];
const closings = [')', ']', '}', '>'];

function transformOpeningToClosing(opening) {
  return closings[openings.findIndex(el => el === opening)];
}

function start(data) {
  const sums = [];
  for (const line of data) {
    const chars = line.split('');
    let foundOpenings = [];
    for (const c of chars) {
      // opening
      if (openings.includes(c)) {
        foundOpenings.unshift(c);
        continue;
      }
      // closing
      const opening = foundOpenings.shift();
      if (transformOpeningToClosing(opening) !== c) {
        foundOpenings = [];
        break;
      }
    }
    if (!foundOpenings.length) continue;
    sums.push(foundOpenings
      .map(el => transformOpeningToClosing(el))
      .map(el => scores[el])
      .reduce((sum, el) => el + sum * 5, 0));
  }
  return sums.sort((a, b) => a < b ? 1 : -1)[(sums.length - 1) / 2];
}

(() => {
  const d1 = new Date();
  const output = start(list); // 3260812321
  console.log(output);
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
