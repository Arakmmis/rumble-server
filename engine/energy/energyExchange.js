const _ = require("lodash");
let energyGenerate = require("./energyGenerate.js");

async function energyExchange(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, exchange } = pkg;
  let offer = exchange.offer;
  let receive = exchange.receive;
  //Check
  console.log(state[ally].energy, exchange);
  let total = offer.g + offer.r + offer.b + offer.w;
  if (receive === "") {
    return state;
  }
  //Logic
  state[ally].energy.g = state[ally].energy.g - offer.g;
  state[ally].energy.r = state[ally].energy.r - offer.r;
  state[ally].energy.b = state[ally].energy.b - offer.b;
  state[ally].energy.w = state[ally].energy.w - offer.w;
  //Receive
  state[ally].energy[receive] = state[ally].energy[receive] + 1;
  console.log(state[ally].energy);
  //Return
  return state;
}

module.exports = energyExchange;
