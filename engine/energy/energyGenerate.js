function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function energyGenerate(amount = 3) {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push("g", "r", "b", "w");
  }
  let energy = shuffle(arr).splice(0, amount);
  return {
    g: energy.filter(x => x === "g").length,
    r: energy.filter(x => x === "r").length,
    b: energy.filter(x => x === "b").length,    
    w: energy.filter(x => x === "w").length
  };
}

module.exports = energyGenerate;
