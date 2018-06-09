const _ = require("lodash");

async function usingCleanup(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { ally, enemy } = pkg;
  let using = state[ally].using;

  //Logic
  for (skill of using) {
    let turnid = skill.turnid;
    let count = state[enemy].char[0].status.onSkill.filter(
      x => x.turnid === turnid
    );
    console.log(count);
    if (count.length === 0) {
      skill.remove = true;
    } else {
      skill.remove = false;
    }
  }
  console.log(using);
    state[ally].using = using.filter(x => x.remove === false).map(x => {
      delete x.remove;
      return x;
    });
  console.log(state);

  //Return
  return state;
}

module.exports = usingCleanup;
