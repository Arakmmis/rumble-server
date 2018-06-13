const _ = require("lodash");
let energyGenerate = require("./energyGenerate.js");

async function energyCost(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, cost } = pkg;  
  //Logic
  state[ally].energy.g = state[ally].energy.g - cost.g;
  state[ally].energy.b = state[ally].energy.b - cost.b;
  state[ally].energy.r = state[ally].energy.r - cost.r;
  state[ally].energy.w = state[ally].energy.w - cost.w;
  //Return
  return state;
}

module.exports = energyCost;
