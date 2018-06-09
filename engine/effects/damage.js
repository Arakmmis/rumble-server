const _ = require("lodash");

function damage(pkg) {
  //Define
  let state = pkg.state;
  let { enemy, effect } = pkg;
  //Logic
  state[enemy].char[0].hp = state[enemy].char[0].hp - effect.valDmg;
  console.log(effect);
  //Return
  return state;
  // return state[enemy].char[0].hp - effect.valDmg;
}

module.exports = damage;
