const fs = require('fs');
const buffer = fs.readFileSync('data_part1.txt');
const fileContent = buffer.toString();

const numbers = fileContent.split('\n').filter(el => !!el).map(line => line.split(',').map(el => +el))[0];

const listOfNbFishByCycle = new Array(9) // nb of cycles (8) + 1 since 0 is a valid cycle
  .fill(0)
  .map(
    // we store the amount of fishes there is by cycle
    (_, i) => numbers.filter((n) => n === i).length
  );

function start(list, maxIteration = 0, counter = 0) {
  if (counter === maxIteration) {
    return list.reduce((acc, nbFish) => acc + BigInt(nbFish), 0n);
  }
  const fishGivingBirth = list[0];
  const newList = list.slice(1);
  newList[6] += fishGivingBirth; // mothers go back to starting cycle
  newList[8] = fishGivingBirth; // new born go to starting cycle + 2
  return start(newList, maxIteration, ++counter);
}

(() => {
  const d1 = new Date();
  const output = start(listOfNbFishByCycle, 80); // 380758n
  console.log(output);
  const end = new Date() - d1;
  console.info('Execution time: %dms', end);
})();
