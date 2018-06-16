const _ = require("lodash");

function evaluate(pkg) {
  //Define
  let { char, evaluatee } = pkg;
  let temporary = evaluatee;
  //Logic
  let object = _.isArray(evaluatee);
  if (object) {
    for (item of evaluatee) {
      let { evaluator, subject, comparison, value } = item;
      if (evaluator === "exist") {
        if (subject === "state") {
          let compare = char.status.onState.some(
            s => s.name === comparison && s.type === "state"
          );
          if (compare) {
            temporary = value;
            break;
          }
        }
      } else {
        temporary = item.default;
      }
    }
    return temporary;
  } else {
    //Return
    return evaluatee;
  }
}

module.exports = evaluate;
