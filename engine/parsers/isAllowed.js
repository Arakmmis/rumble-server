const _ = require("lodash");

function isAllowed(pkg) {
  //Define
  let { char, skill } = pkg;
  //Logic
  let object = _.isObject(skill.isAllowed);
  if (object) {
    let evaluation = skill.isAllowed.map(x => {
      let { evaluator, subject, comparison, value } = x;
      if (evaluator === "exist") {
        if (subject === "state") {
          return char.status.onState.some(
            s => s.name === comparison && s.type === "allow"
          );
        }
      }
      return x.default;
    });
    //Return
    return evaluation.some(x => x === true);
  }
  //Return
  return skill.isAllowed;
}

module.exports = isAllowed;
