const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const list = fileContent.trim().split('\n');

function traverse(map, x, y, visited = new Map()) {
  if (map[y] === undefined || map[y][x] === undefined || map[y][x] === 9 || visited.has(`${x}, ${y}`)) {
    return 0;
  }
  visited.set(`${x}, ${y}`, true);
  let sum = 1;
  sum += traverse(map, x + 1, y, visited); // go right
  sum += traverse(map, x - 1, y, visited); // go left
  sum += traverse(map, x, y + 1, visited); // go bottom
  sum += traverse(map, x, y - 1, visited); // go up
  return sum;
}

function start(data) {
  const map = data.reduce((acc, line) => [...acc, line.split('').map(Number)], []);
  const bassins = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const top = map[y - 1] === undefined ? Infinity : map[y - 1][x];
      const bottom = map[y + 1] === undefined ? Infinity : map[y + 1][x];
      const left = map[y][x - 1] === undefined ? Infinity : map[y][x - 1];
      const right = map[y][x + 1] === undefined ? Infinity : map[y][x + 1];
      if (map[y][x] >= Math.min(top, bottom, left, right)) continue;
      bassins.push(traverse(map, x, y));
    }
  }
  return bassins.sort((a, b) => b > a ? 1 : -1).slice(0, 3).reduce((acc, size) => acc * size, 1);
}

(() => {
  const d1 = new Date();
  const output = start(list); // 950600
  console.log(output);
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
