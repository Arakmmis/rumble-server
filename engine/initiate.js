const _ = require("lodash");
let getChar = require("./dummyChar.js");
let newChar = require("./dummy/naruto.js");
let energy = require("./energy/energyGenerate");

function initiate() {
  let char = getChar();

  let odd = {
    char: [_.cloneDeep(newChar)],
    energy: energy(1),
    name: "Odd",
    using: []
  };
  let even = {
    char: [_.cloneDeep(newChar)],
    energy: energy(),
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
