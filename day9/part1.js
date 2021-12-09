const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const list = fileContent.trim().split('\n');

function start(data) {
  const map = data.reduce((acc, line) => [...acc, line.split('').map(Number)], []);
  const lowest = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const top = map[y - 1] === undefined ? Infinity : map[y - 1][x];
      const bottom = map[y + 1] === undefined ? Infinity : map[y + 1][x];
      const left = map[y][x - 1] === undefined ? Infinity : map[y][x - 1];
      const right = map[y][x + 1] === undefined ? Infinity : map[y][x + 1];
      if (map[y][x] >= Math.min(top, bottom, left, right)) continue;
      lowest.push([`${x}, ${y}`, map[y][x]]);
    }
  }
  return lowest.map(el => el[1] + 1).reduce((acc, el) => acc + el);
}

const output = start(list); // 545
console.log(output);
