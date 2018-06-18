const _ = require("lodash");
let getSkill = require("../skill/getSkill.js");

//Parsers
let isAllowed = require("./isAllowed.js");
let isCooldown = require("./isCooldown.js");
let isStun = require("./isStun");

async function parser(pkg) {
  //Work to parsing stuns and default skill disable
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy } = pkg;
  let chars = state[ally].char.concat(state[enemy].char);

  //Skill Parsing
  for (let char of chars) {
    let skills = char.skills;

    for (let skill of skills) {
      let skillState = {
        isStun: false
      };
      //Parse isAllowed
      skill.isAllowed = isAllowed({ char, skill });
      //Parse Cooldown
      skill.isCooldown = isCooldown({ char, skill });
      //Check Stun
      skillState.isStun = isStun({ char, skill });
      //Assign Active
      if (
        skill.isAllowed === false ||
        skill.isCooldown === true ||
        skillState.isStun === true
      ) {
        skill.active = false;
      } else {
        skill.active = true;
      }
    }
  }

  //Return
  return state;
}

module.exports = parser;
