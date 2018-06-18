const _ = require("lodash");
let getSkill = require("../skill/getSkill.js");

//Parsers
let isAllowed = require("./isAllowed.js");
let isCooldown = require("./isCooldown.js");

async function parser(pkg) { //Work to parsing stuns and default skill disable
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy } = pkg;
  let chars = state[ally].char.concat(state[enemy].char);

  //First Layer Parsing
  for (let char of chars) {
    let skills = char.skills;

    for (let skill of skills) {
      //Parse isAllowed
      skill.isAllowed = isAllowed({ char, skill });
      //Parse Cooldown
      skill.isCooldown = isCooldown({ char, skill });
    }
  }

  //Return
  return state;
}

module.exports = parser;
