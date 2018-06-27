const _ = require("lodash");
let evaluate = require("./evaluate.js");

function isInvul(pkg) {
  //Define
  let { char, skill } = pkg;
  //Logic
  let invul = char.status.onState.filter(x => x.type === "invul");
  if (invul.length > 0) {
    for (item of invul) {
      //Continue to evaluate Stun
      if (item.scope[0] === "types") {
        if (item.scope[2] === "inclusive") {
          return item.scope[1].some(x => x === skill.type);
        }
        if (item.scope[2] === "exclusive") {
          return item.scope[1].some(x => !(x === skill.type));
        }
      }
      if (item.scope[0] === "classes") {
        if (item.scope[2] === "inclusive") {
          return item.scope[1].some(x => x === skill.class);
        }
        if (item.scope[2] === "exclusive") {
          return item.scope[1].some(x => !(x === skill.class));
        }
      }
      if (item.scope[0] === "none") {
        return true;
      }
    }
  }
  //Return
  return false;
}

module.exports = isInvul;
