const _ = require("lodash");
let evaluate = require("./evaluate.js");

function isStun(pkg) {
  //Define
  let { char, skill } = pkg;
  //Logic
  let stun = char.status.onState.filter(x => x.type === "stun");
  if (stun.length > 0) {
    for (item of stun) {
      if (item.scope[0] === "classes") {
        return item.scope[1].some(x => x === skill.class);
      }
      if (item.scope[0] === "none") {
        return true;
      }
    }
  }
  //Return
  return false;
}

module.exports = isStun;
