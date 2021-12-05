const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const linesCoord = fileContent.split('\n').filter(el => !!el).map(line => line.split(' -> ').map(c => c.split(',').map(el => +el)));

function start(list) {
  const map = new Map();
  let sum = 0;
  list.forEach(([firstPoint, lastPoint]) => {
    let x = firstPoint[0];
    let x2 = lastPoint[0];
    let y = firstPoint[1];
    let y2 = lastPoint[1];
    const moveX = (x2 - x) <= 0 ? (x2 - x) === 0 ? 0 : -1 : 1;
    const moveY = (y2 - y) <= 0 ? (y2 - y) === 0 ? 0 : -1 : 1;
    while (x !== x2 + moveX || y !== y2 + moveY) {
      const pointValue = map.get(`${x},${y}`) || 0;
      if (pointValue === 1) sum++;
      map.set(`${x},${y}`, pointValue + 1);
      x += moveX;
      y += moveY;
    }
  });
  console.log(sum);
}
start(linesCoord); // 19081
