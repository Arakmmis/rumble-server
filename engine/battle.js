const _ = require("lodash");
let skillQueue = require("./skillQueue.js");
let duration = require("./duration.js");
let usingCleanup = require("./usingCleanup.js");
let parser = require("./parser.js");

async function battle(pkg, callback) {
  //Define
  let state = _.cloneDeep(pkg.state);
  const getQueue = () => {
    let action = _.cloneDeep(pkg.action);
    return _.uniqBy(action, "turnid");
  };
  let queue = getQueue();
  console.log(queue);
  const getTurn = () => {
    return state.turn;
  };
  let turn = getTurn();

  //Assign Turn
  let ally = turn % 2 === 1 ? "odd" : "even";
  let enemy = turn % 2 === 1 ? "even" : "odd";

  //Skill Queue
  state = await skillQueue({ state, ally, enemy, queue });

  //Post Sequence
  state = await duration({ state, ally, enemy, queue });

  const setUsing = queue => {
    state[ally].using = state[ally].using.concat(queue);
  };
  setUsing(queue);
  state = await usingCleanup({ state, ally, enemy });

  const setTurn = state => {
    state.turn++;
    state.turnid = "turn" + state.turn;
  };
  setTurn(state);

  //Parsing
  console.log("parsing");
  let view = await parser({ state, ally, enemy });

  //Exit
  let payload = { state, view };
  callback(payload);
}

module.exports = battle;
