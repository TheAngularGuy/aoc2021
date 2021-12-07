const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const positions = fileContent.split('\n').filter(el => !!el)[0].split(',').map(Number);

function start(list) {
  let map = new Map();
  let min = Math.min(...list);
  let max = Math.max(...list);
  const intervals = new Array(max - min).fill(0).map((_, i) => i + min);

  let bestSum = null;
  for (let pos of intervals) {
    let sum = 0;
    list.forEach(togo => {
      let delta = Math.abs(togo - pos);
      for (let i = 1; i <= delta; i++) {
        sum += i;
      }
    });
    if (bestSum !== null && sum > bestSum) {
      break;
    }
    bestSum = bestSum === null ? sum : Math.min(sum, bestSum);
    map.set(pos, sum);
  }
  //console.log(map);

  return Math.min(...[...map].map(el => el[1]));
}

(() => {
  const d1 = new Date();
  const output = start(positions); // 92439766
  console.log(output);
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
