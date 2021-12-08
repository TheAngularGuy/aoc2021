const fs = require('fs');
const buffer = fs.readFileSync('data_part2.txt');
const fileContent = buffer.toString();

const list = fileContent.split('\n').filter(el => !!el)
  .map(el => el.split('|')[1]).map(el => el.split(' '));

function start(data) {
  const includedLenghts = [2, 3, 4, 7];
  return data.reduce((sum, line) =>
    sum + line.reduce((acc, nb) => includedLenghts.includes(nb.length) ? ++acc : acc, 0), 0);
}

const output = start(list); // 445
console.log(output);

