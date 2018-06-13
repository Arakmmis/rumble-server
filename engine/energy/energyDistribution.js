const _ = require("lodash");
let energyGenerate = require("./energyGenerate.js");

async function energyDistribution(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy, skill } = pkg;
  let energy = energyGenerate();
  //Logic
  state[ally].energy.g = state[ally].energy.g + energy.g;
  state[ally].energy.b = state[ally].energy.b + energy.b;
  state[ally].energy.r = state[ally].energy.r + energy.r;
  state[ally].energy.w = state[ally].energy.w + energy.w;
  //Return
  return state;
}

module.exports = energyDistribution;
