const _ = require("lodash");
let getChar = require("./dummyChar.js");
let newChar = require("./dummy/naruto.js");

function initiate() {
  let char = getChar();

  let energy = {
    g: 0,
    r: 0,
    b: 0,
    w: 0
  };

  let odd = {
    char: [_.cloneDeep(newChar)],
    energy: _.cloneDeep(energy),
    name: "Odd",
    using: []
  };
  let even = {
    char: [_.cloneDeep(newChar)],
    energy: _.cloneDeep(energy),
    name: "Even",
    using: []
  };

  let stateBasic = {
    odd: odd,
    even: even,
    turn: 1,
    turnid: "turn1",
    timestamp: Date().now
  };

  let stateMeta = {
    room: "",
    channel: "",
    log: []
  };

  let state = {
    ...stateBasic,
    ...stateMeta
  };

  return state;
}

module.exports = initiate;
