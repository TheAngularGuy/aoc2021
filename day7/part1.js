const fs = require('fs');
const buffer = fs.readFileSync('data_part1.txt');
const fileContent = buffer.toString();

const positions = fileContent.split('\n').filter(el => !!el)[0].split(',').map(Number);


function start(list) {
  let map = new Map();
  list.forEach(pos => {
    let sum = 0;
    list.forEach(togo => {
      sum += Math.abs(togo - pos);
    });
    map.set(pos, sum);
  });
  return Math.min(...[...map].map(el => el[1]));
}

(() => {
  const d1 = new Date();
  const output = start(positions); // 335330
  console.log(output);
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
